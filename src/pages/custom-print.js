import SkeletonCustomPrint from "@/components/skeleton/pages/customPrintPage";
import { useDispatch } from "@/redux/store";
import CustomPrintSection from "@/sections/customPrint";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonCustomPrint />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [customPrintLayout, customPrintPageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "custom_product",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "custom_product",
      locale,
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      customPrintPageData: customPrintPageData?.data,
      customPrintLayout: customPrintLayout,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const CustomPrintPage = (props) => {
  const { customPrintLayout, customPrintPageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: customPrintLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: customPrintLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: customPrintLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: customPrintLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: customPrintLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: customPrintLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: customPrintLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: customPrintLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: customPrintLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);
  return (
    <WebLayout layout={layout}>
      <CustomPrintSection customPrintPageData={customPrintPageData} />
    </WebLayout>
  );
};

export default CustomPrintPage;
