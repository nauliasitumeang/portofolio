// ---------- Fade in & out saat scroll ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".fade").forEach((el) => observer.observe(el));

// ---------- Menu HP ----------
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ---------- Efek typing (hanya di index) ----------
const typingEl = document.getElementById("typing");
if (typingEl) {
  const phrases = ["Cybersecurity", "CTF Player", "Python Learner", "Digital Forensics"];
  let p = 0, c = 0, deleting = false;

  function type() {
    const current = phrases[p];
    if (!deleting) {
      c++;
      typingEl.textContent = current.slice(0, c);
      if (c === current.length) {
        deleting = true;
        setTimeout(type, 1500);
        return;
      }
    } else {
      c--;
      typingEl.textContent = current.slice(0, c);
      if (c === 0) {
        deleting = false;
        p = (p + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 50 : 100);
  }
  type();
}

// ---------- Skills marquee: menggandakan isi supaya looping mulus ----------
const skillsTrack = document.getElementById("skillsTrack");
if (skillsTrack) {
  skillsTrack.innerHTML += skillsTrack.innerHTML;
}

// ---------- Carousel sertifikat ----------
const certTrack = document.getElementById("certTrack");
if (certTrack) {
  const prev = document.getElementById("prevCert");
  const next = document.getElementById("nextCert");
  let paused = false;
  let resumeTimer;

  // lebar satu langkah = lebar kartu + jarak antar kartu
  function step() {
    const card = certTrack.querySelector(".cert-card");
    return card.offsetWidth + 24;
  }

  function slideNext() {
    const atEnd = certTrack.scrollLeft + certTrack.clientWidth >= certTrack.scrollWidth - 5;
    if (atEnd) {
      certTrack.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      certTrack.scrollBy({ left: step(), behavior: "smooth" });
    }
  }

  function slidePrev() {
    if (certTrack.scrollLeft <= 5) {
      certTrack.scrollTo({ left: certTrack.scrollWidth, behavior: "smooth" });
    } else {
      certTrack.scrollBy({ left: -step(), behavior: "smooth" });
    }
  }

  next.addEventListener("click", slideNext);
  prev.addEventListener("click", slidePrev);

  // geser otomatis tiap 4 detik, berhenti saat di-hover/disentuh
  setInterval(() => { if (!paused) slideNext(); }, 4000);

  function pause() { paused = true; clearTimeout(resumeTimer); }
  function resume() { resumeTimer = setTimeout(() => (paused = false), 3000); }

  certTrack.addEventListener("mouseenter", pause);
  certTrack.addEventListener("mouseleave", resume);
  certTrack.addEventListener("touchstart", pause, { passive: true });
  certTrack.addEventListener("touchend", resume);

  // drag dengan mouse di desktop
  let isDown = false, startX = 0, startScroll = 0;
  certTrack.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX;
    startScroll = certTrack.scrollLeft;
    certTrack.style.scrollSnapType = "none";
  });
  window.addEventListener("mouseup", () => {
    if (!isDown) return;
    isDown = false;
    certTrack.style.scrollSnapType = "x mandatory";
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    certTrack.scrollLeft = startScroll - (e.pageX - startX);
  });
}

// ---------- Menu aktif saat scroll (hanya di index) ----------
const sections = document.querySelectorAll("section[id]");
if (sections.length) {
  const links = document.querySelectorAll('.nav-links a[href^="index.html#"]');
  window.addEventListener("scroll", () => {
    let current = "home";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    links.forEach((l) => {
      l.classList.toggle("active", l.getAttribute("href") === "index.html#" + current);
    });
  });
}

// ---------- Tahun otomatis ----------
document.getElementById("year").textContent = new Date().getFullYear();