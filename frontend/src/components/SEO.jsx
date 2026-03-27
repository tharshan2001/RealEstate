import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description = 'Premium land holdings across Sri Lanka\'s Northern Province. Curated properties in Jaffna, Kilinochchi, Mannar, Mullaitivu, and Vanni.',
  keywords = 'land for sale, northern sri lanka, jaffna property, real estate, investment, Jaffna estates, Kilinochchi, Mannar',
  image = '/og-image.jpg',
  url = '',
}) => {
  const fullTitle = title ? `${title} | RealAgro` : 'RealAgro - Premium Land Holdings in Northern Sri Lanka';
  const fullUrl = url ? `https://7hilaxrealagro.com${url}` : 'https://7hilaxrealagro.com';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="RealAgro" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="RealAgro" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="geo.region" content="LK-4" />
      <meta name="geo.placename" content="Northern Province, Sri Lanka" />
    </Helmet>
  );
};

export default SEO;
