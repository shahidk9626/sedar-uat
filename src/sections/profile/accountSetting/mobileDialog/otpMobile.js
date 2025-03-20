import { OTPBox } from "@/components/form";
import { useTranslation } from "next-i18next";

const OtpMobile = ({ formik }) => {
  return (
    <OTPBox
      fullWidth
      variant="standard"
      name="otp_value"
      formik={formik}
      numInputs={6}
      label={false}
    />
  );
};

export default OtpMobile;
