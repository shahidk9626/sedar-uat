import SkeletonAccessibility from "@/components/skeleton/pages/accessibilityPage";
import { useDispatch } from "@/redux/store";
import AccessibilitySection from "@/sections/accessibility";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonAccessibility />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [accessibilityLayout, accessibilityPageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "accessibility",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "accessibility",
      locale,
    }),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      accessibilityLayout: accessibilityLayout,
      accessibilityPageData: accessibilityPageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const AccessibilityPage = (props) => {
  const { accessibilityLayout, accessibilityPageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: accessibilityLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: accessibilityLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: accessibilityLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: accessibilityLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: accessibilityLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: accessibilityLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: accessibilityLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: accessibilityLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: accessibilityLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);

  return (
    <WebLayout layout={layout}>
      <AccessibilitySection accessibilityPageData={accessibilityPageData} />
    </WebLayout>
  );
};
export default AccessibilityPage;
