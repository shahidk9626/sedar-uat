import { useAuthContext } from "@/auth/useAuthContext";
import ToastMessage from "@/components/dialog/toastMessage";
import { TextBox } from "@/components/form";
import Iconify from "@/components/iconify";
import TabbySkeleton from "@/components/skeleton/productDetails/productDetailsSection/tabbySkeleton";
import FloatPrice from "@/modules/product/floatPrice";
import useCartContext from "@/provider/cart/cartContext";
import { useProgressRouter } from "@/provider/router/useProgressRouter";
import { useDispatch } from "@/redux/store";
import axiosInstance from "@/utils/axios";
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
  const dispatch = useDispatch();
  const { state, setLoginPopupOpen, logout } = useAuthContext();
  const { cookies } = state;
  const { JWTAuthToken, modificationUser, USER_ID, visitorId, CCYCODE } =
    cookies || {};
  const { cartState } = useCartContext();
  const { cart } = cartState;

  const router = useRouter();
  const { locale } = router;
  let head_sys_id = modificationUser?.head_sys_id
    ? modificationUser?.head_sys_id
    : 0;
  const [showFreeSampleToast, setShowFreeSampleToast] = React.useState(false);
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
      };

      const formData = new FormData();

      for (let key in post_data) {
        formData.append(key, post_data[key]);
      }

      await axiosInstance
        .post("v2/cart/orderHead", formData)
        .then((response) => {
          const data = response?.data;
          if (data?.error_message == "Success" || data.error_message == "SUCCESS") {
            router.push("/modification/shipping?head_sys_id=" + head_sys_id);
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
      JWTAuthToken &&
      checkoutFormik?.values?.deliveryType == "DO02" &&
      sfiStatus
    ) {
      headerTable();
    } else if (
      JWTAuthToken &&
      checkoutFormik?.values?.showRoomVal?.SSA_SYS_ID &&
      checkoutFormik?.values?.deliveryType == "DO03" &&
      sfiStatus
    ) {
      headerTable();
    } else if (!JWTAuthToken) {
      setLoginPopupOpen(true);
    } else if (!sfiStatus) {
    } else {
      checkOutValidation();
    }
  };

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
        sx={(theme) => ({
          backgroundColor: {
            xxs: theme.palette.common.white,
            lg: theme.palette.grey[3500],
            md: theme.palette.grey[3500],
            sm: theme.palette.grey[3500],
          },
          p: 5,
          position: "sticky",
          top: 155,
          mb: 2,
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
                {CCYCODE}{" "}
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
                        color: theme.palette.error.main,
                      })}
                    >
                      {CCYCODE}{" "}
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
                {CCYCODE} <FloatPrice price={data?.total_price?.SOL_VALUE} />
              </Typography>
            </Box>
          </Stack>
          {formik.values.promoCodeAmount > 0 && (
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
                  {`${formik.values.promoCodeDesc}`}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    lineHeight: "17px",
                    fontWeight: 400,
                  })}
                  color="error"
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
                {translate(CCYCODE)}{" "}
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
                  borderLeft: `1px solid ${theme.palette.common.black}`,
                  height: "29px",
                  borderRadius: "0px",
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
            {data && data?.total_price?.SOL_VALUE > 1 ? (
              isLoading ? <TabbySkeleton /> :
                <TabbyPromoMgs
                  tab_name="cartpageId"
                  amount={
                    data?.total_price?.SOL_VALUE - formik?.values?.promoCodeAmount
                  }
                />
            ) : (
              ""
            )}
            {data && data?.total_price?.SOL_VALUE > 1 ? (
              isLoading ? <TabbySkeleton /> :
                <TamaraWidget
                  tab_name="materialId"
                  amount={
                    data?.total_price?.SOL_VALUE - formik?.values?.promoCodeAmount
                  }
                  inline_type="2"
                />
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
              sx={{
                borderRadius: "0px",
                fontFamily: (theme) => theme.fontFaces.helveticaNeueMedium,
                padding: 1,
              }}
              onClick={() => checkoutSubmit()}
            >
              {translate("CheckOut")}
            </Button>
          </Box>
          <Box>
            <Typography
              component="span"
              sx={() => ({
                fontSize: 13,
              })}
            >
              {translate("CheckOutText")}
            </Typography>
            <IconButton onClick={() => handleTermOpen(deliveryPolicyFun)}>
              <Iconify icon="ic:outline-info" sx={{ cursor: "pointer" }} />
            </IconButton>
          </Box>
          <Box>
            <Typography
              textAlign="center"
              sx={(theme) => ({
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                fontSize: 16,
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
