import { useAuthContext } from "@/auth/useAuthContext";
import { SelectBox, TextBox } from "@/components/form";
import CustomPhoneInput from "@/components/form/phoneInput";
import { AddressLocation } from "@/modules/location";
import { getEditProfile } from "@/redux/slices/auth/profile";
import { useDispatch, useSelector } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import { SelectMr } from "@/utils/constant";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { isValidPhoneNumber } from "react-phone-number-input";

const EditProfileFormSection = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { JWTAuthToken, user, cniso } = cookies || {};
  const { t: translate } = useTranslation();
  const { editProfile } = useSelector((state) => state.profileSetting);
  const formik = useFormik({
    initialValues: {
      cust_id: cookies?.USER_ID || "",
      cust_user_id: editProfile?.result?.cust_email_id || "",
      cust_email_id: editProfile?.result?.cust_email_id || "",
      cust_mobile_no: editProfile?.result?.cust_mobile_no || "",
      cust_first_name: editProfile?.result?.cust_first_name || "",
      cust_last_name: editProfile?.result?.cust_last_name || "",
      cust_photo: "",
      cust_nationality: editProfile?.result?.cust_nationality || "",
      cust_title: editProfile?.result?.cust_title || "",
      cust_cr_uid: editProfile?.result?.cust_cr_uid || "",
      cust_phone_no: editProfile?.result?.cust_phone_no || "",
      cust_type: editProfile?.result?.cust_type || "",
      auth_token: JWTAuthToken || "",
      city: editProfile?.result?.cust_city || "",
      cust_gender: editProfile?.result?.cust_gender || "",
      site: cookies?.site || "",
      lang: cookies?.langName || "",
      country: editProfile?.result?.cust_nationality,
      visitorId: cookies?.visitorId || "",
      currency: cookies?.CCYCODE || "",
      ccy_decimal: cookies?.CCYDECIMALS || "",
      cn_iso: cookies?.cniso || "",
      detect_country: cookies?.detect_country || "",
      userId: cookies?.USER_ID || "",
      cust_city: editProfile?.result?.cust_city || "",
      area: "",
    },
    validate: (value) => {
      const errors = {};
      if (!value.city) {
        errors.city = "This field is required";
      }
      if (!value.cust_title) {
        errors.cust_title = "This field is required";
      }
      if (!value.cust_gender) {
        errors.cust_gender = "This field is required";
      }
      if (!value.cust_mobile_no) {
        errors.cust_mobile_no = translate("Thisfieldisrequired");
      } else if (!isValidPhoneNumber(value.cust_mobile_no)) {
        errors.cust_mobile_no = `${translate("please_enter_a_valid_number")}`;
      }

      return errors;
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      for (var key in values) {
        if (key == "country") {
          formData.append("cust_nationality", values?.country?.value);
        } else if (key == "province_desc") {
          formData.append("cust_city_desc", values?.city?.label);
        } else if (key == "city") {
          formData.append("cust_city", values?.city?.value);
        } else if (key == "area") {
          formData.append("area", values?.area?.value);
        } else if (key == "myCountry") {
          formData.append("myCountry", cookies?.cniso);
        } else if (key == "cad_country") {
          formData.append("cad_country", values?.country?.value);
        } else if (key == "cust_phone_no") {
          formData.append("cust_phone_no", values?.cust_phone_no);
        } else {
          formData.append(key, values[key]);
        }
      }

      await axiosInstance
        .post(`dashboard/update_profile/${cookies?.USER_ID}`, formData)
        .then((response) => {
          if (response.status === 200) {
            if (response?.data?.return_status === "0") {
              if (user) {
                dispatch(
                  getEditProfile({
                    USER_ID: cookies?.USER_ID,
                    cust_user_id: editProfile?.result?.cust_email_id,
                    auth_token: JWTAuthToken,
                  })
                );
              }
              router.push("/dashboard/profile/account-setting");
            } else if (response?.data?.return_status === "-111") {
              if (response?.data?.result) {
                for (const [key, value] of Object.entries(values)) {
                  if (response?.data?.result) {
                    formik.setFieldError(key, response.data.result[key]);
                  }
                }
              }
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
      <Typography
        pl={{ lg: 7, md: 7, sm: 3, xs: 3, xxs: 2 }}
        variant="typography15"
        color={(theme) => theme.palette.grey[3900]}
        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
      >
        {translate("EditProfile")}
      </Typography>
      <Container
        maxWidth="xl"
        sx={{
          pt: 2,
          mt: 2,
        }}
      >
        <Box
          sx={{ width: "100%", typography: "body1" }}
          pl={{ lg: 4, md: 3, sm: 0, xs: 0, xxs: 0 }}
        >
          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={2} sm={12} xs={12} xxs={12}>
                <SelectBox
                  fullWidth
                  label={translate("Select")}
                  type="text"
                  variant="standard"
                  name="cust_title"
                  value={formik.values.cust_title}
                  onChange={(e) => {
                    formik.setFieldValue("cust_title", e.target.value);
                  }}
                  options={SelectMr}
                  helperText={
                    formik.touched.cust_title && formik.errors.cust_title
                  }
                  error={formik.touched.cust_title && formik.errors.cust_title}
                  defaultValue={user?.cust_title}
                />
              </Grid>
              <Grid item md={5} sm={12} xs={12} xxs={12}>
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
              <Grid item md={5} sm={12} xs={12} xxs={12}>
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
                <TextBox
                  disabled={true}
                  fullWidth
                  label={translate("Email")}
                  type="email"
                  inputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  name="email"
                  value={user?.cust_email_id}
                  onChange={formik.handleChange}
                  helperText={formik.touched.email && formik.errors.email}
                  inputSx={(theme) => ({
                    "& .Mui-disabled": {
                      borderRadius: 0,
                    },
                  })}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12} xxs={12}>
                <CustomPhoneInput
                  disabled
                  variant="filled"
                  fullWidth
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry={
                    cniso && cniso != "XX" ? cniso.toUpperCase() : "US"
                  }
                  placeholder="Enter phone number"
                  label={translate("Phonenumber")}
                  name="cust_mobile_no"
                  value={formik.values.cust_mobile_no}
                  onChange={(e) => {
                    formik.setFieldValue("cust_mobile_no", e);
                  }}
                  helperText={
                    formik.touched.cust_mobile_no &&
                    formik.errors.cust_mobile_no
                  }
                  error={
                    formik.touched.cust_mobile_no &&
                    formik.errors.cust_mobile_no
                  }
                  inputSx={(theme) => ({
                    "& .Mui-disabled": {
                      borderRadius: 0,
                    },
                  })}
                />
              </Grid>
              <AddressLocation
                countryKeyName="cust_nationality"
                cityKeyName="cust_city"
                formik={formik}
                isArea={false}
                id={true}
              />
              <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <Stack
                    direction={{
                      lg: "row",
                      md: "row",
                      sm: "column",
                      xs: "column",
                      xxs: "column",
                    }}
                    spacing={{ lg: 4, md: 4, sm: 1, xs: 1, xxs: 1 }}
                  >
                    <FormControlLabel
                      value="male"
                      control={
                        <Radio
                          checked={formik?.values?.cust_gender == "M"}
                          onChange={(e) => {
                            if (e) {
                              formik.setFieldValue("cust_gender", "M");
                            }
                          }}
                        />
                      }
                      label={
                        <>
                          <Typography
                            sx={(theme) => ({
                              fontSize: theme.typography.typography16,
                              color: theme.palette.grey[2800],
                              fontFamily: theme.fontFaces.helveticaNeueMedium,
                            })}
                          >
                            {translate("Male")}
                          </Typography>
                        </>
                      }
                    />
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio
                          checked={formik?.values?.cust_gender == "F"}
                          onChange={(e) => {
                            if (e) {
                              formik.setFieldValue("cust_gender", "F");
                            }
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={(theme) => ({
                            fontSize: theme.typography.typography16,
                            color: theme.palette.grey[2800],
                            fontFamily: theme.fontFaces.helveticaNeueMedium,
                          })}
                        >
                          {translate("Female")}
                        </Typography>
                      }
                    />
                  </Stack>
                </RadioGroup>
                <FormHelperText
                  sx={{ color: (theme) => theme.palette.error.main }}
                >
                  {formik.touched.cust_gender && formik.errors.cust_gender}
                </FormHelperText>
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12} xxs={12}>
                <Box>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={(theme) => ({
                      py: 1.8,
                      borderRadius: "0px",
                      color: theme.palette.common.black,
                      border: `1px solid ${theme.palette.common.black}`,
                      "&:hover": {
                        border: `1px solid ${theme.palette.common.black}`,
                      },
                      ...theme.typography.typography16,
                      fontFamily: theme.fontFaces.helveticaNeueBold,
                    })}
                    onClick={() =>
                      router.push("/dashboard/profile/account-setting/")
                    }
                  >
                    {translate("Cancel")}
                  </Button>
                </Box>
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12} xxs={12}>
                <Box>
                  <Button
                    variant="outlined"
                    fullWidth
                    type="submit"
                    sx={(theme) => ({
                      py: 1.8,
                      borderRadius: "0px",
                      color: theme.palette.common.black,
                      backgroundColor: theme.palette.primary.light,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                      },
                      ...theme.typography.typography16,
                      fontFamily: theme.fontFaces.helveticaNeueBold,
                    })}
                  >
                    {translate("Submit")}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default EditProfileFormSection;
