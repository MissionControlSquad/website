/**
 * Google Tag Manager utilities.
 *
 * Extracted here so Analytics.tsx stays readable and the snippet
 * can be tested independently.
 */

export const GTM_ID = "GTM-WSR54GVV";

/**
 * Returns the GTM dataLayer bootstrap + loader snippet.
 * Injected via <Script strategy="afterInteractive"> so it runs
 * after the page is interactive, outside the critical render path.
 */
export function buildGtmInitSnippet(gtmId: string): string {
  return `(function(w,d,s,l,i){
w[l]=w[l]||[];
w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`;
}

/**
 * Returns the GTM noscript iframe src URL.
 * Used inside <noscript> for environments where JS is disabled.
 */
export function buildGtmNoscriptUrl(gtmId: string): string {
  return `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
}
