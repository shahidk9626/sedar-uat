import CommonPageComponent from "@/components/common-page";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PaymentError = ({ msg }) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  let mgs = msg ? msg : router?.query?.mgs;
  let status_code = router?.query?.status ? router?.query?.status : "";
  let order_id = router?.query?.orderId;

  useEffect(() => {
    if (["02", "14", "18"].indexOf(status_code) >= 0) {
      router.push(
        `/payment/success?orderId=${order_id}&mgs=${mgs}&status=${status_code}`
      );
    }
  }, []);

  return (
    <CommonPageComponent
      image="/assets/payment_success/errorpage.png"
      title={translate("PaymentFailed")}
      mail={mgs ? mgs : translate("Pleasecheckyourinternetconnection") || ""}
      buttonText={translate("Back")}
      link="/cartPage"
      mt={0}
      height={"71vh"}
      headingMargin={{ my: 3 }}
    />
  );
};

export default PaymentError;
