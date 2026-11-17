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

## Reducing network payloads

See [the payload guide](docs/network-payloads.md) for the techniques used here and how to measure them.

```bash
npm run optimize:media
npm run build
npm run measure:payload
```

Media optimization requires FFmpeg on your PATH. It downloads the original project images once into `.cache/project-media/`, generates responsive WebP images and a looping MP4 in `public/projects/`, and records file sizes in `docs/media-sizes.json`. The generated assets are committed, so normal builds do not need FFmpeg or image downloads. Delete the relevant cached source to fetch it again after replacing an image.

## Other work project links

Projects are defined in `lib/info.js`. The `links` object supports `Github`, `Devpost`, `Youtube`, and `Live` URLs. Empty values are omitted from the page.

```js
links: {
  Github: "https://github.com/username/project",
  Devpost: "https://devpost.com/software/project",
  Youtube: "https://www.youtube.com/watch?v=video-id",
  Live: "https://example.com/project",
}
```

## Blog posts

Blog source files live in `content/blogs/`. Copy `_template.md`, rename it to the URL slug you want, fill in the front matter, and write the post body in Markdown. The next build creates both the blog listing and `/blog/<slug>/` article page.
