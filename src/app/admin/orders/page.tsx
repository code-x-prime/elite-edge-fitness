"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { IconChevronDown } from "@tabler/icons-react";
import toast from "react-hot-toast";

interface Order {
  id: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  amount: number;
  status: string;
  createdAt: string;
  plan?: { name: string } | null;
  product?: { name: string } | null;
  address?: { fullName: string; city: string; state: string; pincode: string } | null;
}

const STATUS_OPTIONS = ["pending", "paid", "failed", "refunded", "demo"];

const statusVariant = (s: string) =>
  s === "paid" ? "success" : s === "pending" ? "warning" : s === "demo" ? "gold" : "destructive";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/orders" + (filter !== "all" ? `?status=${filter}` : ""));
    if (res.ok) setOrders(await res.json());
    setLoading(false);
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }),
    });
    if (res.ok) { toast.success("Status updated"); load(); }
    else toast.error("Failed to update");
    setUpdating(null);
  };

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-4xl uppercase text-[#0A0A0A]">Orders</h1>
        <p className="text-sm text-[#666] font-body mt-1">{orders.length} total orders</p>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap border-b border-[#E8E8E8] pb-4">
        {["all", "pending", "paid", "failed", "refunded", "demo"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 text-xs font-bold  tracking-widest font-body capitalize transition-colors ${filter === s ? "bg-[#0A0A0A] text-white" : "border border-[#E8E8E8] text-[#666] hover:border-[#0A0A0A]"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#E8E8E8] overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-10 bg-[#F4F4F4] animate-pulse rounded" />)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead className="bg-[#0A0A0A] text-white">
                <tr>{["Buyer", "Contact", "Item", "Amount", "Address", "Status", "Date"].map(h => <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-[#F4F4F4]">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-[#666]">No orders</td></tr>
                ) : filtered.map(order => (
                  <tr key={order.id} className="hover:bg-[#FAFAFA] transition-colors align-top">
                    <td className="px-4 py-3 font-semibold text-[#0A0A0A]">{order.buyerName}</td>
                    <td className="px-4 py-3 text-[#666]">
                      <div className="text-xs">{order.buyerEmail}</div>
                      <div className="text-xs">+91 {order.buyerPhone}</div>
                    </td>
                    <td className="px-4 py-3 text-[#0A0A0A]">{order.plan?.name || order.product?.name || "—"}</td>
                    <td className="px-4 py-3 font-bold text-[#FF6B00]">&#8377;{order.amount.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3 text-[#666] text-xs">
                      {order.address ? <>{order.address.fullName}<br />{order.address.city}, {order.address.state}</> : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <select
                          value={order.status}
                          disabled={updating === order.id}
                          onChange={e => updateStatus(order.id, e.target.value)}
                          className="appearance-none pr-7 pl-2 py-1.5 text-xs font-bold uppercase tracking-wide border border-[#E8E8E8] bg-white focus:outline-none focus:border-[#FF6B00] cursor-pointer font-body"
                        >
                          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <IconChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#999]" />
                      </div>
                      <Badge variant={statusVariant(order.status)} className="mt-1">{order.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-[#666] text-xs">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
