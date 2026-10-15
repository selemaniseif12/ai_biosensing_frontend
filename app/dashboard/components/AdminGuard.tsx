"use client";

import React from "react";

type AdminGuardProps = {
  children: React.ReactNode;
};

export default function AdminGuard({
  children,
}: AdminGuardProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#b00020",
        color: "#ffffff",
        padding: "40px",
        fontSize: "28px",
        fontWeight: "bold",
      }}
    >
      ADMIN GUARD IS RUNNING

      <div
        style={{
          marginTop: "20px",
          fontSize: "18px",
          fontWeight: "normal",
        }}
      >
        If you can see this message, AdminGuard.tsx is being used by the
        Admin & System page.
      </div>
    </div>
  );
}