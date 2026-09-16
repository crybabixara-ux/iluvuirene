/**
 * musicroom.js — Page 3 cassette rack and lyric sheet.
 */

const MusicRoom = (() => {
  let cassetteEls = {};

  function render() {
    const rack = document.getElementById("cassetteRack");
    const sheet = document.getElementById("lyricSheet");
    if (!rack || !sheet) return;

    rack.innerHTML = "";
    cassetteEls = {};
    const playlist = CONFIG.page3_playlist || [];

    if (playlist.length === 0) {
      const p = document.createElement("div");
      p.className = "placeholder-card";
      p.textContent = "Your songs will live here.";
      rack.appendChild(p);
      renderLyricSheet(null);
      return;
    }

    playlist.forEach((track, i) => {
      const cassette = document.createElement("button");
      cassette.type = "button";
      cassette.className = "cassette";
      cassette.setAttribute("aria-pressed", "false");
      cassette.setAttribute("aria-label", `Play ${track.title || "untitled song"} by ${track.artist || "unknown artist"}`);

      const reel = document.createElement("span");
      reel.className = "cassette__reels";
      cassette.appendChild(reel);

      const label = document.createElement("span");
      label.className = "cassette__label";
      const t = document.createElement("strong");
      Utils.setText(t, track.title, "Untitled");
      const a = document.createElement("em");
      Utils.setText(a, track.artist, "Unknown artist");
      label.appendChild(t);
      label.appendChild(a);
      cassette.appendChild(label);

      cassette.addEventListener("click", () => selectTrack(track, i));
      rack.appendChild(cassette);
      cassetteEls[track.id] = cassette;
    });

    renderLyricSheet(playlist[0]);

    AudioEngine.onChange((state) => {
      Object.values(cassetteEls).forEach((el) => el.classList.remove("cassette--active"));
      Object.entries(cassetteEls).forEach(([id, el]) => {
        if (String(id) === String(state.activeTrackId)) {
          el.classList.add("cassette--active");
          el.setAttribute("aria-pressed", "true");
        } else {
          el.setAttribute("aria-pressed", "false");
        }
      });
    });
  }

  function selectTrack(track, index) {
    AudioEngine.playTrack(track);
    renderLyricSheet(track);
  }

  function renderLyricSheet(track) {
    const sheet = document.getElementById("lyricSheet");
    sheet.innerHTML = "";

    if (!track) {
      const p = document.createElement("p");
      p.className = "lyric-sheet__empty";
      p.textContent = "A song is waiting to be remembered.";
      sheet.appendChild(p);
      return;
    }

    const cover = Utils.createImage({ src: track.coverImage, alt: track.title || "" });
    cover.classList.add("lyric-sheet__cover");
    sheet.appendChild(cover);

    const lyric = document.createElement("p");
    lyric.className = "lyric-sheet__lyric";
    Utils.setText(lyric, track.featuredLyric, "");
    sheet.appendChild(lyric);

    const note = document.createElement("p");
    note.className = "lyric-sheet__note";
    Utils.setText(note, track.memoryNote, "");
    sheet.appendChild(note);
  }

  return { render };
})();
