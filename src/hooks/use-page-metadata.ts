import { useEffect } from "react";
import pageMetadata from "@/content/pageMetadata.json";

type PageEntry = {
  title: string;
  description: string;
  type?: string;
  imageUrl?: string;
  imageTarget?: string;
};

const site = pageMetadata.site;

const setMetaTag = ({
  attr,
  key,
  content,
}: {
  attr: "name" | "property";
  key: string;
  content: string;
}) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const setCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
};

export const usePageMetadata = (path: string, overrides?: Partial<PageEntry>) => {
  useEffect(() => {
    const page = pageMetadata.pages[path as keyof typeof pageMetadata.pages];

    if (!page) {
      return;
    }

    const metadata = {
      ...page,
      ...overrides,
    };

    const absoluteUrl = `${site.baseUrl}${path}`;
    const imageUrl =
      metadata.imageUrl ??
      (metadata.imageTarget
        ? `${site.baseUrl}/og/${metadata.imageTarget}`
        : `${site.baseUrl}/og/default-preview.png`);

    document.title = metadata.title;

    setMetaTag({ attr: "name", key: "description", content: metadata.description });
    setMetaTag({ attr: "name", key: "author", content: site.author });
    setMetaTag({ attr: "property", key: "og:title", content: metadata.title });
    setMetaTag({ attr: "property", key: "og:description", content: metadata.description });
    setMetaTag({ attr: "property", key: "og:type", content: metadata.type ?? "website" });
    setMetaTag({ attr: "property", key: "og:url", content: absoluteUrl });
    setMetaTag({ attr: "property", key: "og:image", content: imageUrl });
    setMetaTag({ attr: "name", key: "twitter:card", content: "summary_large_image" });
    setMetaTag({ attr: "name", key: "twitter:site", content: site.twitterSite });
    setMetaTag({ attr: "name", key: "twitter:title", content: metadata.title });
    setMetaTag({ attr: "name", key: "twitter:description", content: metadata.description });
    setMetaTag({ attr: "name", key: "twitter:image", content: imageUrl });
    setCanonical(absoluteUrl);
  }, [overrides, path]);
};
