"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function StartProjectModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [contactMode, setContactMode] = useState("whatsapp");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contactMode, email, message }),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus({ ok: true, msg: json?.message || "Message sent" });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus({ ok: false, msg: json?.error || "Failed to send" });
      }
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || String(err) });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-lg shadow-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold">Start Your Project Today</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-brand-orange focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mode of contact</label>
            <div className="mt-1 flex gap-3">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="contactMode" value="whatsapp" checked={contactMode === 'whatsapp'} onChange={() => setContactMode('whatsapp')} />
                <span className="text-sm">WhatsApp</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="contactMode" value="email" checked={contactMode === 'email'} onChange={() => setContactMode('email')} />
                <span className="text-sm">Email</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="contactMode" value="call" checked={contactMode === 'call'} onChange={() => setContactMode('call')} />
                <span className="text-sm">Call</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={contactMode === 'email'}
              placeholder={contactMode === 'email' ? 'Your email' : 'Optional'}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-brand-orange focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-brand-orange focus:border-brand-orange"
              required
            />
          </div>

          {status ? (
            <div className={`text-sm ${status.ok ? 'text-green-600' : 'text-red-600'}`}>{status.msg}</div>
          ) : null}

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">Cancel</button>
            <button type="submit" disabled={sending} className="px-4 py-2 rounded-md bg-brand-orange text-white disabled:opacity-50">
              {sending ? 'Sending…' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
