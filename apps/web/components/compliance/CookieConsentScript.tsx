"use client";

import { useEffect } from "react";

const COOKIEYES_SITE_ID = "2658e455fcdd83fb7a3cf109d8cefb0e";

export function CookieConsentScript() {
  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname !== "taurisol.com" && hostname !== "www.taurisol.com") return;
    if (document.getElementById("cookieyes")) return;

    const script = document.createElement("script");
    script.id = "cookieyes";
    script.src = `https://cdn-cookieyes.com/client_data/${COOKIEYES_SITE_ID}/script.js`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}