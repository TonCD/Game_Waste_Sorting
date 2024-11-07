(() => {
  "use strict";
  const e = [
      {
        name: "CHẤT THẢI RẮN CÓ KHẢ NĂNG TÁI SỬ DỤNG, TÁI CHẾ",
        colorName: "green",
        color: "#8ec10f",
        emojis: [
          "./assets/images/one/1.webp",
          "./assets/images/one/2.webp",
          "./assets/images/one/3.webp",
          "./assets/images/one/4.webp",
          "./assets/images/one/5.webp",
          "./assets/images/one/6.webp",
          "./assets/images/one/7.webp",
          "./assets/images/one/8.webp",
          "./assets/images/one/9.webp",
          "./assets/images/one/10.webp",
          "./assets/images/one/11.webp",
          "./assets/images/one/12.webp",
          "./assets/images/one/13.webp",
          "./assets/images/one/14.webp",
          "./assets/images/one/16.webp",
          "./assets/images/one/15.webp",
        ],
      },
      {
        name: "CHẤT THẢI THỰC PHẨM",
        colorName: "red",
        color: "#df2726",
        emojis: [
          "./assets/images/two/1.webp",
          "./assets/images/two/2.webp",
          "./assets/images/two/3.webp",
          "./assets/images/two/4.webp",
          "./assets/images/two/5.webp",
          "./assets/images/two/6.webp",
          "./assets/images/two/7.webp",
          "./assets/images/two/8.webp",
          "./assets/images/two/9.webp",
          "./assets/images/two/10.webp",
          "./assets/images/two/11.webp",
        ],
      },
      {
        name: "CHẤT THẢI RẮN SINH HOẠT KHÁC",
        colorName: "yellow",
        color: "#ffd204",
        emojis: [
          "./assets/images/three/1.webp",
          "./assets/images/three/2.webp",
          "./assets/images/three/3.webp",
          "./assets/images/three/4.webp",
          "./assets/images/three/5.webp",
          "./assets/images/three/6.webp",
          "./assets/images/three/7.webp",
        ],
      },
    ],
    t = document.querySelector(".answer__counter_right"),
    o = document.querySelector(".answer__counter_wrong"),
    n = document.querySelector(".timer__garbage"),
    r = document.querySelector(".timer__garbage-shadow"),
    c = document.querySelector(".timer__result"),
    s = document.querySelector(".info__play-again"),
    a = document.querySelector(".info__timer"),
    i = document.querySelector(".field__info"),
    l = document.querySelector(".field__header");
  let d,
    u = 0,
    m = 0,
    h = [],
    _ = [],
    y = 0,
    g = 0,
    f = !0,
    p = !1;
  const x = 700,
    b = 600;
  function L() {
    (_ = Object.values(e).map((e) => e.color)),
      (h = document.querySelectorAll(".bucket__container")),
      h.forEach((e) => {
        (e.style.cursor = "pointer"), e.addEventListener("click", v);
      }),
      s.addEventListener("click", q),
      S();
    const [t, o] = C(n);
    (u = t), (m = o), c.classList.remove("hidden");
  }
  function q() {
    s.classList.add("hidden"),
      a.classList.remove("hidden"),
      (i.style.justifyContent = "space-between"),
      (y = 0),
      (g = 0),
      (t.textContent = y),
      (o.textContent = g),
      (l.textContent = "Hãy phân loại rác nào~~"),
      L(),
      H();
  }
  function S() {
    const t = Math.floor(Math.random() * _.length),
      o = e[t],
      r = Math.floor(Math.random() * o.emojis.length),
      c = o.emojis[r];

    n.innerHTML = ""; // Xóa nội dung hiện tại
    const imgElement = document.createElement("img");
    imgElement.src = c; // Đặt src của ảnh
    imgElement.alt = o.name; // Đặt alt cho ảnh
    imgElement.classList.add("garbage-image");
    imgElement.loading = "lazy";

    n.appendChild(imgElement); // Thêm phần tử ảnh vào
    n.dataset.color = o.color;
    d = o.color;
    n.classList.remove("hidden");
  }
  function v(e) {
    if (p) return;
    c.classList.remove(f ? "right" : "wrong"), (p = !0);
    const s = e.target.closest(".bucket__container"),
      a = s.querySelector(`[data-color="${s.dataset.color}"`);
    r.classList.remove("hidden"),
      (r.style.backgroundColor = s.dataset.color),
      r.classList.remove("hidden"),
      s.dataset.color === d
        ? ((y += 1), (t.textContent = y), (f = !0))
        : ((g += 1), (o.textContent = g), (f = !1));
    const [i, l] = C(a);
    n.animate(
      [
        { width: "30px", height: "30px" },
        {
          transform: `translate(${i - u}px , ${l - m - 20}px)`,
          width: "20px",
          height: "20px",
        },
      ],
      { duration: x / 2, easing: "ease-in-out" }
    ),
      a.animate([{ top: "5px" }, { top: "-45px" }, { top: "5px" }], {
        duration: x,
        easing: "ease-in-out",
      }),
      r.animate(
        [
          { opacity: 1 },
          {
            transform: `translate(${i - u}px , ${l - m - 20}px)`,
            width: "20px",
            height: "20px",
          },
        ],
        { duration: x / 2, easing: "ease-in" }
      ),
      setTimeout(() => {
        c.classList.remove("hidden"),
          c.classList.add(f ? "right" : "wrong"),
          n.classList.add("hidden"),
          r.classList.add("hidden"),
          setTimeout(() => {
            c.classList.add("hidden");
          }, 1e3);
      }, x / 2.1),
      setTimeout(() => {
        p = !1;
      }, x + b),
      setTimeout(() => {
        S();
      }, x / 2 + b);
  }
  function C(e) {
    const { x: t, y: o, height: n, width: r } = e.getBoundingClientRect();
    return [(t + r / 2).toFixed(0), (o + n / 2).toFixed(0)];
  }
  const k = 283,
    w = 20;
  let $ = 0,
    j = w,
    N = null,
    E = !1;
  function H() {
    E || document.querySelector(".timer__start-button").classList.add("hidden"),
      L(),
      (N = setInterval(() => {
        ($ = $ += 1),
          (j = w - $),
          I(),
          0 === j &&
            (clearInterval(N),
            h.forEach((e) => {
              (e.style.cursor = "auto"), e.removeEventListener("click", v);
            }),
            s.removeEventListener("click", L),
            n.classList.add("hidden"),
            r.classList.add("hidden"),
            c.classList.add("hidden"),
            (i.style.justifyContent = "center"),
            a.classList.add("hidden"),
            s.classList.remove("hidden"),
            (l.textContent = `Bạn đã đúng ${y} trong ${y + g} câu ~~!`),
            ($ = 0),
            (j = w),
            I());
      }, 1e3));
  }
  function I() {
    const e = `${(
      (function () {
        const e = j / w;
        return e - (1 / w) * (1 - e);
      })() * k
    ).toFixed(0)} 283`;
    document
      .querySelector(".timer__path-remaining")
      .setAttribute("stroke-dasharray", e);
  }
  !(function () {
    !(function () {
      const t = document.querySelector(".buckets"),
        o = document.querySelector("#bucket");
      e.forEach((e, n) => {
        const r = o.content.cloneNode(!0),
          c = r.querySelector(".bucket__label");
        (c.textContent = e.name), (c.style.backgroundColor = e.color);
        const s = r.querySelector(".bucket__container"),
          a = r.querySelector(".bucket__top"),
          i = r.querySelector(".bucket__base");
        (a.style.zIndex = 50 - n),
          (i.style.zIndex = 100 - n),
          (s.dataset.color = e.color),
          (a.dataset.color = e.color),
          a.setAttribute("src", `./assets/images/wastetop_${e.colorName}.jpg`),
          a.setAttribute("alt", `wastetop_${e.colorName}`),
          i.setAttribute("src", `./assets/images/wastebox_${e.colorName}.jpg`),
          i.setAttribute("alt", `wastebox_${e.colorName}`),
          t.append(r);
      });
    })();
    const t = document.querySelector(".timer__start-button"),
      o = document.querySelector(".game__close");
    t.addEventListener("click", H),
      o.addEventListener("click", () => {
        console.log("close");
      });
  })();
})();
