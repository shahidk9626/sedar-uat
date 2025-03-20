import useCartContext from "@/provider/cart/cartContext";
import { getProfileAddress } from "@/redux/slices/auth/profile";
import { useAuthContext } from "@/auth/useAuthContext";
import { wrapper } from "@/redux/store";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { setReduxCookies } from "@/utils/serverSideAction";
import { getCookie, setCookie } from "cookies-next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

const HomePageLoadingScreen = dynamic(
  () => import("@/components/loading-screen/homePageLoadingScreen"),
  {
    loading: () => <></>,
    ssr: true,
  }
);

const ModificationShipping = dynamic(
  () => import("@/sections/modification/shipping"),
  {
    loading: () => <HomePageLoadingScreen />,
    ssr: true,
  }
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale, res, req } = context;
    const { dispatch, getState } = store;
    const GET_ALL_COOKIES = (await req.cookies[
      NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES
    ])
      ? JSON.parse(req.cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
      : null;
    // res.setHeader(
    //   "Cache-Control",
    //   `public, s-maxage=10, stale-while-revalidate=${
    //     process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
    //   }`
    // );

    await setReduxCookies(context, store);

    const { cookies } = store.getState().locale;
    const { JWTAuthToken, user, modificationUser, USER_ID } = GET_ALL_COOKIES;
    let head_sys_id = modificationUser?.head_sys_id ? modificationUser?.head_sys_id : 0;

    /* if (user) {
       await dispatch(
         getProfileAddress({
           USER_ID: USER_ID,
           cust_user_id: user.cust_email_id,
           auth_token: JWTAuthToken,
         })
       );
     }*/
    const response = await apiSSRV2DataService.getAll({
      path: `v2/order/list`,
      param: {
        soh_sys_id: head_sys_id || 0,
      },
      locale,
      cookies: GET_ALL_COOKIES,
    });

    if (Number(head_sys_id) <= 0 || Number(head_sys_id) == "NAN" || !head_sys_id) {
      const cookiesData = {
        ...(getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES, { req, res })
          ? JSON.parse(
            getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES, { req, res }) ||
            "undefined"
          )
          : {}),
        user: null,
        modificationUser: null,
        JWTAuthToken: null,
        USER_ID: 0,
        isGuestUser: false,
      };

      setCookie(
        NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES,
        JSON.stringify(cookiesData || "undefined"),
        {
          req,
          res,
        }
      );
      return {
        redirect: {
          destination: `/${locale}`,
          statusCode: 301,
        },
      };
    } else if (response && response.cart_count && (response.cart_count.QTY == null)) {
      return {
        redirect: {
          destination: `/${locale}`,
          statusCode: 301,
        },
      };
    }

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"], null, [
          "en",
          "no",
        ])),
        cartPageData: response || null,
        // Will be passed to the page component as props
      },
    };
  }
);

const ShippingAddress = (props) => {
  const { cartPageData } = props;
  const { setCartData } = useCartContext();
  const { state, setLoginPopupOpen, logout } = useAuthContext();
  const { query } = useRouter();
  const { head_sys_id } = query;
  const { cookies } = state;
  const { user, JWTAuthToken, modificationUser } = cookies || {};


  useEffect(() => {
    if (head_sys_id && user && user?.cust_type != "ADMIN") {
      logout();
      setLoginPopupOpen(true);
    } else if (head_sys_id && user && user?.cust_type == "ADMIN" && cartPageData.header_info == null) {
      logout();
      setLoginPopupOpen(true);
    } else {
      if (user && head_sys_id && JWTAuthToken && user?.cust_type == "ADMIN" && modificationUser && modificationUser?.head_sys_id != head_sys_id) {
        setLoginPopupOpen(true);
        logout();
      } else if (!user && head_sys_id && !JWTAuthToken && !user && !modificationUser) {
        setLoginPopupOpen(true);
      } else if (cartPageData && cartPageData.header_info == null) {
        logout();
      }
    }
  }, [head_sys_id, user, JWTAuthToken, modificationUser]);

  useEffect(() => {
    setCartData(cartPageData);
  }, [cartPageData]);
  return <ModificationShipping />;
};
export default ShippingAddress;
