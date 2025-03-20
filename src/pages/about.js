import SkeletonAbout from "@/components/skeleton/pages/aboutPage";
import { useDispatch } from "@/redux/store";
import AboutPageSection from "@/sections/about";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonAbout />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [aboutLayout, aboutPageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "about_us",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "about_us",
      locale,
    }),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      aboutLayout: aboutLayout,
      aboutPageData: aboutPageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const AboutUsPage = (props) => {
  const { aboutLayout, aboutPageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: aboutLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: aboutLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: aboutLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: aboutLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: aboutLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: aboutLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: aboutLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: aboutLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: aboutLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);

  return (
    <WebLayout layout={layout}>
      <AboutPageSection aboutPageData={aboutPageData} />
    </WebLayout>
  );
};
export default AboutUsPage;
