import Header from "@/components/Header";

import { Locale, i18n } from "@/i18n.config";
import { LocaleProvider } from "@/context/LocaleContext";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const LocaleLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) => {
  return (
    <LocaleProvider lang={params.lang}>
      <Header />
      <main lang={params.lang}>{children}</main>
    </LocaleProvider>
  );
};

export default LocaleLayout;
