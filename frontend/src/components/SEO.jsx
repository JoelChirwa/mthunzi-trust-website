import React from "react";
import { Helmet } from "react-helmet-async";
import { useSettings } from "../context/SettingsContext";

const SEO = ({
  title,
  description,
  image,
  url,
  type = "website",
  keywords,
}) => {
  const { settings } = useSettings();

  const siteTitle = settings?.seoTitle || "Mthunzi Trust";
  const siteDescription =
    settings?.seoDescription ||
    "Mthunzi Trust - The Umbrella of Hope. Empowering youth and communities in Malawi through sustainable development.";
  const siteUrl = window.location.origin;
  const siteImage = image || `${siteUrl}/favicon.ico`; // Fallback image

  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || siteDescription;
  const currentUrl = url ? `${siteUrl}${url}` : window.location.href;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={siteImage} />

      {/* Security and Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Mthunzi Trust" />
    </Helmet>
  );
};

export default SEO;
