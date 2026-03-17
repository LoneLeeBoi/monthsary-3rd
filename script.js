// --- CONFIGURE THIS IF NEEDED ---
// Relationship start date (months are 0-based). 3rd monthsary on Mar 18, 2026 => Dec 18, 2025
const RELATIONSHIP_START = new Date(2025, 11, 18); // Dec 18, 2025
const YOUR_NAME_SIGNATURE = "— Lee";
// --------------------------------

document.addEventListener("DOMContentLoaded", () => {
  updateCounters();
  setupCompliments();
  setupSurpriseButton();
  personalizeName();
  setupLetterModal();
  setupShuffleReason();
  setupCopySweetLine();
  setupSecretMessage();
  setupPromises();
  startCountdownToNextMonthsary();
  warmWelcomeToast();
});

function updateCounters() {
  const now = new Date();
  const daysElement = document.getElementById("daysTogether");
  const monthsElement = document.getElementById("monthsTogether");

  if (!daysElement || !monthsElement || isNaN(RELATIONSHIP_START.getTime())) return;

  const diffMs = now - RELATIONSHIP_START;
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  let months =
    (now.getFullYear() - RELATIONSHIP_START.getFullYear()) * 12 +
    (now.getMonth() - RELATIONSHIP_START.getMonth());
  if (now.getDate() < RELATIONSHIP_START.getDate()) months -= 1;
  months = Math.max(0, months);

  animateNumber(daysElement, days);
  animateNumber(monthsElement, months);
}

function animateNumber(element, target) {
  const duration = 900;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const current = Math.round(progress * target);
    element.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function setupCompliments() {
  const pills = Array.from(document.querySelectorAll(".memory-pill"));
  const memoryText = document.getElementById("memoryText");

  if (!pills.length || !memoryText) return;

  const messages = [
    "Your smile has this magic of making even the heaviest days feel a little softer.",
    "You notice the small things, and the way you care about them makes me feel incredibly loved.",
    "When you believe in me, it gives me a strength I can’t always find on my own.",
    "Your laugh is one of my favorite sounds in the world — I could listen to it forever.",
    "Just being next to you, even in silence, feels like home to me."
  ];

  pills.forEach((pill, index) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      memoryText.style.opacity = "0";
      setTimeout(() => {
        memoryText.textContent = messages[index] || messages[0];
        memoryText.style.opacity = "1";
      }, 150);
    });
  });
}

function setupSurpriseButton() {
  const button = document.getElementById("surpriseButton");
  const heartsContainer = document.getElementById("floatingHearts");
  if (!button || !heartsContainer) return;

  const original = button.textContent || "Tap for a tiny surprise";
  button.addEventListener("click", () => {
    createHearts(heartsContainer, 18);
    toast("Happy 3rd monthsary, Langga. 💖");
    button.textContent = "I love you. Always have, always will.💕";
    setTimeout(() => {
      button.textContent = original;
    }, 2600);
  });
}

function createHearts(container, count) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = pick(["💖", "💕", "💗", "💞", "💘"]);

    const startLeft = Math.random() * 100;
    const delay = Math.random() * 0.9;

    heart.style.left = `${startLeft}vw`;
    heart.style.bottom = "0";
    heart.style.animationDelay = `${delay}s`;

    container.appendChild(heart);
    setTimeout(() => heart.remove(), 4200);
  }
}

function personalizeName() {
  const nameSpan = document.getElementById("yourName");
  if (nameSpan && YOUR_NAME_SIGNATURE) nameSpan.textContent = YOUR_NAME_SIGNATURE;

  const modalSig = document.getElementById("modalSignature");
  if (modalSig && YOUR_NAME_SIGNATURE) modalSig.textContent = YOUR_NAME_SIGNATURE;
}

function setupLetterModal() {
  const openBtn = document.getElementById("openLetter");
  const modal = document.getElementById("letterModal");
  const heartsContainer = document.getElementById("floatingHearts");
  const sealBtn = document.getElementById("sealPromise");

  if (!openBtn || !modal) return;

  function open() {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    if (heartsContainer) createHearts(heartsContainer, 10);
    toast("For you, my love. 💌");
  }

  function close() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  openBtn.addEventListener("click", open);

  modal.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.dataset.close === "true") close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) close();
  });

  if (sealBtn && heartsContainer) {
    const original = sealBtn.textContent || "Seal this promise";
    sealBtn.addEventListener("click", () => {
      createHearts(heartsContainer, 24);
      toast("Promise sealed. Softly. Forever. 💍");
      sealBtn.textContent = "Promise sealed. I’m yours. 💍";
      setTimeout(() => {
        sealBtn.textContent = original;
      }, 2300);
    });
  }
}

