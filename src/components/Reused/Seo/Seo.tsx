import React from "react";
import Head from "next/head";

export const SEO = ({
  title,
  description,
  image,
  url,
}: {
  title?: string,
  description?: string,
  image?: string,
  url?: string,
}) => (
  <Head>
    <meta charSet="utf-8" />
    <title>{title ? title : "One quality solutions"}</title>
    <meta name="description" content={description} />
    <meta
      name="viewport"
      content="width=device-width,maximum-scale=1,initial-scale=1"
    />
    <meta property="og:type" content="website" />
    <meta name="og:title"  content={title} />
    <meta
      name="og:description"
      // property="og:description"
      content={description}
    />
    <meta name="og:site_name" content={title} />
    <meta name="og:url" content={url} />
    <meta name="og:image" content={image} />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="@propernounco" />
    <meta name="twitter:creator" content="@propernounco" />
  </Head>
);
