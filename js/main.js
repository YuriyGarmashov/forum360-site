(function () {
  "use strict";

  const PHOTO_ROOT = "Фото для кейсов";

  function photoUrl(folder, file) {
    return [PHOTO_ROOT, folder, file]
      .map(function (part) {
        return encodeURIComponent(part);
      })
      .join("/");
  }

  const CASE_PHOTOS = {
    seminars4: {
      folder: "4 семинара",
      files: [
        "_ANO2888.jpg",
        "_ANO2900.jpg",
        "_ANO2902.jpg",
        "_ANO2927.jpg",
        "_ANO2974.jpg",
        "_ANO3270.jpg",
        "_ANO3556.jpg",
        "C2_08837.jpg",
        "C2_08892.jpg",
        "C2_09171.jpg",
        "C2_09662.jpg",
        "IMG_1246.jpeg",
        "IMG_1247.jpeg",
        "IMG_1248.jpeg",
        "IMG_1249.jpeg",
        "IMG_1250.jpeg",
        "IMG_1251.jpeg",
        "IMG_8298.jpg",
        "IMG_8760.jpg",
      ],
    },
    seminars2: {
      folder: "2 семинара",
      files: [
        "0P8A4231.jpg",
        "0P8A4234.jpg",
        "0P8A4243.jpg",
        "0P8A4497.jpg",
        "151025 - 2 (1).jpg",
        "151025 - 2 (2).jpg",
        "151025 - 2 (3).jpg",
        "20251016-1 (4).jpg",
        "20251016-2 (46).jpg",
        "20251017-2 (10).jpg",
        "IMG_1262.png",
        "IMG_1263.png",
        "IMG_1264.png",
        "IMG_1265.png",
        "IMG_1266.png",
        "IMG_1267.png",
        "IMG_1268.png",
        "IMG_1269.png",
        "IMG_1270.png",
        "IMG_8481.JPG",
      ],
    },
    tourism: {
      folder: "Туризм",
      files: [
        "FRV (107 из 320).jpg",
        "FRV (124 из 320).jpg",
        "FRV (129 из 320).jpg",
        "FRV (143 из 320).jpg",
        "FRV (197 из 320).jpg",
        "FRV (262 из 320).jpg",
        "FRV (309 из 320).jpg",
        "FRV (34 из 320).jpg",
        "FRV (340 из 214).jpg",
        "FRV (341 из 214).jpg",
        "FRV (342 из 214).jpg",
        "FRV (363 из 214).jpg",
        "FRV (370 из 214).jpg",
        "FRV (379 из 214).jpg",
        "FRV (6 из 320).jpg",
        "FRV (7 из 320).jpg",
        "FRV (73 из 320).jpg",
        "FRV (8 из 320).jpg",
        "IMG_1233.jpeg",
        "IMG_1234.jpeg",
        "IMG_1235.jpeg",
        "IMG_1236.jpeg",
        "IMG_1237.jpeg",
        "IMG_1238.jpeg",
        "IMG_1239.jpeg",
        "IMG_1240.jpeg",
        "IMG_1243.jpeg",
        "IMG_1244.jpeg",
        "IMG_1245.jpeg",
        "IMG_1252.jpeg",
        "IMG_9686.jpeg",
        "IMG_9687.jpeg",
      ],
    },
    molodoy: {
      folder: "Молодой город",
      files: [
        "IMG_0467.jpeg",
        "IMG_0493.jpeg",
        "IMG_0509.jpeg",
        "IMG_0522.jpeg",
        "IMG_0523.jpeg",
        "IMG_0582.jpeg",
        "IMG_0584.jpeg",
        "IMG_0601.jpeg",
        "IMG_0602.jpeg",
        "IMG_0614.jpeg",
        "IMG_1219.jpeg",
        "IMG_1220.jpeg",
        "IMG_1221.jpeg",
        "IMG_1256.png",
        "IMG_1257.png",
        "IMG_1258.png",
        "IMG_1259.png",
        "IMG_1260.png",
        "IMG_1261.png",
      ],
    },
  };

  const cases = {
    seminars4: {
      title: "Семинары 4",
      meta: "ФГБНУ «Институт изучения детства, семьи и воспитания» · Республика Калмыкия, Республика Дагестан, Липецкая и Брянская области",
      body: "<p>Комплекс услуг в рамках проведения четырёх семинаров для федерального заказчика.</p><p>География охвата — четыре субъекта РФ; полный цикл организации и сопровождения в рамках контракта.</p>",
      eis: "https://zakupki.gov.ru/epz/order/notice/zk20/view/common-info.html?regNumber=0373100134325000034",
    },
    seminars2: {
      title: "Семинары 2",
      meta: "ФГБНУ «Институт изучения детства, семьи и воспитания» · г. Владикавказ, г. Владимир",
      body: "<p>Комплекс услуг в рамках проведения двух семинаров.</p><p>Реализация на площадках в двух регионах с единым стандартом качества для заказчика.</p>",
      eis: "https://zakupki.gov.ru/epz/order/notice/zk20/view/common-info.html?regNumber=0373100134325000036",
    },
    tourism: {
      title: "Туризм",
      meta: "Госкомитет Республики Татарстан по туризму · г. Казань",
      body: "<p>Организация и проведение заседания коллегии Госкомитета РТ по туризму «Об итогах работы в 2025 году и задачах на 2026 год».</p>",
      eis: "https://zakupki.gov.ru/epz/order/notice/ea20/view/common-info.html?regNumber=0111200000925000703",
    },
    molodoy: {
      title: "Молодой город",
      meta: "ГБУ КО «Областной молодёжный центр» · г. Калуга",
      body: "<p>Организация программы форума «Молодой город» для регионального заказчика.</p>",
      eis: "https://zakupki.gov.ru/epz/order/notice/zk20/view/common-info.html?regNumber=0137200001226001762",
    },
  };

  const members = {
    ekaterina: {
      name: "Екатерина Алмаз",
      role: "Исполнительный директор",
      desc: "Держит общий контур: финансы, процессы и качество результата.\n\nКлючевые задачи\n\n• бюджет и договорная часть\n• координация команды и подрядчиков\n• контроль сроков и отчётности\n\nОпыт: 6 лет. Ключевые заказчики: Правительство Москвы, Росмолодёжь, Госкомитет РТ по туризму.",
      s1: "6 лет",
      s2: "56",
      s2Lab: "Контракты",
      s3: "176 млн ₽",
      s3Lab: "Сумма проектов",
    },
    marina: {
      name: "Марина Плеханова",
      role: "Руководитель тендерного отдела",
      desc: "Тендерный контур: от подбора закупки до подачи и сопровождения.\n\nКлючевые задачи\n\n• анализ закупок и расчёты\n• заявки и документация\n• контроль ЭЦП и сроков\n\nОпыт: 4 года. 134+ выигранных контрактов.",
      s1: "4 года",
      s2: "134+",
      s2Lab: "Выигранных контрактов",
      s3: "420+ млн ₽",
      s3Lab: "Объём контрактов",
    },
    lyubov: {
      name: "Любовь Пасека",
      role: "Руководитель отдела реализации / дизайнер",
      desc: "Реализация мероприятий и дизайн — делает так, чтобы и выглядело, и работало.\n\nКлючевые задачи\n\n• визуал и материалы\n• подрядчики и логистика\n• коммуникация с заказчиком\n\nОпыт: 2 года. Форматы: 300–1000 участников, сопровождение 44‑ФЗ.",
      s1: "2 года",
      s2: "800–1000",
      s2Lab: "Участников форумов",
      s3: "44-ФЗ",
      s3Lab: "Сопровождение",
    },
    anastasia: {
      name: "Анастасия Гармашова",
      role: "Руководитель проектного отдела",
      desc: "Проектный контур: дедлайны, контроль ТЗ и отчётность.\n\nКлючевые задачи\n\n• планирование и контроль сроков\n• отчётные документы\n• координация команды на площадке\n\nОпыт: 3 года. Форматы: форумы 800+, тренинги 100–350, вебинары.",
      s1: "3 года",
      s2: "30+",
      s2Lab: "Госконтрактов",
      s3: "2000+",
      s3Lab: "Отчётных документов",
    },
  };

  const tooltip = document.getElementById("tooltip");
  const tName = document.getElementById("tName");
  const tRole = document.getElementById("tRole");
  const tDesc = document.getElementById("tDesc");
  const ts1 = document.getElementById("tStat1");
  const ts2 = document.getElementById("tStat2");
  const ts3 = document.getElementById("tStat3");
  const ts2Lab = document.getElementById("tStat2Lab");
  const ts3Lab = document.getElementById("tStat3Lab");

  function descToHtml(text) {
    return text
      .split("\n\n")
      .map(function (p) {
        const chunk = p.trim();
        if (!chunk) return "";

        if (
          /^(Ключевые задачи|Проекты и заказчики|Среди заказчиков)$/i.test(
            chunk,
          )
        ) {
          return '<div class="tooltip-kicker">' + escapeHtml(chunk) + "</div>";
        }

        const lines = chunk
          .split("\n")
          .map(function (l) {
            return l.trim();
          })
          .filter(Boolean);

        const isList =
          lines.length > 1 &&
          lines.every(function (l) {
            return l.startsWith("• ") || l.startsWith("- ");
          });

        if (isList) {
          return (
            '<ul class="tooltip-list">' +
            lines
              .map(function (l) {
                const item = l.slice(1).trim();
                return "<li>" + escapeHtml(item) + "</li>";
              })
              .join("") +
            "</ul>"
          );
        }

        return "<p>" + escapeHtml(chunk.replace(/\n/g, " ")) + "</p>";
      })
      .join("");
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // --- SVG-секторы команды ---
  const teamSectors = document.querySelector(".team-sectors");
  let activeSector = null;

  if (teamSectors) {
    teamSectors.addEventListener("mousemove", function (e) {
      const target = e.target;
      const isSector = target.classList && target.classList.contains("sector");

      if (!isSector) {
        if (activeSector) {
          activeSector = null;
        }
        tooltip.classList.remove("is-active");
        return;
      }

      const key = target.getAttribute("data-member");
      const data = members[key];
      if (!data) return;

      if (target !== activeSector) {
        activeSector = target;

        tName.textContent = data.name;
        tRole.textContent = data.role;
        tDesc.innerHTML = descToHtml(data.desc);
        ts1.textContent = data.s1;
        ts2.textContent = data.s2;
        ts3.textContent = data.s3;
        ts2Lab.textContent = data.s2Lab || "Показатель";
        ts3Lab.textContent = data.s3Lab || "Показатель";
      }

      const pad = 16;
      const tw = tooltip.offsetWidth;
      const th = tooltip.offsetHeight;
      let x = e.clientX + 20;
      let y = e.clientY + 20;
      if (x + tw > window.innerWidth - pad) x = window.innerWidth - tw - pad;
      if (y + th > window.innerHeight - pad) y = window.innerHeight - th - pad;
      if (x < pad) x = pad;
      if (y < pad) y = pad;

      tooltip.style.left = x + "px";
      tooltip.style.top = y + "px";
      tooltip.classList.add("is-active");
    });

    teamSectors.addEventListener("mouseleave", function () {
      activeSector = null;
      tooltip.classList.remove("is-active");
    });
  }

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMeta = document.getElementById("modalMeta");
  const modalBody = document.getElementById("modalBody");
  const modalEis = document.getElementById("modalEis");
  const galleryImg = document.getElementById("modalGalleryImg");
  const galleryCount = document.getElementById("modalGalleryCount");
  const galleryPrev = document.getElementById("galleryPrev");
  const galleryNext = document.getElementById("galleryNext");
  const galleryFrame = document.getElementById("modalViewport");

  const galleryState = { urls: [], index: 0, title: "" };
  const preloadCache = new Set();

  function preloadImage(url) {
    if (!url || preloadCache.has(url)) return;
    preloadCache.add(url);
    const img = new Image();
    img.decoding = "async";
    img.src = url;
  }

  function buildGalleryUrls(caseId) {
    const pack = CASE_PHOTOS[caseId];
    if (!pack) return [];
    return pack.files.map(function (f) {
      return photoUrl(pack.folder, f);
    });
  }

  function updateGalleryView() {
    const n = galleryState.urls.length;
    if (n === 0) {
      galleryImg.removeAttribute("src");
      galleryImg.alt = "";
      galleryCount.textContent = "";
      return;
    }
    galleryState.index = ((galleryState.index % n) + n) % n;
    const url = galleryState.urls[galleryState.index];
    galleryImg.decoding = "async";
    galleryImg.loading = "eager";
    galleryImg.src = url;
    galleryImg.alt =
      galleryState.title + " — фото " + (galleryState.index + 1) + " из " + n;
    galleryCount.textContent = galleryState.index + 1 + " / " + n;

    preloadImage(galleryState.urls[(galleryState.index + 1) % n]);
    preloadImage(galleryState.urls[(galleryState.index - 1 + n) % n]);
  }

  function galleryStep(delta) {
    if (galleryState.urls.length === 0) return;
    galleryState.index += delta;
    updateGalleryView();
  }

  function openModal(id) {
    const c = cases[id];
    if (!c) return;
    galleryState.urls = buildGalleryUrls(id);
    galleryState.index = 0;
    galleryState.title = c.title;

    modalTitle.textContent = c.title;
    modalMeta.textContent = c.meta;
    modalBody.innerHTML = c.body;
    modalEis.href = c.eis;
    updateGalleryView();

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    galleryImg.removeAttribute("src");
  }

  document.querySelectorAll(".cases-row--data").forEach(function (row) {
    row.addEventListener("click", function (e) {
      if (e.target.closest(".eis-link")) return;
      const id = row.getAttribute("data-case");
      if (id) openModal(id);
    });

    row.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        if (e.target.closest(".eis-link")) return;
        e.preventDefault();
        const id = row.getAttribute("data-case");
        if (id) openModal(id);
      }
    });
  });

  if (galleryPrev)
    galleryPrev.addEventListener("click", function () {
      galleryStep(-1);
    });
  if (galleryNext)
    galleryNext.addEventListener("click", function () {
      galleryStep(1);
    });

  let touchStartX = null;
  if (galleryFrame) {
    galleryFrame.addEventListener(
      "touchstart",
      function (e) {
        if (e.changedTouches.length) touchStartX = e.changedTouches[0].clientX;
      },
      { passive: true },
    );
    galleryFrame.addEventListener(
      "touchend",
      function (e) {
        if (touchStartX == null || !e.changedTouches.length) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(dx) < 48) return;
        if (dx > 0) galleryStep(-1);
        else galleryStep(1);
      },
      { passive: true },
    );
  }

  modal.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      galleryStep(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      galleryStep(1);
    }
  });

  const navToggle = document.querySelector(".nav-toggle");
  const navDrawer = document.getElementById("site-nav-menu");

  if (navToggle && navDrawer) {
    navToggle.addEventListener("click", function () {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", open ? "false" : "true");
      navDrawer.classList.toggle("is-open", !open);
    });

    navDrawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        navDrawer.classList.remove("is-open");
      });
    });
  }

  function initReveals() {
    const selectors = [
      ".hero-content",
      ".about-panel",
      ".team-wrapper",
      ".cases-table",
      ".footer-main",
      ".footer-strip",
    ];

    const nodes = [];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.classList.add("reveal");
        nodes.push(el);
      });
    });

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  initReveals();

  function updateFooterTime() {
    const el = document.getElementById("footer-time");
    if (!el) return;
    const fmt = new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Europe/Moscow",
      dateStyle: "short",
      timeStyle: "medium",
    });
    el.textContent = "UTC+03:00 — " + fmt.format(new Date());
  }

  updateFooterTime();
  setInterval(updateFooterTime, 1000);
})();
