import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import {
  getOrderBySessionId,
  getOrderByPaymentIntentId,
  updateOrder,
} from "@/lib/orders";
import type { OrderItem } from "@/lib/types";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const FROM_EMAIL =
  process.env.FROM_EMAIL ?? "orders@escapistfiction.com";
const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL ?? "kierras319@gmail.com";

// ---------------------------------------------------------------------------
// Signature verification — HMAC-SHA256, 5-minute tolerance
// ---------------------------------------------------------------------------
function verifyStripeSignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  const parts: Record<string, string> = {};
  signature.split(",").forEach((seg) => {
    const eq = seg.indexOf("=");
    if (eq !== -1) parts[seg.slice(0, eq)] = seg.slice(eq + 1);
  });

  const { t, v1 } = parts;
  if (!t || !v1) return false;

  // Reject stale events older than 5 minutes
  if (Math.abs(Date.now() / 1000 - parseInt(t, 10)) > 300) return false;

  const expected = createHmac("sha256", secret)
    .update(`${t}.${rawBody}`, "utf8")
    .digest("hex");

  try {
    return timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(v1, "hex")
    );
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Fulfillment email
// ---------------------------------------------------------------------------
async function sendFulfillmentEmail(
  to: string,
  customerName: string | undefined,
  items: OrderItem[],
  orderId: string
): Promise<boolean> {
  const greeting = customerName ? `Hi ${customerName.split(" ")[0]},` : "Hi,";

  const itemLines = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#d4c5a0">${i.title}${i.format ? ` <span style="color:#888">(${i.format})</span>` : ""}</td>
          <td style="padding:8px 0;border-bottom:1px solid #2a2a2a;color:#d4c5a0;text-align:right">$${(i.price * i.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  // Build delivery section — manor gets a live access token, everything else
  // gets a follow-up note. Swap in real download URLs once file hosting is set.
  const deliveryBlocks: string[] = [];

  for (const item of items) {
    if (item.slug === "digital-escape-room-the-manor") {
      const { createToken } = await import("@/lib/manor-tokens");
      const token = createToken(to, customerName ?? to);
      const accessUrl = `${SITE_URL}/the-manor?token=${token}`;
      deliveryBlocks.push(`
        <div style="background:#1a1a1a;border-left:3px solid #c9a84c;padding:16px 20px;margin:12px 0;border-radius:4px">
          <p style="margin:0 0 6px;font-weight:bold;color:#c9a84c">${item.title}</p>
          <p style="margin:0 0 8px;color:#aaa;font-size:14px">Your one-time access link is ready:</p>
          <a href="${accessUrl}" style="display:inline-block;background:#c9a84c;color:#1a1a1a;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:bold;font-size:14px">Enter The Manor →</a>
          <p style="margin:12px 0 0;color:#666;font-size:12px">This link works once and expires after use.</p>
        </div>`);
    } else if (
      item.slug.includes("subscription") ||
      item.slug.includes("monthly")
    ) {
      deliveryBlocks.push(`
        <div style="background:#1a1a1a;border-left:3px solid #c9a84c;padding:16px 20px;margin:12px 0;border-radius:4px">
          <p style="margin:0 0 6px;font-weight:bold;color:#c9a84c">${item.title}</p>
          <p style="margin:0;color:#aaa;font-size:14px">Your subscription is now active. Your first episode will arrive in your inbox within 24 hours.</p>
        </div>`);
    } else {
      deliveryBlocks.push(`
        <div style="background:#1a1a1a;border-left:3px solid #c9a84c;padding:16px 20px;margin:12px 0;border-radius:4px">
          <p style="margin:0 0 6px;font-weight:bold;color:#c9a84c">${item.title}${item.format ? ` (${item.format})` : ""}</p>
          <p style="margin:0;color:#aaa;font-size:14px">Your download link will arrive in a follow-up email within a few hours. Reference: <code style="color:#c9a84c">${orderId.slice(0, 8).toUpperCase()}</code></p>
        </div>`);
    }
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#111;font-family:Georgia,serif">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px">

    <div style="border-bottom:2px solid #c9a84c;padding-bottom:20px;margin-bottom:32px">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888">Escapist Fiction</p>
      <h1 style="margin:0;font-size:26px;color:#f0e6c8">Order Confirmed</h1>
    </div>

    <p style="color:#d4c5a0;font-size:16px;line-height:1.6">${greeting}</p>
    <p style="color:#aaa;font-size:15px;line-height:1.7;margin-top:0">
      Your payment has been received and verified. Here's what you ordered:
    </p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      <thead>
        <tr>
          <th style="text-align:left;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#666;padding-bottom:8px;border-bottom:1px solid #333">Item</th>
          <th style="text-align:right;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#666;padding-bottom:8px;border-bottom:1px solid #333">Price</th>
        </tr>
      </thead>
      <tbody>${itemLines}</tbody>
    </table>

    <h2 style="font-size:16px;color:#c9a84c;letter-spacing:0.05em;margin-bottom:8px">Your Delivery</h2>
    ${deliveryBlocks.join("\n")}

    <hr style="border:none;border-top:1px solid #2a2a2a;margin:32px 0">
    <p style="font-size:12px;color:#555;line-height:1.6">
      Order ID: <code style="color:#888">${orderId}</code><br>
      Questions? Reply to this email or write to <a href="mailto:${CONTACT_EMAIL}" style="color:#c9a84c">${CONTACT_EMAIL}</a>
    </p>

  </div>
</body>
</html>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Escapist Fiction <${FROM_EMAIL}>`,
        to: [to],
        subject: "Your Escapist Fiction order is confirmed",
        html,
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      console.error("[webhook] Resend error:", err);
    }
    return res.ok;
  } catch (err) {
    console.error("[webhook] Resend network error:", err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  if (
    !STRIPE_WEBHOOK_SECRET ||
    !verifyStripeSignature(rawBody, signature, STRIPE_WEBHOOK_SECRET)
  ) {
    console.warn("[webhook] Invalid or missing Stripe signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log(`[webhook] Received: ${event.type}`);

  switch (event.type) {
    // -----------------------------------------------------------------------
    // Payment confirmed
    // -----------------------------------------------------------------------
    case "checkout.session.completed": {
      const session = event.data.object as {
        id: string;
        payment_status: string;
        payment_intent?: string;
        customer_email?: string;
        customer_details?: { email?: string; name?: string };
        metadata?: { orderId?: string };
      };

      // Only process if Stripe has collected the money
      if (session.payment_status !== "paid") break;

      const order = getOrderBySessionId(session.id);
      if (!order) {
        console.error(`[webhook] No order found for session ${session.id}`);
        break;
      }

      // Idempotency guard — prevent duplicate fulfillment
      if (order.status === "fulfilled" || order.fulfillmentEmailSent) {
        console.log(`[webhook] Order ${order.id} already fulfilled — skipping`);
        break;
      }

      const customerEmail =
        session.customer_details?.email ??
        session.customer_email ??
        order.customerEmail;
      const customerName = session.customer_details?.name ?? order.customerName;
      const now = new Date().toISOString();

      // Transition: pending → paid
      updateOrder(order.id, {
        status: "paid",
        paidAt: now,
        stripePaymentIntentId: session.payment_intent,
        customerEmail,
        customerName,
      });

      // Send fulfillment email
      const emailSent = await sendFulfillmentEmail(
        customerEmail,
        customerName,
        order.items,
        order.id
      );

      // Transition: paid → fulfilled
      updateOrder(order.id, {
        status: "fulfilled",
        fulfilledAt: new Date().toISOString(),
        fulfillmentEmailSent: emailSent,
      });

      console.log(
        `[webhook] Order ${order.id} fulfilled. Email sent: ${emailSent}`
      );
      break;
    }

    // -----------------------------------------------------------------------
    // Async payment failed (bank transfers, etc.)
    // -----------------------------------------------------------------------
    case "checkout.session.async_payment_failed": {
      const session = event.data.object as { id: string };
      const order = getOrderBySessionId(session.id);
      if (order && (order.status === "pending" || order.status === "paid")) {
        updateOrder(order.id, {
          status: "failed",
          failedAt: new Date().toISOString(),
        });
        console.log(`[webhook] Order ${order.id} marked failed`);
      }
      break;
    }

    // -----------------------------------------------------------------------
    // Payment intent failed
    // -----------------------------------------------------------------------
    case "payment_intent.payment_failed": {
      const pi = event.data.object as { id: string };
      const order = getOrderByPaymentIntentId(pi.id);
      if (order && order.status === "pending") {
        updateOrder(order.id, {
          status: "failed",
          failedAt: new Date().toISOString(),
        });
        console.log(`[webhook] Order ${order.id} marked failed via PI`);
      }
      break;
    }

    // -----------------------------------------------------------------------
    // Refund issued
    // -----------------------------------------------------------------------
    case "charge.refunded": {
      const charge = event.data.object as {
        payment_intent?: string;
        refunded: boolean;
      };
      if (charge.payment_intent && charge.refunded) {
        const order = getOrderByPaymentIntentId(charge.payment_intent);
        if (order && order.status !== "refunded") {
          updateOrder(order.id, {
            status: "refunded",
            refundedAt: new Date().toISOString(),
          });
          console.log(`[webhook] Order ${order.id} marked refunded`);
        }
      }
      break;
    }

    default:
      // Unhandled event types — acknowledge receipt without processing
      break;
  }

  return NextResponse.json({ received: true });
}
