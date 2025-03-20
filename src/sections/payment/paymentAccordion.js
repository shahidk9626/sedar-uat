import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import useGoogleAnalytics from "@/hooks/useGoogleAnalytics";
import { useDispatch, useSelector } from "@/redux/store";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@/styles/payment";
import { apiDataService } from "@/utils/apiDataService";
import axiosInstance from "@/utils/axios";
import { cartPaymentImage } from "@/utils/constant";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import InstallmentAccordion from "./installmentAccordion";
import PaymentMethodForm from "./paymentMethodForm";
import RedeemPoints from "./redeemPoint";
import SaveCreditCards from "./saveCreditCards";
import useCartContext from "@/provider/cart/cartContext";

const qs = require("qs");

const PaymentAccordion = () => {
  const router = useRouter();
  const [saveCardData, setSaveCardData] = React.useState(false);
  const dispatch = useDispatch();
  const { cardPayment } = useSelector((state) => state.cardPayment);
  const { addPaymentInfo } = useGoogleAnalytics();
  const [expanded, setExpanded] = React.useState(
    cardPayment?.result?.length > 0 ? "panel4" : "panel1"
  );
  const { t: translate } = useTranslation();
  const { cartState } = useCartContext();
  const { cart } = cartState;
  const { state, logout } = useAuthContext();
  const { cookies } = state;
  const {
    JWTAuthToken,
    user,
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

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const formik = useFormik({
    initialValues: {
      card_number: "",
      SCC_EXP_MONTH:
        Number((new Date().getMonth() + 1).toString()) < 10
          ? `0${(new Date().getMonth() + 1).toString()}`
          : (new Date().getMonth() + 1).toString(),
      SCC_EXP_YEAR: new Date().getFullYear().toString().substr(-2),
      card_security_code: "",
      card_holder_name: "",
      SCC_ACTIVE_YN: "N",
      card_cvv: "",
      merchant_identifier: "",
      access_code: "",
      merchant_reference: "",
      service_command: "",
      language: "",
      return_url: "",
      signature: "",
      CVV_NUMBER: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.card_number) {
        errors.card_number = translate("Thisfieldisrequired");
      }
      if (!values.SCC_EXP_MONTH) {
        errors.SCC_EXP_MONTH = translate("Thisfieldisrequired");
      }
      if (!values.SCC_EXP_YEAR) {
        errors.SCC_EXP_YEAR = translate("Thisfieldisrequired");
      }
      if (!values.card_security_code) {
        errors.card_security_code = translate("This field is required");
      } else if (!/^\d{3}$/.test(values.card_security_code)) {
        errors.card_security_code = translate("Numeric_validation");
      }
      if (!values.card_holder_name) {
        errors.card_holder_name = translate("Thisfieldisrequired");
      }

      return errors;
    },
    onSubmit: async (values, { setFieldError }) => {
      await axiosInstance
        .post(
          `dashboard/customerCard`,
          qs.stringify({
            SCC_CARD_NUMBER: values.card_number,
            SCC_CARD_HOLDER: values.card_holder_name,
            SCC_EXP_YEAR: values.SCC_EXP_YEAR,
            SCC_EXP_MONTH: values.SCC_EXP_MONTH,
            SCC_ACTIVE_YN: values?.SCC_ACTIVE_YN,
            card_number: values.card_number,
            card_holder_name: values.card_holder_name,
            expiry_date: `${values.SCC_EXP_YEAR}${values.SCC_EXP_MONTH}`,
            card_security_code: values.card_security_code,
            cust_user_id: user?.cust_email_id,
            auth_token: JWTAuthToken,
            site: site,
            lang: langName,
            country: countryName,
            visitorId: visitorId,
            currency: CCYCODE,
            ccy_decimal: CCYDECIMALS,
            cn_iso: cniso,
            userId: USER_ID,
            detect_country: detect_country,
          }),
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
          console.log(response, "asfREsot");
          if (response && response?.data?.return_status == 0) {
            addPaymentInfo(
              cart?.header_info,
              [...cart?.complete, ...cart?.free_sample],
              "Card"
            );
            GoogleAnalytics && GoogleAnalytics.addPaymentInfo(
              cart?.header_info,
              cart?.total_price,
              "Card"
            );
            document.getElementById("PaymentForm").submit();
          } else if (response && response?.data?.return_status == -111) {
            for (const [key, value] of Object.entries(values)) {
              if (response?.data?.result) {
                setFieldError(key, response.data.result[key]);
              }
            }
          }
        })
        .catch((error) => {
          console.log(`${translate("SomethingWentWrong")}`, error);
        });
    },
  });

  const handleSetSaveCard = (data) => {
    setSaveCardData(data);
  };

  const saveCardPayment = () => {
    if (formik?.values?.card_security_code > 2) {
      formik.setFieldValue("card_number", saveCardData?.SCC_CARD_NUMBER);
      formik.setFieldValue("card_holder_name", saveCardData?.SCC_CARD_HOLDER);
      formik.setFieldValue(
        "card_security_code",
        formik?.values?.card_security_code
      );
      formik.setFieldValue(
        "expiry_date",
        saveCardData?.SCC_EXP_YEAR + "" + saveCardData?.SCC_EXP_MONTH
      );
      GoogleAnalytics && GoogleAnalytics.addPaymentInfo(
        cart?.header_info,
        cart?.total_price,
        "Card"
      );
      setTimeout(() => {
        document.getElementById("PaymentForm").submit();
      }, 500);
    }
  };

  const PayFortMerchantPage = () => {
    dispatch(apiDataService.post(`payment/merchantPage`))
      .then((response) => {
        if (response?.status === 200) {
          const data = response?.data?.params;
          if (data) {
            formik.setFieldValue(
              "merchant_identifier",
              data.merchant_identifier
            );
            formik.setFieldValue("access_code", data.access_code);
            formik.setFieldValue("merchant_reference", data.merchant_reference);
            formik.setFieldValue("service_command", data.service_command);
            formik.setFieldValue("language", data.language);
            formik.setFieldValue("return_url", data.return_url);
            formik.setFieldValue("url", response?.data?.url);
            formik.setFieldValue("signature", data.signature);
          } else if (
            response?.data?.return_status == "333" &&
            response?.data?.error_message ==
            "User and order data have not found"
          ) {
            logout();
            router.push("/cartPage");
          }
        }
      })
      .catch((e) => {
        console.log("PayFortMerchantPage", e);
      });
  };

  React.useEffect(() => {
    if (cart?.total_price && Number(cart?.total_price?.SOL_GROSS_VALUE) > 0) {
      PayFortMerchantPage();
    }
  }, [cart?.total_price]);

  return (
    <>
      {user &&
        user?.cust_cr_uid != "GUEST-USER" &&
        cardPayment &&
        cardPayment?.result &&
        cardPayment?.result?.length > 0 && (
          <Accordion
            square={true}
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
            sx={{ borderRadius: 0 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1d-content"
              id="panel1d-header"
              sx={(theme) => ({
                "& .MuiAccordionSummary-content": {
                  flexDirection: "column",
                },
                backgroundColor:
                  expanded === "panel4"
                    ? theme.palette.info.lessLighter
                    : theme.palette.grey[0],
              })}
            >
              <Typography
                sx={(theme) => ({
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: theme.palette.common.black,
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  letterSpacing: 0.5,
                })}
              >
                {translate("Your_saved_credit_Cards")}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}></Stack>
            </AccordionSummary>
            <AccordionDetails>
              <SaveCreditCards
                data={cardPayment?.result}
                formik={formik}
                saveCardPayment={saveCardPayment}
                handleSetSaveCard={handleSetSaveCard}
                saveCardData={saveCardData}
              />
            </AccordionDetails>
          </Accordion>
        )}
      <Accordion
        square={true}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={(theme) => ({
          backgroundColor: theme.palette.grey[1500],
        })}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header"
          sx={(theme) => ({
            "& .MuiAccordionSummary-content": {
              flexDirection: "column",
            },
            backgroundColor:
              expanded === "panel1"
                ? theme.palette.info.lessLighter
                : theme.palette.grey[0],
          })}
        >
          <Typography
            sx={(theme) => ({
              fontSize: "16px",
              lineHeight: "19px",
              color: theme.palette.common.black,
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              letterSpacing: 0.5,
            })}
          >
            {translate("Another_payment_method")}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0} mt={2}>
            {cartPaymentImage.map((item, index) => (
              <Box width={"100%!important"} key={`PAYMENT-CART-${index}`}>
                <NextLazyLoadImage
                  src={item?.image}
                  alt="payment Card"
                  width={99}
                  height={74}
                  sx={{
                    width: "50%!important",
                    height: "70%!important",
                    objectFit: "cover!important",
                  }}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                  objectFit="contain"
                  upLgWidth={99}
                  downLgWidth={99}
                  downMdWidth={99}
                  downSmWidth={42}
                  downXsWidth={50}
                />
              </Box>
            ))}
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <PaymentMethodForm formik={formik} />
        </AccordionDetails>
      </Accordion>

      {["AE", "SA"].indexOf(cniso) != -1 &&
        ["AED", "SAR"].indexOf(CCYCODE) != -1 && (
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={(theme) => ({
              backgroundColor: theme.palette.grey[1500],
            })}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1d-content"
              id="panel1d-header"
              sx={(theme) => ({
                "& .MuiAccordionSummary-content": {
                  flexDirection: "column",
                },
                backgroundColor:
                  expanded === "panel2"
                    ? theme.palette.info.lessLighter
                    : theme.palette.grey[0],
              })}
            >
              <Typography
                sx={(theme) => ({
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: theme.palette.common.black,
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  letterSpacing: 0.5,
                })}
              >
                {translate("Installments_Payment")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InstallmentAccordion />
            </AccordionDetails>
          </Accordion>
        )}
      {["EGP"].indexOf(cart?.header_info?.SOH_CCY_CODE) == -1 ? (
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
          sx={(theme) => ({
            backgroundColor: theme.palette.grey[1500],
          })}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
            sx={(theme) => ({
              "& .MuiAccordionSummary-content": {
                flexDirection: "column",
              },
              backgroundColor:
                expanded === "panel5"
                  ? theme.palette.info.lessLighter
                  : theme.palette.grey[0],
            })}
          >
            <Typography
              sx={(theme) => ({
                fontSize: "16px",
                lineHeight: "19px",
                color: theme.palette.common.black,
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                letterSpacing: 0.5,
              })}
            >
              {translate("Redeem_Points_Payment")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RedeemPoints />
          </AccordionDetails>
        </Accordion>
      ) : (
        ""
      )}

      <form
        method="POST"
        onSubmit={formik.handleSubmit}
        id="PaymentForm"
        action={formik.values.url}
      >
        <Box component="div">
          <input hidden name="card_number" value={formik.values.card_number} />
          <input
            hidden
            name="card_security_code"
            value={formik.values.card_security_code}
          />
          <input
            hidden
            name="card_holder_name"
            value={formik.values.card_holder_name}
          />
          <input hidden name="expiry_date" value={formik.values.expiry_date} />
          <input
            hidden
            name="merchant_identifier"
            value={formik.values.merchant_identifier}
          />
          <input
            hidden
            name="merchant_reference"
            value={formik.values.merchant_reference}
          />
          <input hidden name="access_code" value={formik.values.access_code} />
          <input
            hidden
            name="service_command"
            value={formik.values.service_command}
          />
          <input hidden name="language" value={formik.values.language} />
          <input hidden name="return_url" value={formik.values.return_url} />
          <input hidden name="signature" value={formik.values.signature} />
        </Box>
      </form>
    </>
  );
};

export default PaymentAccordion;
