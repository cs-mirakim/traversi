"use client";

import React, { useState } from "react";

interface UserAvatarProps {
  user?: {
    name?: string;
    avatar?: string;
    avatarUrl?: string;
    email?: string;
  } | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function UserAvatar({
  user,
  size = "md",
  className = "",
}: UserAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);

  // Compute initials fallback (e.g. "amir azib" -> "A")
  const initial = (
    user?.avatar ||
    (user?.name ? user.name.trim()[0] : "") ||
    (user?.email ? user.email.trim()[0] : "") ||
    "U"
  ).toUpperCase();

  const sizeClasses = {
    xs: "w-6 h-6 text-[10px] rounded-lg",
    sm: "w-8 h-8 text-xs rounded-xl",
    md: "w-10 h-10 text-sm rounded-xl",
    lg: "w-16 h-16 text-2xl rounded-2xl",
    xl: "w-20 h-20 text-3xl rounded-3xl",
  };

  const selectedSizeClass = sizeClasses[size] || sizeClasses.md;

  // If user has a valid avatar URL and it hasn't failed to load
  if (user?.avatarUrl && !imageFailed) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden bg-emerald-900/10 border border-emerald-800/20 shadow-xs ${selectedSizeClass} ${className}`}
      >
        <img
          src={user.avatarUrl}
          alt={user.name || "Foto Profil Pengguna"}
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover rounded-[inherit] transition-opacity duration-200"
          loading="eager"
        />
      </div>
    );
  }

  // Graceful fallback to branded emerald box with initial letter
  return (
    <div
      className={`bg-emerald-800 text-white font-black flex items-center justify-center shrink-0 shadow-xs select-none ${selectedSizeClass} ${className}`}
      aria-label={user?.name || "Profil"}
    >
      {initial}
    </div>
  );
}
