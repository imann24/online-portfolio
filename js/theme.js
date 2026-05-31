/*
 * Robust dark mode for isaiahmann.com
 *
 * Load this synchronously in <head> (no defer/async) so the theme is applied
 * to <html> before the body paints — that prevents a flash of the wrong theme.
 *
 * Resolution order:
 *   1. Explicit user choice persisted in localStorage ("light" | "dark").
 *   2. Operating-system preference (prefers-color-scheme).
 *
 * The toggle button is injected into every .nav-links automatically, so pages
 * only need to include this one script.
 */
(function () {
    var root = document.documentElement;
    var STORAGE_KEY = "theme";
    var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

    // Keep these in sync with --bg in css/modern.css.
    var THEME_COLORS = { light: "#faf6ef", dark: "#0f1115" };

    function storedTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function systemTheme() {
        return mq && mq.matches ? "dark" : "light";
    }

    function resolveTheme() {
        var stored = storedTheme();
        return stored === "dark" || stored === "light" ? stored : systemTheme();
    }

    function apply(theme) {
        root.setAttribute("data-theme", theme);

        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute("content", THEME_COLORS[theme] || THEME_COLORS.light);

        var label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
        var buttons = document.querySelectorAll(".theme-toggle");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
            buttons[i].setAttribute("aria-label", label);
            buttons[i].setAttribute("title", label);
        }
    }

    // Apply immediately (runs before <body> when loaded in <head>) to avoid FOUC.
    apply(resolveTheme());

    function toggle() {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch (e) {}
        apply(next);
    }

    var SUN =
        '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="4"/>' +
        '<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>' +
        "</svg>";
    var MOON =
        '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' +
        "</svg>";

    function injectToggles() {
        var navs = document.querySelectorAll(".nav-links");
        for (var i = 0; i < navs.length; i++) {
            if (navs[i].querySelector(".theme-toggle")) continue;

            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "theme-toggle";
            btn.innerHTML = SUN + MOON;
            btn.addEventListener("click", toggle);

            var cta = navs[i].querySelector(".nav-cta");
            if (cta) navs[i].insertBefore(btn, cta);
            else navs[i].appendChild(btn);
        }
        // Refresh the buttons' labels/state now that they exist.
        apply(root.getAttribute("data-theme") || resolveTheme());
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectToggles);
    } else {
        injectToggles();
    }

    // Follow OS changes only while the user hasn't made an explicit choice.
    if (mq) {
        var onSystemChange = function () {
            if (!storedTheme()) apply(systemTheme());
        };
        if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
        else if (mq.addListener) mq.addListener(onSystemChange);
    }
})();
