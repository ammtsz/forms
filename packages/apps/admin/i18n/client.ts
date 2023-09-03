"use client";

import i18next, { FlatNamespace, KeyPrefix } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { useEffect, useState } from "react";
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
      order: ["path", "htmlTag", "cookie", "navigator"],
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

  // console.log({ resolvedLanguage: i18n.resolvedLanguage });
  const lng = i18n.resolvedLanguage;

  const isServerSideNewLng = runsOnServerSide && lng;

  if (isServerSideNewLng) {
    // console.log("client 1");
    i18n.changeLanguage(lng);
  }

  // console.log(isServerSideNewLng, i18n.resolvedLanguage, lng);
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  useEffect(() => {
    if (!isServerSideNewLng) {
      if (activeLng === i18n.resolvedLanguage) return;
      // console.log("client 2");
      setActiveLng(i18n.resolvedLanguage);
    }
  }, [activeLng, i18n.resolvedLanguage, isServerSideNewLng]);

  // useEffect(() => {
  //   if (!isServerSideNewLng) {
  //     if (!lng || i18n.resolvedLanguage === lng) return;
  //     console.log("client 3");
  //     i18n.changeLanguage(lng);
  //   }
  // }, [lng, i18n, isServerSideNewLng]);

  useEffect(() => {
    if (!isServerSideNewLng) {
      // eslint-disable-next-line dot-notation
      if (cookies["i18next"] === lng) return;
      // console.log("client 4", lng);
      setCookie(cookieName, lng, { path: "/" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng, setCookie, isServerSideNewLng]);

  return ret;
}
