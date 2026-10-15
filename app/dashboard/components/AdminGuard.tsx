"use client";

import React from "react";

type AdminGuardProps = {
  children: React.ReactNode;
};

export default function AdminGuard({
  children,
}: AdminGuardProps) {
  return <>{children}</>;
}