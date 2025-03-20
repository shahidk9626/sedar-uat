import { useAuthContext } from "@/auth/useAuthContext";
import CommonPageComponent from "@/components/common-page";
import { HomePageLoadingScreen } from "@/components/loading-screen";
import {
  getOrderInfoData,
  getTamaraPayment,
  setOrderInfoPageData,
} from "@/redux/slices/payment-success";
import { useDispatch, useSelector } from "@/redux/store";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const TamaraPaymentAuthorise = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { locale } = router;
  const dispatch = useDispatch();
  const { orderInfoData, isOrderInfoLoading, isTamaraPaymentLoading } =
    useSelector((state) => state.orderInfo);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user } = cookies || {};
  const { t: translate } = useTranslation();
  let order_id = router.query.order_sys_id;
  let payment_order_id = router.query.orderId;

  const orderInfoFun = async (orderId) => {
    try {
      const response = await dispatch(getOrderInfoData(order_id));
      let res_data = response.data;
      if (res_data.return_status == 0 && res_data.error_message == "Success") {
        dispatch(setOrderInfoPageData(res_data?.header_result));
        GoogleAnalytics && GoogleAnalytics.purchase(
          res_data.header_result,
          res_data.line_result,
          user
        );
      } else {
        enqueueSnackbar(res_data?.error_message, {
          variant: "error",
          autoHideDuration: 4000
        });
      }
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: "error",
        autoHideDuration: 4000
      });
    }
  };

  const tamaraPayment = async () => {
    try {
      const response = await dispatch(getTamaraPayment(payment_order_id));
      let res_data = response.data;
      if (res_data) {
        if (res_data.return_status == "0") {
          router.push(
            "/" +
            locale +
            "/payment/success?payment_method=Tamara&orderId=" +
            order_id
          );
        } else {
          enqueueSnackbar(res_data?.error_message, {
            variant: "error",
            autoHideDuration: 4000
          });
        }
        orderInfoFun();
      }
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: "error",
        autoHideDuration: 4000
      });
    }
  };

  useEffect(() => {
    if (payment_order_id) {
      tamaraPayment();
    }
  }, [payment_order_id]);

  return isOrderInfoLoading || isTamaraPaymentLoading ? (
    <HomePageLoadingScreen />
  ) : (
    <CommonPageComponent
      image="/assets/payment_success/paymentSuccess.png"
      title={translate("OrderSuccessfullyPlaced")}
      heading={`${translate("Youwillreceiveanemailconfirmationto")}`}
      mail={`${user?.cust_email_id}`}
      subHeading={`${translate("Ordertotal")}`}
      buttonText={`${translate("ContinueShopping")}`}
      orderValue={`${translate(orderInfoData?.SOH_CCY_CODE)} ${orderInfoData ? orderInfoData.SOH_NET_VALUE : 0
        }`}
      paymentMethod="Tamara"
      link="/"
    />
  );
};

export default TamaraPaymentAuthorise;
