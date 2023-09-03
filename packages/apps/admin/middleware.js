import acceptLanguage from "accept-language";
import { NextResponse } from "next/server";

import { fallbackLng, languages, cookieName } from "@app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

export function middleware(req) {
  let lng;

  if (req.cookies.has(cookieName)) {
    // console.log("1");
    // console.log(req.cookies.get(cookieName));
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  }
  if (!lng) {
    // console.log("2");
    lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  }
  if (!lng) {
    // console.log("3");
    lng = fallbackLng;
  }

  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    // console.log("4");

    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (req.headers.has("referer")) {
    // console.log("5");

    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );

    const response = NextResponse.next();

    if (lngInReferer) {
      // console.log("6");

      response.cookies.set(cookieName, lngInReferer);
    }
    return response;
  }
  // console.log("7");

  return NextResponse.next();
}
