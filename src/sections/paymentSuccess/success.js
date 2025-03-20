import {
  ReTagThankYouPage,
  admitadInvoice,
  admitadOrderedItem,
} from "@/admitad/AdmitadIndex";
import { useAuthContext } from "@/auth/useAuthContext";
import CommonPageComponent from "@/components/common-page";
import SuccessSkeleton from "@/components/skeleton/checkout/success";
import {
  getOrderInfoData,
  setOrderInfoPageData,
} from "@/redux/slices/payment-success";
import { useDispatch, useSelector } from "@/redux/store";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { orderInfoData, isOrderInfoLoading } = useSelector(
    (state) => state.orderInfo
  );
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user } = cookies || {};
  const { query, push } = useRouter();

  const orderInfoFun = async (orderId) => {
    try {
      const response = await dispatch(getOrderInfoData(orderId));
      let res_data = response?.data;
      if (
        res_data?.return_status == 0 &&
        res_data?.error_message == "Success"
      ) {
        dispatch(setOrderInfoPageData(res_data?.header_result));
        GoogleAnalytics && GoogleAnalytics.purchase(
          res_data.header_result,
          res_data.line_result,
          user
        );
        var ad_products = [];
        res_data.line_result.forEach((item) => {
          admitadOrderedItem(item); //ADMITAD Order add
          ad_products.push({
            id: item.brand_info.SII_CODE,
            number: item.SOL_QTY,
          });
        });
        if (res_data.header_result && res_data.header_result.SOH_TXN_NO) {
          setTimeout(function () {
            admitadInvoice(res_data.header_result, user?.cust_email_id); //ADMITAD.Invoice

            ReTagThankYouPage(
              res_data.header_result.SOH_TXN_NO,
              res_data.header_result.SOH_NET_VALUE,
              ad_products
            );
          }, 1500);
        }
      } else {
        push("/");
        enqueueSnackbar(res_data?.error_message, {
          variant: "error",
          autoHideDuration: 4000
        });
      }
    } catch (error) {
      push("/");
      enqueueSnackbar(error?.message, {
        variant: "error",
        autoHideDuration: 4000
      });
    }
  };

  useEffect(() => {
    if (query?.orderId) {
      orderInfoFun(query?.orderId);
    }
  }, [query?.orderId]);

  return isOrderInfoLoading ? (
    <SuccessSkeleton />
  ) : (
    <CommonPageComponent
      image="/assets/payment_success/paymentSuccess.png"
      title={translate("OrderSuccessfullyPlaced")}
      heading={`${translate("Youwillreceiveanemailconfirmationto")}`}
      mail={`${user && user.cust_email_id ? user.cust_email_id : ''}`}
      subHeading={`${translate("Ordertotal")}`}
      buttonText={translate("ContinueShopping")}
      orderValue={` : ${translate(orderInfoData?.SOH_CCY_CODE)} ${orderInfoData ? orderInfoData.SOH_NET_VALUE : 0
        }`}
      link="/"
      paymentMethod={query?.payment_method}
    />
  );
};

export default PaymentSuccess;
