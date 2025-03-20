import SkeletonFranchise from "@/components/skeleton/pages/franchisePage";
import { useDispatch } from "@/redux/store";
import FranchiseSection from "@/sections/franchise";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonFranchise />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [franchiseLayout, franchisePageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "franchise",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "franchise",
      locale,
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      franchiseLayout: franchiseLayout,
      franchisePageData: franchisePageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const FranchisePage = (props) => {
  const { franchiseLayout, franchisePageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: franchiseLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: franchiseLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: franchiseLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: franchiseLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: franchiseLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: franchiseLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: franchiseLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: franchiseLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: franchiseLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);
  return (
    <WebLayout layout={layout}>
      <FranchiseSection franchisePageData={franchisePageData} />
    </WebLayout>
  );
};

export default FranchisePage;
