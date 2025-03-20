import SkeletonTermsCondition from "@/components/skeleton/pages/termsConditionsPage";
import { useDispatch } from "@/redux/store";
import TermsAndConditionSection from "@/sections/termsAndCondition";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonTermsCondition />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [termsAndConditionsLayout, termsAndConditionsPageData] =
    await Promise.all([
      LayoutData({
        param: {
          page_name: "terms_and_conditions",
        },
        locale: locale,
      }),
      apiSSGV2DataService.getAll(`v2/homepage/first`, {
        content: "terms_and_conditions",
        locale,
      }),
    ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      termsAndConditionsLayout: termsAndConditionsLayout,
      termsAndConditionsPageData: termsAndConditionsPageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const TermsAndConditionPage = (props) => {
  const { termsAndConditionsLayout, termsAndConditionsPageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: termsAndConditionsLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: termsAndConditionsLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: termsAndConditionsLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: termsAndConditionsLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: termsAndConditionsLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection:
        termsAndConditionsLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: termsAndConditionsLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection:
        termsAndConditionsLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: termsAndConditionsLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);
  return (
    <WebLayout layout={layout}>
      <TermsAndConditionSection
        termsAndConditionsPageData={termsAndConditionsPageData}
      />
    </WebLayout>
  );
};
export default TermsAndConditionPage;
