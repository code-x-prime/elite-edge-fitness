"use client";

import { useState, useEffect, useCallback } from "react";
import { IconPlus, IconEdit, IconTrash, IconToggleRight, IconToggleLeft, IconStar } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

interface Plan {
  id: string;
  name: string;
  type: string;
  price: number;
  duration: string;
  features: string[];
  isActive: boolean;
  popular: boolean;
  _count: { orders: number };
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; plan: Partial<Plan> }>({ open: false, plan: {} });
  const [featInput, setFeatInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/plans");
    if (res.ok) setPlans(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => setModal({ open: true, plan: { name: "", type: "personal", price: 0, duration: "1 Month", features: [], isActive: true, popular: false } });
  const openEdit = (plan: Plan) => { setModal({ open: true, plan: { ...plan } }); setFeatInput(""); };
  const closeModal = () => { setModal({ open: false, plan: {} }); setFeatInput(""); };

  const save = async () => {
    setSaving(true);
    const { id, _count, ...data } = modal.plan as Plan & { _count?: unknown };
    void _count;
    try {
      const res = id
        ? await fetch(`/api/admin/plans/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        : await fetch("/api/admin/plans", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { toast.success(id ? "Plan updated" : "Plan created"); closeModal(); load(); }
      else toast.error("Failed to save");
    } catch { toast.error("Error"); }
    setSaving(false);
  };

  const toggleActive = async (plan: Plan) => {
    await fetch(`/api/admin/plans/${plan.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !plan.isActive }),
    });
    load();
  };

  const deletePlan = async (id: string) => {
    const res = await fetch(`/api/admin/plans/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Deleted"); setDeleteId(null); load(); }
    else toast.error("Failed to delete");
  };

  const addFeature = () => {
    if (!featInput.trim()) return;
    setModal(m => ({ ...m, plan: { ...m.plan, features: [...(m.plan.features ?? []), featInput.trim()] } }));
    setFeatInput("");
  };

  const removeFeature = (i: number) =>
    setModal(m => ({ ...m, plan: { ...m.plan, features: (m.plan.features ?? []).filter((_, idx) => idx !== i) } }));

  const inp = "w-full border border-[#E8E8E8] px-3 py-2.5 text-sm font-body focus:outline-none focus:border-[#FF6B00]";
  const lbl = "block text-xs font-bold uppercase tracking-widest text-[#666] mb-1.5 font-body";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-4xl uppercase text-[#0A0A0A]">Plans</h1>
          <p className="text-sm text-[#666] font-body mt-1">{plans.length} plans</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 hover:bg-[#E55A00] transition-colors font-body">
          <IconPlus size={16} stroke={2} /> Add Plan
        </button>
      </div>

      <div className="bg-white border border-[#E8E8E8] overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">{[1,2,3,4].map(i=><div key={i} className="h-10 bg-[#F4F4F4] animate-pulse rounded"/>)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead className="bg-[#0A0A0A] text-white">
                <tr>
                  {["Name","Type","Price","Duration","Orders","Popular","Status","Actions"].map(h=>(
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F4F4]">
                {plans.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-12 text-[#666]">No plans — click Add Plan</td></tr>
                ) : plans.map(plan => (
                  <tr key={plan.id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#0A0A0A]">{plan.name}</td>
                    <td className="px-4 py-3 text-[#666] capitalize">{plan.type}</td>
                    <td className="px-4 py-3 font-bold text-[#FF6B00]">&#8377;{plan.price.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3 text-[#666]">{plan.duration}</td>
                    <td className="px-4 py-3 font-bold">{plan._count?.orders ?? 0}</td>
                    <td className="px-4 py-3">
                      {plan.popular && <Badge variant="gold" className="flex items-center gap-1 w-fit"><IconStar size={10} className="fill-current" />Popular</Badge>}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={plan.isActive ? "success" : "destructive"}>{plan.isActive ? "Active" : "Inactive"}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(plan)} title="Edit" className="p-1.5 text-[#666] hover:text-[#FF6B00] transition-colors"><IconEdit size={16} stroke={1.5} /></button>
                        <button onClick={() => toggleActive(plan)} title="Toggle active" className="p-1.5">
                          {plan.isActive ? <IconToggleRight size={18} className="text-green-500"/> : <IconToggleLeft size={18} className="text-[#999]"/>}
                        </button>
                        <button onClick={() => setDeleteId(plan.id)} title="Delete" className="p-1.5 text-[#666] hover:text-red-500 transition-colors"><IconTrash size={16} stroke={1.5} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="bg-[#0A0A0A] px-6 py-4 flex items-center justify-between">
              <h2 className="font-heading text-xl text-white uppercase">{(modal.plan as Plan).id ? "Edit Plan" : "Create Plan"}</h2>
              <button onClick={closeModal} className="text-white/50 hover:text-white text-xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Name *</label>
                  <input value={modal.plan.name ?? ""} onChange={e => setModal(m=>({...m,plan:{...m.plan,name:e.target.value}}))} className={inp} placeholder="Personal Training" />
                </div>
                <div>
                  <label className={lbl}>Type</label>
                  <select value={modal.plan.type ?? "personal"} onChange={e => setModal(m=>({...m,plan:{...m.plan,type:e.target.value}}))} className={inp}>
                    {["personal","group","online","elite","longevity"].map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Price (&#8377;) *</label>
                  <input type="number" value={modal.plan.price ?? ""} onChange={e => setModal(m=>({...m,plan:{...m.plan,price:Number(e.target.value)}}))} className={inp} placeholder="5999" />
                </div>
                <div>
                  <label className={lbl}>Duration *</label>
                  <input value={modal.plan.duration ?? ""} onChange={e => setModal(m=>({...m,plan:{...m.plan,duration:e.target.value}}))} className={inp} placeholder="1 Month" />
                </div>
              </div>
              <div>
                <label className={lbl}>Features</label>
                <div className="flex gap-2 mb-2">
                  <input value={featInput} onChange={e=>setFeatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(e.preventDefault(),addFeature())} className={`${inp} flex-1`} placeholder="Type feature, press Enter" />
                  <button onClick={addFeature} className="bg-[#FF6B00] text-white px-4 text-xs font-bold uppercase font-body hover:bg-[#E55A00]">Add</button>
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {(modal.plan.features ?? []).map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-[#F4F4F4] px-3 py-2">
                      <span className="text-sm font-body">{f}</span>
                      <button onClick={()=>removeFeature(i)} className="text-[#999] hover:text-red-500"><IconTrash size={13}/></button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={modal.plan.isActive ?? true} onChange={e=>setModal(m=>({...m,plan:{...m.plan,isActive:e.target.checked}}))} className="accent-[#FF6B00]" />
                  <span className="text-sm font-body">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={modal.plan.popular ?? false} onChange={e=>setModal(m=>({...m,plan:{...m.plan,popular:e.target.checked}}))} className="accent-[#FF6B00]" />
                  <span className="text-sm font-body">Mark as Popular</span>
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={closeModal} className="flex-1 border border-[#E8E8E8] py-3 text-xs font-bold uppercase tracking-widest text-[#666] hover:border-[#0A0A0A] transition-colors font-body">Cancel</button>
                <button onClick={save} disabled={saving} className="flex-1 bg-[#FF6B00] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#E55A00] disabled:opacity-50 transition-colors font-body">
                  {saving ? "Saving..." : ((modal.plan as Plan).id ? "Update Plan" : "Create Plan")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={()=>setDeleteId(null)}>
          <div className="bg-white w-full max-w-sm shadow-2xl p-6" onClick={e=>e.stopPropagation()}>
            <h3 className="font-heading text-xl uppercase text-[#0A0A0A] mb-2">Delete Plan?</h3>
            <p className="text-sm text-[#666] font-body mb-6">This permanently deletes the plan. Existing orders are preserved.</p>
            <div className="flex gap-3">
              <button onClick={()=>setDeleteId(null)} className="flex-1 border border-[#E8E8E8] py-3 text-xs font-bold uppercase font-body hover:border-[#0A0A0A] transition-colors">Cancel</button>
              <button onClick={()=>deletePlan(deleteId)} className="flex-1 bg-red-600 text-white py-3 text-xs font-bold uppercase font-body hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
