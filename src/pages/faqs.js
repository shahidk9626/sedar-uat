import SkeletonFaqs from "@/components/skeleton/pages/faqsPage";
import { useDispatch } from "@/redux/store";
import FaqsSection from "@/sections/faqs";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonFaqs />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [faqLayout, faqPageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "faq",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "faq",
      locale,
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      faqLayout: faqLayout,
      faqPageData: faqPageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const ToolsAndGuides = (props) => {
  const { faqLayout, faqPageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: faqLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: faqLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: faqLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: faqLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: faqLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: faqLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: faqLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: faqLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: faqLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);

  return (
    <WebLayout layout={layout}>
      <FaqsSection faqPageData={faqPageData} />
    </WebLayout>
  );
};

export default ToolsAndGuides;
