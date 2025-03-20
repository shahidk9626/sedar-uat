import { useAuthContext } from "@/auth/useAuthContext";
import ToastMessage from "@/components/dialog/toastMessage";
import { TextBox } from "@/components/form";
import Iconify from "@/components/iconify";
import TabbySkeleton from "@/components/skeleton/productDetails/productDetailsSection/tabbySkeleton";
import FloatPrice from "@/modules/product/floatPrice";
import useCartContext from "@/provider/cart/cartContext";
import { useProgressRouter } from "@/provider/router/useProgressRouter";
import { useSelector } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import TermsConditionDilogue from "./termsDilogue";
import dynamic from "next/dynamic";
import $ from "jquery";

const TabbyPromoMgs = dynamic(
  () => import("@/modules/PaymentGateway/Tabby/TabbyPromoMgs"),
  {
    loading: () => <TabbySkeleton />,
    ssr: false,
  }
);

const TamaraWidget = dynamic(
  () => import("@/modules/PaymentGateway/Tamara/TamaraWidget"),
  {
    loading: () => <TabbySkeleton />,
    ssr: false,
  }
);
const stock_validation = ["NOT_ACTIVE", "OUTOFSTOCK"];

const CartSummary = ({
  data,
  deliveryPolicyFun,
  formik,
  checkoutFormik,
  handleDilogueLocationOpen,
}) => {
  const { isLoading } = useProgressRouter();
  const { state, setLoginPopupOpen, logout, setIsRedirectCheckout } =
    useAuthContext();
  const { cookies, isRedirectCheckout } = state;
  const { JWTAuthToken, user, USER_ID, visitorId, CCYCODE, modificationUser } =
    cookies || {};
  const { cartState } = useCartContext();
  const { cart } = cartState;
  const { cartRemarkVal } = useSelector((state) => state.cartPage);
  const router = useRouter();
  const { locale } = router;
  const [showFreeSampleToast, setShowFreeSampleToast] = React.useState(false);
  let head_sys_id = modificationUser?.head_sys_id ? modificationUser?.head_sys_id : 0;
  const { t: translate } = useTranslation();
  const [termsOpen, setTermsOpen] = useState({
    open: false,
    data: "",
  });

  const handleShowFreeSampleToastClose = () => {
    setShowFreeSampleToast(false);
  };
  const handleShowFreeSampleToastOpen = () => {
    setShowFreeSampleToast(true);
  };

  const handleTermOpen = (data) => {
    setTermsOpen({ open: true, data: data });
  };

  const sfiStatusValidationFun = () => {
    let sfiStatus_val = true;
    data?.complete &&
      data?.complete?.length > 0 &&
      data?.complete?.map((item) => {
        if (stock_validation.indexOf(item.SFI_STATUS_NEW) >= 0) {
          sfiStatus_val = false;
          const section = document.querySelector(
            "#ordercol_" + item.SOL_SYS_ID
          );
          section?.scrollIntoView({
            top: 10,
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
          item["subject"] = item.SFI_STATUS_NEW + " cartPage";
          axiosInstance
            .post("emailFun", data)
            .then(() => { })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    return sfiStatus_val;
  };

  const headerTable = async () => {
    setIsRedirectCheckout(false);
    if (Number(cart?.countFreeSample) >= 10 && cart?.free_sample?.length > 0) {
      handleShowFreeSampleToastOpen();
    } else {
      let post_data = {
        PROMO_CODE: formik.values.promoCode,
        showRoomVal:
          checkoutFormik?.values?.deliveryType == "DO03"
            ? checkoutFormik?.values?.showRoomVal?.SSA_SYS_ID
            : "",
        deliveryType: checkoutFormik?.values?.deliveryType,
        userId: USER_ID,
        visitorId: visitorId,
        locale: locale,
        soh_sys_id: head_sys_id || 0,
        cart_remark_desc: cartRemarkVal,
      };

      const formData = new FormData();
      GoogleAnalytics && GoogleAnalytics.beginCheckout(cart?.complete, cart?.total_price);

      for (let key in post_data) {
        formData.append(key, post_data[key]);
      }

      await axiosInstance
        .post("v2/cart/orderHead", formData)
        .then((response) => {
          const data = response?.data;
          if (data?.error_message == "Success" || data.error_message == "SUCCESS") {
            if (checkoutFormik?.values?.deliveryType == "DO02") {
              router.push("cart/shippingAddress");
            } else if (checkoutFormik?.values?.deliveryType == "DO03") {
              if (user && user?.cust_cr_uid == "GUEST-USER") {
                router.push("cart/payment");
              } else {
                router.push("cart/clickCollect");
              }
            }
          } else if (data?.return_status == "333") {
            logout();
            setLoginPopupOpen(true);
          }
        });
    }
  };

  const checkoutSubmit = () => {
    let sfiStatus = sfiStatusValidationFun();
    if (
      USER_ID &&
      JWTAuthToken &&
      checkoutFormik?.values?.deliveryType == "DO02" &&
      sfiStatus
    ) {
      headerTable();
    } else if (
      USER_ID &&
      JWTAuthToken &&
      checkoutFormik?.values?.showRoomVal?.SSA_SYS_ID &&
      checkoutFormik?.values?.deliveryType == "DO03" &&
      sfiStatus
    ) {
      headerTable();
    } else if (
      !JWTAuthToken &&
      (checkoutFormik?.values?.deliveryType == "DO03" ||
        checkoutFormik?.values?.deliveryType == "DO02")
    ) {
      setLoginPopupOpen(true);
      setIsRedirectCheckout(true);
    } else if (!sfiStatus) {
    } else {
      checkOutValidation();
    }
  };

  React.useEffect(() => {
    if (isRedirectCheckout && JWTAuthToken && USER_ID) {
      checkoutSubmit();
    }
  }, [isRedirectCheckout, JWTAuthToken, USER_ID]);

  const checkOutValidation = () => {
    if (
      checkoutFormik?.values?.deliveryType == "" ||
      checkoutFormik?.values?.deliveryType == undefined
    ) {
      checkoutFormik.setFieldError(
        "deliveryType",
        "Please select delivery type"
      );

      const section = document.querySelector("#deliveryOption");
      section?.scrollIntoView({
        top: 10,
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    } else if (checkoutFormik?.values?.deliveryType === "DO03") {
      handleDilogueLocationOpen(deliveryPolicyFun);
    } else {
      $(".deliveryoption").removeClass("delivery_error");
    }
  };

  return (
    <>
      <Box
        mt={{ lg: 0, md: 4, sm: 3 }}
        sx={(theme) => ({
          backgroundColor: {
            xxs: theme.palette.common.white,
            lg: theme.palette.grey[3500],
            md: theme.palette.grey[3500],
            sm: theme.palette.grey[3500],
          },
          p: 2,
          position: "sticky",
          top: 155,
          mb: 2,
          width: "100%",
        })}
      >
        <Stack spacing={2}>
          <Box>
            <Typography
              sx={(theme) => ({
                fontFamily: theme.fontFaces.helveticaNeueBold,
                fontSize: 21,
                lineHeight: "25px",
                fontWeight: 400,
                color: (theme) => theme.palette.common.black,
              })}
            >
              {translate("CartSummary")}
            </Typography>
          </Box>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  fontSize: 14,
                  color: theme.palette.grey[5600],
                  lineHeight: "17px",
                  fontWeight: 500,
                })}
              >
                {translate("Ordertotal")}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  fontSize: 14,
                  lineHeight: "17px",
                  fontWeight: 400,
                })}
              >
                {translate(`${CCYCODE}`)}{" "}
                <FloatPrice price={data?.total_price?.SOL_OLD_VALUE} />
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            {data?.total_price?.SOL_VALUE !=
              data?.total_price?.SOL_OLD_VALUE && (
                <>
                  <Box>
                    <Typography
                      sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        fontSize: 14,
                        color: theme.palette.grey[5600],
                        lineHeight: "17px",
                        fontWeight: 500,
                      })}
                    >
                      {translate("discounts")}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        fontSize: 14,
                        color: theme.palette.error.lighterError,
                      })}
                    >
                      - {translate(`${CCYCODE}`)}{" "}
                      <FloatPrice
                        price={Number(
                          data?.total_price?.SOL_OLD_VALUE -
                          data?.total_price?.SOL_VALUE
                        )}
                      />
                    </Typography>
                  </Box>
                </>
              )}
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  fontSize: 14,
                  color: theme.palette.grey[5600],
                  lineHeight: "17px",
                  fontWeight: 500,
                })}
              >
                {translate("Subtotal")}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  fontSize: 14,
                  lineHeight: "17px",
                  fontWeight: 400,
                })}
              >
                {translate(`${CCYCODE}`)}{" "}
                <FloatPrice price={data?.total_price?.SOL_VALUE} />
              </Typography>
            </Box>
          </Stack>
          {Boolean(formik.values.promoCodeAmount) && (
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    color: theme.palette.grey[5600],
                    lineHeight: "17px",
                    fontWeight: 500,
                  })}
                  variant="typography14"
                >
                  {translate("Promo_discount")}
                </Typography>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    color: theme.palette.grey[5600],
                    lineHeight: "17px",
                    letterSpacing: "0.54px",
                  })}
                  variant="typography12"
                  component="p"
                >
                  {`(${formik.values.promoCodeDesc})`}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    lineHeight: "17px",
                    fontWeight: 400,
                    color: theme.palette.error.lighterError,
                  })}
                  variant="typography14"
                >
                  - {translate(`${CCYCODE}`)}{" "}
                  <FloatPrice price={formik.values.promoCodeAmount} />
                </Typography>
              </Box>
            </Stack>
          )}
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  fontSize: 14,
                  color: theme.palette.grey[5600],
                  lineHeight: "17px",
                  fontWeight: 500,
                })}
              >
                {translate("Totalwithtax")}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  fontSize: 14,
                  lineHeight: "17px",
                  fontWeight: 400,
                })}
              >
                {translate(`${CCYCODE}`)}{" "}
                <FloatPrice
                  price={
                    Number(data?.total_price?.SOL_VALUE) -
                    Number(formik.values.promoCodeAmount || 0)
                  }
                />
              </Typography>
            </Box>
          </Stack>
          <Box>
            <Typography
              sx={(theme) => ({
                fontFamily: theme.fontFaces.helveticaNeueBold,
                fontSize: 14,
                color: theme.palette.grey[5600],
              })}
            >
              {translate("CouponCodeorGiftCard")}
            </Typography>
          </Box>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack direction="row">
              <TextBox
                placeholder={translate("CouponCodeorGiftCard")}
                variant="standard"
                fullWidth
                size="small"
                name="promoCode"
                value={formik.values.promoCode}
                onChange={formik.handleChange}
                helperText={formik.errors.promoCode}
                formControlSx={{
                  "& .MuiInput-input": {
                    fontFamily: (theme) => theme.fontFaces.helveticaNeueLight,
                    textTransform: "uppercase",
                    backgroundColor: "#f0f0f0",
                    color: (theme) => theme.palette.grey[2200],
                  },
                  input: {
                    "&::placeholder": {
                      textTransform: "capitalize",
                    },
                  },
                }}
              />

              <Button
                color="dark"
                size="small"
                sx={(theme) => ({
                  pl: 2,
                  pr: 2,
                  borderLeft: `1px solid ${theme.palette.common.black}`,
                  height: "29px",
                  borderRadius: "0px",
                  color: theme.palette.common.black,
                  ...theme.typography.typography14,
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                  fontWeight: 200,
                  borderBottom: (theme) =>
                    `1px solid ${theme.palette.grey[5700]}`,

                  ...(formik?.values?.promoCodeAmount && {
                    borderLeft: `1px solid ${theme.palette.error.main}`,
                    color: (theme) => theme.palette.error.main,
                  }),
                  backgroundColor: theme.palette.common.white,
                })}
                type={!formik?.values?.promoCodeAmount ? "submit" : "button"}
                {...(formik?.values?.promoCodeAmount && {
                  onClick: () => {
                    formik.setFieldValue("promoCode", "");
                    formik.setFieldValue("promoCodeAmount", "");
                    formik.setFieldValue("promoCodeDesc", "");
                  },
                })}
              >
                {formik?.values?.promoCodeAmount
                  ? translate("Remove")
                  : translate("Apply")}
              </Button>
            </Stack>
          </form>
          <Box>
            {data && Number(data?.total_price?.SOL_VALUE) > 1 ? (
              isLoading ? (
                <TabbySkeleton />
              ) : (
                <TabbyPromoMgs
                  tab_name="cartpageId"
                  amount={
                    Number(data?.total_price?.SOL_VALUE) -
                    Number(formik?.values?.promoCodeAmount)
                  }
                />
              )
            ) : (
              ""
            )}
            {data && Number(data?.total_price?.SOL_VALUE) > 1 ? (
              isLoading ? (
                <TabbySkeleton />
              ) : (
                <Box color="common.black">
                  <TamaraWidget
                    tab_name="materialId"
                    amount={
                      Number(data?.total_price?.SOL_VALUE) -
                      Number(formik?.values?.promoCodeAmount)
                    }
                    style={{
                      fontFamily: "Helvetica-Neue-Medium",
                    }}
                    inline_type="2"
                  />
                </Box>
              )
            ) : (
              ""
            )}
          </Box>
          <Box>
            <Button
              color="warning"
              variant="contained"
              fullWidth
              maxWidth="100%"
              sx={(theme) => ({
                borderRadius: "0px",
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                padding: 1,
                ...theme.typography.typography15,
                color: theme.palette.grey[6400],
                fontWeight: 400,
              })}
              onClick={() => checkoutSubmit()}
            >
              {translate("CheckOut")}
            </Button>
          </Box>
          <Box>
            <Typography
              component="span"
              variant="typography13"
              sx={(theme) => ({
                fontFamily: theme.fontFaces.helveticaNeue,
                color: theme.palette.common.black,
                letterSpacing: 0.5,
                fontWeight: 400,
              })}
            >
              {translate("CheckOutText")}
            </Typography>
            <IconButton onClick={() => handleTermOpen(deliveryPolicyFun)}>
              <Iconify
                icon="ic:outline-info"
                sx={{ cursor: "pointer", color: "common.black" }}
              />
            </IconButton>
          </Box>
          <Box>
            <Typography
              component="p"
              variant="typography17"
              textAlign="center"
              sx={(theme) => ({
                fontFamily: theme.fontFaces.helveticaNeueBold,
                fontSize: 16,
                color: theme.palette.common.black,
              })}
            >
              {translate("SecurePayment")}
            </Typography>
          </Box>
        </Stack>
        <TermsConditionDilogue open={termsOpen} setOpen={setTermsOpen} />
        <ToastMessage
          open={showFreeSampleToast}
          title={`${translate("Oops")}`}
          content={
            <Typography
              component="p"
              variant="typography19"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              fontWeight={500}
              textAlign="center"
            >
              {translate("maximum_limit_for_free_sample")}
            </Typography>
          }
          handleClose={handleShowFreeSampleToastClose}
          icon="/assets/icon/warning/warning.png"
          titleSx={{ textAlign: "center" }}
          isButtonShow={false}
          isCloseShow={true}
        />
      </Box>
    </>
  );
};

export default CartSummary;
