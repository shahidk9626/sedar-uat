import { TextBox } from "@/components/form";
import CustomPhoneInput from "@/components/form/phoneInput";
import { CustomLink } from "@/components/link";
import useResponsive from "@/hooks/useResponsive";
import { OrderSummarySection } from "@/modules/orderSummary";
import { getEditProfile } from "@/redux/slices/auth/profile";
import { useDispatch } from "@/redux/store";
import { apiDataService } from "@/utils/apiDataService";
import axiosInstance from "@/utils/axios";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
import { useSelector } from "react-redux";
import CartDynamicBreadcrumb from "../cart/dynamicBreadcrumb";
import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import SnackbarProvider from "@/components/snackbar";


const ClickCollectForm = () => {
  const isSmallScreen = useResponsive("down", "sm");
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { t: translate } = useTranslation();
  const [expanded, setExpanded] = React.useState(false);
  const { state } = useAuthContext();
  const { cookies } = state;
  const dispatch = useDispatch();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const {
    langName,
    site,
    visitorId,
    countryName,
    detect_country,
    USER_ID,
    cniso,
    CCYDECIMALS,
    user,
    JWTAuthToken,
  } = cookies || {};
  const { country } = useSelector((state) => state.location);

  const updatePhoneNumber = async (values) => {
    await dispatch(
      apiDataService.post(`dashboard/update_PhoneNo/${USER_ID}`, {
        ...values,
        cust_phone_no: values.cust_mobile_no,
      })
    ).then(async (response) => {
      let res_data = response.data;
      if (res_data.return_status == 0) {
        if (user) {
          await dispatch(
            getEditProfile({
              USER_ID: USER_ID,
              cust_user_id: user?.cust_email_id,
              auth_token: JWTAuthToken,
            })
          );
        }
        router.push("/cart/payment");
      } else if (res_data.return_status == -212) {
        //
        enqueueSnackbar(res_data.error_message || `${translate("Success")}`, {
          variant: "error",
          autoHideDuration: 4000
        });
      } else {
        Object.keys(res_data.result).map(function (key) {
          if (
            res_data.result[key] &&
            key.indexOf(["status", "user_detail"]) == -1 &&
            res_data.result[key].length > 1
          ) {
            setError(key, { message: res_data.result[key] });
          }
        });
        enqueueSnackbar(
          res_data.error_message || `${translate("SomethingWentWrong")}`,
          {
            variant: "error",
            autoHideDuration: 4000
          }
        );
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      cust_first_name: user?.cust_first_name,
      cust_last_name: user?.cust_last_name,
      cust_mobile_no: user?.cust_phone_no || "",
      cad_country: country?.defaultValue?.value,
      cust_cr_uid: user?.cust_cr_uid,
      cust_user_id: user?.cust_email_id,
      cust_email_id: user?.cust_email_id,
      cust_title: user?.cust_title || "Mr",
      page_name: "CLICK_COLLECT",
      auth_token: JWTAuthToken,
    },
    validate: (values) => {
      const errors = {};
      if (!values.cust_first_name) {
        errors.cust_first_name = translate("Thisfieldisrequired");
      }

      if (!values.cust_last_name) {
        errors.cust_last_name = translate("Thisfieldisrequired");
      }

      if (!values.cust_mobile_no) {
        errors.cust_mobile_no = translate("Thisfieldisrequired");
      } else if (
        values.cust_mobile_no &&
        !isValidPhoneNumber(values.cust_mobile_no || "")
      ) {
        errors.cust_mobile_no = `${translate("please_enter_a_valid_number")}`;
      }

      return errors;
    },
    onSubmit: async (values) => {
      if (
        values.cust_first_name != user.cust_first_name ||
        values.cust_last_name != user.cust_last_name
      ) {
        await axiosInstance
          .post(
            `dashboard/update_profile/${user.cust_id}`,
            {
              ...values,
              cust_phone_no: values.cust_mobile_no,
              site: site,
              lang: langName,
              country: countryName,
              visitorId: visitorId,
              ccy_decimal: CCYDECIMALS,
              cn_iso: cniso,
              detect_country: detect_country,
              userId: USER_ID,
              cust_nationality: cniso,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(async (response) => {
            let res_data = response.data;
            if (
              res_data.return_status == "0" ||
              res_data.error_message == "Success"
            ) {
              enqueueSnackbar(
                `${translate("YourProfileUpdatedSuccessfully")}` || "",
                {
                  variant: "success",
                  autoHideDuration: 4000
                }
              );
              if (user) {
                await dispatch(
                  getEditProfile({
                    USER_ID: USER_ID,
                    cust_user_id: user?.cust_email_id,
                    auth_token: JWTAuthToken,
                  })
                );
              }
              if (values.cust_mobile_no == user.cust_mobile_no) {
                router.push("/cart/payment");
              }
            } else if (
              res_data.return_status == -111 ||
              res_data.error_message == "Error"
            ) {
              enqueueSnackbar(
                res_data.error_message || `${translate("SomethingWentWrong")}`,
                {
                  variant: "error",
                  autoHideDuration: 4000
                }
              );

              for (const [key, value] of Object.entries(values)) {
                if (res_data.result[key] && key != "status") {
                  formik.setFieldError(key, res_data.result[key]);
                }
              }
            } else {
              enqueueSnackbar(res_data.result.otp_value || "", {
                variant: "error",
                autoHideDuration: 4000
              });
              enqueueSnackbar(res_data.error_message || "", {
                variant: "error",
                autoHideDuration: 4000
              });
            }
          });
      } else if (values.cust_mobile_no != user.cust_mobile_no) {
        updatePhoneNumber(values);
      } else {
        router.push("/cart/payment");
      }
    },
  });

  return (
    <>
      <Box
        p={{ lg: 4, md: 4, sm: 1, xs: 0, xxs: 0 }}
        sx={{
          position: "sticky!important",
          top: 0,
        }}
      >
        <Box
          p={1}
          width={170}
          sx={{
            display: {
              lg: "block",
              md: "block",
              sm: "block",
              xs: "none",
              xxs: "none",
            },
          }}
        >
          <CustomLink link="/">
            <NextLazyLoadImage
              src={"/assets/shoppingAddress/smalllogo.webp"}
              alt="sedarLogo"
              width={170}
              height={77}
              sx={{
                width: "100%!important",
                height: "100%!important",
                objectFit: "cover!important",
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
              objectFit="contain"
              upLgWidth={170}
              downLgWidth={170}
              downMdWidth={170}
              downSmWidth={170}
              downXsWidth={170}
            />
          </CustomLink>
        </Box>
        <Box
          sx={{
            display: {
              lg: "none",
              md: "none",
              sm: "none",
              xs: "block",
              xxs: "block",
            },
          }}
        >
          <Accordion
            sx={{
              "& .MuiAccordionSummary-root": {
                background: (theme) => theme.palette.common.white,
              },
            }}
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMore color="primary" />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography
                sx={(theme) => ({
                  flexShrink: 0,
                  fontSize: theme.typography.typography45,
                  fontFamily: theme.fontFaces.helveticaNeue,
                  color: theme.palette.primary.main,
                })}
              >
                {expanded === false
                  ? `${translate("Show_Order_Summary")}`
                  : `${translate("Hide_Order_Summary")}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SnackbarProvider>
                <OrderSummarySection />
              </SnackbarProvider>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box my={4} ml={2} mr={1}>
          <CartDynamicBreadcrumb />
        </Box>
        <Box m={3}>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item md={6} sm={12} xs={12} xxs={12}>
                <TextBox
                  fullWidth
                  label={translate("FirstName")}
                  type="text"
                  variant="standard"
                  name="cust_first_name"
                  value={formik.values.cust_first_name}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.cust_first_name &&
                    formik.errors.cust_first_name
                  }
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12} xxs={12}>
                <TextBox
                  fullWidth
                  label={translate("LastName")}
                  type="text"
                  variant="standard"
                  name="cust_last_name"
                  value={formik.values.cust_last_name}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.cust_last_name &&
                    formik.errors.cust_last_name
                  }
                />
              </Grid>

              <Grid item md={6} sm={12} xs={12} xxs={12}>
                <CustomPhoneInput
                  fullWidth
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry={
                    cniso && cniso != "XX" ? cniso.toUpperCase() : "US"
                  }
                  labels={langName == "ar" ? ar : en}
                  placeholder="Enter phone number"
                  label={translate("Phonenumber")}
                  variant="standard"
                  name="cust_mobile_no"
                  value={formik.values.cust_mobile_no}
                  onChange={(e) => {
                    formik.setFieldValue("cust_mobile_no", e || "");
                  }}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.cust_mobile_no &&
                    formik.errors.cust_mobile_no
                  }
                  error={
                    formik.touched.cust_mobile_no &&
                    formik.errors.cust_mobile_no
                  }
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12} xxs={12}>
                <TextBox
                  fullWidth
                  label={translate("Country")}
                  type="text"
                  variant="standard"
                  name="cad_country"
                  value={country?.defaultValue?.label}
                  helperText={
                    formik.touched.cad_country && formik.errors.cad_country
                  }
                  disabled
                />
              </Grid>
            </Grid>
            <Stack
              my={2}
              spacing={2}
              direction={"row"}
              sx={{ justifyContent: "start", width: "100%" }}
            >
              <Button
                fullWidth={isSmallScreen ? true : false}
                variant="contained"
                sx={(theme) => ({
                  color: "common.black",
                  fontWeight: 400,
                  borderRadius: 0,
                  height: "auto",
                  px: { md: "3rem", sm: "2.5rem", xs: "2rem", xxs: "2rem" },
                  py: "0.81rem",
                  ...theme.typography.typography15,
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  background: (theme) => theme.palette.primary.light,
                  "&:hover": {
                    background: (theme) => theme.palette.primary.light,
                  },
                })}
                type="submit"
              >
                {translate("Save_and_continue")}
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ClickCollectForm;
