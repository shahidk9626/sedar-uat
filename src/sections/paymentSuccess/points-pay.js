import { useAuthContext } from "@/auth/useAuthContext";
import CommonPageComponent from "@/components/common-page";
import { HomePageLoadingScreen } from "@/components/loading-screen";
import {
  getOrderInfoData,
  getPaymentPointsPay,
  setOrderInfoPageData,
} from "@/redux/slices/payment-success";
import { useDispatch, useSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const PaymentPointsPay = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { orderInfoData, isOrderInfoLoading, isPaymentPointsPayLoading } =
    useSelector((state) => state.orderInfo);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user } = cookies || {};
  const { query, locale, push } = useRouter();

  let orderId = query?.order;
  let payment_id = query?.guid;
  let pointpay_status = query?.status;
  let user_id = query?.user_id;

  const orderInfoFun = async () => {
    try {
      const response = await dispatch(getOrderInfoData(orderId));
      let res_data = response?.data;
      if (res_data.return_status == 0 && res_data.error_message == "Success") {
        dispatch(setOrderInfoPageData(res_data?.header_result));
      } else {
        enqueueSnackbar(res_data?.error_message, {
          variant: "error",
          autoHideDuration: 4000
        });
        push("/");
      }
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: "error",
        autoHideDuration: 4000
      });
    }
  };

  const getPaymentPay = async () => {
    try {
      const response = await dispatch(getPaymentPointsPay(payment_id, user_id));
      let res_data = response?.data;
      if (res_data) {
        if (
          res_data.return_status == 0 &&
          res_data.error_message == "Success"
        ) {
          push(
            "/" +
            locale +
            "/payment/success?payment_method=PointsPay&orderId=" +
            orderId
          );
        } else {
          enqueueSnackbar(res_data?.error_message, {
            variant: "error",
            autoHideDuration: 4000
          });
        }
        orderInfoFun();
      } else {
        push(
          "/" +
          locale +
          "/payment/success?payment_method=PointsPay&orderId=" +
          orderId
        );
      }
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: "error",
        autoHideDuration: 4000
      });
    }
  };

  useEffect(() => {
    if (payment_id) {
      getPaymentPay();
      if (pointpay_status != "SUCCESS") {
      }
    }
  }, [payment_id]);

  return isOrderInfoLoading || !orderInfoData ? (
    <HomePageLoadingScreen />
  ) : (
    <CommonPageComponent
      image="/assets/payment_success/paymentSuccess.png"
      title={translate("OrderSuccessfullyPlaced")}
      heading={`${translate("Youwillreceiveanemailconfirmationto")}`}
      mail={user?.cust_email_id}
      subHeading={`${translate("Ordertotal")}`}
      buttonText={`${translate("ContinueShopping")}`}
      orderValue={`${translate(orderInfoData?.SOH_CCY_CODE)} ${orderInfoData ? orderInfoData.SOH_NET_VALUE : 0
        }`}
      paymentMethod="PointsPay"
      link="/"
    />
  );
};

export default PaymentPointsPay;
