import SkeletonFreeConsultation from "@/components/skeleton/pages/freeConsultationPage";
import { useDispatch } from "@/redux/store";
import FreeConsultationSection from "@/sections/freeConsultation";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";


const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonFreeConsultation />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [freeConsultationLayout, freeConsultationPageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "free_consultation",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "free_consultation",
      locale,
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      freeConsultationLayout: freeConsultationLayout || null,
      freeConsultationPageData: freeConsultationPageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
    },
  };
};

const FreeConsultation = (props) => {
  const { freeConsultationLayout, freeConsultationPageData, isRu } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: freeConsultationLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: freeConsultationLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: freeConsultationLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: freeConsultationLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: freeConsultationLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: freeConsultationLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: freeConsultationLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: freeConsultationLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: freeConsultationLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);
  return (
    <WebLayout layout={layout} isRu={isRu}>
      <FreeConsultationSection
        freeConsultationPageData={freeConsultationPageData}
      />
    </WebLayout>
  );
};
export default FreeConsultation;
