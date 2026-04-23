let attempts = 0;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const question = document.getElementById("question");

const texts = [
  "Why are you like this? 😭",
  "Stop playing 💔",
  "You know you want to say yes 😏",
  "I'm begging you now 🥺",
  "I'm not going to stop until you say YES 😌",
  "Last chance!",
  "Come ooooon 😩",
  "Just one little yes 🥺👉👈",
  "NO is not an option anymore 😌",
];

function randomSignedOffset() {
  const magnitude = 50 + Math.random() * 80;
  return (Math.random() > 0.5 ? 1 : -1) * magnitude;
}

function clampNoButtonTranslate(x, y, noScale) {
  const margin = 8;
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;

  for (let i = 0; i < 8; i++) {
    noBtn.style.transform = `translate(${x}px, ${y}px) scale(${noScale})`;
    const r = noBtn.getBoundingClientRect();
    let nx = x;
    let ny = y;

    if (r.left < margin) nx += margin - r.left;
    if (r.right > vw - margin) nx -= r.right - (vw - margin);
    if (r.top < margin) ny += margin - r.top;
    if (r.bottom > vh - margin) ny -= r.bottom - (vh - margin);

    if (nx === x && ny === y) break;
    x = nx;
    y = ny;
  }

  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${noScale})`;
}

function onNoEvade() {
  if (noBtn.style.display === "none") return;

  attempts++;

  question.textContent = texts[Math.min(attempts - 1, texts.length - 1)];

  let x = randomSignedOffset();
  let y = randomSignedOffset();
  const noScale = Math.max(0.3, 1 - attempts * 0.15);
  clampNoButtonTranslate(x, y, noScale);

  const yesScale = 1 + attempts * 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.zIndex = "1";
  noBtn.style.zIndex = "10";

  if (attempts >= texts.length) {
    noBtn.style.display = "none";
    noBtn.style.pointerEvents = "none";
    question.textContent = "Okay okay 😌 Just press YES ❤️";
  }
}

noBtn.addEventListener("pointerenter", (e) => {
  if (e.pointerType !== "mouse") return;
  onNoEvade();
});

noBtn.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse") return;
  onNoEvade();
});

yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div class="success-screen">
      <h1>Yayyyy 💖</h1>
      <p>We are officially going on Burmese lunch date! 😍</p>
      <img src="siuu.gif" alt="" class="success-screen__gif" decoding="async" />
    </div>
  `;
});
