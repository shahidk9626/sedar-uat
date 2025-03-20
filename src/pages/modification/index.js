import { useAuthContext } from "@/auth/useAuthContext";
import WebLayoutSkeleton from "@/components/skeleton/layout";
import useCartContext from "@/provider/cart/cartContext";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { getDeliveryPolicyFunData } from "@/utils/cart";
// import ModificationCartPageSection from "@/sections/modification/cartPage";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import { setCookie, getCookie } from "cookies-next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useMemo, useEffect } from "react";

const HomePageLoadingScreen = dynamic(
  () => import("@/components/loading-screen/homePageLoadingScreen"),
  {
    loading: () => <></>,
    ssr: true,
  }
);

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <WebLayoutSkeleton />,
  ssr: true,
});
const ModificationCartPageSection = dynamic(
  () => import("@/sections/modification/cartPage"),
  {
    loading: () => <HomePageLoadingScreen />,
    ssr: true,
  }
);

export const getServerSideProps = async (context) => {
  const { locale, res, req, query } = context;
  const { head_sys_id } = query;
  const GET_ALL_COOKIES = (await req.cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    ? JSON.parse(req.cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : null;



  // res.setHeader(
  //   "Cache-Control",
  //   `public, s-maxage=10, stale-while-revalidate=${
  //     process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
  //   }`
  // );
  const deliveryLayoutData = await LayoutData({
    cookies: GET_ALL_COOKIES,
    locale,
    params: { page_name: "cartpage" },
  });

  const deliveryData = await getDeliveryPolicyFunData({
    cookies: GET_ALL_COOKIES,
    locale: locale,
    params: {
      content: "cartpage",
      soh_sys_id: head_sys_id || 0,
    },
  });

  const response = await apiSSRV2DataService.getAll({
    path: `v2/order/list`,
    param: {
      soh_sys_id: head_sys_id || 0,
    },
    locale,
    cookies: GET_ALL_COOKIES,
  });

  if (Number(head_sys_id) <= 0 || Number(head_sys_id) == "NAN" || !head_sys_id) {

    await setCookie(
      NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES,
      JSON.stringify({
        ...(getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES, {
          req,
          res,
        })
          ? JSON.parse(
            getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES, {
              req,
              res,
            }) || "undefined"
          )
          : {}),
        user: null,
        modificationUser: null,
        JWTAuthToken: null,
        USER_ID: 0,
        isGuestUser: false,
      }),
      {
        req,
        res,
        maxAge: process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TWENTY_FOUR_HOURS,
      }
    );

    return {
      redirect: {
        destination: `/${locale}`,
        statusCode: 301,
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      deliveryLayoutData: deliveryLayoutData || null,
      cartPageData: response || null,
      deliveryData: deliveryData || null,
      // Will be passed to the page component as props
    },
  };
};

const CartPage = (props) => {
  const { query } = useRouter();
  const { head_sys_id } = query;
  const { state, setLoginPopupOpen, logout } = useAuthContext();
  const { cookies } = state;
  const { user, JWTAuthToken, modificationUser } = cookies || {};
  const { cartPageData, deliveryLayoutData, deliveryData } = props;
  const { setCartData, setDeliveryPolicyFun } = useCartContext();


  useEffect(() => {
    setCartData(cartPageData);
    setDeliveryPolicyFun(deliveryData);
  }, [cartPageData, deliveryData]);

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

  useEffect(() => {
    if (head_sys_id && user && user?.cust_type != "ADMIN") {
      logout();
      setLoginPopupOpen(true);
    } else {
      if (user && head_sys_id && JWTAuthToken && user?.cust_type == "ADMIN" && modificationUser && modificationUser?.head_sys_id != head_sys_id) {
        setLoginPopupOpen(true);
        logout();
      } else if (!user && head_sys_id && !JWTAuthToken && !user && !modificationUser) {
        setLoginPopupOpen(true);
      }
    }
  }, [head_sys_id, user, JWTAuthToken, modificationUser]);

  return (
    <>
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        src="https://checkout.tabby.ai/integration.js"
        defer
      />
      <Script
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
      />
      <WebLayout layout={layout}>
        <ModificationCartPageSection />
      </WebLayout>
    </>
  );
};
export default CartPage;
