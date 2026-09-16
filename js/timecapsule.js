/**
 * timecapsule.js — Page 6 countdown, unlock state, and letter reveal.
 */

const TimeCapsule = (() => {
  let intervalId = null;

  function init() {
    const cfg = CONFIG.page6_timeCapsule || {};
    const envelope = document.getElementById("capsuleEnvelope");
    const countdownEl = document.getElementById("capsuleCountdown");
    const lockedMsg = document.getElementById("capsuleLockedMessage");
    const seal = document.getElementById("capsuleSeal");

    const validDate = cfg.unlockDate && !isNaN(new Date(cfg.unlockDate).getTime());
    const isLocked = !!cfg.isLocked && validDate && new Date(cfg.unlockDate).getTime() > Date.now();

    if (cfg.isLocked && !validDate) {
      // Invalid or missing date while locked — fail safe to a
      // gentle locked message rather than a broken countdown.
      countdownEl.hidden = true;
      Utils.setText(lockedMsg, cfg.lockedMessage, "A letter is waiting for the right moment.");
      lockedMsg.hidden = false;
      seal.setAttribute("aria-disabled", "true");
      return;
    }

    if (isLocked) {
      lockedMsg.hidden = true;
      countdownEl.hidden = false;
      seal.setAttribute("aria-disabled", "true");
      tick(cfg.unlockDate, countdownEl, envelope, seal);
      intervalId = setInterval(() => tick(cfg.unlockDate, countdownEl, envelope, seal), 1000);
    } else {
      countdownEl.hidden = true;
      lockedMsg.hidden = true;
      seal.removeAttribute("aria-disabled");
    }

    seal.addEventListener("click", () => {
      if (seal.getAttribute("aria-disabled") === "true") return;
      openLetter();
    });
    seal.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && seal.getAttribute("aria-disabled") !== "true") {
        e.preventDefault();
        openLetter();
      }
    });
  }

  function tick(unlockDate, countdownEl, envelope, seal) {
    const diff = new Date(unlockDate).getTime() - Date.now();
    if (diff <= 0) {
      clearInterval(intervalId);
      countdownEl.hidden = true;
      seal.removeAttribute("aria-disabled");
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    countdownEl.textContent = `${days}d : ${Utils.pad(hours)}h : ${Utils.pad(mins)}m : ${Utils.pad(secs)}s`;
  }

  function openLetter() {
    const cfg = CONFIG.page6_timeCapsule || {};
    const envelope = document.getElementById("capsuleEnvelope");
    const letter = document.getElementById("capsuleLetter");

    envelope.classList.add("envelope--open");

    Utils.setText(document.getElementById("letterTitle"), cfg.letterTitle, "Words waiting to be written");
    Utils.setText(document.getElementById("letterBody"), cfg.letterBody, "This letter hasn't been written yet — but the page is ready whenever it is.");
    Utils.setText(document.getElementById("letterSignOff"), cfg.signOff, "");

    letter.hidden = false;
    requestAnimationFrame(() => letter.classList.add("letter--visible"));
  }

  return { init };
})();
