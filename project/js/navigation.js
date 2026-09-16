/**
 * navigation.js — moving between the six "pages" of the memory book.
 * Horizontal track transform, swipe, arrow keys, and prev/next controls.
 * Ignores navigation gestures while the user is interacting with
 * gallery, timeline, modal, audio controls, or the cassette rack.
 */

const Navigation = (() => {
  let track, pages, prevBtn, nextBtn, dots;
  let current = 0;
  let total = 0;
  let touchStartX = null;
  let touchStartY = null;
  let touchLocked = false;

  function init() {
    track = document.getElementById("pageTrack");
    pages = Array.from(document.querySelectorAll(".page"));
    prevBtn = document.getElementById("navPrev");
    nextBtn = document.getElementById("navNext");
    dots = Array.from(document.querySelectorAll(".dot"));
    total = pages.length;

    prevBtn.addEventListener("click", () => goTo(current - 1));
    nextBtn.addEventListener("click", () => goTo(current + 1));

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => goTo(i));
    });

    document.addEventListener("keydown", (e) => {
      if (isTypingContext(e.target)) return;
      if (e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
    });

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });

    render();
  }

  function isTypingContext(el) {
    return el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA");
  }

  function isBlockedTarget(target) {
    return !!target.closest(
      "[data-no-swipe], .gallery, .lightbox, .cassette-rack, .audio-controls, .timeline, .modal"
    );
  }

  function onTouchStart(e) {
    if (isBlockedTarget(e.target)) {
      touchLocked = true;
      return;
    }
    touchLocked = false;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }

  function onTouchMove() {
    // presence of listener keeps browser gesture heuristics stable
  }

  function onTouchEnd(e) {
    if (touchLocked || touchStartX === null) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    touchStartX = null;

    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goTo(current + 1);
    else goTo(current - 1);
  }

  function goTo(index) {
    const target = Utils.clamp(index, 0, total - 1);
    if (target === current) return;
    current = target;
    render();
    document.dispatchEvent(new CustomEvent("pagechange", { detail: { index: current } }));
  }

  function render() {
    track.style.transform = `translateX(-${current * 100}%)`;
    pages.forEach((p, i) => {
      const isActive = i === current;
      p.setAttribute("aria-hidden", isActive ? "false" : "true");
      p.querySelectorAll("a, button, [tabindex]").forEach((el) => {
        if (!isActive) el.setAttribute("tabindex", "-1");
        else el.removeAttribute("tabindex");
      });
    });
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
    dots.forEach((dot, i) => {
      dot.classList.toggle("dot--active", i === current);
      dot.setAttribute("aria-current", i === current ? "true" : "false");
    });
  }

  return { init, goTo, get current() { return current; } };
})();
