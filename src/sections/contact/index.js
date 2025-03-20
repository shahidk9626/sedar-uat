import {
  admitadInvoice,
  admitadOrderedItem,
  getSourceCookie,
} from "@/admitad/AdmitadIndex";
import { useAuthContext } from "@/auth/useAuthContext";
import DynamicComponentRenderer from "@/components/importDynamicComponents";
import axiosInstance from "@/utils/axios";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { isValidPhoneNumber } from "react-phone-number-input";

const ContactPageSection = ({ contactPageData, open }) => {
  const { push, locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName, visitorId, CCYCODE, cniso, CCYDECIMALS } = cookies || {};
  const [isSubmitForm, setIsSubmitForm] = React.useState(false);
  const { t: translate } = useTranslation();
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
    select_category: React.useRef(null),
  };
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      productInterestedDesc: [],
      productInterestedDesc11: [],
      phone: "",
      country: "",
      city: "",
      province_desc: "",
      select_category: "",
      message: "",
      i_agree: true,
      myCountry: cniso,
      urllink: "",
      cad_country: cniso,
      content: "contact",
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
        formik?.values?.select_category?.label == "Product Enquiry"
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

      if (!values.select_category) {
        errors.select_category = translate("Thisfieldisrequired");
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
        } else if (key == "select_category") {
          formData.append("select_category", values?.select_category?.value);
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
        "select_category",
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
    <>
      <DynamicComponentRenderer
        data={
          contactPageData?.result?.COMPONENT &&
          contactPageData?.result?.COMPONENT?.length > 0 &&
          contactPageData?.result?.COMPONENT
        }
        enq_type="C"
      />
    </>
  );
};

export default ContactPageSection;
