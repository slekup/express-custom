import { Metadata } from 'next';

import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import Providers from '@components/layout/Providers';
import ApiData from '@utils/classes/ApiData';

import RightMenu from '@components/layout/RightMenu/RightMenu';
// import '@styles/code-dark.css';
import '@styles/globals.css';
// import 'highlight.js/styles/base16/dark-violet.css';
// import 'highlight.js/styles/base16/framer.css';
// import 'highlight.js/styles/base16/icy-dark.css';

export async function generateMetadata(): Promise<Metadata> {
  const apiDataClass = new ApiData();
  const apiData = await apiDataClass.fetch();

  return {
    title: apiData.name,
    description: apiData.description,
    icons: {
      icon: apiData.logo ?? '/favicon.ico',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiDataClass = new ApiData();
  const apiData = await apiDataClass.fetch();

  // import('highlight.js/styles/base16/icy-dark.css');
  import('highlight.js/styles/base16/macintosh.css');

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="relative h-14"></div>
          <div className="flex">
            <Header apiData={apiData} />

            <div className="flex-grow">
              <div className="min-h-[80vh]">{children}</div>
              <Footer />
            </div>
            <RightMenu apiData={apiData} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
