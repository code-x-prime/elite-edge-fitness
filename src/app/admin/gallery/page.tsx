"use client";

import { useState, useEffect, useCallback } from "react";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { FileDropzone } from "@/components/ui/FileDropzone";
import toast from "react-hot-toast";

interface GalleryImage {
  id: string;
  url: string;
  r2Key: string;
  title?: string | null;
  category: string;
}

const CATEGORIES = ["Dynamic Posing", "Training", "Transformation", "Gallery"];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [editModal, setEditModal] = useState<{ open: boolean; img: Partial<GalleryImage> }>({ open: false, img: {} });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/gallery");
    if (res.ok) setImages(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleUploaded = useCallback(async (files: { name: string; url: string; r2Key: string }[]) => {
    let saved = 0;
    for (const f of files) {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: f.url, r2Key: f.r2Key, category: "Gallery", title: f.name.split(".")[0] }),
      });
      if (res.ok) saved++;
      else toast.error(`Failed to save ${f.name}`);
    }
    if (saved > 0) toast.success(`${saved} image${saved > 1 ? "s" : ""} saved to gallery`);
    load();
  }, [load]);

  const deleteImage = async (id: string) => {
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Deleted"); setDeleteId(null); load(); }
    else toast.error("Failed");
  };

  const updateImage = async () => {
    const { id, ...data } = editModal.img as GalleryImage;
    const res = await fetch(`/api/admin/gallery/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    if (res.ok) { toast.success("Updated"); setEditModal({ open: false, img: {} }); load(); }
    else toast.error("Failed");
  };

  const filtered = filter === "All" ? images : images.filter(i => i.category === filter);
  const allCategories = ["All", ...Array.from(new Set(images.map(i => i.category)))];

  const inp = "w-full border border-[#E8E8E8] px-3 py-2.5 text-sm font-body focus:outline-none focus:border-[#FF6B00]";
  const lbl = "block text-xs font-bold uppercase tracking-widest text-[#666] mb-1.5 font-body";

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl uppercase text-[#0A0A0A]">Gallery</h1>
        <p className="text-sm text-[#666] font-body mt-1">{images.length} images</p>
      </div>

      {/* R2 config warning */}
      <div className="mb-5 bg-amber-50 border border-amber-200 px-5 py-4 flex items-start gap-3">
        <span className="text-amber-500 text-lg flex-shrink-0">&#9888;</span>
        <div className="text-xs font-body text-amber-800 leading-relaxed">
          <p className="font-bold mb-1">Cloudflare R2 not configured</p>
          Image uploads require R2 environment variables: <code className="bg-amber-100 px-1">R2_ENDPOINT</code>, <code className="bg-amber-100 px-1">R2_ACCESS_KEY_ID</code>, <code className="bg-amber-100 px-1">R2_SECRET_ACCESS_KEY</code>, <code className="bg-amber-100 px-1">R2_BUCKET_NAME</code>, <code className="bg-amber-100 px-1">R2_PUBLIC_URL</code>. Add these to your <code className="bg-amber-100 px-1">.env</code> file. See <code>.env.example</code> for reference.
        </div>
      </div>

      {/* Drag-drop uploader */}
      <div className="mb-6">
        <FileDropzone
          accept="image/*,video/*"
          multiple
          folder="gallery"
          label="Drop images or videos here or click to upload"
          hint="JPG, PNG, WEBP, MP4, WEBM • max 50MB each • multiple files supported"
          maxMB={50}
          onUpload={handleUploaded}
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {allCategories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest font-body transition-colors ${filter === cat ? "bg-[#FF6B00] text-white" : "border border-[#E8E8E8] text-[#666] hover:border-[#FF6B00]"}`}>
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-[#F4F4F4] animate-pulse"/>)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-[#E8E8E8] p-12 text-center">
          <p className="font-heading text-xl text-[#CCC]">NO MEDIA</p>
          <p className="text-sm text-[#999] font-body mt-1">Use the dropzone above to upload</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map(img => {
            const isVideo = /\.(mp4|webm|ogg|mov|m4v)$/i.test(img.url);
            return (
              <div key={img.id} className="group relative aspect-square bg-[#F4F4F4] border border-[#E8E8E8] overflow-hidden hover:border-[#FF6B00] transition-colors">
                {isVideo ? (
                  <video src={img.url} className="w-full h-full object-cover" muted playsInline />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img.url} alt={img.title ?? ""} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/70 transition-all flex items-center justify-center gap-2 sm:gap-3 opacity-0 group-hover:opacity-100">
                  <button onClick={() => setEditModal({ open: true, img: { ...img } })} className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-[#FF6B00] hover:border-[#FF6B00] transition-colors">
                    <IconEdit size={14} stroke={1.5}/>
                  </button>
                  <button onClick={() => setDeleteId(img.id)} className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 transition-colors">
                    <IconTrash size={14} stroke={1.5}/>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-[#0A0A0A]/60">
                  <p className="text-white text-xs font-body truncate">{img.title || "Untitled"}</p>
                  <p className="text-[#FF6B00] text-[10px] font-bold uppercase tracking-wide">{img.category}</p>
                </div>
                {isVideo && (
                  <span className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                    Video
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {editModal.open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setEditModal({open:false,img:{}})}>
          <div className="bg-white w-full max-w-sm shadow-2xl p-6" onClick={e=>e.stopPropagation()}>
            <h3 className="font-heading text-xl uppercase text-[#0A0A0A] mb-4">Edit Image</h3>
            <div className="space-y-4">
              <div>
                <label className={lbl}>Title</label>
                <input value={editModal.img.title??""} onChange={e=>setEditModal(m=>({...m,img:{...m.img,title:e.target.value}}))} className={inp}/>
              </div>
              <div>
                <label className={lbl}>Category</label>
                <select value={editModal.img.category??""} onChange={e=>setEditModal(m=>({...m,img:{...m.img,category:e.target.value}}))} className={inp}>
                  {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={()=>setEditModal({open:false,img:{}})} className="flex-1 border border-[#E8E8E8] py-3 text-xs font-bold uppercase font-body">Cancel</button>
              <button onClick={updateImage} className="flex-1 bg-[#FF6B00] text-white py-3 text-xs font-bold uppercase font-body hover:bg-[#E55A00]">Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={()=>setDeleteId(null)}>
          <div className="bg-white w-full max-w-sm shadow-2xl p-6" onClick={e=>e.stopPropagation()}>
            <h3 className="font-heading text-xl uppercase text-[#0A0A0A] mb-2">Delete Image?</h3>
            <p className="text-sm text-[#666] font-body mb-6">Removes from R2 and database permanently.</p>
            <div className="flex gap-3">
              <button onClick={()=>setDeleteId(null)} className="flex-1 border border-[#E8E8E8] py-3 text-xs font-bold uppercase font-body">Cancel</button>
              <button onClick={()=>deleteImage(deleteId)} className="flex-1 bg-red-600 text-white py-3 text-xs font-bold uppercase font-body hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
