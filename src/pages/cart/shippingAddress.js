import ShippingSkeleton from "@/components/skeleton/checkout/shippingAddress";
import useCartContext from "@/provider/cart/cartContext";
import { getShippingAddressList } from "@/redux/slices/shippingAddressList";
import { wrapper } from "@/redux/store";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import React from "react";

const ShippingAddressSection = dynamic(
  () => import("@/sections/shippingAddress"),
  {
    loading: () => <ShippingSkeleton />,
    ssr: false,
  }
);

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

    await setReduxCookies(context, store);

    const { cookies } = store.getState().locale;
    const { user, modificationUser } = GET_ALL_COOKIES;
    let head_sys_id = modificationUser?.head_sys_id
      ? modificationUser?.head_sys_id
      : 0;

    const { USER_ID, cniso } = cookies || {};

    if (!USER_ID) {
      return {
        redirect: {
          destination: `/${locale}`,
          statusCode: 301,
        },
      };
    }

    if (user) {
      const { JWTAuthToken } = GET_ALL_COOKIES;
      await dispatch(
        getShippingAddressList({
          id: USER_ID,
          cust_user_id: user.cust_email_id,
          auth_token: JWTAuthToken,
          CNISO: cniso,
        })
      );
    }
    const response = await apiSSRV2DataService.getAll({
      path: `v2/order/list`,
      param: {
        soh_sys_id: head_sys_id || 0,
      },
      locale,
      cookies: GET_ALL_COOKIES,
    });

    if (!USER_ID) {
      return {
        redirect: { destination: `/${locale}/cartPage`, statusCode: 301 },
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

  React.useEffect(() => {
    setCartData(cartPageData);
  }, [cartPageData]);
  return <ShippingAddressSection />;
};
export default ShippingAddress;
