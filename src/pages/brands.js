import SkeletonBrands from "@/components/skeleton/pages/brandsPage";
import { useDispatch } from "@/redux/store";
import BrandsSection from "@/sections/brands";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonBrands />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [brandLayout, brandPageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "brands",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "brands",
      locale,
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      brandLayout: brandLayout,
      brandPageData: brandPageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const Brands = (props) => {
  const { brandLayout, brandPageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: brandLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: brandLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: brandLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: brandLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: brandLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: brandLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: brandLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: brandLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: brandLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);

  return (
    <WebLayout layout={layout}>
      <BrandsSection brandPageData={brandPageData} />
    </WebLayout>
  );
};

export default Brands;
