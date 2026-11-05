(function () {
  "use strict";

  const entries = Array.isArray(window.LAB_PUBLICATIONS) ? window.LAB_PUBLICATIONS : [];
  const list = document.getElementById("publication-list");

  if (!list || entries.length === 0) return;

  const empty = document.getElementById("pub-empty");
  if (empty) empty.remove();

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const renderEntry = (entry) => {
    const item = element("li");
    const title = element("p", "pub-title");
    const link = entry.doi ? `https://doi.org/${entry.doi}` : entry.url;

    if (link) {
      const anchor = element("a", "", entry.title);
      anchor.href = link;
      anchor.target = "_blank";
      anchor.rel = "noopener";
      title.append(anchor);
    } else {
      title.textContent = entry.title;
    }

    item.append(title);

    if (entry.authors) item.append(element("p", "pub-authors", entry.authors));

    if (entry.journal || entry.details || entry.doi) {
      const meta = element("p", "pub-meta");

      if (entry.journal) meta.append(element("em", "", entry.journal));
      if (entry.details) {
        if (entry.journal) meta.append(document.createTextNode(". "));
        meta.append(document.createTextNode(entry.details));
      }
      if (entry.doi) {
        if (entry.journal || entry.details) meta.append(document.createTextNode(". "));
        const doi = element("a", "", `doi:${entry.doi}`);
        doi.href = `https://doi.org/${entry.doi}`;
        doi.target = "_blank";
        doi.rel = "noopener";
        meta.append(doi);
      }

      item.append(meta);
    }

    if (entry.note) item.append(element("p", "pub-note", entry.note));

    return item;
  };

  const years = [...new Set(entries.map((entry) => entry.year))].sort((a, b) => b - a);

  years.forEach((year) => {
    const heading = element("h2", "pub-year", String(year));
    const items = element("ol", "publication-list");

    entries.filter((entry) => entry.year === year).forEach((entry) => items.append(renderEntry(entry)));
    list.append(heading, items);
  });
})();
