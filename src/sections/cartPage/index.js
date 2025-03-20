import { getCityList } from "@/redux/slices/cartPage";
import { useDispatch } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useAuthContext } from "@/auth/useAuthContext";
import useCartContext from "@/provider/cart/cartContext";
import { HomePageLoadingScreen } from "@/components/loading-screen";
import CartItemInfo from "./cartItemInfo";
import EmptyCardPage from "./emptyCardPage";


const CartPageSection = () => {
  const [loading, setLoading] = React.useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useAuthContext();
  const { cookies } = state;
  const {
    user,
    modificationUser,
    USER_ID,
    cniso,
    visitorId,
    site,
    langName,
    CCYCODE,
    CCYDECIMALS,
    countryName,
    detect_country,
  } = cookies || {};
  const { cartCityList } = useSelector((state) => state.cartPage);
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { cartState } = useCartContext();
  const { isCartLoading, cart } = cartState;
  const { query, pathname } = useRouter();
  let head_sys_id = modificationUser?.head_sys_id
    ? modificationUser?.head_sys_id
    : 0;

  const generatePromoCodeUrl = (promoCode) => {
    return `order/promoCodeFun/${promoCode}?lang=${langName}&site=${site}&country=${countryName}&visitorId=${visitorId}&userId=${USER_ID}&currency=${CCYCODE}&ccy_decimal=${CCYDECIMALS}&cn_iso=${cniso}&detect_country=${detect_country}&soh_sys_id=${
      head_sys_id || 0
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
      promoCode:
        head_sys_id && header_info?.SOH_PROMO_CODE
          ? header_info?.SOH_PROMO_CODE
          : "",
      promoCodeAmount:
        head_sys_id && header_info && header_info.SOH_PROMO_VALUE > 0
          ? header_info.SOH_PROMO_VALUE
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

  React.useEffect(() => {
    if (loading && isCartLoading) {
      setLoading(false);
    }
  }, [isCartLoading]);

  return (
    <>
      {loading && isCartLoading && user?.cust_type != "ADMIN" ? (
        <HomePageLoadingScreen />
      ) : (cart?.cart_count?.QTY !== null &&
          !head_sys_id &&
          pathname != "/modification") ||
        (cart?.save_later?.length > 0 &&
          !head_sys_id &&
          pathname != "/modification") ||
        (modificationUser &&
          cart?.cart_count?.QTY !== null &&
          pathname == "/modification") ||
        (cart?.save_later?.length > 0 &&
          modificationUser &&
          pathname == "/modification") ? (
        <>
          <CartItemInfo
            data={cart}
            formik={formik}
            checkoutFormik={checkoutFormik}
          />
        </>
      ) : (
        <EmptyCardPage />
      )}
    </>
  );
};

export default CartPageSection;
