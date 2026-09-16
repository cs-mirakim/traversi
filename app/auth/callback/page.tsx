"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { checkEmailRegisteredServer, registerEmail } from "@/lib/auth-registry";
import { Compass, Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState(
    "Mengesahkan akaun dan menyemak rekod pendaftaran..."
  );

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
        const urlMode = params?.get("mode");
        const storedMode = typeof window !== "undefined" ? localStorage.getItem("traversi_auth_mode") : null;
        const mode = urlMode || storedMode || "login";

        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session) {
          console.error("Auth callback error:", error);
          router.replace("/login?error=auth_failed");
          return;
        }

        const user = data.session.user;
        const email = (user.email || "").toLowerCase().trim();

        // Strictly check if email is registered on server or client registry
        const isRegistered = await checkEmailRegisteredServer(email);

        // SCENARIO 1: User arrived from Sign Up flow (/register)
        if (mode === "register") {
          setStatusMessage("Pendaftaran berjaya! Mengalihkan ke halaman log masuk...");
          registerEmail(email);

          try {
            await supabase.auth.updateUser({
              data: {
                is_registered: true,
                registered_at: new Date().toISOString(),
              },
            });
          } catch (updateErr) {
            console.warn("Supabase updateUser metadata notice:", updateErr);
          }

          // Sign out of callback session so user logs in explicitly from /login
          try {
            await supabase.auth.signOut();
          } catch {
            // ignore
          }

          if (typeof window !== "undefined") {
            localStorage.removeItem("traversi_user");
            localStorage.removeItem("traversi_auth_mode");
          }
          router.replace(`/login?status=registered_success&email=${encodeURIComponent(email)}`);
          return;
        }

        // SCENARIO 2: User arrived from Sign In flow (/login)
        // STRICT ENFORCEMENT: User must have registered first!
        if (!isRegistered) {
          setStatusMessage("Akaun belum didaftarkan. Menyekat akses...");
          console.warn("Blocking un-registered login attempt for:", email);

          // Force sign out immediately so they cannot enter
          await supabase.auth.signOut();
          if (typeof window !== "undefined") {
            localStorage.removeItem("traversi_user");
            localStorage.removeItem("traversi_auth_mode");
          }

          router.replace(`/login?error=not_registered&email=${encodeURIComponent(email)}`);
          return;
        }

        // SCENARIO 3: Registered user logging in successfully
        if (typeof window !== "undefined") {
          localStorage.removeItem("traversi_auth_mode");
        }
        router.replace("/profile");
      } catch (err) {
        console.error("Unexpected error in auth callback:", err);
        router.replace("/login?error=unknown");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#022c22] text-white flex flex-col items-center justify-center p-6 select-none">
      <div className="w-16 h-16 rounded-2xl bg-emerald-800 flex items-center justify-center text-white shadow-xl mb-6 animate-pulse">
        <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: "6s" }} />
      </div>

      <div className="text-center space-y-3 max-w-sm">
        <h2 className="text-xl font-black text-white tracking-tight">
          Mengesahkan Akses Traversi...
        </h2>
        <p className="text-xs text-emerald-200/80 font-medium leading-relaxed">
          {statusMessage}
        </p>
        <div className="pt-4 flex justify-center">
          <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
        </div>
      </div>
    </div>
  );
}
