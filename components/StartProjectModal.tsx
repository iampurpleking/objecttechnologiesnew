"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function StartProjectModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [contactMode, setContactMode] = useState<"whatsapp" | "email" | "call">(
    "whatsapp",
  );
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(
    null,
  );

  const WHATSAPP_LINK = "https://wa.me/message/7AURUA4G6E65N1";

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    // If WhatsApp mode, don't submit the form to backend. User will click the WhatsApp button.
    if (contactMode === "whatsapp") {
      window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");
      return;
    }

    // Basic validation
    if (!name.trim()) {
      setStatus({ ok: false, msg: "Please enter your full name." });
      return;
    }

    if (contactMode === "email") {
      if (!email.trim()) {
        setStatus({ ok: false, msg: "Please provide an email address." });
        return;
      }
      if (!message.trim()) {
        setStatus({ ok: false, msg: "Please provide a message." });
        return;
      }
    }

    if (contactMode === "call") {
      if (!phone.trim()) {
        setStatus({ ok: false, msg: "Please provide a phone number." });
        return;
      }
      // For call requests, set the message to a friendly note so the backend receives the phone number
      setMessage(`Phone: ${phone}\nOur agents will call you in a few minutes.`);
    }

    setSending(true);

    try {
      // Build payload. Include phone if present so backend can include it in logs/email.
      const payload: any = {
        name: name.trim(),
        contactMode,
        email: contactMode === "email" ? email.trim() : "",
        message:
          contactMode === "call"
            ? `Phone: ${phone}\nOur agents will call you in a few minutes.`
            : message.trim(),
      };

      // Also include phone explicitly so backend can use it if desired
      if (phone.trim()) payload.phone = phone.trim();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({
          ok: true,
          msg: json?.message || "Message sent. We'll be in touch soon.",
        });
        // Reset fields
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus({
          ok: false,
          msg: json?.error || "Failed to send. Please try again later.",
        });
      }
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || "Server error" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-xl mx-4 rounded-lg shadow-xl p-6 bg-brand-white text-brand-black">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-brand-orange">
            Start Your Project
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-black">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-black">
              Mode of contact
            </label>
            <div className="mt-2 flex gap-3">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="contactMode"
                  value="whatsapp"
                  checked={contactMode === "whatsapp"}
                  onChange={() => setContactMode("whatsapp")}
                  className="accent-brand-orange"
                />
                <span className="text-sm">WhatsApp</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="contactMode"
                  value="email"
                  checked={contactMode === "email"}
                  onChange={() => setContactMode("email")}
                  className="accent-brand-orange"
                />
                <span className="text-sm">Email</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="contactMode"
                  value="call"
                  checked={contactMode === "call"}
                  onChange={() => setContactMode("call")}
                  className="accent-brand-orange"
                />
                <span className="text-sm">Call</span>
              </label>
            </div>
          </div>

          {contactMode === "whatsapp" && (
            <div className="space-y-2">
              <p className="text-sm text-brand-gray-600">
                Start a WhatsApp conversation with our team instantly.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer")
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brand-orange text-white hover:bg-brand-orange/90"
                >
                  Message on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md border border-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {contactMode === "email" && (
            <>
              <div>
                <label className="block text-sm font-medium text-brand-black">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-black">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                  placeholder="Tell us about your project, timeline and budget..."
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="px-4 py-2 rounded-md bg-brand-orange text-white disabled:opacity-50"
                >
                  {sending ? "Sending…" : "Send Email"}
                </button>
              </div>
            </>
          )}

          {contactMode === "call" && (
            <>
              <div>
                <label className="block text-sm font-medium text-brand-black">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+2348012345678"
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-black">
                  Note
                </label>
                <textarea
                  value={`Our agents will call you in a few minutes.`}
                  readOnly
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-brand-gray-700"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="px-4 py-2 rounded-md bg-brand-orange text-white disabled:opacity-50"
                >
                  {sending ? "Sending…" : "Request Call"}
                </button>
              </div>
            </>
          )}

          {status && (
            <div
              className={`text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}
            >
              {status.msg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
