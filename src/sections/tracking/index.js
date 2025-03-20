import { apiClientV2DataService } from "@/utils/apiClientV2DataService";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const TrackOrder = dynamic(() => import("./trackOrder"), { ssr: false });
const TrackingPageSection = () => {
  const { locale } = useRouter()
  const [trackingData, setTrackingData] = React.useState(false);
  const { t: translate } = useTranslation();
  const formik = useFormik({
    initialValues: {
      order_number: "",
      email: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.order_number) {
        errors.order_number = `${translate("Thisfieldisrequired")}`;
      } else if (!/^[0-9]+$/.test(values.order_number)) {
        errors.order_number = "Please enter only numbers value";
      }
      if (!values.email) {
        errors.email = `${translate("Thisfieldisrequired")}`;
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = translate("InvalidEmailAddress");
      }
      return errors;
    },
    onSubmit: async (values) => {
      await apiClientV2DataService
        .getAll({
          path: `order/tracking/${formik.values.order_number}`,
          asPath: `email=${formik.values.email}`,
          locale: locale
        })
        .then((response) => {
          if (
            response?.data?.return_status == 0 &&
            response?.data?.error_message == "Success"
          ) {
            response?.data?.result
              ? setTrackingData(response?.data?.result)
              : setTrackingData("NO");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <>
      <TrackOrder formik={formik} trackingData={trackingData} />
    </>
  );
};

export default TrackingPageSection;
