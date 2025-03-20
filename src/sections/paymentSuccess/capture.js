import { useAuthContext } from "@/auth/useAuthContext";
import CommonPageComponent from "@/components/common-page";
import { HomePageLoadingScreen } from "@/components/loading-screen";
import FloatPrice from "@/modules/product/floatPrice";
import {
  getOrderInfoData,
  getPaymentCaptureData,
  getRetrievePaymentData,
  setOrderInfoPageData,
} from "@/redux/slices/payment-success";
import { useDispatch, useSelector } from "@/redux/store";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const PaymentCapture = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t: translate } = useTranslation();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { orderInfoData, isOrderInfoLoading } = useSelector(
    (state) => state.orderInfo
  );
  const { state } = useAuthContext();
  const { cookies } = state;
  const { CCYCODE } = cookies || {};
  const { user } = cookies || {};
  const { query, locale } = useRouter();
  let order_id = query?.orderId;
  let payment_id = query?.payment_id;

  const retrievePayment = async () => {
    try {
      const response = await dispatch(getRetrievePaymentData(payment_id));
      let res_data = response.data;
      if (
        res_data.httpCode == 200 &&
        res_data.curl_response.status != "error"
      ) {
        push(
          "/" +
          locale +
          "/payment/success?payment_method=Tabby&orderId=" +
          order_id
        );
      } else if (
        res_data.curl_response.status == "error" &&
        res_data.curl_response.error
      ) {
        enqueueSnackbar(res_data?.curl_response?.error, {
          variant: "error",
          autoHideDuration: 4000
        });
      } else {
        enqueueSnackbar(res_data?.curl_response?.error, {
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

  const orderInfoFun = async () => {
    try {
      const response = await dispatch(getOrderInfoData(order_id));
      let res_data = response.data;
      if (res_data.return_status == 0 && res_data.error_message == "Success") {
        dispatch(setOrderInfoPageData(res_data?.header_result));
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

  const getPaymentCapture = async () => {
    try {
      const response = await dispatch(getPaymentCaptureData(payment_id));

      let res_data = response.data;
      if (res_data) {
        if (
          res_data.curl_response &&
          res_data.httpCode == 200 &&
          res_data.curl_response.status != "error"
        ) {
          retrievePayment();
        } else if (
          res_data.curl_response &&
          res_data.curl_response.status == "error" &&
          res_data.curl_response.error
        ) {
          enqueueSnackbar(res_data?.curl_response?.error, {
            variant: "error",
            autoHideDuration: 4000
          });
        } else {
          if (res_data.return_status == "333") {
            push(
              "/" +
              locale +
              "/payment/success?payment_method=Tabby&orderId=" +
              query?.orderId
            );
          } else {
            enqueueSnackbar(res_data?.error_message, {
              variant: "error",
              autoHideDuration: 4000
            });
          }
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

  React.useEffect(() => {
    if (payment_id) {
      getPaymentCapture();
    }
  }, [payment_id]);


  return isOrderInfoLoading || !orderInfoData ? (
    <HomePageLoadingScreen />
  ) : (
    <CommonPageComponent
      image={"/assets/payment_success/paymentSuccess.png"}
      title={
        <Typography
          component="span"
          sx={(theme) => ({
            color: theme.palette.common.black,
            fontSize: {
              lg: "32px",
              md: "32px",
              sm: "25px",
              xs: "25px",
              xxs: "25px",
            },
            fontFamily: theme.fontFaces.helveticaNeueMedium,
            lineHeight: {
              lg: "38px",
              md: "38px",
              sm: "30px",
              xs: "30px",
              xxs: "30px",
            },
          })}
        >
          {translate("OrderSuccessfullyPlaced")}
        </Typography>
      }
      heading={
        <Typography
          component="span"
          sx={(theme) => ({
            fontSize: "18px",
            lineHeight: "27px",
            fontWeight: 400,
            fontFamily: theme.fontFaces.helveticaNeueLight,
            color: theme.palette.common.black,
          })}
        >
          {translate("Youwillreceiveanemailconfirmationto")}
        </Typography>
      }
      mail={
        <Typography
          component="span"
          sx={(theme) => ({
            fontSize: "18px",
            lineHeight: "27px",
            fontWeight: 700,
            fontFamily: theme.fontFaces.helveticaNeueLight,
          })}
        >
          {user?.cust_email_id}
        </Typography>
      }
      subHeading={
        <>
          <Typography
            component="span"
            sx={(theme) => ({
              fontSize: "18px",
              lineHeight: "27px",
              fontWeight: 400,
              color: theme.palette.common.black,
              fontFamily: theme.fontFaces.helveticaNeueLight,
            })}
          >
            {`${translate("Ordertotal")}`} : {translate(CCYCODE)}{" "}
            <FloatPrice
              price={orderInfoData ? orderInfoData?.SOH_NET_VALUE : 0}
            />
          </Typography>
          <Typography
            component="span"
            sx={(theme) => ({
              fontSize: "18px",
              lineHeight: "27px",
              fontWeight: 400,
              color: theme.palette.common.black,
              fontFamily: theme.fontFaces.helveticaNeueLight,
            })}
          >
            {translate("PaymentMethod")} : Tabby
          </Typography>
        </>
      }
      sxSubHeading={{
        display: "grid",
        gap: "10px",
      }}
      buttonText={translate("ContinueShopping")}
      link="/"
    />
  );
};

export default PaymentCapture;
