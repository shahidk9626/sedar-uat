import useCartContext from "@/provider/cart/cartContext";
import { getProfileAddress } from "@/redux/slices/auth/profile";
import { getDeliveryPageData } from "@/redux/slices/delivery";
import { getLayout } from "@/redux/slices/layout";
import { resetAuthCookies } from "@/redux/slices/locale";
import { wrapper } from "@/redux/store";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import {
  ACCESS_TOKEN_KEY,
  NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES,
  SEDAR_USER_DATA,
  SEDAR_USER_MODIFICATION_DATA,
} from "@/utils/constant";
import { setReduxCookies } from "@/utils/serverSideAction";
import { getCookie, setCookie } from "cookies-next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import React from "react";

const HomePageLoadingScreen = dynamic(
  () => import("@/components/loading-screen/homePageLoadingScreen"),
  {
    loading: () => <></>,
    ssr: true,
  }
);

const ModificationDeliverySection = dynamic(
  () => import("@/sections/modification/delivery"),
  {
    loading: () => <HomePageLoadingScreen />,
    ssr: true,
  }
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale, res, req, query } = context;
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

    const { JWTAuthToken, user, modificationUser, USER_ID } = GET_ALL_COOKIES;
    let head_sys_id = modificationUser?.head_sys_id
      ? modificationUser?.head_sys_id
      : 0;

    const response = await apiSSRV2DataService.getAll({
      path: `v2/order/list`,
      param: {
        soh_sys_id: head_sys_id || 0,
      },
      locale,
      cookies: GET_ALL_COOKIES,
    });

    if (user) {
      await dispatch(
        getDeliveryPageData({
          soh_sys_id: head_sys_id || 0,
        })
      );
      /* if (user) {
         await dispatch(
           getProfileAddress({
             USER_ID: USER_ID,
             cust_user_id: user.cust_email_id,
             auth_token: JWTAuthToken,
           })
         );
       }*/
    }
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
    } else if (response && response.cart_count && response.cart_count.QTY == null) {
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

const DeliveryPage = (props) => {
  const { cartPageData } = props;
  const { cartState, setCartData } = useCartContext();

  React.useEffect(() => {
    setCartData(cartPageData);
  }, [cartPageData]);
  return <ModificationDeliverySection />;
};
export default DeliveryPage;
