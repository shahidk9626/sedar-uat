import ClickCollectSkeleton from "@/components/skeleton/checkout/clickCollect";
import useCartContext from "@/provider/cart/cartContext";
import { getProfileAddress } from "@/redux/slices/auth/profile";
import { getCountry } from "@/redux/slices/location";
import { wrapper } from "@/redux/store";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import React from "react";

const ClickCollectSection = dynamic(() => import("@/sections/clickCollect"), {
  loading: () => <ClickCollectSkeleton />,
  ssr: false,
});

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale, res, req } = context;
    const { dispatch } = store;
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
    const { cniso, USER_ID } = GET_ALL_COOKIES || {};

    await setReduxCookies(context, store);

    const { JWTAuthToken, user, modificationUser } = GET_ALL_COOKIES;
    let head_sys_id = modificationUser?.head_sys_id
      ? modificationUser?.head_sys_id
      : 0;

    if (!USER_ID) {
      return {
        redirect: {
          destination: `/${locale}`,
          statusCode: 301,
        },
      };
    }

    if (user) {
      await dispatch(
        getProfileAddress({
          USER_ID: USER_ID,
          cust_user_id: user.cust_email_id,
          auth_token: JWTAuthToken,
        })
      );
    }
    await dispatch(
      getCountry({
        cn_iso: cniso,
      })
    );

    const response = await apiSSRV2DataService.getAll({
      path: `v2/order/list`,
      param: {
        soh_sys_id: head_sys_id || 0,
      },
      locale,
      cookies: GET_ALL_COOKIES,
    });

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

const ClickCollectPage = (props) => {
  const { cartPageData } = props;
  const { setCartData } = useCartContext();

  React.useEffect(() => {
    setCartData(cartPageData);
  }, [cartPageData]);
  return <ClickCollectSection />;
};
export default ClickCollectPage;
