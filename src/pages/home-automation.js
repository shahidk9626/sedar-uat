import SkeletonHomeAutomation from "@/components/skeleton/pages/homeAutomationPage";
import { useDispatch } from "@/redux/store";
import HomeAutomationSection from "@/sections/homeAutomation";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonHomeAutomation />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [homeAutomationLayout, homeAutomationPageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "home_automation",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "home_automation",
      slug_url: "home-automation",
      locale,
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      homeAutomationLayout: homeAutomationLayout,
      homeAutomationPageData: homeAutomationPageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const HomeAutomation = (props) => {
  const { homeAutomationLayout, homeAutomationPageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: homeAutomationLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: homeAutomationLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: homeAutomationLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: homeAutomationLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: homeAutomationLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: homeAutomationLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: homeAutomationLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: homeAutomationLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: homeAutomationLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);
  return (
    <WebLayout layout={layout}>
      <HomeAutomationSection homeAutomationPageData={homeAutomationPageData} />
    </WebLayout>
  );
};

export default HomeAutomation;
