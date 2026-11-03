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
})();
