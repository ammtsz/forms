"use client";

import i18next, { FlatNamespace, KeyPrefix } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
  UseTranslationOptions,
  UseTranslationResponse,
  FallbackNs,
} from "react-i18next";

import { getOptions, languages, cookieName } from "./settings";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ["htmlTag", "cookie", "navigator"],
      caches: ["cookie"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
>(
  ns?: Ns,
  options?: UseTranslationOptions<KPrefix>
): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
  const [cookies, setCookie] = useCookies([cookieName]);

  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  const isServerSideNewLng = runsOnServerSide && i18n.resolvedLanguage;

  if (isServerSideNewLng) {
    i18n.changeLanguage(i18n.resolvedLanguage);
  }

  useEffect(() => {
    if (!isServerSideNewLng && cookies.i18next !== i18n.resolvedLanguage) {
      setCookie(cookieName, i18n.resolvedLanguage, { path: "/" });
    }
  }, [setCookie, isServerSideNewLng, cookies.i18next, i18n.resolvedLanguage]);

  return ret;
}
