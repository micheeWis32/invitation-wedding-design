(function () {
  "use strict";

  /* ---------- 1. Compte à rebours ---------- */
  var WEDDING = new Date("2026-08-22T10:00:00").getTime();
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var el = {
    d: document.getElementById("cd-d"),
    h: document.getElementById("cd-h"),
    m: document.getElementById("cd-m"),
    s: document.getElementById("cd-s")
  };

  function tick() {
    var diff = Math.max(0, WEDDING - Date.now());
    var s = Math.floor(diff / 1000);
    el.d.textContent = pad(Math.floor(s / 86400));
    el.h.textContent = pad(Math.floor((s % 86400) / 3600));
    el.m.textContent = pad(Math.floor((s % 3600) / 60));
    el.s.textContent = pad(s % 60);
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- 2. Apparition au scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add("is-in");
      else e.target.classList.remove("is-in");
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".reveal").forEach(function (n) { io.observe(n); });


  /* ---------- 3. Toast ---------- */
  var toast = document.getElementById("toast");
  var toastTimer;
  function notify(msg) {
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-on"); }, 3200);
  }


  /* ---------- 5. Préférences boisson ---------- */
  var chosen = [];
  document.getElementById("drinks").addEventListener("click", function (ev) {
    var btn = ev.target.closest(".drink");
    if (!btn) return;
    btn.classList.toggle("is-on");
    var name = btn.dataset.drink;
    var i = chosen.indexOf(name);
    if (i > -1) chosen.splice(i, 1); else chosen.push(name);
    notify(chosen.length ? "Préférences : " + chosen.join(", ") : "Aucune préférence sélectionnée");
  });

  /* ---------- 6. Livre d'or ---------- */
  var wishes = document.getElementById("wishes");
  document.getElementById("gb-send").addEventListener("click", function () {
    var name = document.getElementById("gb-name");
    var msg = document.getElementById("gb-msg");
    if (!msg.value.trim()) { notify("Écrivez un petit mot avant d'envoyer 💌"); msg.focus(); return; }
    var li = document.createElement("li");
    var b = document.createElement("b");
    b.textContent = name.value.trim() || "Un invité";
    var p = document.createElement("p");
    p.textContent = msg.value.trim();
    li.appendChild(b); li.appendChild(p);
    wishes.prepend(li);
    name.value = ""; msg.value = "";
    notify("Merci pour votre message ✨");
  });

  /* ---------- 7. Confirmation de présence ---------- */
  document.getElementById("rsvp").addEventListener("click", function () {
    this.textContent = "Présence confirmée ✓";
    notify("Votre présence est confirmée. À très vite !");
  });
})();

/* ---------- 8. Étoiles scintillantes ---------- */
(function () {
  var box = document.getElementById("stars");
  if (!box) return;
  for (var i = 0; i < 50; i++) {
    var s = document.createElement("i");
    var size = 3 + Math.random() * 4;
    s.className = "star";
    s.style.width = s.style.height = size.toFixed(1) + "px";
    s.style.left = (Math.random() * 100).toFixed(2) + "vw";
    s.style.animationDuration = (12 + Math.random() * 16).toFixed(1) + "s," + (1.6 + Math.random() * 2.4).toFixed(1) + "s";
    s.style.animationDelay = "-" + (Math.random() * 20).toFixed(1) + "s,-" + (Math.random() * 3).toFixed(1) + "s";
    box.appendChild(s);
  }
})();
