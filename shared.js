export function cleanText(value) { return String(value || "").trim(); }
export function escapeHtml(value = "") { return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
export function formatDate(value, options = {}) { return new Intl.DateTimeFormat("en-GB", { day: options.day || "numeric", month: options.month || "long", year: options.year || "numeric" }).format(parseDate(value)); }
export function firstContent(...values) { return values.map((value) => { const raw = cleanText(value); if (!raw) return ""; const visible = raw.replace(/&nbsp;|&#160;|&#xA0;/gi, " ").replace(/<br\s*\/?>/gi, "").replace(/<[^>]*>/g, "").trim(); return visible ? raw : ""; }).find(Boolean) || ""; }
export function initials(name = "") { return String(name).split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]?.toUpperCase()).join(""); }
export function isTrue(value) { return value === true || value === 1 || value === "true" || value === "1"; }
export function parseDate(value) { return new Date(`${value}T12:00:00`); }
export function safeExternalUrl(value = "") { const raw = String(value || "").trim(); if (!raw) return ""; try { const url = new URL(raw); return url.protocol === "https:" ? url.href : ""; } catch { return ""; } }
function safeRichLinkUrl(value = "") { const raw = String(value || "").trim(); if (!raw) return ""; if (raw.startsWith("#")) return raw; try { const url = new URL(raw, window.location.href); return url.origin === window.location.origin || url.protocol === "https:" ? url.href : ""; } catch { return ""; } }
export function sanitizeRichText(value = "") {
  const root = new DOMParser().parseFromString(`<body>${String(value || "")}</body>`, "text/html").body;
  const allowed = new Set(["P", "BR", "STRONG", "B", "EM", "I", "UL", "OL", "LI", "H3", "H4", "BLOCKQUOTE", "A"]);
  const drop = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "SVG", "MATH", "FORM", "INPUT", "TEXTAREA", "BUTTON"]);
  root.querySelectorAll("*").forEach((el) => {
    const tag = el.tagName;
    if (drop.has(tag)) { el.remove(); return; }
    if (!allowed.has(tag)) { el.replaceWith(...el.childNodes); return; }
    const href = tag === "A" ? el.getAttribute("href") || "" : "";
    Array.from(el.attributes).forEach((attr) => el.removeAttribute(attr.name));
    if (tag === "A") { const safe = safeRichLinkUrl(href); if (safe) { el.setAttribute("href", safe); el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener noreferrer"); } }
  });
  return root.innerHTML;
}
