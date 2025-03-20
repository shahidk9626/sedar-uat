import { useAuthContext } from "@/auth/useAuthContext";
import { NextFillImage } from "@/components/image";
import { CustomLink } from "@/components/link";
import useCartContext from "@/provider/cart/cartContext";
import axiosInstance from "@/utils/axios";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

const TamaraPayment = (props) => {
  const { t: translate } = useTranslation();
  const [tamara_data, setTamara_data] = useState(false);
  const { cartState } = useCartContext();
  const { cart } = cartState;
  const { state } = useAuthContext();
  const { cookies } = state;
  const {
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

  useEffect(() => {
    if (
      ["AE", "SA"].indexOf(cniso) == -1 ||
      ["AED", "SAR"].indexOf(CCYCODE) == -1
    ) {
    } else if (
      cart?.total_price &&
      Number(cart?.total_price?.SOL_GROSS_VALUE) > 0
    ) {
      tamaraCheckOutFun();
    }
  }, [cart?.total_price]);

  if (
    ["AE", "SA"].indexOf(cniso) == -1 &&
    ["AED", "SAR"].indexOf(CCYCODE) == -1
  ) {
    return false;
  }
  const tamaraCheckOutFun = () => {
    axiosInstance
      .post(
        "payment/tamara",
        {
          site: site,
          lang: langName,
          country: countryName,
          visitorId: visitorId,
          currency: CCYCODE,
          ccy_decimal: CCYDECIMALS,
          cn_iso: cniso,
          userId: USER_ID,
          detect_country: detect_country,
        },
        {
          headers: {
            "Content-type":
              "application/x-www-form-urlencoded;multipart/form-data; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            Accept: "multipart/form-data",
          },
        }
      )
      .then((response) => {
        let res_data = response.data;
        if (
          res_data["return_status"] == 0 &&
          res_data["error_message"] != "error" &&
          res_data["result"] &&
          res_data["result"]["redirectUrl"] &&
          res_data["result"]["tamaraOrderId"]
        ) {
          setTamara_data(res_data["result"]);
        }
      })
      .catch((e) => {
        console.log(e, "TAMARA ERROR");
      });
  };
  return (
    tamara_data && tamara_data.redirectUrl && <Box p={1}>
      {tamara_data && tamara_data.redirectUrl && (
        <CustomLink isExternalLink={true} link={tamara_data.redirectUrl}>
          <Stack
            direction={{
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
              xxs: "column",
            }}
            justifyContent="left"
            alignItems="center"
            spacing={1}
            textAlign={{
              lg: "start",
              md: "start",
              sm: "center",
              xs: "center",
              xxs: "center",
            }}
          >
            <Typography
              sx={(theme) => ({
                ...theme.typography.typography15,
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                fontWeight: 200,
                letterSpacing: 0.5,
                color: theme.palette.common.black,
              })}
            >
              {translate("tamara_payment")}
            </Typography>
            <NextFillImage
              src="/assets/images/payment/tamara_logo1.png"
              alt="sedarglobal"
              width="72"
              height="auto"
              sx={{
                width: "72px!important",
                height: "100%!important",
                objectFit: "contain",
                backgroundSize: "contain",
                "&.MuiCard-root": {
                  borderRadius: 0,
                  boxShadow: "none",
                  position: "relative!important",
                  width: "72px!important",
                  height: "100%!important",
                },
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 72px"
              objectFit="contain"
            />
          </Stack>
        </CustomLink>
      )}
    </Box>
  );
};

export default TamaraPayment;
