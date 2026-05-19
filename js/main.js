(function () {
  "use strict";

  const PHOTO_ROOT = "Фото для кейсов";

  function photoUrl(folder, file) {
    const folderParts = String(folder || "")
      .split("/")
      .filter(Boolean);

    return [PHOTO_ROOT].concat(folderParts, [file])
      .map(function (part) {
        return encodeURIComponent(part);
      })
      .join("/");
  }

  const CASE_PHOTOS = {
    seminars4: {
      folder: "4 семинара",
      files: [
        "1.webp",
        "2.webp",
        "3.webp",
        "4.webp",
        "5.webp",
        "6.webp",
        "7.webp",
        "8.webp",
        "9.webp",
        "10.webp",
        "11.webp",
        "12.webp",
        "13.webp",
        "14.webp",
        "15.webp",
        "16.webp",
      ],
    },
    seminars2: {
      folder: "2 семинара",
      files: [
        "1.webp",
        "2.webp",
        "3.webp",
        "4.webp",
        "5.webp",
        "6.webp",
        "7.webp",
        "8.webp",
        "9.webp",
        "10.webp",
        "11.webp",
        "12.webp",
        "13.webp",
        "14.webp",
        "15.webp",
        "16.webp",
        "17.webp",
        "18.webp",
        "19.webp",
        "20.webp",
      ],
    },
    tourism: {
      folder: "Туризм",
      files: [
        "1.webp",
        "2.webp",
        "3.webp",
        "4.webp",
        "5.webp",
        "6.webp",
        "7.webp",
        "8.webp",
        "9.webp",
        "10.webp",
        "11.webp",
        "12.webp",
        "13.webp",
        "14.webp",
        "15.webp",
        "16.webp",
        "17.webp",
        "18.webp",
        "19.webp",
        "20.webp",
        "21.webp",
        "22.webp",
        "23.webp",
        "24.webp",
        "25.webp",
        "26.webp",
        "27.webp",
        "28.webp",
        "29.webp",
        "30.webp",
      ],
    },
    molodoy: {
      folder: "Молодой город",
      files: [
        "1.webp",
        "2.webp",
        "3.webp",
        "4.webp",
        "5.webp",
        "6.webp",
        "7.webp",
        "8.webp",
        "9.webp",
        "10.webp",
        "11.webp",
        "12.webp",
        "13.webp",
        "14.webp",
        "15.webp",
        "16.webp",
        "17.webp",
        "18.webp",
        "19.webp",
        "20.webp",
        "21.webp",
        "22.webp",
        "23.webp",
        "24.webp",
        "25.webp",
      ],
    },
  };

  const cases = {
    seminars4: {
      title: "Комплекс услуг в рамках проведения четырёх Семинаров",
      meta: "ФГБНУ «Институт изучения детства, семьи и воспитания» · Республика Калмыкия, Республика Дагестан, Липецкая и Брянская области",
      body: "<p>Комплекс услуг в рамках проведения четырёх семинаров для федерального заказчика.</p><p>География охвата — четыре субъекта РФ; полный цикл организации и сопровождения в рамках контракта.</p>",
      eis: "https://zakupki.gov.ru/epz/order/notice/zk20/view/common-info.html?regNumber=0373100134325000034",
    },
    seminars2: {
      title: "Комплекс услуг в рамках проведения двух Семинаров",
      meta: "ФГБНУ «Институт изучения детства, семьи и воспитания» · г. Владикавказ, г. Владимир",
      body: "<p>Комплекс услуг в рамках проведения двух семинаров.</p><p>Реализация на площадках в двух регионах с единым стандартом качества для заказчика.</p>",
      eis: "https://zakupki.gov.ru/epz/order/notice/zk20/view/common-info.html?regNumber=0373100134325000036",
    },
    tourism: {
      title:
        'Организация и проведение заседания коллегии Государственного комитета Республики Татарстан по туризму "Об итогах работы в 2025 году и задачах на 2026 год"',
      meta: "Госкомитет Республики Татарстан по туризму · г. Казань",
      body: "<p>Организация и проведение заседания коллегии Госкомитета РТ по туризму «Об итогах работы в 2025 году и задачах на 2026 год».</p>",
      eis: "https://zakupki.gov.ru/epz/order/notice/ea20/view/common-info.html?regNumber=0111200000925000703",
    },
    molodoy: {
      title: "Организация программы форума «Молодой город»",
      meta: "ГБУ КО «Областной молодёжный центр» · г. Калуга",
      body: "<p>Организация программы форума «Молодой город» для регионального заказчика.</p>",
      eis: "https://zakupki.gov.ru/epz/order/notice/zk20/view/common-info.html?regNumber=0137200001226001762",
    },
  };
  const CASE_ORDER = ["seminars4", "seminars2", "tourism", "molodoy"];

  const members = {
    ekaterina: {
      name: "Екатерина Алмаз",
      role: "Исполнительный директор",
      desc: "Следит за всеми глобальными процессами компании, обеспечивает финансирование проектов, порой не спит ночами, чтобы Заказчик был доволен проектом.",
      s1: "6 лет",
      s2: "56",
      s2Lab: "Контракты",
      s3: "176 млн\u00a0₽",
      s3Lab: "Сумма проектов",
      experience:
        "6 лет в тендерах в сфере организации мероприятий по всей России\n\n" +
        "Сопровождение 56 контрактов на сумму 176 млн. в части юридического сопровождения, контроля соблюдения сроков по техническому заданию, отчётной документации.\n\n" +
        "Работала с Заказчиками:\n\n" +
        "- Министерство Внутренней Политики Приморского края\n" +
        "- Управление Делами Мэра и Правительства Москвы\n" +
        "- Государственный Комитет Республики Татарстан по Туризму\n" +
        "- Федеральное агентство по делам молодежи\n" +
        "- Министерство туризма Ставропольского Края\n" +
        "- ГБУ КО ОМЦ Калуга\n" +
        "- МБУМП «МКДЦ» Мурманской области\n" +
        "- Администрация Сургутского района",
    },
    marina: {
      name: "Марина Плеханова",
      role: "Руководитель тендерного отдела",
      desc:
        "Мы называем её «счастливой рукой» нашей команды.\n\n" +
        "Увидела, просчитала, выиграла — это точно про Марину.\n\n" +
        "Она знает всё о тендерных площадках, заявках и УПД: следит, чтобы документы подгружались и подписывались оперативно и без ошибок.",
      s1: "4 года",
      s2: "134+",
      s2Lab: "Выигранных контрактов",
      s3: "420+ млн\u00a0₽",
      s3Lab: "Объём контрактов",
      experience:
        "4 года в государственных закупках\n\n" +
        "Выиграно 134+ контрактов по 44-ФЗ, 223-ФЗ на сумму 420+ млн.",
    },
    lyubov: {
      name: "Любовь Пасека",
      role: "Руководитель отдела реализации / дизайнер",
      desc: "Сделать макеты за сутки — она готова; найти подход к любому Заказчику — это про неё; творческая изюминка нашей команды.",
      s1: "2 года",
      s2: "800–1000",
      s2Lab: "Участников форумов",
      s3: "44-ФЗ",
      s3Lab: "Сопровождение",
      experience:
        "2 года в организации мероприятий разного формата:\n\n" +
        "- Тренинги на 300–500 человек\n" +
        "- Бизнес-форумы на 800–1000 человек\n" +
        "- Тендеры по ФЗ-44 разного уровня сложности от администрации Республики Татарстан, города Москвы, Московской области\n\n" +
        "Опыт работы с такими спикерами, как:\n\n" +
        "- Алексей Ситников\n" +
        "- Владимир Якуба\n" +
        "- Игорь Рызов\n" +
        "- Евгений Колотилов\n" +
        "- Сергей Рязанский\n\n" +
        "Государственные заказчики:\n\n" +
        "- ГБУ КО ОМЦ Калуга\n" +
        "- Государственный комитет Республики Татарстан по туризму\n" +
        "- ФГБНУ «Институт изучения детства, семьи и воспитания»",
    },
    anastasia: {
      name: "Анастасия Гармашова",
      role: "Руководитель проектного отдела",
      desc:
        "Контролирует самое важное — сроки и отчётность.\n\n" +
        "Структура во всём — её главный козырь, поэтому проекты реализуются чётко, как часы.\n\n" +
        "Именно Анастасия обладает редким талантом сдавать отчётность буквально в день проведения мероприятия.",
      s1: "3 года",
      s2: "30+",
      s2Lab: "Госконтрактов",
      s3: "2000+",
      s3Lab: "Отчётных документов",
      experience:
        "3 года в сфере организации мероприятий по всей России (государственные и бизнес-мероприятия)\n\n" +
        "Сопровождение 30+ гос.контрактов, также одновременное ведение до 14 проектов различной сложности с соблюдением сроков и бюджетов\n\n" +
        "Подготовка и сдача 2000+ отчётных документов государственному заказчику.\n\n" +
        "Опыт работы с тендерами по 44-ФЗ: просчёт тендеров, сбор документов, подача заявок\n\n" +
        "Работала со следующими государственными заказчиками:\n\n" +
        "- Федеральное агентство по делам молодёжи\n" +
        "- ФГБУ МПМЦ «Российский центр гражданского и патриотического воспитания детей и молодежи»\n" +
        "- ФГБУ «Российский детско-юношеский центр»\n" +
        "- Правительство Москвы\n" +
        "- Администрация Сургутского района\n" +
        "- Администрация Краснодарского края\n" +
        "- ГБУ г. Москвы «Московский дом общественных организаций»\n" +
        "- ГБУ «Московский дом национальностей»\n" +
        "- ГБУ ДПО г. Москвы «Московский центр воспитательных практик»\n" +
        "- ГБУ КО ОМЦ Калуга\n" +
        "- МБУ «Центр поддержки молодежных инициатив»\n" +
        "- Государственный комитет Республики Татарстан по туризму\n" +
        "- ФГБНУ «Институт изучения детства, семьи и воспитания»\n\n" +
        "Опыт организации мероприятий «под ключ»:\n\n" +
        "- Бизнес-форум «Трансформация бизнеса: вызовы и возможности» (800+ участников)\n" +
        "- Бизнес-тренинги по переговорам, продажам (на 100–350 человек)\n" +
        "- Концерты, церемонии награждения, бизнес-завтраки, семинары, мастер-классы, вебинары, деловые встречи\n\n" +
        "Работа с топовыми спикерами в сфере переговоров, продаж и маркетинга:\n\n" +
        "- Радислав Гандапас\n" +
        "- Евгений Колотилов\n" +
        "- Илья Балахнин\n" +
        "- Игорь Рызов\n" +
        "- Владимир Якуба",
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
  const tooltipMoreBtn = document.getElementById("tooltipMoreBtn");
  let tooltipDetailOpen = false;

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

  function experienceToHtml(text) {
    if (!text || typeof text !== "string") return "";
    return text
      .split(/\n\n+/)
      .map(function (block) {
        const b = block.trim();
        if (!b) return "";

        const lines = b
          .split("\n")
          .map(function (l) {
            return l.trim();
          })
          .filter(Boolean);

        if (
          lines.length >= 2 &&
          lines.every(function (l) {
            return /^[-–—]/.test(l);
          })
        ) {
          return (
            '<ul class="tooltip-list">' +
            lines
              .map(function (l) {
                const item = l.replace(/^[-–—]\s*/, "").trim();
                return "<li>" + escapeHtml(item) + "</li>";
              })
              .join("") +
            "</ul>"
          );
        }

        if (
          lines.length === 1 &&
          /:$/.test(lines[0]) &&
          !/^[-–—]/.test(lines[0])
        ) {
          return (
            '<div class="tooltip-kicker">' + escapeHtml(lines[0]) + "</div>"
          );
        }

        const body = lines.join("\n");
        return (
          "<p>" +
          escapeHtml(body).replace(/\n/g, "<br>") +
          "</p>"
        );
      })
      .join("");
  }

  // --- Интерактивный круг: 4 отдельных SVG (viewBox 1000×1000), hit-слой, тултип внутри контейнера ---
  const teamCircle = document.getElementById("teamCircle");
  let hoverMemberKey = null;
  let activeQuarterEl = null;
  let teamLeaveTimer = null;
  let tooltipFreezeCloseUntil = 0;
  const tooltipPositionClasses = [
    "tooltip--pos-ekaterina",
    "tooltip--pos-marina",
    "tooltip--pos-lyubov",
    "tooltip--pos-anastasia",
  ];

  function cancelTeamLeaveSchedule() {
    if (teamLeaveTimer !== null) {
      clearTimeout(teamLeaveTimer);
      teamLeaveTimer = null;
    }
  }

  function scheduleTeamLeave() {
    cancelTeamLeaveSchedule();
    const remainingFreezeMs = tooltipFreezeCloseUntil - Date.now();
    if (remainingFreezeMs > 0) {
      teamLeaveTimer = setTimeout(scheduleTeamLeave, remainingFreezeMs + 16);
      return;
    }
    teamLeaveTimer = setTimeout(function () {
      teamLeaveTimer = null;
      clearMemberTooltip();
    }, 220);
  }

  function collapseTooltipMore() {
    tooltipDetailOpen = false;
    if (tooltip) {
      tooltip.classList.remove("tooltip--expanded");
    }
    if (tooltipMoreBtn) {
      tooltipMoreBtn.setAttribute("aria-expanded", "false");
      tooltipMoreBtn.textContent = "Подробнее об опыте";
    }
  }

  function showMemberTooltip(key) {
    const data = members[key];
    if (!data || !tooltip) return;

    collapseTooltipMore();

    tName.textContent = data.name;
    tRole.textContent = data.role;
    tDesc.innerHTML = descToHtml(data.desc);
    ts1.textContent = data.s1;
    ts2.textContent = data.s2;
    ts3.textContent = data.s3;
    ts2Lab.textContent = data.s2Lab || "Показатель";
    ts3Lab.textContent = data.s3Lab || "Показатель";

    if (data.experience && tooltipMoreBtn) {
      tooltipMoreBtn.hidden = false;
    } else if (tooltipMoreBtn) {
      tooltipMoreBtn.hidden = true;
    }

    tooltip.classList.remove(...tooltipPositionClasses);
    tooltip.classList.remove("tooltip--expanded");
    tooltip.classList.add("tooltip--pos-" + key, "is-active");
  }

  function activateMember(key) {
    cancelTeamLeaveSchedule();
    const data = members[key];
    if (!data || !teamCircle) return;

    const quarter = teamCircle.querySelector(
      '.team-quarter[data-member="' + key + '"]',
    );
    if (!quarter) return;

    if (activeQuarterEl && activeQuarterEl !== quarter) {
      activeQuarterEl.classList.remove("is-hover");
    }

    activeQuarterEl = quarter;
    hoverMemberKey = key;
    quarter.classList.add("is-hover");
    teamCircle.classList.add("is-active");
    showMemberTooltip(key);
  }

  function clearMemberTooltip() {
    cancelTeamLeaveSchedule();
    hoverMemberKey = null;
    if (activeQuarterEl) activeQuarterEl.classList.remove("is-hover");
    activeQuarterEl = null;
    if (teamCircle) teamCircle.classList.remove("is-active");
    collapseTooltipMore();
    if (tooltipMoreBtn) {
      tooltipMoreBtn.hidden = true;
    }
    if (tooltip) {
      // Keep last position class during fade-out to avoid jump flicker.
      // Next hover resets position classes in showMemberTooltip().
      tooltip.classList.remove("is-active");
    }
  }

  const hitPaths = teamCircle
    ? teamCircle.querySelectorAll(".team-circle-hits path[data-member]")
    : [];

  hitPaths.forEach(function (hitPath) {
    const key = hitPath.getAttribute("data-member");
    if (!key || !teamCircle) return;
    const data = members[key];

    hitPath.setAttribute("tabindex", "0");
    hitPath.setAttribute("focusable", "true");
    hitPath.setAttribute("role", "button");
    if (data) {
      hitPath.setAttribute("aria-label", data.name + " — " + data.role);
    }

    hitPath.addEventListener("pointerenter", function () {
      activateMember(key);
    });

    hitPath.addEventListener("focus", function () {
      activateMember(key);
    });

    hitPath.addEventListener("pointerleave", function () {
      if (hoverMemberKey === key && document.activeElement !== hitPath) {
        scheduleTeamLeave();
      }
    });

    hitPath.addEventListener("blur", function () {
      if (hoverMemberKey === key) clearMemberTooltip();
    });

    hitPath.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateMember(key);
      }
      if (e.key === "Escape") {
        hitPath.blur();
        clearMemberTooltip();
      }
    });
  });

  if (teamCircle) {
    teamCircle.addEventListener("pointerleave", scheduleTeamLeave);
  }

  if (tooltip) {
    tooltip.addEventListener("pointerenter", cancelTeamLeaveSchedule);
    tooltip.addEventListener("pointerleave", scheduleTeamLeave);
  }

  if (tooltipMoreBtn && tooltip) {
    tooltipMoreBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (!hoverMemberKey) return;
      const data = members[hoverMemberKey];
      if (!data) return;

      tooltipFreezeCloseUntil = Date.now() + 550;
      cancelTeamLeaveSchedule();

      tooltipDetailOpen = !tooltipDetailOpen;
      tooltip.classList.toggle("tooltip--expanded", tooltipDetailOpen);
      tooltipMoreBtn.setAttribute(
        "aria-expanded",
        tooltipDetailOpen ? "true" : "false",
      );
      tooltipMoreBtn.textContent = tooltipDetailOpen
        ? "Краткое описание"
        : "Подробнее об опыте";

      if (tooltipDetailOpen) {
        tDesc.innerHTML = experienceToHtml(data.experience || "");
      } else {
        tDesc.innerHTML = descToHtml(data.desc || "");
      }

    });
  }

  const modal = document.getElementById("modal");
  const projectsModal = document.getElementById("projectsModal");
  const casesAllBtn = document.getElementById("casesAllBtn");
  const casesRows = document.getElementById("casesRows");
  const projectsRows = document.getElementById("projectsRows");
  const modalTitle = document.getElementById("modalTitle");
  const modalMeta = document.getElementById("modalMeta");
  const modalBody = document.getElementById("modalBody");
  const modalEis = document.getElementById("modalEis");
  const galleryImg = document.getElementById("modalGalleryImg");
  const galleryLoader = document.getElementById("modalGalleryLoader");
  const galleryCount = document.getElementById("modalGalleryCount");
  const galleryPrev = document.getElementById("galleryPrev");
  const galleryNext = document.getElementById("galleryNext");
  const galleryFrame = document.getElementById("modalViewport");

  const galleryState = { urls: [], index: 0, title: "" };
  const preloadCache = new Set();
  let galleryRequestId = 0;
  let reopenProjectsAfterCaseClose = false;

  function setGalleryLoading(isLoading) {
    if (!galleryFrame) return;
    galleryFrame.classList.toggle("is-loading", Boolean(isLoading));
    if (galleryLoader) {
      galleryLoader.setAttribute("aria-hidden", isLoading ? "false" : "true");
    }
  }

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

  function warmupCasePhotos() {
    Object.keys(CASE_PHOTOS).forEach(function (caseId) {
      const urls = buildGalleryUrls(caseId);
      // Warm first frames for instant open, defer the rest.
      urls.slice(0, 4).forEach(preloadImage);

      if (urls.length > 4) {
        const defer = function () {
          urls.slice(4).forEach(preloadImage);
        };
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(defer, { timeout: 2500 });
        } else {
          setTimeout(defer, 1200);
        }
      }
    });
  }

  function updateGalleryView() {
    const n = galleryState.urls.length;
    if (n === 0) {
      galleryImg.removeAttribute("src");
      galleryImg.alt = "";
      galleryCount.textContent = "";
      setGalleryLoading(false);
      return;
    }
    galleryState.index = ((galleryState.index % n) + n) % n;
    const url = galleryState.urls[galleryState.index];
    const requestId = ++galleryRequestId;

    galleryImg.alt =
      galleryState.title + " — фото " + (galleryState.index + 1) + " из " + n;
    galleryCount.textContent = galleryState.index + 1 + " / " + n;
    setGalleryLoading(true);

    const nextImage = new Image();
    nextImage.decoding = "async";
    nextImage.loading = "eager";
    nextImage.src = url;
    nextImage.onload = function () {
      if (requestId !== galleryRequestId) return;
      galleryImg.decoding = "async";
      galleryImg.loading = "eager";
      galleryImg.src = url;
      setGalleryLoading(false);
    };
    nextImage.onerror = function () {
      if (requestId !== galleryRequestId) return;
      galleryImg.removeAttribute("src");
      setGalleryLoading(false);
    };

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

    if (projectsModal && projectsModal.classList.contains("is-open")) {
      reopenProjectsAfterCaseClose = true;
      projectsModal.classList.remove("is-open");
    } else {
      reopenProjectsAfterCaseClose = false;
    }

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
    if (reopenProjectsAfterCaseClose && projectsModal) {
      projectsModal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    reopenProjectsAfterCaseClose = false;
    galleryRequestId += 1;
    setGalleryLoading(false);
    galleryImg.removeAttribute("src");
  }

  function buildCaseRow(id, index, opts) {
    const c = cases[id];
    if (!c) return "";
    const compactMeta = c.meta.replace(/\s*·\s*/g, " · ");
    const number = String(index + 1).padStart(2, "0");
    const modeClass = opts && opts.all ? " cases-row--all" : "";
    return (
      '<div class="cases-row cases-row--data' +
      modeClass +
      '" role="button" tabindex="0" data-case="' +
      id +
      '">' +
      '<span class="mono" role="cell">' +
      number +
      "</span>" +
      '<span role="cell"><strong>' +
      escapeHtml(c.title) +
      "</strong></span>" +
      '<span role="cell" class="cases-loc">' +
      escapeHtml(compactMeta) +
      "</span>" +
      '<span role="cell"><a class="eis-link" href="' +
      c.eis +
      '" target="_blank" rel="noopener noreferrer">ЕИС</a></span>' +
      "</div>"
    );
  }

  function renderCasesTables() {
    const orderedIds = CASE_ORDER.filter(function (id) {
      return Boolean(cases[id]);
    });
    const featuredIds = orderedIds.slice(0, 4);

    if (casesRows) {
      casesRows.innerHTML = featuredIds
        .map(function (id, i) {
          return buildCaseRow(id, i, { all: false });
        })
        .join("");
    }

    if (projectsRows) {
      projectsRows.innerHTML = orderedIds
        .map(function (id, i) {
          return buildCaseRow(id, i, { all: true });
        })
        .join("");
    }
  }

  function bindCaseRows(rootEl) {
    if (!rootEl) return;
    rootEl.querySelectorAll(".cases-row--data").forEach(function (row) {
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
  }

  function openProjectsModal() {
    if (!projectsModal) return;
    projectsModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeProjectsModal() {
    if (!projectsModal) return;
    projectsModal.classList.remove("is-open");
    reopenProjectsAfterCaseClose = false;
    if (!modal.classList.contains("is-open")) {
      document.body.style.overflow = "";
    }
  }

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
  if (projectsModal) {
    projectsModal
      .querySelectorAll("[data-close-projects-modal]")
      .forEach(function (el) {
        el.addEventListener("click", closeProjectsModal);
      });
  }
  if (casesAllBtn) {
    casesAllBtn.addEventListener("click", function () {
      openProjectsModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    const isCaseModalOpen = modal.classList.contains("is-open");
    const isProjectsOpen =
      projectsModal && projectsModal.classList.contains("is-open");

    if (!isCaseModalOpen && !isProjectsOpen) return;
    if (e.key === "Escape") {
      if (isCaseModalOpen) closeModal();
      if (isProjectsOpen) closeProjectsModal();
      return;
    }
    if (isCaseModalOpen && e.key === "ArrowLeft") {
      e.preventDefault();
      galleryStep(-1);
    }
    if (isCaseModalOpen && e.key === "ArrowRight") {
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
  renderCasesTables();
  bindCaseRows(casesRows);
  bindCaseRows(projectsRows);
  warmupCasePhotos();

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
