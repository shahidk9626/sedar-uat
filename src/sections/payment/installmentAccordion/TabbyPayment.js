import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/redux/store";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { NextFillImage } from "@/components/image";
import axiosInstance from "@/utils/axios";
import { CustomLink } from "@/components/link";
import dynamic from "next/dynamic";
import { useAuthContext } from "@/auth/useAuthContext";
import useCartContext from "@/provider/cart/cartContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";

const TabbyPayment = (props) => {
  const { t: translate } = useTranslation();
  const [tabby_url, setTabby_url] = useState(false);
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
      tabbyPage();
    }
  }, [cart?.total_price]);

  if (
    ["AE", "SA"].indexOf(cniso) == -1 &&
    ["AED", "SAR"].indexOf(CCYCODE) == -1
  ) {
    return false;
  }
  const tabbyPage = () => {
    axiosInstance
      .post(
        "payment/tabbyPage",
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
          res_data["curl_response"] &&
          res_data["curl_response"]["status"] != "error" &&
          res_data["curl_response"]["configuration"] &&
          res_data["curl_response"]["configuration"]["available_products"]
        ) {
          setTabby_url(
            res_data["curl_response"]["configuration"]["available_products"]
          );
        }
      })
      .catch((e) => {
        console.log(e, "TAMARA ERROR");
      });
  };
  return (
    <>
      <Box p={1}>
        {tabby_url &&
          tabby_url.installments &&
          tabby_url.installments[0].web_url && (
            <CustomLink
              isExternalLink={true}
              link={tabby_url.installments[0].web_url}
            >
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
                  {translate("Payininstallmentswithtabby")}
                </Typography>
                <NextLazyLoadImage
                  src="/assets/images/payment/tabby.png"
                  alt="sedarglobal"
                  width={56}
                  height={22.7}
                  sx={{
                    width: "56px!important",
                    height: "100%!important",
                    objectFit: "cover!important",
                  }}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                  objectFit="contain"
                  upLgWidth={56}
                  downLgWidth={56}
                  downMdWidth={56}
                  downSmWidth={56}
                  downXsWidth={56}
                />
              </Stack>
            </CustomLink>
          )}

      </Box>
      <Divider color="lightgrey" />
    </>
  );
};

export default TabbyPayment;
