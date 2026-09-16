/**
 * utils.js — small shared helpers.
 */

const Utils = (() => {

  // Safely set text content (never innerHTML) for user-provided strings.
  function setText(el, value, fallback = "") {
    if (!el) return;
    const v = (value && String(value).trim()) ? String(value) : fallback;
    el.textContent = v;
  }

  // Create an <img> that gracefully falls back to a placeholder tile
  // (preserving layout) if the src is empty or fails to load.
  function createImage({ src, alt = "", placeholderLabel = "Memory waiting to be placed here" }) {
    const wrap = document.createElement("div");
    wrap.className = "img-frame";

    if (!src) {
      wrap.classList.add("img-frame--empty");
      const label = document.createElement("span");
      label.className = "img-frame__label";
      label.textContent = placeholderLabel;
      wrap.appendChild(label);
      return wrap;
    }

    const img = document.createElement("img");
    img.loading = "lazy";
    img.alt = alt || "";
    img.src = src;
    img.addEventListener("error", () => {
      wrap.classList.add("img-frame--empty");
      img.remove();
      const label = document.createElement("span");
      label.className = "img-frame__label";
      label.textContent = placeholderLabel;
      wrap.appendChild(label);
    });
    wrap.appendChild(img);
    return wrap;
  }

  // Controlled, stable "random" rotation between -5 and 5 deg,
  // seeded by index so it never changes between renders.
  function stableRotation(seedIndex) {
    const pattern = [-4, 3, -2, 5, -3, 2, -5, 4, -1, 1];
    return pattern[seedIndex % pattern.length];
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  return { setText, createImage, stableRotation, pad, clamp };
})();
