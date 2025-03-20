// import WebLayout from "@/layouts/web";
import {
  NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES
} from "@/utils/constant";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { HomePageLoadingScreen } from "@/components/loading-screen";
import WebLayoutSkeleton from "@/components/skeleton/layout";
import Success from "@/sections/success";
import { LayoutData } from "@/utils/layout";
import dynamic from "next/dynamic";


const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <WebLayoutSkeleton />,
  ssr: true,
});

export const getServerSideProps = async (context) => {
  const { locale, res, req } = context;
  const { cookies } = req;
  const GET_ALL_COOKIES = (await cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    ? JSON.parse(cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : null;

  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=10, stale-while-revalidate=59"
  // );

  const SuccessLayout = await LayoutData({
    cookies: GET_ALL_COOKIES,
    locale: locale,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      SuccessLayout: SuccessLayout,
      // Will be passed to the page component as props
    },
  };
};
function SuccessPage(props) {
  const { SuccessLayout } = props;

  const layout = {
    HEADER: {
      TOPBAR: SuccessLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: SuccessLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: SuccessLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: SuccessLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: SuccessLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: SuccessLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: SuccessLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: SuccessLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: SuccessLayout?.result?.SEO,
  };
  return (
    <WebLayout layout={layout}>
      <Success />
    </WebLayout>
  );
}
export default SuccessPage;
