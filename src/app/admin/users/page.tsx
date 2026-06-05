"use client";

import { useState, useEffect, useCallback } from "react";
import { IconMapPin, IconShoppingCart, IconEye } from "@tabler/icons-react";

interface Address {
  id: string;
  fullName: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  addresses: Address[];
  _count: { orders: number };
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<User | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    if (res.ok) setUsers(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl uppercase text-[#0A0A0A]">Users</h1>
        <p className="text-sm text-[#666] font-body mt-1">{users.length} registered users</p>
      </div>

      <div className="bg-white border border-[#E8E8E8] overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">{[1,2,3].map(i=><div key={i} className="h-10 bg-[#F4F4F4] animate-pulse rounded"/>)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body min-w-[600px]">
              <thead className="bg-[#0A0A0A] text-white">
                <tr>{["Name","Email","Phone","Addresses","Orders","Joined",""].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-[#F4F4F4]">
                {users.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-[#666]">No registered users yet</td></tr>
                ) : users.map(u => (
                  <tr key={u.id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#0A0A0A]">{u.name}</td>
                    <td className="px-4 py-3 text-[#666] text-xs">{u.email}</td>
                    <td className="px-4 py-3 text-[#666]">{u.phone || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-1 ${u.addresses.length > 0 ? "bg-green-100 text-green-700" : "bg-[#F4F4F4] text-[#666]"}`}>
                        {u.addresses.length}/2
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-[#FF6B00]">{u._count.orders}</td>
                    <td className="px-4 py-3 text-[#666] text-xs">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(u)} className="p-1.5 text-[#666] hover:text-[#FF6B00] transition-colors" title="View details">
                        <IconEye size={16} stroke={1.5}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User detail dialog */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-[#0A0A0A] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF6B00] flex items-center justify-center font-heading text-white text-lg">
                  {selected.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-heading text-lg text-white uppercase">{selected.name}</p>
                  <p className="text-white/50 text-xs font-body">{selected.email}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/50 hover:text-white text-xl leading-none">&times;</button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic info */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] mb-3 font-body">Contact Info</p>
                <div className="space-y-2 text-sm font-body">
                  <div className="flex gap-3"><span className="text-[#999] w-20">Email</span><span className="text-[#0A0A0A] font-semibold">{selected.email}</span></div>
                  <div className="flex gap-3"><span className="text-[#999] w-20">Phone</span><span className="text-[#0A0A0A]">{selected.phone ? `+91 ${selected.phone}` : "—"}</span></div>
                  <div className="flex gap-3"><span className="text-[#999] w-20">Orders</span><span className="text-[#FF6B00] font-bold">{selected._count.orders}</span></div>
                  <div className="flex gap-3"><span className="text-[#999] w-20">Joined</span><span className="text-[#0A0A0A]">{new Date(selected.createdAt).toLocaleDateString("en-IN")}</span></div>
                </div>
              </div>

              {/* Addresses */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] mb-3 font-body flex items-center gap-2">
                  <IconMapPin size={12}/> Saved Addresses ({selected.addresses.length}/2)
                </p>
                {selected.addresses.length === 0 ? (
                  <p className="text-sm text-[#999] font-body">No addresses saved</p>
                ) : (
                  <div className="space-y-3">
                    {selected.addresses.map((addr, i) => (
                      <div key={addr.id} className={`p-4 border-2 ${addr.isDefault ? "border-[#FF6B00]/40 bg-[#FFF8F4]" : "border-[#E8E8E8]"}`}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-body font-bold text-sm text-[#0A0A0A]">{addr.fullName}</p>
                          <div className="flex gap-2">
                            {addr.isDefault && <span className="text-[10px] text-[#FF6B00] font-bold uppercase tracking-widest bg-[#FF6B00]/10 px-2 py-0.5">Default</span>}
                            <span className="text-[10px] text-[#999] font-body">#{i+1}</span>
                          </div>
                        </div>
                        <p className="text-xs text-[#666] font-body">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                        <p className="text-xs text-[#666] font-body">{addr.city}, {addr.state} – {addr.pincode}</p>
                        <p className="text-xs text-[#666] font-body mt-1">&#128222; {addr.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick actions */}
              <div className="flex gap-3 pt-2 border-t border-[#E8E8E8]">
                <a href={`mailto:${selected.email}`} className="flex items-center gap-2 flex-1 justify-center border border-[#E8E8E8] py-3 text-xs font-bold uppercase font-body hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors">
                  <IconShoppingCart size={14}/> Email User
                </a>
                <button onClick={() => setSelected(null)} className="flex-1 bg-[#0A0A0A] text-white py-3 text-xs font-bold uppercase font-body hover:bg-[#FF6B00] transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
