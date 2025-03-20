import AuthGuard from "@/auth/AuthGuard";
import ProfileSkeleton from "@/components/skeleton/layout/profile";
import MyOrderSkeleton from "@/components/skeleton/layout/profile/myOrderSkeleton";
import ProfileLayout from "@/layouts/profile";
import MyOrderData from "@/provider/myOrder/myOrderProvider";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <ProfileSkeleton />,
  ssr: false,
});

const OrderSection = dynamic(() => import("@/sections/profile/orders"), {
  loading: () => <MyOrderSkeleton />,
  ssr: false,
});

export const getServerSideProps = async (context) => {
  const { locale, res, req } = context;

  const { cookies } = req;
  const GET_ALL_COOKIES = (await cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    ? JSON.parse(cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : null;

  // res.setHeader(
  //   "Cache-Control",
  //   `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
  //   }`
  // );

  const myOrderLayout = await LayoutData({
    cookies: GET_ALL_COOKIES,
    locale: locale,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      myOrderLayout: myOrderLayout,
      // Will be passed to the page component as props
    },
  };
};

const Order = (props) => {
  const { myOrderLayout } = props;

  const layout = {
    HEADER: {
      TOPBAR: myOrderLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: myOrderLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: myOrderLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: myOrderLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: myOrderLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: myOrderLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: myOrderLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: myOrderLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: myOrderLayout?.result?.SEO,
  };

  return (
    <>
      <WebLayout layout={layout}>
        <AuthGuard>
          <ProfileLayout>
            <MyOrderData>
              <OrderSection />
            </MyOrderData>
          </ProfileLayout>
        </AuthGuard>
      </WebLayout>
    </>
  );
};

export default Order;
