import { getAllOrders } from "@/lib/orders";
import type { Order, OrderStatus } from "@/lib/types";

// Protect with ?key= query param matching ADMIN_KEY env var
// Usage: /admin/orders?key=your_secret_here
interface PageProps {
  searchParams: Promise<{ key?: string }>;
}

const STATUS_STYLES: Record<OrderStatus, { label: string; classes: string }> = {
  pending: {
    label: "Pending",
    classes: "bg-yellow-900/40 text-yellow-400 border-yellow-700/40",
  },
  paid: {
    label: "Paid",
    classes: "bg-blue-900/40 text-blue-400 border-blue-700/40",
  },
  fulfilled: {
    label: "Fulfilled",
    classes: "bg-green-900/40 text-green-400 border-green-700/40",
  },
  failed: {
    label: "Failed",
    classes: "bg-red-900/40 text-red-400 border-red-700/40",
  },
  refunded: {
    label: "Refunded",
    classes: "bg-purple-900/40 text-purple-400 border-purple-700/40",
  },
};

function fmt(iso: string | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded border ${s.classes}`}
    >
      {s.label}
    </span>
  );
}

function OrderRow({ order }: { order: Order }) {
  const products = order.items
    .map((i) => `${i.title}${i.format ? ` (${i.format})` : ""}`)
    .join(", ");

  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
      <td className="px-4 py-3 font-mono text-xs text-brand-stone/70 whitespace-nowrap">
        {order.id.slice(0, 8).toUpperCase()}
      </td>
      <td className="px-4 py-3 text-xs text-brand-stone whitespace-nowrap">
        {fmt(order.createdAt)}
      </td>
      <td className="px-4 py-3 text-xs text-brand-cream max-w-[180px] truncate">
        {order.customerEmail || "—"}
      </td>
      <td className="px-4 py-3 text-xs text-brand-stone max-w-[220px]">
        <span className="line-clamp-2">{products}</span>
      </td>
      <td className="px-4 py-3 text-xs text-brand-cream font-semibold whitespace-nowrap">
        ${order.amountTotal.toFixed(2)}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <StatusBadge status={order.status} />
      </td>
      <td className="px-4 py-3 text-xs text-brand-stone/70 whitespace-nowrap">
        {fmt(order.paidAt)}
      </td>
      <td className="px-4 py-3 text-xs text-brand-stone/70 whitespace-nowrap">
        {fmt(order.fulfilledAt)}
      </td>
      <td className="px-4 py-3 text-xs whitespace-nowrap">
        <span
          className={
            order.fulfillmentEmailSent
              ? "text-green-400"
              : "text-brand-stone/40"
          }
        >
          {order.fulfillmentEmailSent ? "✓ Sent" : "Not sent"}
        </span>
      </td>
    </tr>
  );
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey || params.key !== adminKey) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-wine font-semibold mb-2">Access Denied</p>
          <p className="text-brand-stone text-sm">
            Append <code className="text-brand-gold">?key=YOUR_ADMIN_KEY</code> to the URL.
          </p>
        </div>
      </div>
    );
  }

  const orders = getAllOrders().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const counts = orders.reduce<Record<OrderStatus, number>>(
    (acc, o) => {
      acc[o.status] = (acc[o.status] ?? 0) + 1;
      return acc;
    },
    { pending: 0, paid: 0, fulfilled: 0, failed: 0, refunded: 0 }
  );

  const revenue = orders
    .filter((o) => o.status === "fulfilled" || o.status === "paid")
    .reduce((s, o) => s + o.amountTotal, 0);

  return (
    <div className="min-h-screen bg-[#111] px-4 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 border-b border-brand-gold/15 pb-6">
          <p className="text-xs uppercase tracking-[0.15em] text-brand-gold/60 mb-1">
            Admin
          </p>
          <h1 className="font-serif text-3xl text-brand-cream">
            Order Dashboard
          </h1>
          <p className="text-brand-stone text-sm mt-1">
            {orders.length} total orders
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {(
            [
              ["Total Revenue", `$${revenue.toFixed(2)}`, "text-brand-gold"],
              ["Fulfilled", counts.fulfilled, "text-green-400"],
              ["Pending", counts.pending, "text-yellow-400"],
              ["Paid", counts.paid, "text-blue-400"],
              ["Failed", counts.failed, "text-red-400"],
              ["Refunded", counts.refunded, "text-purple-400"],
            ] as [string, string | number, string][]
          ).map(([label, val, color]) => (
            <div
              key={label}
              className="bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-3"
            >
              <p className="text-[10px] uppercase tracking-widest text-brand-stone/60 mb-1">
                {label}
              </p>
              <p className={`font-serif text-xl font-semibold ${color}`}>
                {val}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        {orders.length === 0 ? (
          <div className="text-center py-20 text-brand-stone/40">
            No orders yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#1a1a1a]">
                  {[
                    "Order ID",
                    "Created",
                    "Email",
                    "Products",
                    "Amount",
                    "Status",
                    "Paid At",
                    "Fulfilled At",
                    "Email Sent",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-brand-stone/60 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-xs text-brand-stone/30 text-right">
          Refresh the page to see the latest orders.
        </p>

      </div>
    </div>
  );
}
