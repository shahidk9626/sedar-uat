import { SubmitButton } from "@/components/button";
import { TextBox } from "@/components/form";
import CustomPhoneInput from "@/components/form/phoneInput";
import { AddressLocation } from "@/modules/location";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";

const AddNewAddressForm = () => {
  const { t: translate } = useTranslation();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      country: "",
      city: "",
      area: "",
      emirates: "",
      floor_no: "",
      postal_code: "",
      address: "",
      landmark: "",
      shipping_note: "",
    },
    validate: (value) => {
      const errors = {};
      if (!value.first_name) {
        errors.first_name = translate("Thisfieldisrequired");
      }
      if (!value.last_name) {
        errors.last_name = translate("Thisfieldisrequired");
      }
      if (!value.phone_number) {
        errors.phone_number = translate("Thisfieldisrequired");
      } else if (!isValidPhoneNumber(value.phone_number)) {
        errors.phone_number = `${translate("please_enter_a_valid_number")}`;
      }
      if (!value.city) {
        errors.city = translate("Thisfieldisrequired");
      }
      if (!value.area) {
        errors.area = translate("Thisfieldisrequired");
      }
      if (!value.emirates) {
        errors.emirates = translate("Thisfieldisrequired");
      }
      if (!value.address) {
        errors.address = translate("Thisfieldisrequired");
      }

      return errors;
    },
  });
  const onSubmit = (values) => { };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("FirstName")}
            type="text"
            variant="standard"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            helperText={formik.touched.first_name && formik.errors.first_name}
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("LastName")}
            type="text"
            variant="standard"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            helperText={formik.touched.last_name && formik.errors.last_name}
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <CustomPhoneInput
            fullWidth
            international
            countryCallingCodeEditable={false}
            placeholder="Enter Mobile number"
            label={translate("MobileNo")}
            variant="standard"
            name="phone_number"
            value={formik.values.phone_number}
            onChange={(e) => {
              formik.setFieldValue("phone_number", e);
            }}
            helperText={
              formik.touched.phone_number && formik.errors.phone_number
            }
            error={formik.touched.phone_number && formik.errors.phone_number}
            required
          />
        </Grid>
        <AddressLocation formik={formik} isArea={true} />
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("FloorNo")}
            type="text"
            variant="standard"
            name="floor_no"
            value={formik.values.floor_no}
            onChange={formik.handleChange}
            helperText={formik.touched.floor_no && formik.errors.floor_no}
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("Zipcode")}
            type="text"
            variant="standard"
            name="postal_code"
            value={formik.values.postal_code}
            onChange={formik.handleChange}
            helperText={formik.touched.postal_code && formik.errors.postal_code}
            required
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label="Address(house No,Building,Street,Area)"
            type="text"
            variant="standard"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            helperText={formik.touched.address && formik.errors.address}
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label="Land Mark"
            type="text"
            variant="standard"
            name="landmark"
            value={formik.values.landmark}
            onChange={formik.handleChange}
            helperText={formik.touched.landmark && formik.errors.landmark}
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("Shippingnote")}
            type="text"
            variant="standard"
            name="shipping_note"
            value={formik.values.shipping_note}
            onChange={formik.handleChange}
            helperText={
              formik.touched.shipping_note && formik.errors.shipping_note
            }
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <FormControl>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FormLabel id="demo-row-radio-buttons-group-label">
                {translate("SaveAddressAs")}
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="home"
                  control={<Radio />}
                  label="Home"
                />
                <FormControlLabel
                  value="work"
                  control={<Radio />}
                  label="Work"
                />
              </RadioGroup>
            </Stack>
          </FormControl>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <FormControlLabel
            control={
              <Checkbox
                value={formik.values.i_agree}
                onChange={(e) => {
                  if (e.target.checked) {
                    formik.setFieldValue("i_agree", true);
                  } else {
                    formik.setFieldValue("i_agree", false);
                  }
                }}
                name="i_agree"
                defaultChecked={formik.values.i_agree}
              />
            }
            label={translate("Makethismydefaultaddress")}
          />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          xxs={12}
          mb={3}
          textAlign={{
            lg: "end",
            md: "end",
            sm: "center",
            xs: "center",
            xxs: "center",
          }}
        >
          <SubmitButton title={translate("Save_and_continue")} fullWidth />
        </Grid>
      </Grid>
    </>
  );
};

export default AddNewAddressForm;
