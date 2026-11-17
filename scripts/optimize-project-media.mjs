import { execFile } from "node:child_process";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);
const cache = new URL("../.cache/project-media/", import.meta.url);
const output = new URL("../public/projects/", import.meta.url);
const sources = [
  ["conquest", "6r9MTOW.png"],
  ["cycling", "TYkSmjg.png"],
  ["study-rush", "2qRdLfj.png"],
  ["solar-system", "6vtGrmj.gif"],
];

await mkdir(cache, { recursive: true });
await mkdir(output, { recursive: true });
const report = [];

for (const [name, remoteFile] of sources) {
  const source = `https://i.imgur.com/${remoteFile}`;
  const input = new URL(`${name}.${remoteFile.split(".").at(-1)}`, cache);
  let original;
  try {
    original = await readFile(input);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    const response = await fetch(source);
    if (!response.ok) throw new Error(`${source}: HTTP ${response.status}`);
    original = Buffer.from(await response.arrayBuffer());
    await writeFile(input, original);
  }

  const files = {};
  let still = original;
  if (remoteFile.endsWith(".gif")) {
    // The GIF starts on a menu. Use a gameplay frame as the still preview.
    const poster = new URL(`${name}-poster.png`, cache);
    await run("ffmpeg", [
      "-hide_banner", "-loglevel", "error", "-y", "-i", input.pathname,
      "-ss", "15", "-frames:v", "1", poster.pathname,
    ]);
    still = await readFile(poster);
  }

  for (const width of [480, 960]) {
    const file = `${name}-${width}.webp`;
    await sharp(still)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(new URL(file, output).pathname);
    files[file] = (await stat(new URL(file, output))).size;
  }

  if (remoteFile.endsWith(".gif")) {
    const file = `${name}.mp4`;
    await run("ffmpeg", [
      "-hide_banner", "-loglevel", "error", "-y", "-i", input.pathname,
      "-vf", "scale=960:-2:flags=lanczos", "-an",
      "-c:v", "libx264", "-preset", "slow", "-crf", "26",
      "-pix_fmt", "yuv420p", "-movflags", "+faststart",
      new URL(file, output).pathname,
    ]);
    files[file] = (await stat(new URL(file, output))).size;
  }

  report.push({ name, source, originalBytes: original.length, files });
  console.log(name, { originalBytes: original.length, files });
}

await writeFile(new URL("../docs/media-sizes.json", import.meta.url), `${JSON.stringify(report, null, 2)}\n`);