function setupShuffleReason() {
  const button = document.getElementById("shuffleReason");
  const pills = Array.from(document.querySelectorAll(".memory-pill"));
  if (!button || pills.length === 0) return;

  button.addEventListener("click", () => {
    const currentIndex = pills.findIndex((p) => p.classList.contains("active"));
    const nextIndex =
      pills.length === 1
        ? 0
        : (currentIndex + 1 + Math.floor(Math.random() * (pills.length - 1))) % pills.length;
    pills[nextIndex].click();
  });
}

function setupCopySweetLine() {
  const button = document.getElementById("copyLine");
  const heartsContainer = document.getElementById("floatingHearts");
  if (!button) return;

  const lines = [
    "Happy 3rd monthsary, Stifany. I love you—always. — Lee",
    "Every 18th is my reminder: I’m lucky because I have you. — Lee",
    "You feel like home to me. — Lee",
    "Three months down—forever to go. — Lee",
    "With you, even ordinary days glow. — Lee"
  ];

  const original = button.textContent || "Copy a sweet line";
  button.addEventListener("click", async () => {
    const line = pick(lines);
    try {
      await navigator.clipboard.writeText(line);
      button.textContent = "Copied. Send it to me. 💌";
      toast("Copied.");
      if (heartsContainer) createHearts(heartsContainer, 10);
    } catch {
      button.textContent = "Copy blocked—still true though. 💌";
      toast("Copy blocked by browser.");
    } finally {
      setTimeout(() => {
        button.textContent = original;
      }, 2200);
    }
  });
}

function setupSecretMessage() {
  const button = document.getElementById("secretMessage");
  if (!button) return;
  const original = button.textContent || "Open when you’re smiling";

  button.addEventListener("click", () => {
    toast("If you’re smiling right now… that’s my favorite view. — Lee");
    button.textContent = "Okay… one more smile. 🙂";
    setTimeout(() => {
      button.textContent = original;
    }, 2400);
  });
}

function setupPromises() {
  const grid = document.getElementById("promiseGrid");
  const heartsContainer = document.getElementById("floatingHearts");
  if (!grid) return;

  const promises = [
    "I’ll protect your peace — especially on the days you forget you deserve it.",
    "I’ll keep choosing you — not only in the big moments, but in the quiet ones too.",
    "I’ll love you gently — with patience, consistency, and a home you can rest in."
  ];

  grid.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest(".promise-card");
    if (!card) return;

    const idx = Number(card.getAttribute("data-promise"));
    const main = card.querySelector(".promise-main");
    const top = card.querySelector(".promise-top");
    if (!(main instanceof HTMLElement) || !(top instanceof HTMLElement)) return;

    const opened = card.getAttribute("data-open") === "true";
    card.setAttribute("data-open", opened ? "false" : "true");

    if (!opened) {
      main.textContent = promises[idx] || promises[0];
      top.textContent = `Promise ${idx + 1} (opened)`;
      if (heartsContainer) createHearts(heartsContainer, 12);
      toast("Keep this with you. 💗");
    } else {
      main.textContent = "Tap to open";
      top.textContent = `Promise ${idx + 1}`;
    }
  });
}

function startCountdownToNextMonthsary() {
  const daysEl = document.getElementById("countdownDays");
  const hoursEl = document.getElementById("countdownHours");
  const minsEl = document.getElementById("countdownMinutes");
  if (!daysEl || !hoursEl || !minsEl || isNaN(RELATIONSHIP_START.getTime())) return;

  function getNextMonthsary(from) {
    const startDay = RELATIONSHIP_START.getDate();
    const next = new Date(from);
    next.setSeconds(0, 0);

    next.setDate(1);
    next.setHours(0, 0, 0, 0);
    next.setMonth(from.getMonth());

    const daysInMonth = new Date(from.getFullYear(), from.getMonth() + 1, 0).getDate();
    next.setDate(Math.min(startDay, daysInMonth));

    if (next <= from) {
      const after = new Date(from.getFullYear(), from.getMonth() + 1, 1, 0, 0, 0, 0);
      const dim = new Date(after.getFullYear(), after.getMonth() + 1, 0).getDate();
      after.setDate(Math.min(startDay, dim));
      return after;
    }
    return next;
  }

  function tick() {
    const now = new Date();
    const next = getNextMonthsary(now);
    const diff = Math.max(0, next - now);

    const totalMinutes = Math.floor(diff / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes - days * 60 * 24) / 60);
    const minutes = Math.floor(totalMinutes - days * 60 * 24 - hours * 60);

    daysEl.textContent = days.toLocaleString();
    hoursEl.textContent = hours.toLocaleString();
    minsEl.textContent = minutes.toLocaleString();
  }

  tick();
  setInterval(tick, 15 * 1000);
}

let toastTimer = null;
function toast(message) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = message;
  t.classList.add("is-on");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("is-on"), 2200);
}

function warmWelcomeToast() {
  setTimeout(() => toast("Stifany… I kept this page like a memory. For you. 💖"), 650);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

