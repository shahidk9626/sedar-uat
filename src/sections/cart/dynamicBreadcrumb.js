import { useAuthContext } from "@/auth/useAuthContext";
import { CustomLink } from "@/components/link";
import useCartContext from "@/provider/cart/cartContext";
import { useSelector } from "@/redux/store";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";
import { find } from "lodash";
import { useTranslation } from "next-i18next";

const CartDynamicBreadcrumb = () => {
  const router = useRouter();
  const { address } = useSelector((state) => state.profileSetting);
  const { t: translate } = useTranslation();
  const { cartState } = useCartContext();
  const { cart } = cartState;
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user } = cookies || {};
  return (
    <>
      {cart &&
        cart?.header_info &&
        cart?.header_info?.SOH_CARRIER_CODE == "DO03" ? (
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              m: "0px",
              width: "6%",
            },
          }}
          separator={
            <ArrowForwardIos
              sx={(theme) => ({
                width: "15px",
                ml: "5px",
                ...(theme.direction == "rtl" && {
                  transform: "rotate(180deg)",
                }),
              })}
            />
          }
        >
          <CustomLink link="/cartPage">
            <Typography
              sx={{
                color: (theme) => theme.palette.common.black,
                opacity: 0.7,
              }}
              variant="typography18"
              lineHeight="17px"
              fontWeight={400}
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            >
              {translate("CartInfo")}
            </Typography>
          </CustomLink>
          {user && user?.cust_cr_uid != "GUEST-USER" ? (
            <CustomLink link="/cart/clickCollect">
              <Typography
                sx={{
                  color: (theme) => theme.palette.common.black,
                  opacity: router?.pathname == "/cart/clickCollect" ? 1 : 0.7,
                }}
                variant="typography18"
                lineHeight="17px"
                fontWeight={400}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              >
                {translate("Click_Collect")}
              </Typography>
            </CustomLink>
          ) : (
            ""
          )}
          <Box>
            <Typography
              component="p"
              sx={{
                color: (theme) => theme.palette.common.black,
                opacity: 0.7,
                cursor: "default",
                opacity: router?.pathname == "/cart/payment" ? 1 : 0.7,
              }}
              variant="typography18"
              lineHeight="17px"
              fontWeight={400}
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            >
              {translate("PaymentInfo")}
            </Typography>
          </Box>
        </Breadcrumbs>
      ) : (
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              m: "0px",
              width: "6%",
            },
          }}
          separator={
            <ArrowForwardIos
              sx={(theme) => ({
                width: "15px",
                ml: "5px",
                ...(theme.direction == "rtl" && {
                  transform: "rotate(180deg)",
                }),
              })}
            />
          }
        >
          <CustomLink link="/cartPage">
            <Typography
              sx={{
                color: (theme) => theme.palette.common.black,
                opacity: 0.7,
              }}
              variant="typography17"
              lineHeight="17px"
              fontWeight={400}
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            >
              {translate("CartInfo")}
            </Typography>
          </CustomLink>
          <CustomLink link="/cart/shippingAddress">
            <Typography
              sx={{
                color: (theme) => theme.palette.common.black,
                opacity: router?.pathname == "/cart/shippingAddress" ? 1 : 0.7,
              }}
              variant="typography17"
              lineHeight="17px"
              fontWeight={400}
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            >
              {translate("ShippingInfo")}
            </Typography>
          </CustomLink>
          {address &&
            address?.result?.length > 0 &&
            find(address?.result, { cad_default_yn: "Y" })?.cad_id ? (
            <CustomLink link="/cart/delivery">
              <Typography
                sx={{
                  color: (theme) => theme.palette.common.black,
                  opacity: 0.7,
                  opacity: router?.pathname == "/cart/delivery" ? 1 : 0.7,
                }}
                variant="typography17"
                lineHeight="17px"
                fontWeight={400}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              >
                {translate("Delivery")}
              </Typography>
            </CustomLink>
          ) : (
            <Box>
              <Typography
                sx={{
                  color: (theme) => theme.palette.common.black,
                  opacity: 0.7,
                  cursor: "default",
                  opacity: router?.pathname == "/cart/delivery" ? 1 : 0.7,
                }}
                variant="typography17"
                lineHeight="17px"
                fontWeight={400}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              >
                {translate("Delivery")}
              </Typography>
            </Box>
          )}

          <Box>
            <Typography
              component="p"
              sx={{
                color: (theme) => theme.palette.common.black,
                opacity: 0.7,
                cursor: "default",
                opacity: router?.pathname == "/cart/payment" ? 1 : 0.7,
              }}
              variant="typography17"
              lineHeight="17px"
              fontWeight={400}
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            >
              {translate("PaymentInfo")}
            </Typography>
          </Box>
        </Breadcrumbs>
      )}
    </>
  );
};

export default CartDynamicBreadcrumb;
