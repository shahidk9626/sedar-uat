import { SubmitButton } from "@/components/button";
import {
  SelectAutocomplete,
  SelectMultiCheckboxAutocomplete,
  TextBox,
} from "@/components/form";
import { AddressLocation } from "@/modules/location";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import React from "react";

import {
  admitadInvoice,
  admitadOrderedItem,
  getSourceCookie,
} from "@/admitad/AdmitadIndex";
import { useAuthContext } from "@/auth/useAuthContext";
import CustomPhoneInput from "@/components/form/phoneInput";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import CaptchaSkeleton from "@/components/skeleton/captchaSkeleton";
import { GoogleCaptchaValidation } from "@/modules/captcha/captcha";
import { useProgressRouter } from "@/provider/router/useProgressRouter";
import { getContactCategory } from "@/redux/slices/contact";
import { getInterestProduct } from "@/redux/slices/product";
import { useDispatch, useSelector } from "@/redux/store";
import {
  ContactEmailText,
  ContactFormHeading,
  ContactHeading,
} from "@/styles/contact";
import axiosInstance from "@/utils/axios";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { isValidPhoneNumber } from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
import "react-phone-number-input/style.css";
import ScrollInto from "react-scroll-into-view";

const ContactForm = ({ enq_type, data = {}, open }) => {
  const { isLoading } = useProgressRouter();
  const { t: translate } = useTranslation();
  const { locale, pathname } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { interest_products } = useSelector((state) => state.product);
  const {
    langName,
    site,
    visitorId,
    CCYCODE,
    countryName,
    cniso,
    CCYDECIMALS,
  } = cookies || {};
  const { push } = useRouter();
  const [isSubmitForm, setIsSubmitForm] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const fieldRefs = {
    productInterestedDesc: React.useRef(null),
    first_name: React.useRef(null),
    last_name: React.useRef(null),
    email: React.useRef(null),
    phone: React.useRef(null),
    country: React.useRef(null),
    city: React.useRef(null),
    province_desc: React.useRef(null),
    category_code: React.useRef(null),
  };
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      productInterestedDesc: [],
      productInterestedDesc11: [],
      phone: "",
      city: "",
      province_desc: "",
      category_code: "",
      message: "",
      i_agree: true,
      myCountry: cniso,
      country: cniso,
      urllink: "",
      cad_country: cniso,
      content: "contact",
      enquiry_type: enq_type,
    },
    validate: (values) => {
      const errors = {};
      if (!values.first_name) {
        errors.first_name = translate("Thisfieldisrequired");
      }
      if (!values.last_name) {
        errors.last_name = translate("Thisfieldisrequired");
      }
      if (
        values.productInterestedDesc?.length <= 0 &&
        formik?.values?.category_code?.value == "002"
      ) {
        errors.productInterestedDesc = translate("Thisfieldisrequired");
      }
      if (!values.email) {
        errors.email = translate("Thisfieldisrequired");
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = translate("InvalidEmailAddress");
      }
      if (!values.country) {
        errors.country = translate("Thisfieldisrequired");
      }

      if (!values.city) {
        errors.city = translate("Thisfieldisrequired");
      }

      if (!values.category_code) {
        errors.category_code = translate("Thisfieldisrequired");
      }

      if (!values.phone) {
        errors.phone = translate("Thisfieldisrequired");
      } else if (!isValidPhoneNumber(values.phone)) {
        errors.phone = `${translate("please_enter_a_valid_number")}`;
      }

      return errors;
    },
    onSubmit: async (values) => {
      let formData = new FormData();
      formData.append("source_enquiry", getSourceCookie());
      for (var key in values) {
        if (key == "country") {
          formData.append("country", values?.country?.value);
        } else if (key == "productInterestedDesc") {
          let newProductInterestedDesc = [];
          newProductInterestedDesc =
            values?.productInterestedDesc?.length > 0
              ? values?.productInterestedDesc.map((item) => item?.label)
              : [];

          newProductInterestedDesc = newProductInterestedDesc.join(",");
          formData.append("productInterestedDesc", newProductInterestedDesc);
        } else if (key == "productInterestedDesc11") {
          let newProductInterestedDesc11 = [];
          newProductInterestedDesc11 =
            values?.productInterestedDesc11?.length > 0
              ? values?.productInterestedDesc11.map((item) => item?.label)
              : [];
          newProductInterestedDesc11 = newProductInterestedDesc11.join(",");
          formData.append(
            "productInterestedDesc11",
            newProductInterestedDesc11
          );
        } else if (key == "city") {
          formData.append("city", values?.city?.value);
        } else if (key == "category_code") {
          formData.append("category_code", values?.category_code?.value);
        } else if (key == "urllink") {
          formData.append("urllink", values?.urllink);
        } else {
          formData.append(key, values[key]);
        }
      }
      await axiosInstance
        .post(
          `user/enquiry?lang=${langName}&site=${cookies?.site}&content=EnquiryForm&visitorId=${visitorId}&currency=${CCYCODE}&ccy_decimal=${CCYDECIMALS}&cn_iso=${cniso}`,
          formData
        )
        .then((response) => {
          if (response.status === 200) {
            if (response?.data?.return_status === "0") {
              enqueueSnackbar(`${translate("we_will_get_back")}`, {
                variant: "success",
                autoHideDuration: 4000
              });
              push({
                pathname: "/success/contact",
                query: { email: values.email },
              });
              const consultation_type = {
                H: "free_consultation",
                M: "free_measurement",
              };
              var con_type = consultation_type["C"]
                ? consultation_type["C"]
                : "Lets Connect";
              let consult_type = {
                PRODUCT_DESC: con_type,
                SOL_ITEM_LABEL: "Non_Product",
                SOH_TXN_NO: response.sysid ? response.sysid : 111111,
              };
              admitadOrderedItem(consult_type, con_type); //ADMITAD Order add
              admitadInvoice(consult_type, values?.email); //ADMITAD.Invoice
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
  React.useEffect(() => {
    formik.setFieldValue("myCountry", cniso);
    formik.setFieldValue("cad_country", cniso);
  }, [cniso, open]);
  React.useEffect(() => {
    if (
      isSubmitForm &&
      formik?.errors &&
      Object.keys(formik.errors).length > 0 &&
      fieldRefs
    ) {
      const errorFields = [
        "productInterestedDesc",
        "first_name",
        "last_name",
        "email",
        "phone",
        "country",
        "city",
        "province_desc",
        "category_code",
      ];
      for (let field of errorFields) {
        if (formik.errors[field] && fieldRefs[field]?.current) {
          // Get the element
          const element = fieldRefs[field].current;

          // Get element position relative to the viewport
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY; // Calculate element's top position relative to the document

          // Scroll to the element
          window.scrollTo({
            top: elementTop - 200, // Adjust the offset as needed
            behavior: "smooth",
          });
          setIsSubmitForm(false);
          break;
        }
      }
    }
  }, [isSubmitForm, fieldRefs, locale]);

  React.useEffect(() => {
    formik.resetForm();
  }, [locale]);

  const handleSubmitForm = () => {
    formik.handleSubmit();

    if (
      formik?.errors &&
      Object.values(formik.errors).length > 0 &&
      fieldRefs
    ) {
      setIsSubmitForm(true);
    }
  };

  const theme = useTheme();
  const dispatch = useDispatch();
  const { contactPage } = useSelector((state) => state.contact);
  const [isCaptchaValid, setIsCaptchaValid] = React.useState(false);
  const [provinceDescLabel, setProvinceDescLabel] = React.useState(
    translate("Province")
  );
  const getLocaleCountryName =
    locale != "default" ? locale.split("-")[0] : countryName;
  const consult_type =
    pathname == "/custom-print" ? "SITE_CUSTOM_PRODUCT" : "SITE_FREE_CONSULT";

  React.useEffect(() => {
    if (site) {
      dispatch(getContactCategory({ content: "contact" }));
    }
  }, [dispatch, cniso, locale]);

  React.useEffect(() => {
    if (formik?.values?.country?.value == "AE") {
      setProvinceDescLabel(translate("Emirates"));
    } else {
      setProvinceDescLabel(translate("Province"));
    }
  }, [formik?.values?.country?.value]);

  React.useEffect(() => {
    if (
      getLocaleCountryName == countryName &&
      site &&
      formik?.values?.category_code?.value == "002"
    ) {
      dispatch(
        getInterestProduct({
          cunsult_type: consult_type,
        })
      );
    }
  }, [
    langName,
    countryName,
    pathname,
    CCYCODE,
    cniso,
    consult_type,
    locale,
    formik?.values?.category_code?.label,
  ]);

  return (
    <Box
      id="CONTACTFORM"
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={(theme) => ({
        py: 8,
        px: { md: 2, sm: 0, xs: 0, xxs: 0 },
        background: theme.palette.info.main,
        position: "relative",
      })}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <Box>
              <ContactHeading variant="h6" component="h3">
                {data?.PARENT?.title}
              </ContactHeading>
            </Box>
            <Box>
              <ContactFormHeading
                component="div"
                // variant="typography18"
                dangerouslySetInnerHTML={{
                  __html: data?.PARENT?.description,
                }}
              />
            </Box>
            <ScrollInto selector="#ScrollEnquiries">
              <Box
                display={{
                  lg: "block",
                  md: "block",
                  sm: "none",
                  xs: "none",
                  xxs: "none",
                }}
              >
                <ContactEmailText variant="typography15">
                  {data?.PARENT?.link_title}
                </ContactEmailText>
              </Box>
            </ScrollInto>
          </Grid>
          <Grid item md={6} lg={6} sm={12} xs={12}>
            <Box
              display={{
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
                xxs: "none",
              }}
            >
              <Typography
                color={(theme) => theme.palette.grey[1800]}
                mb={4}
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              >
                {translate("ToContactusviaemailPleasefillouttheform")}
              </Typography>
            </Box>
            <Box>
              <Grid
                container
                rowSpacing={4}
                columnSpacing={{ md: 4, sm: 2, xs: 0, xxs: 0 }}
              >
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <TextBox
                    fullWidth
                    label={translate("FirstName")}
                    type="text"
                    variant="standard"
                    inputRef={fieldRefs?.first_name}
                    name="first_name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.first_name && formik.errors.first_name
                    }
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <TextBox
                    fullWidth
                    label={translate("LastName")}
                    type="text"
                    variant="standard"
                    name="last_name"
                    inputRef={fieldRefs?.last_name}
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.last_name && formik.errors.last_name
                    }
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <TextBox
                    fullWidth
                    label={translate("Email")}
                    type="email"
                    variant="standard"
                    inputRef={fieldRefs?.email}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} xxs={12}>
                  <CustomPhoneInput
                    fullWidth
                    international
                    inputRef={fieldRefs.phone}
                    countryCallingCodeEditable={false}
                    defaultCountry={
                      cniso && cniso != "XX" ? cniso.toUpperCase() : "US"
                    }
                    labels={langName == "ar" ? ar : en}
                    placeholder="Enter phone number"
                    label={translate("Phonenumber")}
                    variant="standard"
                    name="phone"
                    value={formik.values.phone}
                    onChange={(e) => {
                      formik.setFieldValue("phone", e);
                    }}
                    helperText={formik.touched.phone && formik.errors.phone}
                    error={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                <AddressLocation isArea={false} formik={formik} md={6}/>
                <Grid item md={12} sm={12} xs={12} xxs={12}>
                  <SelectAutocomplete
                    fullWidth
                    // placeholder={translate("Please_category_code")}
                    label={translate("selectcategory")}
                    type="text"
                    variant="standard"
                    fieldRefs={fieldRefs.category_code}
                    name="category_code"
                    value={formik.values.category_code}
                    options={contactPage?.dropdown}
                    onChange={(e) => {
                      if (e) {
                        formik.setFieldValue("category_code", e);
                      } else {
                        formik.setFieldValue("category_code", null);
                      }
                    }}
                    helperText={
                      formik.touched.category_code &&
                      formik.errors.category_code
                    }
                    inputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                {formik?.values?.category_code?.value ==
                  "002" && (
                    <Grid item md={12} sm={12} xs={12} xxs={12}>
                      <SelectMultiCheckboxAutocomplete
                        fullWidth
                        label={translate("ProductsInterested")}
                        type="text"
                        inputRef={fieldRefs.productInterestedDesc}
                        variant="standard"
                        name="productInterestedDesc"
                        value={formik.values.productInterestedDesc}
                        onChange={(e) => {
                          formik.setFieldValue("productInterestedDesc", e);
                          formik.setFieldValue("productInterestedDesc11", e);
                        }}
                        helperText={
                          formik.touched.productInterestedDesc &&
                          formik.errors.productInterestedDesc
                        }
                        options={interest_products?.dropdown}
                      />
                    </Grid>
                  )}
                <Grid item md={12} sm={12} xs={12} xxs={12}>
                  <TextBox
                    fullWidth
                    label={translate("Message")}
                    type="text"
                    variant="standard"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    helperText={formik.touched.message && formik.errors.message}
                    multiline={true}
                    rows="4"
                    formControlSx={{
                      "& .MuiTextField-root": {
                        "&.Mui-focused .MuiInputLabel-root": {
                          color: "black",
                        },
                        "& .MuiInputLabel-root": {
                          color: "black",
                        },
                      },
                      "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                        color: "grey", // Set label text color to white when it shrinks
                      },
                      "& .MuiFormLabel-root-MuiInputLabel-root": {
                        color: "black", // Set label text color to black
                      },
                    }}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} xxs={12}>
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
                    label={
                      <Typography
                        component="p"
                        fontSize="18px"
                        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                        color={(theme) => theme.palette.common.black}
                      >
                        {translate(
                          "IagreetoreceiveothercommunicationsfromSedarInnovation"
                        )}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} xxs={12}>
                  <Box
                    component="div"
                    sx={{
                      textAlign: {
                        md: "right",
                        sm: "right",
                        xs: "center",
                        xxs: "center",
                      },
                    }}
                  >
                    {isLoading ? (
                      <CaptchaSkeleton />
                    ) : (
                      <GoogleCaptchaValidation
                        setIsCaptchaValid={setIsCaptchaValid}
                        content="contact"
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item md={12} sm={12} xs={12} xxs={12}>
                  <Box
                    component="div"
                    sx={{
                      textAlign: {
                        md: "right",
                        sm: "right",
                        xs: "center",
                        xxs: "center",
                      },
                    }}
                  >
                    <SubmitButton
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={handleSubmitForm}
                      title={translate("Submit")}
                      loading={formik.isSubmitting}
                      disabled={!isCaptchaValid || formik.isSubmitting}
                      sx={{
                        "&.MuiButton-root": {
                          borderRadius: "0px",
                          color: "common.black",
                          ...theme.typography.typography15,
                          padding: "1rem 5px!important",
                          maxWidth: "300px!important",
                          background: (theme) => theme.palette.primary.light,
                          ":hover": {
                            background: (theme) => theme.palette.primary.main,
                          },
                          "&.Mui-disabled": {
                            background: (theme) =>
                              alpha(theme.palette.primary.lighter, 0.65),
                          },
                        },
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: { md: 40, xl: 250 },
            display: { xxs: "none", xs: "none", sm: "block" },
            width: "23%!important",
          }}
        >
          <NextLazyLoadImage
            src="/assets/contact/artworkcontact.png"
            alt="artwork"
            width={330}
            height={171}
            sx={{
              width: "100%!important",
              height: "100%!important",
              objectFit: "cover!important",
            }}
            sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
            objectFit="contain"
            upLgWidth={330}
            downLgWidth={330}
            downMdWidth={330}
            downSmWidth={330}
            downXsWidth={330}
          />
        </Box>
      </Container>
    </Box>
  );
};

ContactForm.propTypes = {
  data: PropTypes.object,
  formik: PropTypes.object,
};

export default ContactForm;
