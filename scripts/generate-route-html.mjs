import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const assetsDir = path.join(distDir, "assets");
const ogDir = path.join(distDir, "og");
const metadataPath = path.join(rootDir, "src", "content", "pageMetadata.json");

const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
const template = await readFile(path.join(distDir, "index.html"), "utf8");
const assetFiles = await readdir(assetsDir);

const defaultImagePattern = "droplet-onboarding-board-optimized";
const defaultImageTarget = "default-preview.png";

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const setTag = (html, matcher, tag) =>
  matcher.test(html) ? html.replace(matcher, tag) : html.replace("</head>", `    ${tag}\n  </head>`);

const setMeta = (html, { attr, key, content }) =>
  setTag(
    html,
    new RegExp(`<meta\\s+${attr}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`, "i"),
    `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`,
  );

const setCanonical = (html, href) =>
  setTag(
    html,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(href)}" />`,
  );

const setTitle = (html, title) =>
  html.replace(/<title>.*?<\/title>/is, `<title>${escapeHtml(title)}</title>`);

const ensureOgAsset = async (pattern, targetName) => {
  if (!pattern || !targetName) {
    return null;
  }

  const sourceName = assetFiles.find((file) => file.toLowerCase().includes(pattern.toLowerCase()));

  if (!sourceName) {
    throw new Error(`Could not find a built asset matching "${pattern}".`);
  }

  await mkdir(ogDir, { recursive: true });
  await copyFile(path.join(assetsDir, sourceName), path.join(ogDir, targetName));

  return `/og/${targetName}`;
};

const applyMetadata = (html, { title, description, type, url, imageUrl, twitterSite, author }) => {
  let nextHtml = setTitle(html, title);
  nextHtml = setCanonical(nextHtml, url);
  nextHtml = setMeta(nextHtml, { attr: "name", key: "description", content: description });
  nextHtml = setMeta(nextHtml, { attr: "name", key: "author", content: author });
  nextHtml = setMeta(nextHtml, { attr: "property", key: "og:title", content: title });
  nextHtml = setMeta(nextHtml, { attr: "property", key: "og:description", content: description });
  nextHtml = setMeta(nextHtml, { attr: "property", key: "og:type", content: type ?? "website" });
  nextHtml = setMeta(nextHtml, { attr: "property", key: "og:url", content: url });
  nextHtml = setMeta(nextHtml, { attr: "property", key: "og:image", content: imageUrl });
  nextHtml = setMeta(nextHtml, { attr: "name", key: "twitter:card", content: "summary_large_image" });
  nextHtml = setMeta(nextHtml, { attr: "name", key: "twitter:site", content: twitterSite });
  nextHtml = setMeta(nextHtml, { attr: "name", key: "twitter:title", content: title });
  nextHtml = setMeta(nextHtml, { attr: "name", key: "twitter:description", content: description });
  nextHtml = setMeta(nextHtml, { attr: "name", key: "twitter:image", content: imageUrl });
  return nextHtml;
};

const toAbsoluteUrl = (baseUrl, pathname) => {
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  return `${baseUrl}${normalizedPath}`;
};

const writeRouteHtml = async (routePath, html) => {
  if (routePath === "/") {
    await writeFile(path.join(distDir, "index.html"), html, "utf8");
    return;
  }

  const routeDir = path.join(distDir, routePath.replace(/^\//, ""));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), html, "utf8");
};

const defaultImagePath = await ensureOgAsset(defaultImagePattern, defaultImageTarget);

for (const [routePath, page] of Object.entries(metadata.pages)) {
  const routeImagePath = page.imagePattern
    ? await ensureOgAsset(page.imagePattern, page.imageTarget)
    : defaultImagePath;
  const html = applyMetadata(template, {
    title: page.title,
    description: page.description,
    type: page.type,
    url: toAbsoluteUrl(metadata.site.baseUrl, routePath),
    imageUrl: `${metadata.site.baseUrl}${routeImagePath}`,
    twitterSite: metadata.site.twitterSite,
    author: metadata.site.author,
  });

  await writeRouteHtml(routePath, html);
}
