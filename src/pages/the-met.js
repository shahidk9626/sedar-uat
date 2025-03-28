import SkeletonTheMet from "@/components/skeleton/pages/theMetPage";
import { useDispatch } from "@/redux/store";
import TheMetSection from "@/sections/theMet";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonTheMet />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [theMetLayout, theMetPageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "the_met",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "the_met",
      locale,
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      theMetLayout: theMetLayout,
      theMetPageData: theMetPageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
    },
  };
};

export default function TheMet(props) {
  const { theMetLayout, theMetPageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: theMetLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: theMetLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: theMetLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: theMetLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: theMetLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: theMetLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: theMetLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: theMetLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: theMetLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);
  return (
    <React.Fragment>
      <Head>
        <title>Sedar</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WebLayout layout={layout}>
        <TheMetSection theMetPageData={theMetPageData} />
      </WebLayout>
    </React.Fragment>
  );
}
