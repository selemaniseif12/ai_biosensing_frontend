"use client";

import { useEffect } from "react";

// Keep the old public-login URL working, but route customers to the
// email-and-password login/registration page instead of asking for an API key.
export default function PublicLoginRedirect() {
  useEffect(() => {
    window.location.assign("/auth/login");
  }, []);

  return null;
}
