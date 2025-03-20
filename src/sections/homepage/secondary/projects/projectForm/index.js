import {
  admitadInvoice,
  admitadOrderedItem,
  getSourceCookie,
} from "@/admitad/AdmitadIndex";
import { useAuthContext } from "@/auth/useAuthContext";
import StartProject from "@/modules/form/startProject";
import axiosInstance from "@/utils/axios";
import { fileType } from "@/utils/constant";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import CloseButton from "./closeButton";
import ProjectHeading from "./heading";

const ProjectForm = ({ handleOpenClose = () => { }, open }) => {
  const { push, locale } = useRouter();
  const [isSubmitForm, setIsSubmitForm] = React.useState(false);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { t: translate } = useTranslation();
  const { langName, visitorId, CCYCODE, CCYDECIMALS, site, cniso } =
    cookies || {};

  const { enqueueSnackbar } = useSnackbar();

  // Initialize refs for each form field
  const fieldRefs = {
    long_name: React.useRef(null),
    email: React.useRef(null),
    phone_number: React.useRef(null),
    country: React.useRef(null),
    city: React.useRef(null),
    province_desc: React.useRef(null),
    documentfile: React.useRef(null),
    urllink: React.useRef(null),
    subject: React.useRef(null),
  };

  const formik = useFormik({
    initialValues: {
      enquiry_type: "S",
      myCountry: cniso,
      country: "",
      phone_number: "",
      long_name: "",
      email: "",
      ProjectType: "Hospitality",
      budget: "100,000$",
      documentfile: "",
      city: "",
      area: "",
      province_desc: "",
      state: "",
      cad_country: cniso,
      urllink: "",
      subject: "",
      i_agree: true,
    },
    validate: (values) => {
      const errors = {};
      if (!values.long_name) {
        errors.long_name = `${translate("Thisfieldisrequired")}`;
      }

      if (!values.email) {
        errors.email = `${translate("Thisfieldisrequired")}`;
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = `${translate("InvalidEmailAddress")}`;
      }

      if (!values.country) {
        errors.country = `${translate("Thisfieldisrequired")}`;
      }

      if (!values.city) {
        errors.city = `${translate("Thisfieldisrequired")}`;
      }

      if (values.documentfile && !fileType.includes(values.documentfile.type)) {
        errors.documentfile = `${translate(
          "Youneedtoprovideafilevalidformat"
        )}`;
      }

      if (!values.province_desc) {
        errors.province_desc = `${translate("Thisfieldisrequired")}`;
      }

      if (!values.phone_number) {
        errors.phone_number = `${translate("Thisfieldisrequired")}`;
      } else if (!isValidPhoneNumber(values.phone_number)) {
        errors.phone_number = `${translate("please_enter_a_valid_number")}`;
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
      await axiosInstance
        .post(
          `user/enquiry?lang=${langName}&site=${site}&content=EnquiryForm&visitorId=${visitorId}&currency=${CCYCODE}&ccy_decimal=${CCYDECIMALS}&cn_iso=${cniso}`,
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
                pathname: "/success/contracts",
                query: { email: values.email },
              });
              const consultation_type = {
                H: "free_consultation",
                M: "free_measurement",
              };
              var con_type = consultation_type["S"]
                ? consultation_type["S"]
                : "Lets Connect";
              let consult_type = {
                PRODUCT_DESC: con_type,
                SOL_ITEM_LABEL: "Non_Product",
                SOH_TXN_NO: response?.data?.sysid ? response?.data?.sysid : 111111,
              };
              admitadOrderedItem(consult_type, con_type); //ADMITAD Order add
              admitadInvoice(consult_type, values?.email); //ADMITAD.Invoice
            }
          }
        })
        .catch((error) => {
          console.log(error, "TETSTSTSTSerror");
          enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
            variant: "error",
            autoHideDuration: 4000
          });
        });
    },
  });

  useEffect(() => {
    if (
      isSubmitForm &&
      formik?.errors &&
      Object.values(formik.errors).length > 0 &&
      fieldRefs
    ) {
      const errorFields = [
        "long_name",
        "email",
        "phone_number",
        "country",
        "city",
        "province_desc",
        "documentfile",
        "urllink",
        "subject",
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

  return (
    <Card
      sx={{
        background: (theme) => theme.palette.grey[1700],
        borderRadius: "0px",
      }}
    >
      <Box my={2}>
        <Container>
          <CloseButton handleOpenClose={handleOpenClose} />
          <ProjectHeading />
          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={6} mt={0}>
              <Grid item md={12}>
                <StartProject
                  open={open}
                  formik={formik}
                  fieldRefs={fieldRefs} // Pass refs to StartProject
                  handleSubmitForm={handleSubmitForm}
                />
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </Card>
  );
};

ProjectForm.propTypes = {
  handleOpenClose: PropTypes.func,
};

export default ProjectForm;
