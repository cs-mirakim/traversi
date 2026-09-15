"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Star, LogIn, UserPlus, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthPromptModal({ isOpen, onClose }: AuthPromptModalProps) {
  const { locale } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-prompt-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 text-stone-900 text-center space-y-5 animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label={locale === "bm" ? "Tutup" : "Close"}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Badge */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center shadow-xs">
          <Star className="w-7 h-7 fill-amber-400 text-amber-500" />
        </div>

        {/* Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span>{locale === "bm" ? "Ciri Ahli Berdaftar" : "Member Feature"}</span>
          </div>
          <h3 id="auth-prompt-title" className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight">
            {locale === "bm" ? "Log Masuk Diperlukan" : "Sign In Required"}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium max-w-sm mx-auto">
            {locale === "bm"
              ? "Untuk pin dan simpan destinasi kegemaran ke profil peribadi anda, sila daftar akaun atau log masuk terlebih dahulu."
              : "To pin and save your favorite destinations to your personal profile, please sign up or sign in first."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/register"
              className="py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>{locale === "bm" ? "Daftar Akaun" : "Sign Up"}</span>
            </Link>

            <Link
              href="/login"
              className="py-3 px-4 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <LogIn className="w-4 h-4 text-stone-600" />
              <span>{locale === "bm" ? "Log Masuk" : "Sign In"}</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {locale === "bm" ? "Nanti Sahaja / Batal" : "Maybe Later / Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
