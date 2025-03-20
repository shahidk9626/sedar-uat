import SkeletonReturnsRefund from "@/components/skeleton/pages/returnsRefundPage";
import { useDispatch } from "@/redux/store";
import ReturnRefundSection from "@/sections/returnRefund";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import {
  setClientSideReduxCookie
} from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonReturnsRefund />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [returnRefundLayout, returnRefundPageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "returns_refund",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "returns_refund",
      locale,
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      returnRefundLayout: returnRefundLayout,
      returnRefundPageData: returnRefundPageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const ReturnRefund = (props) => {
  const { returnRefundLayout, returnRefundPageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const layout = {
    HEADER: {
      TOPBAR: returnRefundLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: returnRefundLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: returnRefundLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: returnRefundLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: returnRefundLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: returnRefundLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: returnRefundLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: returnRefundLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: returnRefundLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);
  return (
    <WebLayout layout={layout}>
      <ReturnRefundSection returnRefundPageData={returnRefundPageData} />
    </WebLayout>
  );
};

ReturnRefund.getLayout = (page) => <WebLayout>{page}</WebLayout>;

export default ReturnRefund;
