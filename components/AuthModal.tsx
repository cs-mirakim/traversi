"use client";

import React, { useState } from "react";
import { X, LogIn, UserPlus, CheckCircle2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: "login" | "register";
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({
  isOpen,
  initialMode = "login",
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock auth flow (ready for Moi's Supabase Auth integration)
    setTimeout(() => {
      setIsLoading(false);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 1000);
    }, 800);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 1000);
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 text-stone-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-black text-stone-900">
              {mode === "login" ? "Berjaya Log Masuk!" : "Pendaftaran Berjaya!"}
            </h3>
            <p className="text-xs text-stone-600 font-medium">
              Sesi anda kini aktif. Menghubungkan ke simpanan carian...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
                {mode === "login" ? (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Akaun Traversi</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Daftar Akaun Baru</span>
                  </>
                )}
              </div>
              <h3 className="text-2xl font-black text-stone-950 tracking-tight">
                {mode === "login" ? "Log Masuk ke Traversi" : "Daftar Akaun Percuma"}
              </h3>
              <p className="text-xs text-stone-600 font-medium mt-1">
                {mode === "login" 
                  ? "Akses carian lepas dan simpan destinasi kegemaran anda."
                  : "Mula simpan sejarah bajet dan itinerari bersama rakan."}
              </p>
            </div>

            {/* Google OAuth Quick Button */}
            <div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 font-bold text-xs sm:text-sm text-stone-800 flex items-center justify-center gap-2.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Teruskan dengan Google</span>
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200" />
                </div>
                <span className="relative bg-white px-3 text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                  atau emel
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === "register" && (
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Nama Penuh
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Amir Hakim"
                    className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-stone-50/50"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Alamat Emel
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="anda@contoh.com"
                  className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-stone-50/50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Kata Laluan
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 text-xs font-medium rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-stone-50/50"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#022c22] hover:bg-[#064e3b] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer disabled:opacity-60"
              >
                {isLoading ? "Memproses..." : mode === "login" ? "Log Masuk" : "Daftar Sekarang"}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="text-center pt-1 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
              >
                {mode === "login" 
                  ? "Belum ada akaun? Daftar percuma di sini" 
                  : "Sudah ada akaun? Log masuk di sini"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
