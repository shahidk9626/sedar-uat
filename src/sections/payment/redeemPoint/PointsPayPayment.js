import { useAuthContext } from "@/auth/useAuthContext";
import { NextFillImage } from "@/components/image";
import { CustomLink } from "@/components/link";
import useCartContext from "@/provider/cart/cartContext";
import axiosInstance from "@/utils/axios";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

const PointsPayPayment = (props) => {
  const { t: translate } = useTranslation();
  const [pointsPayData, setPointsPayData] = useState(false);
  const [merchant_code, setMerchant_code] = useState(false);
  const [pointsPayUrl, setPointsPayUrl] = useState(false);
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
      ["EG"].indexOf(cniso) == -1 &&
      ["EGP"].indexOf(CCYCODE) == -1 &&
      cart?.total_price &&
      Number(cart?.total_price?.SOL_GROSS_VALUE) > 0
    ) {
      CheckOutFun();
    }
  }, [cart?.total_price]);

  if (["EG"].indexOf(cniso) != -1 && ["EGP"].indexOf(CCYCODE) != -1) {
    return false;
  }
  const CheckOutFun = async () => {
    await axiosInstance
      .post(
        "payment/pointsPay",
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
          res_data["result"]["links"] &&
          res_data["result"]["id"]
        ) {
          setPointsPayData(res_data["result"]);
          setMerchant_code(res_data?.merchant_code);
          setPointsPayUrl(res_data?.pointspay_url);
        }
      })
      .catch((e) => {
        console.log(e, "TAMARA ERROR");
      });
  };

  return (
    <>
      {pointsPayData &&
        pointsPayData?.links &&
        pointsPayData?.links[0] &&
        merchant_code &&
        pointsPayUrl ? (
        <CustomLink
          isExternalLink={true}
          link={pointsPayData.links[0]["href"] || "#"}
        >
          <Stack alignItems="start" spacing={1}>
            <Typography
              sx={(theme) => ({
                ...theme.typography.typography15,
                fontFamily: theme.fontFaces.helveticaNeueBold,
              })}
            >
              {translate("points_pay_payment")}
            </Typography>

            <NextFillImage
              src={`${pointsPayUrl}checkout/user/btn-img-v2?s=${merchant_code}&is=245x40&l=${langName}`}
              alt="sedarglobal"
              sx={{
                width: "100%!important",
                height: "100%!important",
                objectFit: "contain",
                backgroundSize: "contain",
                "&.MuiCard-root": {
                  borderRadius: 0,
                  boxShadow: "none",
                  position: "relative!important",
                  width: "14%!important",
                  height: "42%!important",
                },
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 72px"
              objectFit="contain"
            />
          </Stack>
        </CustomLink>
      ) : (
        ""
      )}
    </>
  );
};

export default PointsPayPayment;
