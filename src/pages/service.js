import SkeletonService from "@/components/skeleton/pages/servicePage";
import { useDispatch } from "@/redux/store";
import ServicePageSection from "@/sections/service";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonService />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [serviceLayout, servicePageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "services",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "services",
      locale,
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      serviceLayout: serviceLayout,
      servicePageData: servicePageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const ServicePage = (props) => {
  const { serviceLayout, servicePageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: serviceLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: serviceLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: serviceLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: serviceLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: serviceLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: serviceLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: serviceLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: serviceLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: serviceLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);
  return (
    <WebLayout layout={layout}>
      <ServicePageSection servicePageData={servicePageData} />
    </WebLayout>
  );
};

export default ServicePage;
