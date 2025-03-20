import SkeletonCookiePolicy from "@/components/skeleton/pages/cookiePolicyPage";
import CookiePolicySection from "@/sections/cookiePolicy";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonCookiePolicy />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [cookiePolicyLayout, cookiePolicyPageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "cookie_policy",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "cookie_policy",
      locale,
    }),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      cookiePolicyLayout: cookiePolicyLayout,
      cookiePolicyPageData: cookiePolicyPageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const CookiePolicyPage = (props) => {
  const { cookiePolicyLayout, cookiePolicyPageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: cookiePolicyLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: cookiePolicyLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: cookiePolicyLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: cookiePolicyLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: cookiePolicyLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: cookiePolicyLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: cookiePolicyLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: cookiePolicyLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: cookiePolicyLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);
  return (
    <WebLayout layout={layout}>
      <CookiePolicySection cookiePolicyPageData={cookiePolicyPageData} />
    </WebLayout>
  );
};
export default CookiePolicyPage;
