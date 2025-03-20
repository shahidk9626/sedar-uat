import SkeletonCartPage from "@/components/skeleton/pages/cartPage";
import SnackbarProvider from "@/components/snackbar";
import useCartContext from "@/provider/cart/cartContext";
import { getDeliveryPolicyFun } from "@/redux/slices/cartPage";
import { getLayout } from "@/redux/slices/layout";
import { wrapper } from "@/redux/store";
import CartPageSection from "@/sections/cartPage";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { getDeliveryPolicyFunData } from "@/utils/cart";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Script from "next/script";
import React, { useMemo } from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonCartPage />,
  ssr: true,
});

export const getServerSideProps = async (context) => {
  const { locale, res, req } = context;
  const GET_ALL_COOKIES = (await req.cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    ? JSON.parse(req.cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : {};

  // res.setHeader(
  //   "Cache-Control",
  //   `public, s-maxage=10, stale-while-revalidate=${
  //     process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
  //   }`
  // );

  const { modificationUser } = GET_ALL_COOKIES;
  let head_sys_id = modificationUser?.head_sys_id
    ? modificationUser?.head_sys_id
    : 0;

  const deliveryLayoutData = await LayoutData({
    cookies: GET_ALL_COOKIES,
    locale,
    params: { page_name: "cartpage" },
  });

  const response = await apiSSRV2DataService.getAll({
    path: `v2/order/list`,
    param: {
      soh_sys_id: head_sys_id || 0,
    },
    locale,
    cookies: GET_ALL_COOKIES,
  });

  const deliveryData = await getDeliveryPolicyFunData({
    cookies: GET_ALL_COOKIES,
    locale: locale,
    params: {
      content: "cartpage",
    },
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      deliveryLayoutData: deliveryLayoutData,
      head_sys_id: head_sys_id,
      cartPageData: response || null,
      deliveryData: deliveryData,
      // Will be passed to the page component as props
    },
  };
};

const CartPage = (props) => {
  const { deliveryLayoutData, cartPageData, deliveryData } = props;
  const { setCartData, setDeliveryPolicyFun } = useCartContext();
  const layout = useMemo(
    () => ({
      HEADER: {
        TOPBAR: deliveryLayoutData?.result?.HEADER?.SG_TOP_BAR || [],
        MIDMENU: deliveryLayoutData?.result?.HEADER?.SGMIDSEC || [],
        CATEGORIES: deliveryLayoutData?.result?.HEADER?.SGMEGAMENU || [],
        LOGO: deliveryLayoutData?.result?.HEADER?.LOGO || null,
      },
      FOOTER: {
        firstSection: deliveryLayoutData?.result?.FOOTER?.SG_FOOTER_1 || [],
        secondSection: deliveryLayoutData?.result?.FOOTER?.SG_FOOTER_2 || [],
        thirdSection: deliveryLayoutData?.result?.FOOTER?.SG_FOOTER_3 || [],
        fourthSection: deliveryLayoutData?.result?.FOOTER?.SG_FOOTER_4 || [],
      },
      SEO: deliveryLayoutData?.result?.SEO,
    }),
    [deliveryLayoutData]
  );

  React.useEffect(() => {
    setCartData(cartPageData);
    setDeliveryPolicyFun(deliveryData);
  }, [cartPageData, deliveryData]);

  return (
    <>
      {/* <Script
        type="text/javascript"
        strategy="afterInteractive"
        src="https://checkout.tabby.ai/integration.js"
        defer
      /> */}
      {/* <Script
        type="text/javascript"
        strategy="afterInteractive"
        src="https://checkout.tabby.ai/tabby-promo.js"
        defer
      />
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        src="https://cdn.tamara.co/widget-v2/tamara-widget.js"
        defer
      /> */}
      <WebLayout layout={layout}>
        <SnackbarProvider>
          <CartPageSection />
        </SnackbarProvider>
      </WebLayout>
    </>
  );
};
export default CartPage;
