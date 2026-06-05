"use client";

import { useState, useEffect, useCallback } from "react";
import { IconTrash, IconMail, IconPhone, IconCheck, IconClock, IconX } from "@tabler/icons-react";
import toast from "react-hot-toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  createdAt: string;
  status?: string;
}

const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-700", Icon: IconClock },
  { value: "replied", label: "Replied", color: "bg-green-100 text-green-700", Icon: IconCheck },
  { value: "closed", label: "Closed", color: "bg-gray-100 text-gray-600", Icon: IconX },
];

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/contacts");
    if (res.ok) {
      const data = await res.json();
      setContacts(data);
      // init statuses
      const init: Record<string, string> = {};
      data.forEach((c: Contact) => { init[c.id] = c.status || "new"; });
      setStatuses(init);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const deleteContact = async (id: string) => {
    const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Deleted"); setDeleteId(null); load(); }
    else toast.error("Failed to delete");
  };

  const setStatus = (id: string, status: string) => {
    setStatuses(s => ({ ...s, [id]: status }));
    toast.success(`Marked as ${status}`);
  };

  const currentStatus = (id: string) => statuses[id] || "new";
  const statusInfo = (s: string) => STATUS_OPTIONS.find(o => o.value === s) || STATUS_OPTIONS[0];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl uppercase text-[#0A0A0A]">Contacts</h1>
          <p className="text-sm text-[#666] font-body mt-1">{contacts.length} submissions</p>
        </div>
        {/* Status filter summary */}
        <div className="hidden sm:flex gap-2">
          {STATUS_OPTIONS.map(s => (
            <span key={s.value} className={`text-xs font-bold uppercase px-3 py-1.5 font-body ${s.color}`}>
              {s.label}: {Object.values(statuses).filter(v => v === s.value).length}
            </span>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">{[1,2,3].map(i=><div key={i} className="h-28 bg-[#F4F4F4] animate-pulse"/>)}</div>
      ) : contacts.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-[#E8E8E8] p-12 text-center text-[#666] font-body">No submissions yet</div>
      ) : (
        <div className="space-y-3">
          {contacts.map(c => {
            const s = statusInfo(currentStatus(c.id));
            return (
              <div key={c.id} className={`bg-white border p-5 transition-colors group ${currentStatus(c.id) === "closed" ? "border-[#E8E8E8] opacity-60" : "border-[#E8E8E8] hover:border-[#FF6B00]/40"}`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-body font-bold text-[#0A0A0A]">{c.name}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 font-body ${s.color}`}>{s.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-[#666] font-body">
                      <a href={`mailto:${c.email}`} className="flex items-center gap-1 hover:text-[#FF6B00] transition-colors">
                        <IconMail size={12} stroke={1.5}/>{c.email}
                      </a>
                      {c.phone && (
                        <a href={`tel:${c.phone}`} className="flex items-center gap-1 hover:text-[#FF6B00] transition-colors">
                          <IconPhone size={12} stroke={1.5}/>{c.phone}
                        </a>
                      )}
                      <span className="text-[#999]">{new Date(c.createdAt).toLocaleDateString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Status buttons */}
                    {STATUS_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setStatus(c.id, opt.value)}
                        title={`Mark as ${opt.label}`}
                        className={`p-1.5 transition-all ${currentStatus(c.id) === opt.value ? opt.color + " opacity-100" : "text-[#CCC] hover:text-[#666]"}`}
                      >
                        <opt.Icon size={15} stroke={2}/>
                      </button>
                    ))}

                    {/* Reply */}
                    <a
                      href={`mailto:${c.email}?subject=Re: Your enquiry — Elite Edge Fitness`}
                      className="hidden sm:flex items-center gap-1 bg-[#FF6B00] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 hover:bg-[#E55A00] transition-colors font-body"
                    >
                      <IconMail size={11}/> Reply
                    </a>

                    <button onClick={() => setDeleteId(c.id)} className="p-1.5 text-[#CCC] hover:text-red-500 transition-colors">
                      <IconTrash size={15} stroke={1.5}/>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-[#444] font-body leading-relaxed bg-[#F4F4F4] px-4 py-3 border-l-2 border-[#FF6B00]">{c.message}</p>

                {/* Mobile reply */}
                <div className="sm:hidden mt-3">
                  <a href={`mailto:${c.email}?subject=Re: Your enquiry — Elite Edge Fitness`}
                    className="inline-flex items-center gap-2 bg-[#FF6B00] text-white text-xs font-bold uppercase px-4 py-2 hover:bg-[#E55A00] transition-colors font-body">
                    <IconMail size={13}/> Reply via Email
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDeleteId(null)}>
          <div className="bg-white w-full max-w-sm shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-heading text-xl uppercase text-[#0A0A0A] mb-2">Delete Submission?</h3>
            <p className="text-sm text-[#666] font-body mb-6">This permanently removes this contact submission.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-[#E8E8E8] py-3 text-xs font-bold uppercase font-body">Cancel</button>
              <button onClick={() => deleteContact(deleteId)} className="flex-1 bg-red-600 text-white py-3 text-xs font-bold uppercase font-body hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
