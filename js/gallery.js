/* Galeri: filter kategori + pagination (client-side, tanpa database). */
(function () {
  var PER_PAGE = 9;
  var grid = document.getElementById("galleryGrid");
  if (!grid) return;

  var items = Array.prototype.slice.call(grid.querySelectorAll(".gallery-item"));
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".gallery-filter"));
  var pager = document.getElementById("galleryPager");
  var empty = document.getElementById("galleryEmpty");
  var valid = buttons.map(function (b) { return b.dataset.filter; });

  var params = new URLSearchParams(window.location.search);
  var filter = valid.indexOf(params.get("kategori")) > -1 ? params.get("kategori") : "all";
  var page = Math.max(1, parseInt(params.get("page") || "1", 10) || 1);

  var ON = ["bg-pbk-primary", "text-white", "border-pbk-primary"];
  var OFF = ["border-pbk-border", "hover:bg-pbk-secondary"];

  function url(f, p) {
    return "?kategori=" + encodeURIComponent(f) + (p > 1 ? "&page=" + p : "");
  }

  function link(label, f, p, cls) {
    return '<a href="' + url(f, p) + '" data-page="' + p + '" class="' + cls + '">' + label + "</a>";
  }

  function render() {
    var matched = items.filter(function (i) { return filter === "all" || i.dataset.category === filter; });
    var totalPages = Math.max(1, Math.ceil(matched.length / PER_PAGE));
    page = Math.min(page, totalPages);
    var start = (page - 1) * PER_PAGE;

    items.forEach(function (i) { i.style.display = "none"; });
    matched.slice(start, start + PER_PAGE).forEach(function (i) { i.style.display = ""; });
    empty.classList.toggle("hidden", matched.length > 0);

    buttons.forEach(function (b) {
      var active = b.dataset.filter === filter;
      ON.forEach(function (c) { b.classList.toggle(c, active); });
      OFF.forEach(function (c) { b.classList.toggle(c, !active); });
    });

    if (totalPages <= 1) { pager.innerHTML = ""; return; }
    var base = "px-3 py-2 rounded-lg border border-pbk-border text-sm";
    var html = '<nav class="flex items-center justify-center gap-2 mt-8" aria-label="Navigasi halaman">';
    html += page > 1
      ? link("&laquo; Sebelumnya", filter, page - 1, base + " hover:bg-pbk-secondary")
      : '<span class="' + base + ' text-gray-300 cursor-not-allowed">&laquo; Sebelumnya</span>';
    for (var n = 1; n <= totalPages; n++) {
      html += n === page
        ? '<span class="px-3.5 py-2 rounded-lg bg-pbk-primary text-white text-sm font-semibold">' + n + "</span>"
        : link(n, filter, n, "px-3.5 py-2 rounded-lg border border-pbk-border text-sm hover:bg-pbk-secondary");
    }
    html += page < totalPages
      ? link("Berikutnya &raquo;", filter, page + 1, base + " hover:bg-pbk-secondary")
      : '<span class="' + base + ' text-gray-300 cursor-not-allowed">Berikutnya &raquo;</span>';
    pager.innerHTML = html + "</nav>";
  }

  function go(f, p, push) {
    filter = f; page = p;
    render();
    if (push) history.pushState(null, "", url(f, p));
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { go(b.dataset.filter, 1, true); });
  });
  pager.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-page]");
    if (!a) return;
    e.preventDefault();
    go(filter, parseInt(a.dataset.page, 10), true);
    document.getElementById("galleryFilters").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  window.addEventListener("popstate", function () {
    var p = new URLSearchParams(window.location.search);
    filter = valid.indexOf(p.get("kategori")) > -1 ? p.get("kategori") : "all";
    page = Math.max(1, parseInt(p.get("page") || "1", 10) || 1);
    render();
  });

  render();
})();
