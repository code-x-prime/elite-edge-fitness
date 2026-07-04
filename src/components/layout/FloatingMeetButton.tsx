"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

export default function FloatingMeetButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/meet-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setSubmitted(true);
      toast.success("Meeting request sent! We'll confirm soon. 🎥");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
    }, 300);
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() => setIsOpen(true)}
        id="floating-meet-btn"
        aria-label="Schedule a Google Meet"
        className="floating-meet-btn"
        title="Schedule a Google Meet with Ginieel"
      >
        <span className="floating-meet-btn__icon">
          {/* Google Meet icon SVG */}
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <rect width="48" height="48" rx="10" fill="#00897B" />
            <path d="M28 20v8l8-4-8-4z" fill="white" />
            <rect x="12" y="16" width="16" height="16" rx="2" fill="white" />
          </svg>
        </span>
        <span className="floating-meet-btn__text">Book a Meet</span>
      </button>

      {/* ── Modal Overlay ── */}
      {isOpen && (
        <div className="meet-modal-overlay" onClick={handleClose}>
          <div
            className="meet-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="meet-modal-title"
          >
            {/* Header */}
            <div className="meet-modal__header">
              <div className="meet-modal__header-left">
                <div className="meet-modal__icon">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                    <rect width="48" height="48" rx="10" fill="#00897B" />
                    <path d="M28 20v8l8-4-8-4z" fill="white" />
                    <rect x="12" y="16" width="16" height="16" rx="2" fill="white" />
                  </svg>
                </div>
                <div>
                  <h2 id="meet-modal-title" className="meet-modal__title">Schedule a Google Meet</h2>
                  <p className="meet-modal__subtitle">Book a free 1-on-1 session with Ginieel</p>
                </div>
              </div>
              <button className="meet-modal__close" onClick={handleClose} aria-label="Close modal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="meet-modal__body">
              {submitted ? (
                <div className="meet-success">
                  <div className="meet-success__icon">🎉</div>
                  <h3>Request Sent Successfully!</h3>
                  <p>Ginieel will confirm your meeting and send a Google Meet link to your email.</p>
                  <div className="meet-success__time">
                    <span>📅 {form.preferredDate}</span>
                    <span>🕐 {form.preferredTime}</span>
                  </div>
                  <button className="meet-btn meet-btn--gold" onClick={handleClose}>
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="meet-form">
                  <div className="meet-form__row">
                    <div className="meet-form__group">
                      <label className="meet-form__label" htmlFor="meet-name">Your Name *</label>
                      <input
                        id="meet-name"
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={form.name}
                        onChange={handleChange}
                        className="meet-form__input"
                      />
                    </div>
                    <div className="meet-form__group">
                      <label className="meet-form__label" htmlFor="meet-phone">Phone Number *</label>
                      <input
                        id="meet-phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        className="meet-form__input"
                      />
                    </div>
                  </div>

                  <div className="meet-form__group">
                    <label className="meet-form__label" htmlFor="meet-email">Email Address *</label>
                    <input
                      id="meet-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="meet-form__input"
                    />
                  </div>

                  <div className="meet-form__row">
                    <div className="meet-form__group">
                      <label className="meet-form__label" htmlFor="meet-date">Preferred Date *</label>
                      <input
                        id="meet-date"
                        name="preferredDate"
                        type="date"
                        required
                        min={minDate}
                        value={form.preferredDate}
                        onChange={handleChange}
                        className="meet-form__input"
                      />
                    </div>
                    <div className="meet-form__group">
                      <label className="meet-form__label" htmlFor="meet-time">Preferred Time *</label>
                      <select
                        id="meet-time"
                        name="preferredTime"
                        required
                        value={form.preferredTime}
                        onChange={handleChange}
                        className="meet-form__input"
                      >
                        <option value="">Select a time</option>
                        <option>6:00 AM</option>
                        <option>7:00 AM</option>
                        <option>8:00 AM</option>
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>1:00 PM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                        <option>4:00 PM</option>
                        <option>5:00 PM</option>
                        <option>6:00 PM</option>
                        <option>7:00 PM</option>
                        <option>8:00 PM</option>
                        <option>9:00 PM</option>
                        <option>10:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="meet-form__group">
                    <label className="meet-form__label" htmlFor="meet-message">What would you like to discuss? (Optional)</label>
                    <textarea
                      id="meet-message"
                      name="message"
                      rows={3}
                      placeholder="e.g. Weight loss plan, diet consultation, workout routine..."
                      value={form.message}
                      onChange={handleChange}
                      className="meet-form__input meet-form__textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="meet-btn meet-btn--submit"
                    id="meet-submit-btn"
                  >
                    {loading ? (
                      <>
                        <span className="meet-spinner" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                          <rect width="48" height="48" rx="10" fill="white" fillOpacity="0.3" />
                          <path d="M28 20v8l8-4-8-4z" fill="white" />
                          <rect x="12" y="16" width="16" height="16" rx="2" fill="white" />
                        </svg>
                        Request Google Meet
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Styles ── */}
      <style jsx global>{`
        /* Floating Button */
        .floating-meet-btn {
          position: fixed;
          right: 24px;
          bottom: 32px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #00897B, #00BFA5);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 14px 22px 14px 16px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(0, 137, 123, 0.45), 0 2px 8px rgba(0,0,0,0.18);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: var(--font-dm-sans, sans-serif);
          white-space: nowrap;
        }
        .floating-meet-btn:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 16px 48px rgba(0, 137, 123, 0.55), 0 4px 16px rgba(0,0,0,0.2);
        }
        .floating-meet-btn:active {
          transform: translateY(-1px) scale(0.98);
        }
        .floating-meet-btn__icon {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .floating-meet-btn__text {
          font-family: var(--font-dm-sans, sans-serif);
        }
        @media (max-width: 480px) {
          .floating-meet-btn__text {
            display: none;
          }
          .floating-meet-btn {
            padding: 14px;
            border-radius: 50%;
            right: 16px;
            bottom: 24px;
          }
        }

        /* Modal Overlay */
        .meet-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Modal Box */
        .meet-modal {
          background: #fff;
          border-radius: 20px;
          width: 100%;
          max-width: 540px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 32px 80px rgba(0,0,0,0.4);
          animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .meet-modal::-webkit-scrollbar { width: 4px; }
        .meet-modal::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }

        /* Modal Header */
        .meet-modal__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px 0;
        }
        .meet-modal__header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .meet-modal__icon {
          flex-shrink: 0;
        }
        .meet-modal__title {
          font-size: 18px;
          font-weight: 800;
          color: #0A0A0A;
          margin: 0;
          letter-spacing: -0.3px;
          font-family: var(--font-dm-sans, sans-serif);
        }
        .meet-modal__subtitle {
          font-size: 12px;
          color: #888;
          margin: 3px 0 0;
          font-family: var(--font-dm-sans, sans-serif);
        }
        .meet-modal__close {
          background: #f5f5f5;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #555;
          transition: background 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .meet-modal__close:hover {
          background: #0A0A0A;
          color: #fff;
        }

        /* Modal Body */
        .meet-modal__body {
          padding: 24px 28px 28px;
        }

        /* Form */
        .meet-form__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 480px) {
          .meet-form__row { grid-template-columns: 1fr; }
        }
        .meet-form__group {
          margin-bottom: 16px;
        }
        .meet-form__label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #555;
          margin-bottom: 6px;
          font-family: var(--font-dm-sans, sans-serif);
        }
        .meet-form__input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid #e8e8e8;
          border-radius: 10px;
          font-size: 14px;
          color: #0A0A0A;
          background: #fafafa;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: var(--font-dm-sans, sans-serif);
          box-sizing: border-box;
        }
        .meet-form__input:focus {
          border-color: #00897B;
          box-shadow: 0 0 0 3px rgba(0, 137, 123, 0.12);
          background: #fff;
        }
        .meet-form__textarea {
          resize: vertical;
          min-height: 80px;
        }

        /* Submit Button */
        .meet-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px 24px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: all 0.25s ease;
          font-family: var(--font-dm-sans, sans-serif);
        }
        .meet-btn--submit {
          background: linear-gradient(135deg, #00897B, #00BFA5);
          color: #fff;
          margin-top: 4px;
          box-shadow: 0 4px 20px rgba(0, 137, 123, 0.35);
        }
        .meet-btn--submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #00796B, #00897B);
          box-shadow: 0 8px 28px rgba(0, 137, 123, 0.5);
          transform: translateY(-2px);
        }
        .meet-btn--submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .meet-btn--gold {
          background: linear-gradient(135deg, #F5A623, #FFD700);
          color: #0A0A0A;
          margin-top: 16px;
        }
        .meet-btn--gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(245, 166, 35, 0.4);
        }

        /* Spinner */
        .meet-spinner {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Success State */
        .meet-success {
          text-align: center;
          padding: 16px 0;
        }
        .meet-success__icon {
          font-size: 56px;
          margin-bottom: 16px;
          animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes pop {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .meet-success h3 {
          font-size: 20px;
          font-weight: 800;
          color: #0A0A0A;
          margin: 0 0 10px;
          font-family: var(--font-dm-sans, sans-serif);
        }
        .meet-success p {
          color: #555;
          font-size: 14px;
          margin: 0 0 20px;
          font-family: var(--font-dm-sans, sans-serif);
          line-height: 1.6;
        }
        .meet-success__time {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: linear-gradient(135deg, #f0fffe, #e0f7f4);
          border: 1.5px solid #b2dfdb;
          border-radius: 12px;
          padding: 14px 20px;
          margin-bottom: 8px;
        }
        .meet-success__time span {
          font-size: 14px;
          font-weight: 700;
          color: #00695C;
          font-family: var(--font-dm-sans, sans-serif);
        }
      `}</style>
    </>
  );
}
