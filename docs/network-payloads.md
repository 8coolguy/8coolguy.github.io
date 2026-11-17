# Reducing the bytes a visitor downloads

A network packet is a small unit carrying part of a transfer. Your browser and
network stack handle packet sizing, segmentation, and reassembly. For this site,
the useful target is the **payload**: the HTML, CSS, JavaScript, images, and API
data a visitor downloads. Smaller payloads usually need fewer packets. Changing
the MTU does not make the page's content smaller and can increase packet overhead.

## Techniques implemented here

1. **Choose an efficient representation.** The solar-system preview was a
   46,130,044-byte GIF. A full-length H.264 MP4 is 778,535 bytes, about 98.3%
   smaller. Video compression can reuse information across frames. It remains
   a muted, inline, looping animation. WebP posters provide a still preview
   before playback, if autoplay is blocked, or when motion/data saving is enabled.

2. **Send the resolution the display needs.** The three static project PNGs
   totaled 690,304 bytes. Their 960-pixel WebP versions total 64,110 bytes (90.7%
   smaller); their 480-pixel versions total 23,124 bytes (96.7% smaller).
   `srcSet` and `sizes` let the browser choose according to the card's display
   width and pixel density. These are lossy encodings: a little detail is traded
   for fewer bytes. Keep originals available for future encoding changes.

3. **Load only when needed.** Static thumbnails retain native lazy loading.
   `ProjectAnimation` attaches the video source only when its card enters the
   viewport, then pauses it offscreen. Visitors who never reach the card avoid
   its video transfer. Reduced-motion and data-saving visitors start with only
   the poster. Deferring a resource changes *when* it downloads; it does not
   necessarily reduce the total for someone who views everything. The existing
   WebGL library already uses a dynamic import.

4. **Remove unnecessary code.** `Icon` renders the existing Font Awesome path
   definitions directly as SVG. The site keeps the same icons without shipping
   the general renderer or its global stylesheet. Removing a dependency from
   `package.json` only helps visitors when it also removes code from the browser
   bundle; measure the output to establish the benefit.

The images and video are generated in advance because this site uses a Next.js
static export on GitHub Pages. It has no Next.js server to transform images at
request time.

## Minification, compression, and caching

Minification removes unnecessary syntax and whitespace; Next.js already does it
for production JavaScript and CSS. HTTP compression, such as gzip or Brotli,
encodes repeated patterns without changing the decoded content. It works well
for text; applying it again to compressed media usually achieves little.

The hosting server must negotiate compression through `Accept-Encoding` and
`Content-Encoding`. Adding `compress: true` in Next.js would not configure
GitHub Pages, since Pages serves the exported files. Likewise, generating `.br`
files alone would not make the host serve them with the correct encoding.

Caching can avoid repeat transfers, especially for assets with versioned URLs.
It does not shrink a first visit. When deploying changes to media at the same
URL, account for the host's cache policy or give the changed asset a new filename.

## Measure the right thing

Run `npm run build`, then `npm run measure:payload`. The measurement script reads
the exported homepage and sums its directly referenced modern-browser JS and
stylesheets. It reports raw bytes and locally computed gzip/Brotli estimates.
These estimates are **not measured production transfer sizes**. They exclude
runtime imports, images, fonts, API responses, headers, and transport overhead.

For media sizes, see `media-sizes.json`. A visitor selects one responsive image
variant, not both. Compare the chosen variant plus any video and poster it uses,
rather than totaling every file in the export directory.

The before/after production export measurements are saved in `payload-sizes.json`.
Directly referenced JavaScript decreased from 533,243 to 479,256 raw bytes;
CSS decreased from 29,849 to 20,237 raw bytes. The corresponding local gzip
estimates are 161,882 to 145,174 bytes for JavaScript and 7,353 to 5,636 bytes for CSS.

After deployment, use the browser Network panel with cache disabled to check
actual transferred bytes, content encodings, selected image variants, and whether
the video waits for visibility. Repeat with caching enabled to assess repeat visits.

References:

- [MDN: HTTP compression](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Compression)
- [MDN: image formats](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types)
- [MDN: video elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video)
