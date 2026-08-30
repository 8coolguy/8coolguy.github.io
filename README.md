# 8coolguy.github.io

Arnav Choudhury's portfolio, shader gallery, shader editor, and blog.

The site uses the Next.js App Router and exports static HTML for GitHub Pages. The homepage, blog index, and every blog article are generated at build time so their content is available without JavaScript. The shader gallery, editor, WebGL canvases, and shader API calls remain client-side.

## Development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build and deploy

```bash
npm run build
npm run deploy
```

`npm run build` writes the static site to `out/`. `npm run deploy` publishes that directory to the `gh-pages` branch.

The custom domain and GitHub Pages bypass file live in `public/` so Next copies them into every export.

## Blog posts

Blog source files live in `content/blogs/`. Copy `_template.md`, rename it to the URL slug you want, fill in the front matter, and write the post body in Markdown. The next build creates both the blog listing and `/blog/<slug>/` article page.
