import {
  admitadInvoice,
  admitadOrderedItem,
  getSourceCookie,
} from "@/admitad/AdmitadIndex";
import { useAuthContext } from "@/auth/useAuthContext";
import { SubmitButton } from "@/components/button";
import { SelectMultiCheckboxAutocomplete, TextBox } from "@/components/form";
import DragDrop from "@/components/form/dragDrop";
import CustomPhoneInput from "@/components/form/phoneInput";
import CaptchaSkeleton from "@/components/skeleton/captchaSkeleton";
import { GoogleCaptchaValidation } from "@/modules/captcha/captcha";
import { AddressLocation } from "@/modules/location";
import { useProgressRouter } from "@/provider/router/useProgressRouter";
import { getInterestProduct } from "@/redux/slices/product";
import { useDispatch, useSelector } from "@/redux/store";
import { CustomPrintHeading } from "@/styles/custom-print";
import axiosInstance from "@/utils/axios";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";

const BookSection = ({ data }) => {
  const { isLoading } = useProgressRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { locale, pathname, push } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { country } = useSelector((state) => state.location);
  const { interest_products } = useSelector((state) => state.product);
  const {
    langName,
    visitorId,
    CCYCODE,
    site,
    cniso,
    CCYDECIMALS,
    countryName,
  } = cookies || {};
  const [isCaptchaValid, setIsCaptchaValid] = React.useState(false);
  const consult_type =
    pathname == "/custom-print" ? "SITE_CUSTOM_PRODUCT" : "SITE_FREE_CONSULT";

  const getLocaleCountryName =
    locale != "default" ? locale.split("-")[0] : countryName;

  const todaysDate = new Date();
  const dateAfterTwoDays = new Date(todaysDate);
  dateAfterTwoDays.setDate(todaysDate.getDate() + 2);

  const formik = useFormik({
    initialValues: {
      enquiry_type: "H",
      productInterestedDesc: [],
      measurement_dt: dateAfterTwoDays,
      myCountry: cniso,
      country: country?.defaultValue,
      long_name: "",
      email: "",
      phone: "",
      urllink: "custom-print",
      city: "",
      area: "",
      state: "",
      productInterestedDesc11: [],
      documentfile: "",
      remarks: "",
      content: "Consultation",
      cad_country: cniso,
      i_agree: true,
    },
    validate: (values) => {
      const errors = {};
      if (!values.long_name) {
        errors.long_name = translate("Thisfieldisrequired");
      }
      if (!values.email) {
        errors.email = translate("Thisfieldisrequired");
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = translate("InvalidEmailAddress");
      }
      if (!values.phone) {
        errors.phone = translate("Thisfieldisrequired");
      } else if (!isValidPhoneNumber(values.phone)) {
        errors.phone = `${translate("please_enter_a_valid_number")}`;
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
      if (!values.documentfile) {
        errors.documentfile = translate("Thisfieldisrequired");
      }
      return errors;
    },
    onSubmit: async (values) => {
      let formData = new FormData();
      formData.append("source_enquiry", getSourceCookie());
      for (var key in values) {
        if (key == "documentfile") {
          formData.append(
            "documentfile",
            values.documentfile ? values.documentfile : ""
          );
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
        } else if (key == "country") {
          formData.append("country", values?.country?.value);
        } else if (key == "city") {
          formData.append("city", values?.city?.value);
        } else if (key == "area") {
          formData.append("area", values?.area?.value);
        } else if (key == "measurement_dt") {
          formData.append(
            "measurement_dt",
            moment(values?.measurement_dt).format("DD-MMM-YYYY")
          );
        } else {
          formData.append(key, values[key]);
        }
      }
      await axiosInstance
        .post(
          `user/enquiry?lang=${langName}&site=${site}&content=EnquiryForm&visitorId=${visitorId}&currency=${CCYCODE}&ccy_decimal=${CCYDECIMALS}&cn_iso=${cniso}`,
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            if (response?.data?.return_status === "0") {
              enqueueSnackbar(`${translate("we_will_get_back")}`, {
                variant: "success",
                autoHideDuration: 4000
              });
              push({
                pathname: "/success/custom-print",
                query: { email: values.email },
              });
              const consultation_type = {
                H: "free_consultation",
                M: "free_measurement",
              };
              var con_type = consultation_type["H"]
                ? consultation_type["H"]
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
    if (cniso) {
      formik.setFieldValue("myCountry", cniso);
      formik.setFieldValue("cad_country", cniso);
    }
  }, [cniso]);

  React.useEffect(() => {
    if (getLocaleCountryName === countryName && site) {
      dispatch(
        getInterestProduct({
          cunsult_type: consult_type,
        })
      );
    }
  }, [langName, countryName, pathname, CCYCODE, cniso, consult_type, locale]);

  return (
    <Box>
      <Container maxWidth="lg">
        <Box>
          <CustomPrintHeading
            component="div"
            dangerouslySetInnerHTML={{
              __html: data?.description,
            }}
          />
        </Box>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={4} my={4}>
            <Grid item md={6} sm={12} xs={12} xxs={12}>
              <SelectMultiCheckboxAutocomplete
                fullWidth
                label={translate("ProductsInterested")}
                type="text"
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
            <Grid item md={6} sm={12} xs={12} xxs={12}>
              <TextBox
                fullWidth
                label={translate("FullName")}
                type="text"
                variant="standard"
                name="long_name"
                value={formik.values.long_name}
                onChange={formik.handleChange}
                helperText={formik.touched.long_name && formik.errors.long_name}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} xxs={12}>
              <TextBox
                fullWidth
                label={translate("Email")}
                type="email"
                variant="standard"
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
                countryCallingCodeEditable={false}
                defaultCountry={
                  cniso && cniso != "XX" ? cniso.toUpperCase() : "US"
                }
                labels={langName == "ar" ? ar : en}
                placeholder="Enter phone number"
                label={translate("PhoneNumber")}
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
            <AddressLocation formik={formik} isArea={true} />
            <Grid item md={12} sm={12} xs={12} xxs={12}>
              <DragDrop
                fullWidth
                name="documentfile"
                value={formik.values.documentfile}
                onChange={(e) => {
                  formik.setFieldValue("documentfile", e);
                }}
                helperText={
                  formik.touched.documentfile && formik.errors.documentfile
                }
                label={translate("UploadYourfileorURLLink")}
                documentText={translate("MaximumFileMBFileFormatJPGorPNG")}
                maxSize={5}
                onSizeError={(file) => {
                  formik.setFieldError(
                    "documentfile",
                    translate("Youneedtoprovideafilevalidsize")
                  );
                }}
                accept={["png", "PNG", "jpg", "JPG"]}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} xxs={12}>
              <TextBox
                fullWidth
                label={translate("Message")}
                type="text"
                variant="standard"
                name="remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
                helperText={formik.touched.remarks && formik.errors.remarks}
                multiline={true}
                rows="4"
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
                    variant="subtitle1"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                    color={(theme) => theme.palette.grey[2800]}
                  >
                    {translate(
                      "IagreetoreceiveothercommunicationsfromSedarInnovation"
                    )}
                  </Typography>
                }
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
              <Box
                sx={{
                  "& .google_captcha": {
                    float: "right",
                  },
                }}
              >
                {isLoading ? <CaptchaSkeleton /> :
                  <GoogleCaptchaValidation
                    setIsCaptchaValid={setIsCaptchaValid}
                    content="EnquiryForm"
                  />
                }
              </Box>
            </Grid>
            <Grid item md={12} sm={12} xs={12} xxs={12}>
              <Box sx={{ textAlign: "right" }}>
                <SubmitButton
                  fullWidth
                  variant="contained"
                  color="primary"
                  title={translate("Submit")}
                  loading={formik.isSubmitting}
                  disabled={!isCaptchaValid || formik.isSubmitting}
                  sx={{
                    "&.MuiButton-root": {
                      borderRadius: "0px",
                      color: "common.black",
                      fontSize: (theme) => theme.typography.typography15,
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
        </form>
      </Container>
    </Box>
  );
};

export default BookSection;
