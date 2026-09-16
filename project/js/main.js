/**
 * main.js — bootstraps the whole experience.
 */

document.addEventListener("DOMContentLoaded", () => {
  Navigation.init();
  Gallery.initLightboxControls();

  AudioEngine.initBgMusic();

  // Page 2 note content.
  Utils.setText(
    document.getElementById("page2Note"),
    CONFIG.page2_notes && CONFIG.page2_notes.noteContent,
    "Words waiting to be written."
  );
  Gallery.renderPage2Photos();

  // Page 3.
  MusicRoom.render();

  // Page 4.
  Timeline.render();

  // Page 5.
  Gallery.renderGallery();

  // Page 6.
  TimeCapsule.init();

  // Page 1 — envelope open.
  const openSeal = document.getElementById("openSeal");
  const envelope1 = document.getElementById("envelope1");
  const paperSoundUrl = CONFIG.paperSound;

  openSeal.addEventListener("click", handleOpenEnvelope);
  openSeal.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpenEnvelope();
    }
  });

  let opened = false;
  function handleOpenEnvelope() {
    if (opened) return;
    opened = true;

    if (paperSoundUrl) {
      try {
        const s = new Audio(paperSoundUrl);
        s.volume = 0.5;
        s.play().catch(() => {});
      } catch (e) { /* ignore */ }
    }

    envelope1.classList.add("envelope--open");
    AudioEngine.startBgMusicOnce();

    setTimeout(() => {
      Navigation.goTo(1);
    }, 650);
  }

  // Background music mute/unmute control (persistent, top corner).
  const musicToggle = document.getElementById("musicToggle");
  musicToggle.addEventListener("click", () => {
    const result = AudioEngine.toggleBgMusic();
    musicToggle.classList.toggle("music-toggle--playing", result === "playing");
    musicToggle.setAttribute(
      "aria-label",
      result === "playing" ? "Pause background music" : "Play background music"
    );
    if (result === "unavailable") {
      musicToggle.setAttribute("aria-label", "Background music unavailable");
    }
  });
});
