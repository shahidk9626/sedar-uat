import { useAuthContext } from "@/auth/useAuthContext";
import MyOrderSkeleton from "@/components/skeleton/layout/profile/myOrderSkeleton";
import useMyOrderContext from "@/provider/myOrder/useMyOrderContext";
import { useRouter } from "next/router";
import React from "react";
import NotFound from "./noActive";
import OrderHeading from "./orderHeading";


const OrderSection = () => {
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user, JWTAuthToken } = cookies;
  const { myOrderState, getMyOrderData } = useMyOrderContext();
  const { isMyOrderLoading, myOrderData } = myOrderState;

  React.useEffect(() => {
    if (locale && user && JWTAuthToken) {
      getMyOrderData({
        cust_user_id: user?.cust_email_id,
        auth_token: JWTAuthToken,
      });
    }
  }, [locale, user?.cust_email_id, JWTAuthToken]);

  if (isMyOrderLoading) {
    return <MyOrderSkeleton />;
  }

  return (
    <>
      {myOrderData && myOrderData?.result && myOrderData?.result?.length > 0 ? (
        <OrderHeading data={myOrderData} />
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default OrderSection;
