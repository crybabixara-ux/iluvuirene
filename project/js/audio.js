/**
 * audio.js — one reusable audio system for background music
 * and the Page 3 playlist. Only one playlist track plays at a time.
 * Handles missing files and autoplay restrictions gracefully.
 */

const AudioEngine = (() => {
  let bgAudio = null;
  let activeTrackAudio = null;
  let activeTrackId = null;
  const listeners = new Set();

  function notify() {
    listeners.forEach((fn) => fn(getState()));
  }

  function getState() {
    return {
      activeTrackId,
      isPlaying: !!(activeTrackAudio && !activeTrackAudio.paused)
    };
  }

  function onChange(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function safePlay(audioEl) {
    if (!audioEl) return;
    const p = audioEl.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // Autoplay blocked or file unavailable — fail silently.
        // We do not repeatedly retry; playback will start on next
        // explicit user interaction (e.g. clicking play again).
      });
    }
  }

  function initBgMusic() {
    if (!CONFIG.bgMusic || !CONFIG.bgMusic.enabled || !CONFIG.bgMusic.audioUrl) return;
    try {
      bgAudio = new Audio(CONFIG.bgMusic.audioUrl);
      bgAudio.loop = true;
      bgAudio.volume = 0.35;
      bgAudio.addEventListener("error", () => {
        bgAudio = null;
      });
    } catch (e) {
      bgAudio = null;
    }
  }

  function startBgMusicOnce() {
    if (bgAudio) safePlay(bgAudio);
  }

  function toggleBgMusic() {
    if (!bgAudio) return "unavailable";
    if (bgAudio.paused) {
      safePlay(bgAudio);
      return "playing";
    } else {
      bgAudio.pause();
      return "paused";
    }
  }

  function playTrack(track) {
    if (!track || !track.audioUrl) {
      notify();
      return;
    }

    // Pause whatever is currently playing.
    if (activeTrackAudio) {
      activeTrackAudio.pause();
    }

    if (activeTrackId === track.id && activeTrackAudio) {
      // Toggle same track.
      if (activeTrackAudio.paused) {
        safePlay(activeTrackAudio);
      }
      notify();
      return;
    }

    try {
      activeTrackAudio = new Audio(track.audioUrl);
      activeTrackId = track.id;
      activeTrackAudio.addEventListener("ended", () => {
        activeTrackId = null;
        notify();
      });
      activeTrackAudio.addEventListener("error", () => {
        activeTrackId = null;
        activeTrackAudio = null;
        notify();
      });
      safePlay(activeTrackAudio);
    } catch (e) {
      activeTrackAudio = null;
      activeTrackId = null;
    }
    notify();
  }

  function pauseActiveTrack() {
    if (activeTrackAudio) activeTrackAudio.pause();
    notify();
  }

  function stopAll() {
    if (bgAudio) bgAudio.pause();
    if (activeTrackAudio) activeTrackAudio.pause();
  }

  return {
    initBgMusic,
    startBgMusicOnce,
    toggleBgMusic,
    playTrack,
    pauseActiveTrack,
    stopAll,
    onChange,
    getState
  };
})();
