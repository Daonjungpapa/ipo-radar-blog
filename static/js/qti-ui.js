/* QTI Lab UI Interactions — Theme · Mobile Nav · Search · Sortable Table · TOC · B2B Form */
(function () {
  "use strict";

  /* ── 1. Theme Toggle (Light default + Dark toggle, persisted) ── */
  var root = document.documentElement;
  function applyTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem("qti-theme", theme); } catch (_) {}
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute("title", theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환");
    });
    window.dispatchEvent(new CustomEvent("qti:theme", { detail: { theme: theme } }));
  }
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  });

  /* ── 2. Mobile Navigation Drawer ── */
  var menuBtn = document.querySelector("[data-menu-toggle]");
  var drawer = document.getElementById("qti-mobile-drawer");
  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", function () {
      var open = drawer.hidden;
      drawer.hidden = !open;
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  /* ── 3. Reading Progress Bar & Back-to-Top ── */
  var prog = document.getElementById("qti-reading-progress");
  var topBtn = document.getElementById("qti-back-to-top");
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (prog) {
        var pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
        prog.style.transform = "scaleX(" + (pct / 100).toFixed(4) + ")";
      }
      if (topBtn) topBtn.classList.toggle("is-visible", y > 420);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();
  if (topBtn) {
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── 4. Sticky TOC Auto-Builder & Active Spy (R1 Detail) ── */
  var tocList = document.getElementById("qti-toc-list");
  var prose = document.querySelector(".qti-prose");
  if (tocList && prose) {
    var heads = prose.querySelectorAll("h2");
    if (!heads.length) {
      var box = tocList.closest(".qti-toc-card");
      if (box) box.hidden = true;
    } else {
      var links = [];
      heads.forEach(function (h, i) {
        if (!h.id) h.id = "sec-" + (i + 1);
        var a = document.createElement("a");
        a.href = "#" + h.id;
        a.textContent = (h.textContent || "").replace(/\s+/g, " ").trim();
        if (i === 0) a.classList.add("is-active");
        tocList.appendChild(a);
        links.push({ id: h.id, el: a });
      });
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (e) {
              if (!e.isIntersecting) return;
              links.forEach(function (l) { l.el.classList.toggle("is-active", l.id === e.target.id); });
            });
          },
          { rootMargin: "-18% 0px -70% 0px" }
        );
        heads.forEach(function (h) { io.observe(h); });
      }
    }
  }

  /* ── 5. Auto-Enhance First "핵심 3줄 요약" Block inside Legacy Markdown Prose ── */
  if (prose) {
    var firstH2 = prose.querySelector("h2");
    if (firstH2 && /핵심.{0,8}3줄\s*요약/.test(firstH2.textContent || "")) {
      var nextList = firstH2.nextElementSibling;
      if (nextList && (nextList.tagName === "UL" || nextList.tagName === "OL")) {
        var wrap = document.createElement("div");
        wrap.className = "qti-summary-box";
        firstH2.parentNode.insertBefore(wrap, firstH2);
        wrap.appendChild(firstH2);
        wrap.appendChild(nextList);
      }
    }
  }

  /* ── 6. Sortable Tables (data-sortable) ── */
  document.querySelectorAll("table[data-sortable]").forEach(function (tbl) {
    var ths = tbl.querySelectorAll("thead th[data-sort]");
    ths.forEach(function (th, colIdx) {
      th.style.cursor = "pointer";
      th.setAttribute("aria-sort", "none");
      th.addEventListener("click", function () {
        var tbody = tbl.querySelector("tbody");
        if (!tbody) return;
        var dir = th.dataset.dir === "desc" ? "asc" : "desc";
        ths.forEach(function (x) { x.dataset.dir = ""; x.setAttribute("aria-sort", "none"); });
        th.dataset.dir = dir;
        th.setAttribute("aria-sort", dir === "asc" ? "ascending" : "descending");
        var isNum = th.dataset.sort === "num";
        var realIdx = Array.prototype.indexOf.call(th.parentNode.children, th);
        var rows = Array.prototype.slice.call(tbody.querySelectorAll("tr"));
        rows.sort(function (a, b) {
          var ca = a.children[realIdx];
          var cb = b.children[realIdx];
          var va = ca ? (ca.dataset.val || ca.textContent || "").trim() : "";
          var vb = cb ? (cb.dataset.val || cb.textContent || "").trim() : "";
          if (isNum) {
            var na = parseFloat(va.replace(/[^0-9.\-]/g, "")) || 0;
            var nb = parseFloat(vb.replace(/[^0-9.\-]/g, "")) || 0;
            return dir === "asc" ? na - nb : nb - na;
          }
          return dir === "asc" ? va.localeCompare(vb, "ko") : vb.localeCompare(va, "ko");
        });
        rows.forEach(function (r) { tbody.appendChild(r); });
      });
    });
  });

  /* ── 7. Track B / IPO Filter Chips & Instant Search ── */
  var filterRoot = document.querySelector("[data-filter-root]");
  if (filterRoot) {
    var chips = filterRoot.querySelectorAll("[data-filter-chip]");
    var searchInput = filterRoot.querySelector("[data-filter-search]");
    var items = filterRoot.querySelectorAll("[data-filter-item]");
    var emptyEl = filterRoot.querySelector("[data-filter-empty]");
    var countEl = filterRoot.querySelector("[data-filter-count]");
    var activeFilter = "all";

    function runFilter() {
      var q = (searchInput ? searchInput.value : "").trim().toLowerCase();
      var shown = 0;
      items.forEach(function (el) {
        var hay = (el.dataset.haystack || el.textContent || "").toLowerCase();
        var tags = (el.dataset.tags || "").toLowerCase();
        var matchChip = activeFilter === "all" || tags.indexOf(activeFilter) !== -1 || hay.indexOf(activeFilter) !== -1;
        var matchQ = !q || hay.indexOf(q) !== -1;
        var ok = matchChip && matchQ;
        el.hidden = !ok;
        if (ok) shown++;
      });
      if (emptyEl) emptyEl.hidden = shown > 0;
      if (countEl) countEl.textContent = String(shown);
    }

    chips.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFilter = (btn.dataset.filterChip || "all").toLowerCase();
        chips.forEach(function (c) { c.classList.toggle("is-active", c === btn); });
        runFilter();
      });
    });
    if (searchInput) {
      searchInput.addEventListener("input", runFilter);
    }
    var resetBtn = filterRoot.querySelector("[data-filter-reset]");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        activeFilter = "all";
        if (searchInput) searchInput.value = "";
        chips.forEach(function (c, i) { c.classList.toggle("is-active", i === 0); });
        runFilter();
      });
    }
  }

  /* ── 8. B2B Inquiry Form (Formspree + mailto fallback) ── */
  var b2bForm = document.getElementById("qti-b2b-form");
  if (b2bForm) {
    b2bForm.querySelectorAll(".qti-topic-chip").forEach(function (c) {
      c.addEventListener("click", function () {
        c.classList.toggle("is-active");
        c.setAttribute("aria-pressed", c.classList.contains("is-active") ? "true" : "false");
      });
    });
    b2bForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var comp = b2bForm.querySelector("[name='company']");
      var email = b2bForm.querySelector("[name='email']");
      var msg = b2bForm.querySelector("[name='message']");
      var errEl = document.getElementById("qti-b2b-error");
      var okEl = document.getElementById("qti-b2b-ok");
      var subBtn = b2bForm.querySelector("[type='submit']");
      var validEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      if (!comp.value.trim() || !validEmail) {
        if (errEl) {
          errEl.textContent = !comp.value.trim() ? "회사 또는 기관명을 입력해 주세요." : "올바른 업무용 이메일 형식을 입력해 주세요.";
          errEl.hidden = false;
        }
        return;
      }
      if (errEl) errEl.hidden = true;
      var topics = Array.prototype.map.call(
        b2bForm.querySelectorAll(".qti-topic-chip.is-active"),
        function (x) { return x.textContent.trim(); }
      );
      var endpoint = (b2bForm.dataset.endpoint || "").trim();
      var mailtoFallback = function () {
        var subject = encodeURIComponent("[QTI Lab B2B 문의] " + comp.value.trim());
        var body = encodeURIComponent(
          "회사/기관: " + comp.value.trim() + "\n이메일: " + email.value.trim() +
          "\n관심 영역: " + (topics.join(", ") || "-") + "\n\n요청 내용:\n" + (msg.value || "-")
        );
        window.location.href = "mailto:lastima33@gmail.com?subject=" + subject + "&body=" + body;
        if (okEl) {
          okEl.textContent = "메일 앱으로 문의 양식을 열었습니다. (직접 발송: lastima33@gmail.com)";
          okEl.hidden = false;
        }
      };
      if (!endpoint || endpoint.indexOf("YOUR_FORM_ID") !== -1) {
        mailtoFallback();
        return;
      }
      subBtn.disabled = true;
      subBtn.textContent = "전송 중...";
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ company: comp.value.trim(), email: email.value.trim(), topics: topics.join(", "), message: msg.value.trim() })
      })
        .then(function (r) {
          if (!r.ok) throw new Error("http_" + r.status);
          if (okEl) { okEl.textContent = "✓ 문의가 정상 접수되었습니다. 영업일 기준 24시간 내에 회신드리겠습니다."; okEl.hidden = false; }
          b2bForm.reset();
        })
        .catch(mailtoFallback)
        .finally(function () {
          subBtn.disabled = false;
          subBtn.textContent = "무료 기술 상담 요청";
        });
    });
  }
})();
