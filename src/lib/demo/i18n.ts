"use client";

import { useEffect, useMemo, useState } from "react";

export type DemoLang = "en" | "hi";

const STORAGE_KEY = "ws_demo_lang";
const EVENT_NAME = "ws:demo-lang";

export function getDemoLang(): DemoLang {
  if (typeof window === "undefined") return "en";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "hi" ? "hi" : "en";
}

export function setDemoLang(lang: DemoLang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, lang);
  window.dispatchEvent(new CustomEvent<DemoLang>(EVENT_NAME, { detail: lang }));
}

export function useDemoLang() {
  const [lang, setLang] = useState<DemoLang>("en");

  useEffect(() => {
    setLang(getDemoLang());

    const onEvent = (e: Event) => {
      const ce = e as CustomEvent<DemoLang>;
      setLang(ce.detail === "hi" ? "hi" : "en");
    };

    const onStorage = () => {
      setLang(getDemoLang());
    };

    window.addEventListener(EVENT_NAME, onEvent);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT_NAME, onEvent);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const api = useMemo(
    () => ({
      lang,
      setLang: (next: DemoLang) => {
        setDemoLang(next);
        setLang(next);
      },
    }),
    [lang]
  );

  return api;
}
