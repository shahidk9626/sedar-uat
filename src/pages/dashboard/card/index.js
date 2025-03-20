import AuthGuard from "@/auth/AuthGuard";
import ProfileSkeleton from "@/components/skeleton/layout/profile";
import SavedCardSkeleton from "@/components/skeleton/layout/profile/savedCardSkeleton";
import ProfileLayout from "@/layouts/profile";
import SaveCardProvider from "@/provider/saveCard/saveCardProvider";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <ProfileSkeleton />,
  ssr: false,
});

const CardSection = dynamic(() => import("@/sections/profile/card"), {
  loading: () => <SavedCardSkeleton />,
  ssr: false,
});

export const getServerSideProps = async (context) => {
  const { locale, res, req } = context;
  // const { dispatch, getState } = store;

  const { cookies } = req;
  const GET_ALL_COOKIES = (await cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    ? JSON.parse(cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : null;

  // res.setHeader(
  //   "Cache-Control",
  //   `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
  //   }`
  // );

  const saveCardLayout = await LayoutData({
    cookies: GET_ALL_COOKIES,
    locale: locale,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      saveCardLayout: saveCardLayout,
      // Will be passed to the page component as props
    },
  };
};

const Card = (props) => {
  const { saveCardLayout } = props;

  const layout = {
    HEADER: {
      TOPBAR: saveCardLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: saveCardLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: saveCardLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: saveCardLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: saveCardLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: saveCardLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: saveCardLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: saveCardLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: saveCardLayout?.result?.SEO,
  };

  return (
    <WebLayout layout={layout}>
      <AuthGuard>
        <SaveCardProvider>
          <ProfileLayout>
            <CardSection />
          </ProfileLayout>
        </SaveCardProvider>
      </AuthGuard>
    </WebLayout>
  );
};

export default Card;
