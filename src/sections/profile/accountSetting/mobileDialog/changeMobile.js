import { useAuthContext } from "@/auth/useAuthContext";
import CustomPhoneInput from "@/components/form/phoneInput";
import { useTranslation } from "next-i18next";

const ChangeMobile = ({ formik }) => {
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { cniso } = cookies || {};
  return (
    <CustomPhoneInput
      fullWidth
      international
      countryCallingCodeEditable={false}
      defaultCountry={cniso && cniso != "XX" ? cniso.toUpperCase() : "US"}
      placeholder="Enter phone number"
      label={translate("Phonenumber")}
      variant="standard"
      value={formik.values.cust_mobile_no}
      name="cust_mobile_no"
      onChange={(e) => {
        formik.setFieldValue("cust_mobile_no", e);
      }}
      helperText={formik.touched.cust_mobile_no && formik.errors.cust_mobile_no}
    />
  );
};

export default ChangeMobile;
