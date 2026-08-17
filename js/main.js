/* United Termite & Pest Control — shared site behavior */
(function () {
  "use strict";

  /* Mobile navigation toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    // The panel hangs below a header whose distance from the top of the
    // screen varies (the topbar wraps at some widths and scrolls away at
    // others), so its height is measured on open rather than assumed in CSS.
    var fitNav = function () {
      if (!nav.classList.contains("is-open")) return;
      nav.style.maxHeight = "";
      var top = nav.getBoundingClientRect().top;
      nav.style.maxHeight = Math.max(180, window.innerHeight - top - 12) + "px";
    };
    var setNav = function (open) {
      nav.classList.toggle("is-open", open);
      if (open) { fitNav(); } else { nav.style.maxHeight = ""; }
      // Dims the page behind the panel so the menu reads as a layer rather
      // than as more page content (see body.nav-open in styles.css).
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", function () {
      setNav(!nav.classList.contains("is-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (!e.target.closest(".site-nav") && !e.target.closest(".nav-toggle")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setNav(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", fitNav);
    window.addEventListener("scroll", fitNav, { passive: true });
  }

  /*
   * Floating call button. It exists to keep the phone reachable once the
   * hero's call button scrolls away, so hide it while that button is in
   * view. Defaults to visible: if this never runs, the button still works.
   */
  var fab = document.querySelector(".call-fab");
  // Deliberately the hero's button inside <main>, never the sticky header's
  // (the header one is always on screen, which would pin the fab hidden).
  var heroCall = document.querySelector("main a[href^='tel:']");
  if (fab && heroCall) {
    var fabQueued = false;
    var syncFab = function () {
      fabQueued = false;
      var r = heroCall.getBoundingClientRect();
      var onScreen = r.bottom > 0 && r.top < window.innerHeight;
      fab.classList.toggle("is-hidden", onScreen);
    };
    var queueFabSync = function () {
      if (fabQueued) return;
      fabQueued = true;
      window.requestAnimationFrame(syncFab);
    };
    window.addEventListener("scroll", queueFabSync, { passive: true });
    window.addEventListener("resize", queueFabSync);
    syncFab();
  }

  /* Sticky header shadow */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Scroll-reveal animations */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    document.documentElement.classList.add("reveal-init");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      // Anchor links and back-button scroll restoration can land the user
      // below elements that were never observed on screen; show those at once.
      if (el.getBoundingClientRect().bottom < 0) {
        el.classList.add("is-visible");
      } else {
        io.observe(el);
      }
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Current year in footer */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /*
   * The estimate form posts natively to the host's form handler (Netlify
   * Forms — see contact.html and README.md), so it needs no JavaScript and
   * keeps working with scripts blocked. Nothing to wire up here.
   */
})();
