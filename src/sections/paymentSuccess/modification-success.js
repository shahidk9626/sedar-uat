import CommonPageComponent from "@/components/common-page";
import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useAuthContext } from "@/auth/useAuthContext";
import { useRouter } from "next/router";


const ModificationSuccess = () => {
  const { t: translate } = useTranslation();


  const { state, logout } = useAuthContext();
  const { query } = useRouter();
  const { orderId } = query;
  const { cookies } = state;
  const { user, JWTAuthToken, modificationUser } = cookies || {};


  useEffect(() => {
    if (orderId && JWTAuthToken && user && user?.cust_type == "ADMIN" && modificationUser && modificationUser.head_sys_id) {
      logout();
    }
  }, []);

  return (
    <CommonPageComponent
      image="/assets/payment_success/paymentSuccess.png"
      title={translate("OrderSuccessfullyPlaced")}
      buttonText={`${translate("ContinueShopping")}`}
      link="/"
    />
  );
};

export default ModificationSuccess;
