import { Metadata } from 'next';

import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import Menu from '@components/layout/Menu/Menu';
import Providers from '@components/layout/Providers';
import ApiData from '@utils/classes/ApiData';

import '@styles/code-dark.css';
import '@styles/globals.css';
import RightMenu from '@components/layout/RightMenu/RightMenu';

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

  return (
    <html lang="en">
      <body>
        <Providers>
          <Header apiData={apiData} />
          <div className="flex">
            <Menu apiData={apiData} />
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
