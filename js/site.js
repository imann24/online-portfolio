/*
 * Shared page behaviour for isaiahmann.com.
 * - Fills in the footer year.
 * - Seats each step's new brick as its model scrolls into view. Bricks only
 *   start raised when js/theme.js has set html.motion, so with no JS or with
 *   reduced motion everything is already in place.
 */
(function () {
    var years = document.querySelectorAll("[data-year]");
    for (var i = 0; i < years.length; i++) years[i].textContent = new Date().getFullYear();

    buildTracker();

    var models = document.querySelectorAll(".model");
    if (!document.documentElement.classList.contains("motion") || !models.length) return;

    function place(el) { el.classList.add("is-placed"); }

    var heroes = document.querySelectorAll(".model-hero");
    setTimeout(function () {
        for (var h = 0; h < heroes.length; h++) place(heroes[h]);
    }, 350);

    if (!("IntersectionObserver" in window)) {
        for (var j = 0; j < models.length; j++) place(models[j]);
        return;
    }

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                place(e.target);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.6 });

    for (var k = 0; k < models.length; k++) {
        if (!models[k].classList.contains("model-hero")) io.observe(models[k]);
    }

    /*
     * Home page build tracker: while the steps scroll by, a call-out at the
     * foot of the screen shows how many of the seven steps are placed and
     * names the next one, so the newest work reads as still to come. Each
     * brick links to its own step. It hides
     * before step 1 and once the last step comes into view.
     */
    function buildTracker() {
        var tracker = document.querySelector(".build-tracker");
        var steps = document.querySelectorAll(".steps > .step");
        if (!tracker || !steps.length) return;

        var slots = tracker.querySelectorAll(".tracker-slot");
        var nextLink = tracker.querySelector(".tracker-next-link");
        var currentEl = tracker.querySelector("[data-tracker-current]");
        var nameEl = tracker.querySelector("[data-tracker-name]");
        var yearEl = tracker.querySelector("[data-tracker-year]");
        var info = [];
        for (var i = 0; i < steps.length; i++) {
            var title = steps[i].querySelector("h3").cloneNode(true);
            var hidden = title.querySelector(".visually-hidden");
            if (hidden) hidden.parentNode.removeChild(hidden);
            var when = steps[i].querySelector(".step-meta .chip");
            var year = when ? when.textContent.match(/\d{4}/) : null;
            info.push({ el: steps[i], name: title.textContent.trim(), year: year ? year[0] : "" });
        }

        // Name each brick from its step, so the shortcuts stay in sync with the page.
        for (var n = 0; n < slots.length && n < info.length; n++) {
            var label = "Step " + (n + 1) + ": " + info[n].name + (info[n].year ? ", " + info[n].year : "");
            slots[n].setAttribute("aria-label", label);
            slots[n].setAttribute("title", label);
        }

        var placed = -1;
        var queued = false;
        tracker.hidden = false;

        function render() {
            queued = false;
            var vh = window.innerHeight;
            var count = 0;
            for (var s = 0; s < info.length; s++) {
                if (info[s].el.getBoundingClientRect().top <= vh * 0.45) count = s + 1;
            }
            var lastTop = info[info.length - 1].el.getBoundingClientRect().top;
            var show = count >= 1 && lastTop > vh * 0.8;
            tracker.classList.toggle("is-shown", show);
            if (!show || count === placed) return;

            for (var j = 0; j < slots.length; j++) {
                slots[j].classList.toggle("is-placed", j < count);
                slots[j].classList.toggle("is-next", j === count);
                // Only a piece placed while you watch drops in.
                if (placed > 0 && j === count - 1 && count > placed) slots[j].classList.add("is-fresh");
                else if (j >= count) slots[j].classList.remove("is-fresh");
            }
            var next = info[count];
            currentEl.textContent = count;
            nameEl.textContent = next.name;
            yearEl.textContent = next.year;
            nextLink.setAttribute("href", "#" + next.el.id);
            placed = count;
        }

        function queue() {
            if (!queued) {
                queued = true;
                window.requestAnimationFrame(render);
            }
        }

        // The arrow goes to the next step and each brick to its own. Glide there
        // when motion is welcome, then hand the step focus.
        tracker.addEventListener("click", function (e) {
            var link = e.target.closest ? e.target.closest("a[href^='#step-']") : null;
            var target = link && document.getElementById(link.getAttribute("href").slice(1));
            if (!target || !document.documentElement.classList.contains("motion")) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
            if (history.replaceState) history.replaceState(null, "", "#" + target.id);
        });

        window.addEventListener("scroll", queue, { passive: true });
        window.addEventListener("resize", queue);
        render();
    }
})();
