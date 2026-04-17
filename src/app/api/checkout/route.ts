import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createOrder } from "@/lib/orders";
import type { CartItem } from "@/lib/types";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? "";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function POST(req: NextRequest) {
  if (!STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Payment not configured" },
      { status: 503 }
    );
  }

  let body: { items: CartItem[]; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { items, email } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }

  const orderId = randomUUID();

  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set(
    "success_url",
    `${SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
  );
  params.set("cancel_url", `${SITE_URL}/checkout/cancel`);
  params.set("metadata[orderId]", orderId);

  if (email) {
    params.set("customer_email", email);
  }

  items.forEach((item, i) => {
    const name = item.format
      ? `${item.title} (${item.format})`
      : item.title;
    params.set(`line_items[${i}][price_data][currency]`, "usd");
    params.set(
      `line_items[${i}][price_data][product_data][name]`,
      name
    );
    params.set(
      `line_items[${i}][price_data][unit_amount]`,
      String(Math.round(item.price * 100))
    );
    params.set(`line_items[${i}][quantity]`, String(item.quantity));
  });

  let session: { id: string; url: string };
  try {
    const stripeRes = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    if (!stripeRes.ok) {
      const err = await stripeRes.json();
      console.error("[checkout] Stripe error:", err);
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 502 }
      );
    }

    session = await stripeRes.json();
  } catch (err) {
    console.error("[checkout] Network error:", err);
    return NextResponse.json({ error: "Network error" }, { status: 502 });
  }

  createOrder({
    id: orderId,
    stripeSessionId: session.id,
    items: items.map((i) => ({
      slug: i.slug,
      title: i.title,
      price: i.price,
      format: i.format,
      quantity: i.quantity,
    })),
    customerEmail: email ?? "",
    amountTotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
    currency: "usd",
    status: "pending",
    createdAt: new Date().toISOString(),
    fulfillmentEmailSent: false,
  });

  return NextResponse.json({ url: session.url });
}
