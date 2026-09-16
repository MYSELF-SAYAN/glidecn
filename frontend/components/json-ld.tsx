export function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'GlideCN',
        url: 'https://glidecn.vercel.app',
        description:
          'Cinematic page transitions for React & Next.js. 68+ GPU-accelerated transitions with zero layout shift.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://glidecn.vercel.app/docs?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareSourceCode',
        name: 'GlideCN',
        description:
          '68+ GPU-accelerated page transitions for React, Next.js, and Vite. Zero layout shift, shadcn/ui style code ownership.',
        codeRepository: 'https://github.com/MYSELF-SAYAN/glidecn',
        programmingLanguage: ['TypeScript', 'React'],
        runtimePlatform: 'Node.js',
        license: 'https://opensource.org/licenses/MIT',
        author: {
          '@type': 'Person',
          name: 'Sayan',
          url: 'https://x.com/itz_sayan_03',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
