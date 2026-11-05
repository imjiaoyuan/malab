# Ma Lab website

A static academic website for the Ma Lab (Plant Evolutionary Genomics) at the College of Life Sciences, Sichuan University. The site uses plain HTML, CSS and JavaScript, with no build step, and can be hosted on GitHub Pages or any static file server.

## Structure

```
.
├── index.html
├── research.html
├── members.html
├── publications.html
├── databases.html
├── contact.html
├── favicon.svg
├── css/
│   ├── base.css
│   ├── layout.css
│   └── components.css
└── js/
    ├── main.js
    ├── publications-data.js
    └── publications.js
```

`css/base.css` holds the reset, typography and base elements. `css/layout.css` holds the masthead, sidebar layout, page grid and footer. `css/components.css` holds the publication list styles. `js/main.js` sets the active navigation item and the footer year. `js/publications-data.js` stores the publication records and `js/publications.js` renders them.

## Local preview

Run a local server from the project root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Editing publications

Add entries to `js/publications-data.js`. Papers are grouped by year on the publications page. An entry looks like this:

```js
window.LAB_PUBLICATIONS = [
  {
    year: 2025,
    title: "Ancient allopolyploidy and specific subgenomic evolution drove the radiation of poplars and willows",
    authors: "Wang D, Li M, Yang W, ... Ma T*",
    journal: "Nature Communications",
    details: "16, 62178",
    doi: "10.1038/s41467-025-62178-y",
    note: "Selected paper"
  }
];
```

`year`, `title` and `authors` are the core fields. `journal`, `details`, `doi` and `note` are optional. If `doi` is absent, the renderer uses `url` for the title link.

## Editing members and databases

The members page has a short PI section and a placeholder for the rest of the team. Add team members as paragraphs or lists under the `Lab members` heading in `members.html`.

The databases page is plain text. Add resource names, descriptions, and links under the `Available resources` heading in `databases.html`.

## Site-wide changes

The masthead, sidebar and footer are repeated in each HTML file. When adding a page or changing a link, update all six pages. The active navigation item is derived from the `data-page` attribute on `<body>` and the `data-nav` attributes on the links, so no manual active class is needed.

The email address and address appear in the sidebar and on the contact page. Replace them in all locations if they change.

## Deployment

The site has no build step. Push the folder to a GitHub repository and enable GitHub Pages for the main branch. The site also works on any static host. For a custom domain, add a `CNAME` file with the domain name.
