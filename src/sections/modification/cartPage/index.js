import { useAuthContext } from "@/auth/useAuthContext";
import { HomePageLoadingScreen } from "@/components/loading-screen";
import SnackbarProvider from "@/components/snackbar";
import useCartContext from "@/provider/cart/cartContext";
import { getCityList } from "@/redux/slices/cartPage";
import { useDispatch } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartItemInfo from "./cartItemInfo";
import EmptyCardPage from "./emptyCardPage";

const ModificationCartPageSection = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { state, setLoginPopupOpen, logout } = useAuthContext();
  const { cookies } = state;
  const { cartCityList } = useSelector((state) => state.cartPage);
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();

  const { cartState } = useCartContext();
  const { cart, isCartLoading } = cartState;
  const { pathname, query } = useRouter();

  const { USER_ID,
    cniso,
    visitorId,
    site,
    langName,
    CCYCODE,
    CCYDECIMALS,
    countryName,
    detect_country, JWTAuthToken, user, modificationUser } = cookies || {};

  let head_sys_id = modificationUser?.head_sys_id ? modificationUser?.head_sys_id : 0;

  console.log(USER_ID, modificationUser, 'modificationUser', head_sys_id, query.head_sys_id);



  const generatePromoCodeUrl = (promoCode) => {
    return `order/promoCodeFun/${promoCode}?lang=${langName}&site=${site}&country=${countryName}&visitorId=${visitorId}&userId=${USER_ID}&currency=${CCYCODE}&ccy_decimal=${CCYDECIMALS}&cn_iso=${cniso}&detect_country=${detect_country}&soh_sys_id=${head_sys_id || 0
      }`;
  };

  const handlePromoCodeSubmission = async (values, setFieldValue, formik) => {
    const promoCodeUrl = generatePromoCodeUrl(values.promoCode);
    try {
      const response = await axiosInstance.get(promoCodeUrl);
      const data = response?.data;
      let fieldError = "";

      if (
        data.return_status === 0 &&
        data.error_message === "Success" &&
        data.result.OFFER_AMOUNT > 0
      ) {
        setFieldValue("promoCodeAmount", data?.result?.OFFER_AMOUNT);
        setFieldValue("promoCodeDesc", data?.result?.SCPN_DESC);
        enqueueSnackbar(
          translate("CouponCodeApplied") || translate("SomethingWentWrong"),
          {
            variant: "success",
            autoHideDuration: 4000
          }
        );
      } else {
        if (data?.result?.SCPN_PROMO_CODE === "Invalid") {
          fieldError = translate("promo_code_error");
        } else if (data?.result?.SCPN_PROMO_CODE === "Expired") {
          fieldError = translate("code_is_invalid_or_expired");
        } else {
          fieldError = translate("promo_code_error_mgs");
        }
      }
      formik.setFieldError("promoCode", fieldError);
    } catch (error) {
      console.log("Promocode Error", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      promoCode: cart?.header_info?.SOH_PROMO_CODE
        ? cart?.header_info?.SOH_PROMO_CODE
        : "",
      promoCodeAmount: cart?.header_info?.SOH_PROMO_VALUE
        ? cart?.header_info?.SOH_PROMO_VALUE
        : 0,
      promoCodeDesc: "",
      showRoomVal: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.promoCode || values.promoCode?.length < 2) {
        errors.promoCode = "Please enter promo code";
      }
      return errors;
    },
    onSubmit: async (values, { setFieldValue }) => {
      let data = { ...values, soh_sys_id: head_sys_id || 0 };
      await handlePromoCodeSubmission(data, setFieldValue, formik);
    },
  });

  React.useEffect(() => {
    if (cart?.header_info) {
      formik.setFieldValue(
        "promoCode",
        cart?.header_info?.SOH_PROMO_CODE
          ? cart?.header_info?.SOH_PROMO_CODE
          : ""
      );
      formik.setFieldValue(
        "promoCodeAmount",
        cart?.header_info?.SOH_PROMO_VALUE
          ? cart?.header_info?.SOH_PROMO_VALUE
          : 0
      );
    }
  }, [cart?.header_info]);

  React.useEffect(() => {
    if (cniso) {
      dispatch(
        getCityList({
          country: cniso,
        })
      );
    }
  }, [cniso, USER_ID]);

  const checkoutFormik = useFormik({
    initialValues: {
      deliveryType: "",
      showRoomVal: "",
      promoCodeDesc: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.promoCode || values.promoCode?.length < 2) {
        errors.promoCode = "Please enter promo code";
      }
      return errors;
    },
    onSubmit: async (values, { setFieldValue }) => {
      await handlePromoCodeSubmission(values, setFieldValue, checkoutFormik);
    },
  });

  useEffect(() => {
    if (cart && cart?.header_info) {
      const defaultChecked = cart?.header_info?.SOH_CARRIER_CODE;
      checkoutFormik.setFieldValue("deliveryType", defaultChecked);

      if (
        defaultChecked == "DO03" &&
        cartCityList?.clickCollectResult?.length > 0
      ) {
        const defaultShowRoomVal = cartCityList?.clickCollectResult.find(
          (item) => item?.SSA_SYS_ID == cart?.header_info?.SOH_SHOWROOM_CODE
        );

        checkoutFormik.setFieldValue("showRoomVal", defaultShowRoomVal);
      }
    }
  }, [cart, cartCityList?.clickCollectResult]);

  return (
    <>
      {isCartLoading ? (
        <HomePageLoadingScreen />
      ) : (!isCartLoading &&
        modificationUser &&
        cart?.cart_count?.QTY !== null &&
        pathname == "/modification") ||
        (!isCartLoading &&
          cart?.save_later?.length > 0 &&
          modificationUser &&
          pathname == "/modification") ? (
        <SnackbarProvider>
          <CartItemInfo
            data={cart}
            formik={formik}
            checkoutFormik={checkoutFormik}
          />
        </SnackbarProvider>
      ) : (
        <EmptyCardPage />
      )}
    </>
  );
};

export default ModificationCartPageSection;
