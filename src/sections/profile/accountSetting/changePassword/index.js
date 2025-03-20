import { useAuthContext } from "@/auth/useAuthContext";
import SnackbarProvider from "@/components/snackbar";
import { useSelector } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import ChangePasswordFormSection from "./changePasswordForm";
import ChangePasswordHeading from "./changePasswordHeading";

const ChangePasswordForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { JWTAuthToken, user } = cookies || {};
  const { editProfile } = useSelector((state) => state.profileSetting);
  const { t: translate } = useTranslation();

  const formSubmit = async (values) => {
    await axiosInstance
      .post(`dashboard/change_pwd_confirm/${cookies?.USER_ID}`, values)
      .then((response) => {
        if (
          response?.data?.return_status == "0" ||
          response?.data?.error_message == "Success"
        ) {
          enqueueSnackbar(
            "Password successfully changed" || `${translate("Success")}`,
            {
              variant: "success",
              autoHideDuration: 4000
            }
          );
          router.push("/dashboard/profile/account-setting");
        } else if (
          response?.data?.return_status == "-111" &&
          response?.data?.result
        ) {
          for (const [key, value] of Object.entries(response?.data?.result)) {
            if (response?.data?.result) {
              formik.setFieldError(key, response.data.result[key]);
            }
          }
        } else {
          enqueueSnackbar(
            response?.data?.result.otp_value ||
            response?.data?.error_message ||
            `${translate("SomethingWentWrong")}`,
            {
              variant: "error",
              autoHideDuration: 4000
            }
          );
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
        enqueueSnackbar(
          error?.response?.data?.error_message ||
          `${translate("SomethingWentWrong")}`,
          {
            variant: "error",
            autoHideDuration: 4000
          }
        );
      });
  };

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
      cust_id: cookies?.USER_ID || "",
      cust_email_id: editProfile?.result?.cust_email_id || "",
      cust_title: editProfile?.result?.cust_title || "",
      cust_first_name: editProfile?.result?.cust_first_name || "",
      cust_last_name: editProfile?.result?.cust_last_name || "",
      cust_nationality: editProfile?.result?.cust_nationality || "",
      cust_city_desc: editProfile?.result?.cust_city_desc || "",
      cust_city: editProfile?.result?.cust_city || "",
      cust_mobile_no: editProfile?.result?.cust_mobile_no || "",
      cust_phone_no: "",
      cust_gender: editProfile?.result?.cust_gender || "",
      cust_type: user?.cust_type || "",
      joined_date: editProfile?.result?.joined_date || "",
      cust_cr_uid: editProfile?.result?.cust_cr_uid || "",
      cust_photo: editProfile?.result?.cust_photo || "",
      request_id: "",
      cust_user_id: user?.cust_email_id || "",
      auth_token: JWTAuthToken || "",
      site: cookies?.site || "",
      country: cookies?.countryName || "",
      lang: cookies?.langName || "",
      visitorId: cookies?.visitorId || "",
      currency: cookies?.CCYCODE || "",
      ccy_decimal: cookies?.CCYDECIMALS || "",
      cn_iso: cookies?.cniso || "",
      detect_country: cookies?.detect_country || "",
      userId: cookies?.USER_ID || "",
    },
    validate: (value) => {
      const errors = {};

      if (!value.current_password) {
        errors.current_password = translate("Thisfieldisrequired");
      }
      if (!value.new_password) {
        errors.new_password = translate("This field is required");
      } else if (
        !/(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g.test(
          value.new_password
        )
      ) {
        errors.new_password = translate("Invalid password");
      }
      if (!value.confirm_password) {
        errors.confirm_password = translate("Thisfieldisrequired");
      }
      if (value.new_password != value.confirm_password) {
        errors.confirm_password =
          "Passwords entered do not match";
      }

      return errors;
    },
    onSubmit: async (values) => {
      await axiosInstance
        .post(`dashboard/change_pwd_request/${cookies?.USER_ID}`, values)
        .then((response) => {
          let request_id = response?.data?.result?.request_id;
          if (response.status == 200) {
            if (
              response?.data?.return_status === "0" ||
              response?.data?.error_message == "Success"
            ) {
              enqueueSnackbar("Old password have matched.", {
                variant: "success",
                autoHideDuration: 4000
              });
              formSubmit({
                ...values,
                request_id,
              });
            } else if (
              response?.data?.return_status == -404 ||
              response?.data?.error_message == "Error"
            ) {
              enqueueSnackbar("Old password do not match.", {
                variant: "error",
                autoHideDuration: 4000
              });
              // setApiError("Old password do not match.");
            } else {
              enqueueSnackbar(
                response?.data?.error_message ||
                `${translate("SomethingWentWrong")}`,
                {
                  variant: "error",
                  autoHideDuration: 4000
                }
              );
              // setApiError(response?.data?.error_message);
            }
          }
        })
        .catch((error) => {
          enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
            variant: "error",
            autoHideDuration: 4000
          });
        });
    },
  });

  return (
    <>
      <ChangePasswordHeading />
      <SnackbarProvider>
        <ChangePasswordFormSection formik={formik} />
      </SnackbarProvider>
    </>
  );
};

export default ChangePasswordForm;
