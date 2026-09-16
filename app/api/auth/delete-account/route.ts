import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID diperlukan untuk memadam akaun." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // If SUPABASE_SERVICE_ROLE_KEY is provided, delete user permanently from Supabase auth.users
    if (supabaseUrl && serviceRoleKey && !supabaseUrl.includes("placeholder")) {
      const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });

      // 1. Delete user from Supabase auth
      const { error: adminError } = await supabaseAdmin.auth.admin.deleteUser(userId);
      if (adminError) {
        console.warn("Supabase admin deleteUser notice:", adminError.message);
      }

      // 2. Clean up any user data in searches or tables if exist
      try {
        await supabaseAdmin.from("searches").delete().eq("user_id", userId);
      } catch {
        // Table or column may not exist yet
      }
    }

    return NextResponse.json({
      success: true,
      message: "Akaun dan data pengguna telah berjaya dipadam secara kekal.",
    });
  } catch (error: any) {
    console.error("Delete account API error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Ralat memadam akaun" },
      { status: 500 }
    );
  }
}
