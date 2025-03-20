import { useAuthContext } from "@/auth/useAuthContext";
import { useDispatch } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useSnackbar } from "notistack";
import React from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import ChangeMobile from "./changeMobile";
import OtpMobile from "./otpMobile";

const MobileDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { state, handleSetUserEditData } = useAuthContext();
  const { cookies } = state;
  const { JWTAuthToken, user } = cookies || {};
  const { t: translate } = useTranslation();
  const [section, setSection] = React.useState("MOBILE");

  const handleSetSection = (key) => {
    setSection(key);
  };

  const formik = useFormik({
    initialValues: {
      otp_value: "",
      request_id: "",
      cust_mobile_no: user?.cust_mobile_no,
      cust_cr_uid: user?.cust_cr_uid || "",
      open_window: "",
      cust_user_id: user?.cust_email_id || "",
      auth_token: JWTAuthToken,
      site: cookies?.site || "",
      country: cookies?.countryName || "",
      lang: cookies?.langName || "",
      visitorId: cookies?.visitorId || "",
      currency: cookies?.CCYCODE || "",
      ccy_decimal: cookies?.CCYDECIMALS || "",
      cn_iso: cookies?.cniso || "",
      detect_country: cookies?.detect_country || "",
      userId: cookies?.USER_ID || "",
      request_id: "",
    },
    validate: (value) => {
      const errors = {};
      if (!isValidPhoneNumber(value.cust_mobile_no)) {
        errors.cust_mobile_no = `${translate("please_enter_a_valid_number")}`;
      }

      return errors;
    },
    onSubmit: async (values) => {
      let url;

      if (section == "MOBILE") {
        url = "dashboard/request_email_mobile_change/";
      } else if (section == "OTP") {
        url = "dashboard/change_email_mobile_after_verify/";
      }

      await axiosInstance
        .post(`${url}${cookies?.USER_ID}`, JSON.parse(JSON.stringify(values)), {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response) => {
          if (response.status == 200) {
            if (response?.data?.return_status == 0) {
              if (section == "MOBILE") {
                handleSetSection("OTP");
                formik.setFieldValue("cust_mobile_no", values.cust_mobile_no);
                formik.setFieldValue(
                  "request_id",
                  response?.data?.result?.requestId
                );
              }
              if (section == "OTP") {
                handleSetSection("SUCCESS_WINDOW");
                if (
                  response?.data?.result &&
                  response?.data?.result?.length > 0
                ) {
                  let updateUserData = {
                    user: {
                      ...cookies.user,
                      cust_mobile_no:
                        response?.data?.result?.[0]?.cust_mobile_no,
                    },
                  };
                  handleSetUserEditData(updateUserData);
                }
              }
            } else if (response?.data?.return_status == -212) {
              enqueueSnackbar(
                response?.data?.error_message ||
                `${translate("SomethingWentWrong")}`,
                {
                  variant: "error",
                  autoHideDuration: 4000
                }
              );
            } else {
              //
              for (const [key, value] of Object.entries(values)) {
                if (response?.data?.result[key] && key != "status") {
                  formik.setFieldError(key, response?.data?.result[key]);
                }
              }
              enqueueSnackbar(
                response?.data?.error_message ||
                `${translate("SomethingWentWrong")}`,
                {
                  variant: "error",
                  autoHideDuration: 4000
                }
              );
            }
          }
        })
        .catch((error) => { });
    },
  });

  const handleResetOTPValue = () => {
    formik.setFieldValue("otp_value", "");
  };

  const showContent = (key) => {
    switch (key) {
      case "MOBILE":
        return <ChangeMobile formik={formik} />;
        break;

      case "OTP":
        return <OtpMobile formik={formik} />;
        break;

      case "SUCCESS_WINDOW":
        setTimeout(() => {
          handleClose();
          formik.resetForm();
          handleSetSection("MOBILE");
        }, 3000);
        return (
          <>
            <Typography
              component="p"
              variant="typography18"
              sx={{ my: 4, textAlign: "center" }}
            >
              {translate("Mobile_updated_successfully")}
            </Typography>
          </>
        );
        break;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        handleResetOTPValue();
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogContent sx={{ py: 4 }}>
        {section != "SUCCESS_WINDOW" && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={4}
          >
            <Box component="div" />
            <Box component="div">
              <Card
                sx={{
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => {
                    handleClose();
                    handleResetOTPValue();
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Card>
            </Box>
          </Stack>
        )}
        <Container>
          {section == "OTP" && (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <Typography component="p" variant="typography15">
                {translate("TheOTPhasbeensentto")} xxxxxx
                {formik.values.cust_mobile_no
                  ? formik.values.cust_mobile_no.slice(-4)
                  : ""}
              </Typography>

              <Typography
                component="p"
                variant="typography15"
                color="primary"
                onClick={() => {
                  handleSetSection("MOBILE");
                  handleResetOTPValue();
                }}
                sx={{ cursor: "pointer" }}
              >
                {translate("Change")}
              </Typography>
            </Stack>
          )}
          <form onSubmit={formik.handleSubmit}>
            {showContent(section)}
            {section != "SUCCESS_WINDOW" && (
              <Box pt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="warning"
                  sx={(theme) => ({
                    py: 1.8,
                    borderRadius: "0px",
                    fontFamily: theme.fontFaces.helveticaNeueBold,
                    fontSize: theme.typography.typography15,
                    lineHeight: "18px",
                    fontWeight: 300,
                  })}
                >
                  {section == "OTP"
                    ? translate("VerifyOTP")
                    : translate("Continue")}
                </Button>
              </Box>
            )}
          </form>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default MobileDialog;
