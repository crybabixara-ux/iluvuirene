/**
 * ============================================================
 * CONFIG.JS — All personal, editable content lives here.
 * You should never need to touch HTML, CSS or the other JS
 * files to change photos, songs, memories or the letter.
 * See README.md → "HOW TO ADD YOUR CONTENT LATER" for a guide.
 * ============================================================
 */

const CONFIG = {

  // Background music that plays softly once the envelope (Page 1)
  // is opened. Leave audioUrl empty to keep background music off.
  bgMusic: {
    enabled: true,
    audioUrl: "" // e.g. "./assets/music/bg.mp3"
  },

  // The sound of paper/wax when the envelope opens. Optional.
  paperSound: "", // e.g. "./assets/music/paper.mp3"

  // ---------------------------------------------------------
  // PAGE 2 — Private Note
  // ---------------------------------------------------------
  page2_notes: {
    noteContent: "", // your handwritten note text
    photos: [
       { image: "./assets/images/1.jpg", caption: "" },
       { image: "./assets/images/2.jpg", caption: "" },
       { image: "./assets/images/11.jpg", caption: "" }
    ]
  },

  // ---------------------------------------------------------
  // PAGE 3 — Music Room
  // ---------------------------------------------------------
  page3_playlist: [
     {
       id: 1,
       title: "Sweet Dreams",
       artist: "The Last Shadow Puppets",
       audioUrl: "./assets/music/sweety.mp3",
       coverImage: "./assets/images/12.jpg",
       featuredLyric: "This is love, like a tongue caught in a nostril, like an ache in the jaw, you're like the first day of spring with a septum piercing, my little Miss Sweet Dreams...",
       memoryNote: "Without you, everything is really just the pits, baby. Yeah, without you, everything is really just the pits, baby."
     }
  ],

  // ---------------------------------------------------------
  // PAGE 4 — Timeline
  // ---------------------------------------------------------
  page4_timeline: [
     {
       date: "06/13",
       title: "My love's confession to Eren",
       description: "I felt something strange. My heart was beating so fast. I kept thinking that she was mine, but I wasn’t sure if she felt the same way about me. And in the end, I confessed my feelings.",
       photoUrl: "./assets/images/13.jpg"
     }
  ],

  // ---------------------------------------------------------
  // PAGE 5 — Memory Album (gallery)
  // ---------------------------------------------------------
  page5_gallery: [
     {
       photoUrl: "./assets/images/8.jpg",
       caption: "i love you",
       rotation: null // leave null for automatic controlled rotation
     }
     
  ],
  

  // ---------------------------------------------------------
  // PAGE 6 — Time Capsule
  // ---------------------------------------------------------
  page6_timeCapsule: {
    isLocked: true,
    unlockDate: "2027-06-13:60", // "YYYY-MM-DDTHH:MM:SS" — required only if isLocked is true
    lockedMessage: "A letter is waiting for the right moment.",
    letterTitle: "Our Friendship Anniversary",
    letterBody: "I love your soul. I love your voice, your hair, the way you talk, and your smile. I love your energy, your cuteness, and the way you’re always on my mind. I love everything about you and everything that has anything to do with you.",
    signOff: "From your devoted admirer,the one who loves you ❤️"
  }

};
