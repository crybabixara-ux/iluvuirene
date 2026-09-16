# A Private Memory

A six-page, vintage-scrapbook style personal memory website. Pure HTML, CSS and vanilla JavaScript — no build tools, no frameworks. Open `index.html` in a browser, or upload the whole folder to any static host.

The site ships **empty but beautiful**. Every page works right now, before you add a single photo — you can add your content gradually, whenever it's ready.

---

## HOW TO ADD YOUR CONTENT LATER

Everything personal lives in one file: **`js/config.js`**. You never need to touch the HTML, CSS, or any other JS file.

### 1. Where to put photos
Drop image files into `assets/images/`.

### 2. Where to put music files
Drop audio files (`.mp3`, `.wav`, or `.ogg`) into `assets/music/`.

### 3. Where to put album covers
Also in `assets/images/` — a cover is just another image.

### 4. How to add a song (Page 3)
Open `js/config.js` and add an object to the `page3_playlist` array:
```js
{
  id: 2,
  title: "Song Name",
  artist: "Artist Name",
  audioUrl: "./assets/music/song-02.mp3",
  coverImage: "./assets/images/song-02.jpg",
  featuredLyric: "the line you love",
  memoryNote: "why this song matters"
}
```
Add as many as you like — the cassette rack updates automatically.

### 5. How to add a timeline memory (Page 4)
Add an object to `page4_timeline`:
```js
{
  date: "March 2023",
  title: "The day we met",
  description: "A short description of what happened.",
  photoUrl: "./assets/images/timeline-01.jpg"
}
```

### 6. How to add a gallery photo (Page 5)
Add an object to `page5_gallery`:
```js
{
  photoUrl: "./assets/images/photo-01.jpg",
  caption: "A caption, or leave it empty",
  rotation: null
}
```
Leave `rotation` as `null` for an automatic, natural-looking tilt.

### 7. How to edit the private note (Page 2)
Set `page2_notes.noteContent` to your text, and add up to a few photos to `page2_notes.photos`:
```js
page2_notes: {
  noteContent: "Your handwritten-style message...",
  photos: [
    { image: "./assets/images/p1.jpg", caption: "" }
  ]
}
```

### 8. How to edit the final letter (Page 6)
Fill in `page6_timeCapsule.letterTitle`, `letterBody`, and `signOff`.

### 9. How to set the unlock date
In `page6_timeCapsule`:
- To make the letter available right away: set `isLocked: false`.
- To lock it until a future date: set `isLocked: true` and `unlockDate: "2026-12-25T00:00:00"` (year-month-day, then time).

---

## Notes

- Any missing photo, song, or piece of text shows an elegant placeholder — nothing ever breaks or shows an error.
- The site is fully responsive, from small phones to ultrawide monitors, and supports keyboard navigation, swipe gestures, and reduced-motion preferences.
- Structure:
  ```
  /
  ├── index.html
  ├── css/style.css
  ├── js/
  │   ├── config.js       ← your content lives here
  │   ├── utils.js
  │   ├── audio.js
  │   ├── navigation.js
  │   ├── gallery.js
  │   ├── timeline.js
  │   ├── musicroom.js
  │   ├── timecapsule.js
  │   └── main.js
  └── assets/
      ├── images/
      └── music/
  ```
