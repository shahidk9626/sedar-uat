import SkeletonPrivacyPolicy from "@/components/skeleton/pages/privacyPolicyPage";
import { useDispatch } from "@/redux/store";
import PrivacyPolicySection from "@/sections/privacyPolicy";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonPrivacyPolicy />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [privacyPolicyLayout, privacyPolicyLayoutPageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "privacy_policy",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "privacy_policy",
      locale,
    }),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      privacyPolicyLayout: privacyPolicyLayout,
      privacyPolicyLayoutPageData: privacyPolicyLayoutPageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const PrivacyPolicyPage = (props) => {
  const { privacyPolicyLayout, privacyPolicyLayoutPageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: privacyPolicyLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: privacyPolicyLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: privacyPolicyLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: privacyPolicyLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: privacyPolicyLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: privacyPolicyLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: privacyPolicyLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: privacyPolicyLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: privacyPolicyLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);
  return (
    <WebLayout layout={layout}>
      <PrivacyPolicySection
        privacyPolicyLayoutPageData={privacyPolicyLayoutPageData}
      />
    </WebLayout>
  );
};
export default PrivacyPolicyPage;
