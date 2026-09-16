/**
 * gallery.js — Page 2 photo trio, Page 5 scattered/grid gallery,
 * and the shared fullscreen lightbox.
 */

const Gallery = (() => {
  let lightboxItems = [];
  let lightboxIndex = 0;
  let lastFocused = null;

  function renderPage2Photos() {
    const mount = document.getElementById("page2Photos");
    if (!mount) return;
    mount.innerHTML = "";
    const photos = (CONFIG.page2_notes && CONFIG.page2_notes.photos) || [];

    if (photos.length === 0) {
      mount.appendChild(placeholderCard("Memory waiting to be placed here"));
      return;
    }

    photos.forEach((p, i) => {
      const frame = Utils.createImage({ src: p.image, alt: p.caption || "" });
      frame.classList.add("polaroid", `polaroid--p2-${i % 3}`);
      if (p.caption) {
        const cap = document.createElement("p");
        cap.className = "polaroid__caption";
        cap.textContent = p.caption;
        frame.appendChild(cap);
      }
      mount.appendChild(frame);
    });
  }

  function placeholderCard(text) {
    const div = document.createElement("div");
    div.className = "placeholder-card";
    div.textContent = text;
    return div;
  }

  function renderGallery() {
    const mount = document.getElementById("galleryMount");
    if (!mount) return;
    mount.innerHTML = "";
    const items = CONFIG.page5_gallery || [];

    if (items.length === 0) {
      mount.appendChild(placeholderCard("More memories will be added here"));
      return;
    }

    lightboxItems = items;

    items.forEach((item, i) => {
      const rotation = (item.rotation === null || item.rotation === undefined)
        ? Utils.stableRotation(i)
        : item.rotation;

      const frame = Utils.createImage({ src: item.photoUrl, alt: item.caption || "" });
      frame.classList.add("polaroid", "polaroid--gallery");
      frame.style.setProperty("--rot", rotation + "deg");

      if (item.caption) {
        const cap = document.createElement("p");
        cap.className = "polaroid__caption";
        cap.textContent = item.caption;
        frame.appendChild(cap);
      }

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "polaroid__button";
      btn.setAttribute("aria-label", item.caption ? `Open photo: ${item.caption}` : "Open photo");
      btn.appendChild(frame);
      btn.addEventListener("click", () => openLightbox(i));

      mount.appendChild(btn);
    });
  }

  function openLightbox(index) {
    if (!lightboxItems.length) return;
    lastFocused = document.activeElement;
    lightboxIndex = index;
    const modal = document.getElementById("lightbox");
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    updateLightbox();
    document.getElementById("lightboxClose").focus();

    document.addEventListener("keydown", onLightboxKey);
  }

  function closeLightbox() {
    const modal = document.getElementById("lightbox");
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    document.removeEventListener("keydown", onLightboxKey);
    if (lastFocused) lastFocused.focus();
  }

  function onLightboxKey(e) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  }

  function step(dir) {
    lightboxIndex = (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
    updateLightbox();
  }

  function updateLightbox() {
    const item = lightboxItems[lightboxIndex];
    const img = document.getElementById("lightboxImage");
    const cap = document.getElementById("lightboxCaption");
    if (item && item.photoUrl) {
      img.src = item.photoUrl;
      img.alt = item.caption || "";
      img.style.display = "";
    } else {
      img.removeAttribute("src");
      img.style.display = "none";
    }
    Utils.setText(cap, item ? item.caption : "", "");
  }

  function initLightboxControls() {
    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
    document.getElementById("lightboxPrev").addEventListener("click", () => step(-1));
    document.getElementById("lightboxNext").addEventListener("click", () => step(1));
    document.getElementById("lightbox").addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });

    let sx = null;
    const modal = document.getElementById("lightbox");
    modal.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    modal.addEventListener("touchend", (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      sx = null;
      if (Math.abs(dx) < 40) return;
      step(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  return { renderPage2Photos, renderGallery, initLightboxControls };
})();
