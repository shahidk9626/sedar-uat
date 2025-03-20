import SkeletonToolsAndGuides from "@/components/skeleton/pages/toolAndGuidesPage";
import { useDispatch } from "@/redux/store";
import ToolsAndGuidesSection from "@/sections/toolsAndGuides";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonToolsAndGuides />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [toolsAndGuidesLayout, toolsAndGuidesPageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "tools_and_guides",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "tools_and_guides",
      locale,
    }),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      toolsAndGuidesLayout: toolsAndGuidesLayout,
      toolsAndGuidesPageData: toolsAndGuidesPageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const ToolsAndGuides = (props) => {
  const { toolsAndGuidesLayout, toolsAndGuidesPageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: toolsAndGuidesLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: toolsAndGuidesLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: toolsAndGuidesLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: toolsAndGuidesLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: toolsAndGuidesLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: toolsAndGuidesLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: toolsAndGuidesLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: toolsAndGuidesLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: toolsAndGuidesLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);
  return (
    <WebLayout layout={layout}>
      <ToolsAndGuidesSection toolsAndGuidesPageData={toolsAndGuidesPageData} />
    </WebLayout>
  );
};
export default ToolsAndGuides;
