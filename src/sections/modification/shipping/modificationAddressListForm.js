import { useAuthContext } from "@/auth/useAuthContext";
import { SubmitButton } from "@/components/button";
import { TextBox } from "@/components/form";
import CustomPhoneInput from "@/components/form/phoneInput";
import { CustomLink } from "@/components/link";
import { AddressLocation } from "@/modules/location";
import useCartContext from "@/provider/cart/cartContext";
import axiosInstance from "@/utils/axios";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const ModificationAddressListForm = ({ handleClose2 }) => {
  const { getMyCartData, cartState } = useCartContext();
  const { cart, shipping_price } = cartState;
  const { state } = useAuthContext();
  const { cookies } = state;
  const {
    modificationUser,
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
  //const { shipping_info } = cart;
  let shipping_info = cart ? cart.shipping_info : [];
  const { t: translate } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  let head_sys_id = modificationUser?.head_sys_id
    ? modificationUser?.head_sys_id
    : 0;

  const updateShippingPrice = async (
    shipping_id,
    shipping_price,
    shipment_data = false,
    delivery_type = false
  ) => {
    if (shipping_id) {
      let data = {
        shipping_price: shipping_price,
        shipping_address_id: shipping_id,
        shipment_data: shipment_data,
        delivery_type: delivery_type,
        site: site,
        lang: langName,
        country: countryName,
        visitorId: visitorId,
        currency: CCYCODE,
        ccy_decimal: CCYDECIMALS,
        cn_iso: cniso,
        detect_country: detect_country,
        userId: USER_ID,
      };
      await axiosInstance
        .post(
          "shipping/updateShippingPrice",
          JSON.parse(JSON.stringify(data)),
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => { })
        .catch((error) => {
          console.log("SHIPPING UPDATE ERROR", error);
        });
    } else {
      push("/cart/shippingAddress");
    }
  };

  const formik = useFormik({
    initialValues: {
      cad_address_type: "HOME",
      cad_first_name: "",
      cad_last_name: "",
      cad_contact_number: "",
      cad_country: "",
      cad_active_yn: "Y",
      cad_default_yn: user?.cust_cr_uid === "GUEST-USER" ? "Y" : "N",
      cad_city: "",
      cad_city_area: "",
      province_desc: "",
      cad_state: "",
      cad_floor_no: "",
      cad_postal_code: "",
      cad_building_name_no: "",
      cad_nearest_landmark: "",
      cad_shipping_note: "",
      country: "",
      cust_user_id: user?.cust_email_id,
      auth_token: JWTAuthToken,
      cad_id: "",
      detect_country: detect_country,
    },
    validate: (values) => {
      const errors = {};

      if (!values.cad_first_name) {
        errors.cad_first_name = translate("Thisfieldisrequired");
      }
      if (!values.cad_last_name) {
        errors.cad_last_name = translate("Thisfieldisrequired");
      }
      if (!values.country) {
        errors.country = translate("Thisfieldisrequired");
      }
      if (!values.city) {
        errors.city = translate("Thisfieldisrequired");
      }
      if (!values.area) {
        errors.area = translate("Thisfieldisrequired");
      }
      if (!values.province_desc) {
        errors.province_desc = translate("Thisfieldisrequired");
      }
      if (!values.cad_building_name_no) {
        errors.cad_building_name_no = translate("Thisfieldisrequired");
      }
      return errors;
    },
    onSubmit: async (values) => {
      let url, method;

      if (shipping_info?.cad_id && shipping_info?.cad_cust_id) {
        url = `dashboard/update_address/${shipping_info?.cad_id}/${shipping_info?.cad_cust_id}`;
        method = "POST";
      } else if (shipping_info?.cad_cust_id) {
        url = `modification/create_address/${shipping_info?.cad_cust_id}`;
        method = "POST";
      } else {
        alert('error!');
      }
      const formData = new FormData();

      for (var key in values) {
        if (key == "cad_country") {
          formData.append("cad_country", values?.country?.value);
        } else if (key == "cad_city") {
          formData.append("cad_state", values?.state);
        } else if (key == "cad_state") {
          formData.append("cad_city", values?.city?.value);
        } else if (key == "cad_city_area") {
          formData.append("cad_city_area", values?.area?.value);
        } else if (key == "country") {
          formData.append("country", values?.country?.value);
        } else if (key == "city") {
          formData.append("city", values?.city?.value);
        } else if (key == "area") {
          formData.append("area", values?.area?.value);
        } else {
          formData.append(key, values[key]);
        }
      }

      formData.append("cad_active_yn", "Y");
      formData.append("cust_user_id", user?.cust_email_id);
      formData.append("auth_token", JWTAuthToken);
      formData.append("site", site);
      formData.append("lang", langName);
      formData.append("country", countryName);
      formData.append("visitorId", visitorId);
      formData.append("currency", CCYCODE);
      formData.append("ccy_decimal", CCYDECIMALS);
      formData.append("cn_iso", cniso);
      formData.append("userId", USER_ID);
      await axiosInstance
        .request({ url, method, data: formData })
        .then((response) => {
          console.log(response?.status);
          if (response?.status === 200) {
            //let res_data = response.data;
            enqueueSnackbar(
              response?.data?.error_message || `${translate("Success")}`,
              {
                variant: "success",
                autoHideDuration: 4000
              }
            );
            /*  if (user?.cust_cr_uid === "GUEST-USER") {
                let shipping_id =
                  res_data.result && res_data.result.CAD_SYS_ID
                    ? res_data.result.CAD_SYS_ID
                    : false;
                let ship_price = shipping_price ? shipping_price : 0;
                updateShippingPrice(shipping_id, ship_price, false, false);
              }

            getMyCartData({
              params: { soh_sys_id: head_sys_id || 0 },
            });*/
            //  handleClose2();
          }
        })
    },
  });
  const bindData = async () => {
    for (const [key] of Object.entries(formik.values)) {
      if (key == "cad_country") {
        formik.setFieldValue("cad_country", shipping_info?.cad_country);
      } else if (key == "cad_city") {
        formik.setFieldValue("cad_city", shipping_info?.cad_city);
      } else if (key == "cad_city_area") {
        formik.setFieldValue("cad_city_area", shipping_info?.cad_city_area);
      } else {
        formik.setFieldValue([key], shipping_info[key]);
      }
      formik.setFieldValue("area", shipping_info?.cad_city_area);
    }
  };

  React.useEffect(() => {
    if (cart && shipping_info?.cad_id) {
      bindData();
    }
  }, [cart]);

  React.useEffect(() => {
    if (user && !shipping_info?.cad_id) {
      formik.setFieldValue("cad_first_name", user?.cust_first_name);
      formik.setFieldValue("cad_last_name", user?.cust_last_name);
      formik.setFieldValue("cad_mobile_no", user?.cust_mobile_no);
      formik.setFieldValue("cad_phone_no", user?.cust_phone_no);
      formik.setFieldValue("cad_photo", user?.cust_photo);
      formik.setFieldValue("cad_user_id", user?.cust_user_id);
      formik.setFieldValue("cad_contact_number", user?.cust_mobile_no);
    }
  }, [user?.cust_cr_uid, shipping_info]);

  return (
    <>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} alignItems={"center"}>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <TextBox
              fullWidth
              label={translate("FirstName")}
              type="text"
              variant="standard"
              name="cad_first_name"
              value={formik.values.cad_first_name}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_first_name && formik.errors.cad_first_name
              }
              inputLabelProps={{
                shrink: true,
              }}
            // required
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <TextBox
              fullWidth
              label={translate("LastName")}
              type="text"
              variant="standard"
              name="cad_last_name"
              value={formik.values.cad_last_name}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_last_name && formik.errors.cad_last_name
              }
              inputLabelProps={{
                shrink: true,
              }}
            // required
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <CustomPhoneInput
              international
              defaultCountry={
                cniso && cniso != "XX" ? cniso.toUpperCase() : "US"
              }
              countryCallingCodeEditable={false}
              // placeholder="Enter Mobile number"
              label={translate("MobileNo")}
              variant="standard"
              name="cad_contact_number"
              value={formik.values.cad_contact_number}
              onChange={(e) => {
                formik.setFieldValue("cad_contact_number", e);
              }}
              helperText={
                formik.touched.cad_contact_number &&
                formik.errors.cad_contact_number
              }
              error={
                formik.touched.cad_contact_number &&
                formik.errors.cad_contact_number
              }
              inputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <AddressLocation
            countryKeyName="cad_country"
            cityAreaName="cad_city_area"
            cityKeyName="cad_city"
            formik={formik}
            isArea={true}
            id={shipping_info?.cad_id ? true : false}
            open={true}
          />
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <TextBox
              fullWidth
              label={translate("FloorNo")}
              type="text"
              variant="standard"
              name="cad_floor_no"
              value={formik.values.cad_floor_no}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_floor_no && formik.errors.cad_floor_no
              }
              inputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <TextBox
              fullWidth
              label={translate("Zipcode")}
              type="text"
              variant="standard"
              name="cad_postal_code"
              value={formik.values.cad_postal_code}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_postal_code && formik.errors.cad_postal_code
              }
              inputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
            <TextBox
              fullWidth
              label={translate("AddressFull")}
              type="text"
              variant="standard"
              name="cad_building_name_no"
              value={formik.values.cad_building_name_no}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_building_name_no &&
                formik.errors.cad_building_name_no
              }
              inputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <TextBox
              fullWidth
              label={translate("Landmark")}
              type="text"
              variant="standard"
              name="cad_nearest_landmark"
              value={formik.values.cad_nearest_landmark}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_nearest_landmark &&
                formik.errors.cad_nearest_landmark
              }
              inputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <TextBox
              fullWidth
              label={translate("Shippingnote")}
              type="text"
              variant="standard"
              name="cad_shipping_note"
              value={formik.values.cad_shipping_note}
              onChange={formik.handleChange}
              helperText={
                formik.touched.cad_shipping_note &&
                formik.errors.cad_shipping_note
              }
              inputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <FormControl>
              <Stack justifyContent={"space-between"}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  {translate("SaveAddressAs")}
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={formik.values.cad_address_type}
                  onChange={(e) => {
                    formik.setFieldValue("cad_address_type", e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="HOME"
                    control={<Radio />}
                    label={translate("home")}
                  />
                  <FormControlLabel
                    value="WORK"
                    control={<Radio />}
                    label={translate("Work")}
                  />
                </RadioGroup>
              </Stack>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            {user?.cust_cr_uid !== "GUEST-USER" && (
              <FormControlLabel
                sx={{ color: (theme) => theme.palette.grey[2200] }}
                control={
                  <Checkbox
                    color="primary"
                    checked={formik.values.cad_default_yn === "Y"}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "cad_default_yn",
                        e.target.checked ? "Y" : "N"
                      );
                    }}
                    name="cad_default_yn"
                  />
                }
                label={translate("Makethismydefaultaddress")}
              />
            )}
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
            <Grid container columnSpacing={4}>
              <Grid item sm={6} xs={6} xxs={6}>
                <SubmitButton
                  loading={formik.isSubmitting}
                  disabled={formik.isSubmitting}
                  title={
                    shipping_info?.cad_id
                      ? translate("Update")
                      : translate("Add")
                  }
                  fullWidth={true}
                  buttonSx={(theme) => ({
                    "&.MuiButton-root": {
                      borderRadius: "0px",
                      color: "common.black",
                      ...theme.typography.typography15,
                      fontFamily: theme.fontFaces.helveticaNeueBold,
                      padding: "10px 32px!important",
                      maxWidth: `${100}%!important`,
                      background: (theme) => theme.palette.primary.light,
                      ":hover": {
                        background: (theme) =>
                          `${theme.palette.warning.dark} !important`,
                      },
                      "&.Mui-disabled": {
                        background: (theme) =>
                          alpha(theme.palette.primary.lighter, 0.65),
                      },
                    },
                  })}
                />
              </Grid>
              <Grid item sm={6} xs={6} xxs={6} sx={{ textAlign: "right" }}>
                <CustomLink
                  link={`/modification/delivery?head_sys_id=${cart?.header_info?.SOH_SYS_ID}`}
                >
                  <Button
                    fullWidth={false}
                    variant="contained"
                    color="dark"
                    sx={{
                      color: "common.white",
                      "&.MuiButton-root": {
                        color: "common.white",
                        padding: "10px 32px",
                        width: "150px",
                        borderRadius: "0px!important",
                      },
                    }}
                  >
                    {translate("Next")}
                  </Button>
                </CustomLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ModificationAddressListForm;
