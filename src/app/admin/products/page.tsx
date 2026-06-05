"use client";

import { useState, useEffect, useCallback } from "react";
import { IconPlus, IconEdit, IconTrash, IconFile } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { FileDropzone } from "@/components/ui/FileDropzone";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  pdfUrl: string;
  pdfR2Key?: string | null;
  isActive: boolean;
  _count: { orders: number };
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; product: Partial<Product> }>({ open: false, product: {} });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    if (res.ok) setProducts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => setModal({ open: true, product: { name: "", description: "", price: 0, pdfUrl: "", isActive: true } });
  const openEdit = (p: Product) => setModal({ open: true, product: { ...p } });
  const closeModal = () => setModal({ open: false, product: {} });

  const save = async () => {
    if (!modal.product.name || !modal.product.price) { toast.error("Name and price required"); return; }
    setSaving(true);
    const { id, _count, ...data } = modal.product as Product & { _count?: unknown };
    void _count;
    try {
      const res = id
        ? await fetch(`/api/admin/products/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        : await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { toast.success(id ? "Updated" : "Created"); closeModal(); load(); }
      else toast.error("Failed to save");
    } catch { toast.error("Error"); }
    setSaving(false);
  };

  const deleteProduct = async (id: string) => {
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Deleted"); setDeleteId(null); load(); }
    else toast.error("Failed");
  };

  const inp = "w-full border border-[#E8E8E8] px-3 py-2.5 text-sm font-body focus:outline-none focus:border-[#FF6B00] transition-colors";
  const lbl = "block text-xs font-bold uppercase tracking-widest text-[#666] mb-1.5 font-body";

  return (
    <div>
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl uppercase text-[#0A0A0A]">Products</h1>
          <p className="text-sm text-[#666] font-body mt-1">{products.length} products / eBooks</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 sm:px-5 sm:py-3 hover:bg-[#E55A00] transition-colors font-body">
          <IconPlus size={16} stroke={2} />
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      <div className="bg-white border border-[#E8E8E8] overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">{[1,2].map(i=><div key={i} className="h-10 bg-[#F4F4F4] animate-pulse rounded"/>)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body min-w-[500px]">
              <thead className="bg-[#0A0A0A] text-white">
                <tr>{["Name","Price","PDF","Orders","Status","Actions"].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-[#F4F4F4]">
                {products.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-12 text-[#666]">No products — click Add Product</td></tr>
                ) : products.map(p => (
                  <tr key={p.id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#0A0A0A] max-w-[180px] truncate">{p.name}</td>
                    <td className="px-4 py-3 font-bold text-[#FF6B00]">&#8377;{p.price}</td>
                    <td className="px-4 py-3">
                      {p.pdfUrl
                        ? <a href={p.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#FF6B00] hover:underline text-xs font-body"><IconFile size={13}/> PDF</a>
                        : <span className="text-[#999] text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3 font-bold">{p._count?.orders ?? 0}</td>
                    <td className="px-4 py-3"><Badge variant={p.isActive?"success":"destructive"}>{p.isActive?"Active":"Off"}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={()=>openEdit(p)} className="p-1.5 text-[#666] hover:text-[#FF6B00] transition-colors"><IconEdit size={15} stroke={1.5}/></button>
                        <button onClick={()=>setDeleteId(p.id)} className="p-1.5 text-[#666] hover:text-red-500 transition-colors"><IconTrash size={15} stroke={1.5}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
            <div className="bg-[#0A0A0A] px-6 py-4 flex items-center justify-between">
              <h2 className="font-heading text-xl text-white uppercase">{(modal.product as Product).id ? "Edit Product" : "Add Product"}</h2>
              <button onClick={closeModal} className="text-white/50 hover:text-white text-xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className={lbl}>Name *</label>
                <input value={modal.product.name??""} onChange={e=>setModal(m=>({...m,product:{...m.product,name:e.target.value}}))} className={inp} placeholder="The Ultimate Fat Loss Guide" />
              </div>
              <div>
                <label className={lbl}>Description</label>
                <textarea rows={3} value={modal.product.description??""} onChange={e=>setModal(m=>({...m,product:{...m.product,description:e.target.value}}))} className={inp} placeholder="Describe this product..." />
              </div>
              <div>
                <label className={lbl}>Price (&#8377;) *</label>
                <input type="number" value={modal.product.price??""} onChange={e=>setModal(m=>({...m,product:{...m.product,price:Number(e.target.value)}}))} className={inp} placeholder="499" />
              </div>

              {/* PDF Dropzone */}
              <div>
                <label className={lbl}>PDF File (Cloudflare R2)</label>
                <FileDropzone
                  accept=".pdf,application/pdf"
                  multiple={false}
                  folder="products/pdf"
                  label="Drop PDF here or click to upload"
                  hint="PDF only • max 50MB • uploads to R2"
                  maxMB={50}
                  onUpload={([f]) => {
                    setModal(m => ({ ...m, product: { ...m.product, pdfUrl: f.url, pdfR2Key: f.r2Key } }));
                    toast.success("PDF uploaded to R2");
                  }}
                />
                {modal.product.pdfUrl && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-green-600 font-body bg-green-50 px-3 py-2 border border-green-200">
                    <IconFile size={13}/> {modal.product.pdfUrl.split("/").pop() || "PDF ready"}
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={modal.product.isActive??true} onChange={e=>setModal(m=>({...m,product:{...m.product,isActive:e.target.checked}}))} className="accent-[#FF6B00] w-4 h-4" />
                <span className="text-sm font-body text-[#444]">Active (visible to customers)</span>
              </label>

              <div className="flex gap-3">
                <button onClick={closeModal} className="flex-1 border border-[#E8E8E8] py-3 text-xs font-bold uppercase font-body hover:border-[#0A0A0A] transition-colors">Cancel</button>
                <button onClick={save} disabled={saving} className="flex-1 bg-[#FF6B00] text-white py-3 text-xs font-bold uppercase font-body hover:bg-[#E55A00] disabled:opacity-50 transition-colors">
                  {saving ? "Saving..." : ((modal.product as Product).id ? "Update" : "Create")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={()=>setDeleteId(null)}>
          <div className="bg-white w-full max-w-sm shadow-2xl p-6" onClick={e=>e.stopPropagation()}>
            <h3 className="font-heading text-xl uppercase text-[#0A0A0A] mb-2">Delete Product?</h3>
            <p className="text-sm text-[#666] font-body mb-6">Deletes product and R2 files permanently.</p>
            <div className="flex gap-3">
              <button onClick={()=>setDeleteId(null)} className="flex-1 border border-[#E8E8E8] py-3 text-xs font-bold uppercase font-body">Cancel</button>
              <button onClick={()=>deleteProduct(deleteId)} className="flex-1 bg-red-600 text-white py-3 text-xs font-bold uppercase font-body hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
