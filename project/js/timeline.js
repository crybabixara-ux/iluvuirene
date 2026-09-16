/**
 * timeline.js — Page 4 milestone rendering and reveal interaction.
 * Works for desktop horizontal timeline and mobile vertical timeline
 * (layout direction handled purely in CSS; markup is shared).
 */

const Timeline = (() => {

  function render() {
    const mount = document.getElementById("timelineMount");
    if (!mount) return;
    mount.innerHTML = "";
    const items = CONFIG.page4_timeline || [];

    if (items.length === 0) {
      const p = document.createElement("div");
      p.className = "placeholder-card";
      p.textContent = "More memories will be added here";
      mount.appendChild(p);
      return;
    }

    items.forEach((item, i) => {
      const milestone = document.createElement("div");
      milestone.className = "milestone";

      const marker = document.createElement("button");
      marker.type = "button";
      marker.className = "milestone__marker";
      marker.setAttribute("aria-expanded", "false");
      Utils.setText(marker, "", "");
      marker.innerHTML = '<span class="milestone__seal"></span>';
      const dateLabel = document.createElement("span");
      dateLabel.className = "milestone__date";
      Utils.setText(dateLabel, item.date, "—");
      marker.appendChild(dateLabel);

      const card = document.createElement("div");
      card.className = "milestone__card";
      card.id = `milestone-card-${i}`;
      card.hidden = true;

      const frame = Utils.createImage({ src: item.photoUrl, alt: item.title || "" });
      frame.classList.add("polaroid", "polaroid--timeline");
      card.appendChild(frame);

      const title = document.createElement("h3");
      title.className = "milestone__title";
      Utils.setText(title, item.title, "Untitled memory");
      card.appendChild(title);

      const desc = document.createElement("p");
      desc.className = "milestone__desc";
      Utils.setText(desc, item.description, "");
      card.appendChild(desc);

      marker.setAttribute("aria-controls", card.id);
      marker.addEventListener("click", () => toggle(marker, card));
      marker.addEventListener("mouseenter", () => open(marker, card));
      marker.addEventListener("focus", () => open(marker, card));

      milestone.appendChild(marker);
      milestone.appendChild(card);
      mount.appendChild(milestone);
    });
  }

  function toggle(marker, card) {
    const isOpen = !card.hidden;
    if (isOpen) close(marker, card);
    else open(marker, card);
  }

  function open(marker, card) {
    card.hidden = false;
    marker.setAttribute("aria-expanded", "true");
  }

  function close(marker, card) {
    card.hidden = true;
    marker.setAttribute("aria-expanded", "false");
  }

  return { render };
})();
