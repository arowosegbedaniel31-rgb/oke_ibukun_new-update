const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll(".audio-toggle").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const card = link.closest(".sermon-card");
    const player = card?.querySelector("audio");

    if (!card || !player) {
      return;
    }

    const isOpen = card.classList.contains("audio-open");

    document.querySelectorAll(".sermon-card.audio-open").forEach((openCard) => {
      if (openCard !== card) {
        openCard.classList.remove("audio-open");
        const openPlayer = openCard.querySelector("audio");
        openPlayer?.pause();
      }
    });

    if (isOpen) {
      card.classList.remove("audio-open");
      player.pause();
      return;
    }

    card.classList.add("audio-open");
    player.play().catch(() => {
      card.classList.add("audio-open");
    });
  });
});

document.querySelectorAll(".contact-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let note = form.querySelector(".form-note");

    if (!note) {
      note = document.createElement("p");
      note.className = "form-note";
      form.append(note);
    }

    note.textContent = "Message captured in the frontend. A backend endpoint can be connected here later.";
    form.reset();
  });
});

document.querySelectorAll("[data-gallery-selector]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const select = form.querySelector("[data-gallery-year]");
    const target = select?.value;

    if (!target) {
      return;
    }

    window.location.href = target;
  });
});
