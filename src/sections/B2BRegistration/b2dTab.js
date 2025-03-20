import { useAuthContext } from "@/auth/useAuthContext";
import { SubmitButton } from "@/components/button";
import axiosInstance from "@/utils/axios";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import CompanyDetail from "./companyDetail";
import DocumentDetail from "./documentDetail";
import YourDetail from "./youDetail";

const B2BTab = () => {
  const [value, setValue] = React.useState("1");
  const [isSubmitForm, setIsSubmitForm] = React.useState(false);
  const { t: translate } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { push, locale } = useRouter();
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const getInitialDate = () => {
    const initialDate = dayjs().add(0, "day");

    return initialDate.toDate();
  };

  const fieldRefs = {
    i_agree: React.useRef(null),
    company_name: React.useRef(null),
    contact_person: React.useRef(null),
    email: React.useRef(null),
    address: React.useRef(null),
    phone_no: React.useRef(null),
    mobile_no: React.useRef(null),
    country: React.useRef(null),
    city: React.useRef(null),
    area: React.useRef(null),
    tl_no: React.useRef(null),
    tl_exp_dt: React.useRef(null),
    tl_file_path: React.useRef(null),
    pp_no: React.useRef(null),
    pp_exp_dt: React.useRef(null),
    pp_file_path: React.useRef(null),
    no_of_branch: React.useRef(null),
    no_of_staff: React.useRef(null),
    years_in_business: React.useRef(null),
    business_line: React.useRef(null),
  };

  const formik = useFormik({
    initialValues: {
      business_type: "Distributor",
      company_name: "",
      contact_person: "",
      email: "",
      enter_location: "",
      country: "",
      city: "",
      area: "",
      province_desc: "",
      address: "",
      phone_no: "",
      mobile_no: "",
      tl_no: "",
      tl_exp_dt: getInitialDate(),
      tl_file_path: "",
      tc_no: "",
      tc_exp_dt: getInitialDate(),
      tc_file_path: "",
      pp_no: "",
      pp_exp_dt: getInitialDate(),
      pp_file_path: "",
      no_of_branch: "",
      no_of_staff: "",
      years_in_business: "",
      business_line: [],
      tl_file_path: "",
      i_agree: "",
    },
    validate: (values) => {
      const errors = {};
      if (value == 1) {
        if (!values.i_agree) {
          errors.i_agree = translate("Thisfieldisrequired");
        }
        if (!values.company_name) {
          errors.company_name = translate("Thisfieldisrequired");
        }
        if (!values.contact_person) {
          errors.contact_person = translate("Thisfieldisrequired");
        }
        if (!values.email) {
          errors.email = translate("Thisfieldisrequired");
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = translate("Email_validation");
        }
        if (!values.address) {
          errors.address = translate("Thisfieldisrequired");
        }
        if (!values.phone_no) {
          errors.phone_no = translate("Thisfieldisrequired");
        } else if (!/^\d+$/.test(values.phone_no)) {
          errors.phone_no = translate("This field must contain only numbers");
        }

        if (!values.mobile_no) {
          errors.mobile_no = translate("Thisfieldisrequired");
        } else if (!/^\d+$/.test(values.mobile_no)) {
          errors.mobile_no = translate("This field must contain only numbers");
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
      }
      if (value == 2) {
        if (!values.tl_no) {
          errors.tl_no = translate("Thisfieldisrequired");
        }
        if (!values.tl_exp_dt) {
          errors.tl_exp_dt = translate("Thisfieldisrequired");
        }
        if (!values.tl_file_path) {
          errors.tl_file_path = translate("Thisfieldisrequired");
        }
        if (!values.pp_no) {
          errors.pp_no = translate("Thisfieldisrequired");
        }
        if (!values.pp_exp_dt) {
          errors.pp_exp_dt = translate("Thisfieldisrequired");
        }
        if (!values.pp_file_path) {
          errors.pp_file_path = translate("Thisfieldisrequired");
        }
      }
      if (value == 3) {
        if (!values.no_of_branch) {
          errors.no_of_branch = translate("Thisfieldisrequired");
        }
        if (!values.no_of_staff) {
          errors.no_of_staff = translate("Thisfieldisrequired");
        }
        if (!values.years_in_business) {
          errors.years_in_business = translate("Thisfieldisrequired");
        }
        if (!values.business_line) {
          errors.business_line = translate("Thisfieldisrequired");
        }
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      if (value == 3) {
        let formData = new FormData();

        for (var key in values) {
          if (key == "country") {
            formData.append("country", values?.country?.value);
          } else if (key == "city") {
            formData.append("city", values?.city?.value);
          } else if (key == "area") {
            formData.append("area", values?.area?.value);
          } else if (key == "business_line") {
            formData.append(
              "business_line",
              values?.business_line && values?.business_line?.length > 0
                ? values?.business_line.join(",")
                : ""
            );
          } else if (key == "city") {
            formData.append("city", values?.city?.value);
          } else if (key == "tl_exp_dt") {
            formData.append(
              "tl_exp_dt",
              values?.tl_exp_dt
                ? moment(values?.tl_exp_dt).format("DD-MMM-YYYY")
                : ""
            );
          } else if (key == "tc_exp_dt") {
            formData.append(
              "tc_exp_dt",
              values?.tc_exp_dt
                ? moment(values?.tc_exp_dt).format("DD-MMM-YYYY")
                : ""
            );
          } else if (key == "pp_exp_dt") {
            formData.append(
              "pp_exp_dt",
              values?.pp_exp_dt
                ? moment(values?.pp_exp_dt).format("DD-MMM-YYYY")
                : ""
            );
          } else {
            formData.append(key, values[key]);
          }
        }
        await axiosInstance
          .post(
            `user/btob?content=btobregisteration&site=${cookies?.site}&lang=${cookies?.langName}`,
            formData
          )
          .then((response) => {
            if (response.status === 200) {
              if (response?.data && response?.data?.return_status == "0") {
                enqueueSnackbar(`${translate("we_will_get_back")}`, {
                  variant: "success",
                  autoHideDuration: 4000
                });
                push({
                  pathname: "/success/contact",
                  query: { email: values.email },
                });
              }
            }
          })
          .catch((error) => {
            enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
              variant: "error",
              autoHideDuration: 4000
            });
          });
      } else {
        handleChange(String(Number(value) + 1));
      }
    },
  });

  React.useEffect(() => {
    if (
      isSubmitForm &&
      formik?.errors &&
      Object.keys(formik.errors).length > 0 &&
      fieldRefs
    ) {
      const errorFields = [
        "i_agree",
        "company_name",
        "contact_person",
        "email",
        "address",
        "phone_no",
        "mobile_no",
        "country",
        "city",
        "area",
        "tl_no",
        "tl_exp_dt",
        "tl_file_path",
        "pp_no",
        "pp_exp_dt",
        "pp_file_path",
        "no_of_branch",
        "no_of_staff",
        "years_in_business",
        "business_line",
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
    formik.setFieldValue("tl_exp_dt", getInitialDate());
    formik.setFieldValue("tc_exp_dt", getInitialDate());
    formik.setFieldValue("pp_exp_dt", getInitialDate());
  }, []);

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
      <Container maxWidth="xl">
        <form noValidate onSubmit={formik.handleSubmit}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                sx={(theme) => ({
                  backgroundColor: {
                    lg: theme.palette.common.black,
                    md: theme.palette.common.black,
                    sm: theme.palette.common.black,
                    xs: theme.palette.common.white,
                    xxs: theme.palette.common.white,
                  },
                  pt: 3,
                  "& .MuiTabs-flexContainer": {
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                })}
              >
                <Tab
                  sx={{
                    paddingBottom: "20px",
                    width: {
                      lg: "100%",
                      md: "100%",
                      sm: "40%",
                      xs: "40%",
                      xxs: "40%",
                    },
                  }}
                  label={
                    <>
                      <Typography
                        sx={(theme) => ({
                          ...theme.typography.typography18,
                          fontFamily: theme.fontFaces.helveticaNeueMedium,
                          color: {
                            lg: theme.palette.common.white,
                            md: theme.palette.common.white,
                            sm: theme.palette.common.white,
                            xs: theme.palette.common.black,
                            xxs: theme.palette.common.black,
                          },
                        })}
                      >
                        {translate("Yourdetails")}
                      </Typography>
                    </>
                  }
                  value="1"
                />
                <Tab
                  sx={{
                    paddingBottom: "20px",
                    width: {
                      lg: "100%",
                      md: "100%",
                      sm: "40%",
                      xs: "40%",
                      xxs: "40%",
                    },
                  }}
                  label={
                    <>
                      <Typography
                        sx={(theme) => ({
                          ...theme.typography.typography18,
                          fontFamily: theme.fontFaces.helveticaNeueMedium,
                          color: {
                            lg: theme.palette.common.white,
                            md: theme.palette.common.white,
                            sm: theme.palette.common.white,
                            xs: theme.palette.common.black,
                            xxs: theme.palette.common.black,
                          },
                        })}
                      >
                        {translate("DocumentDetails")}
                      </Typography>
                    </>
                  }
                  value="2"
                />
                <Tab
                  sx={{
                    paddingBottom: "20px",
                    width: {
                      lg: "100%",
                      md: "100%",
                      sm: "40%",
                      xs: "40%",
                      xxs: "40%",
                    },
                  }}
                  label={
                    <>
                      <Typography
                        sx={(theme) => ({
                          ...theme.typography.typography18,
                          fontFamily: theme.fontFaces.helveticaNeueMedium,
                          color: {
                            lg: theme.palette.common.white,
                            md: theme.palette.common.white,
                            sm: theme.palette.common.white,
                            xs: theme.palette.common.black,
                            xxs: theme.palette.common.black,
                          },
                        })}
                      >
                        {translate("CompanyDetails")}
                      </Typography>
                    </>
                  }
                  value="3"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <YourDetail formik={formik} fieldRefs={fieldRefs} />
            </TabPanel>
            <TabPanel value="2">
              <DocumentDetail formik={formik} fieldRefs={fieldRefs} />
            </TabPanel>
            <TabPanel value="3">
              <CompanyDetail formik={formik} fieldRefs={fieldRefs} />
            </TabPanel>
          </TabContext>
          <Stack
            my={2}
            spacing={2}
            direction={"row"}
            sx={{ justifyContent: "end", width: "100%" }}
          >
            {value > 1 && (
              <Button
                fullWidth
                sx={(theme) => ({
                  "&.MuiButton-root": {
                    borderRadius: "0px",
                    color: "common.black",
                    ...theme.typography.typography15,
                    padding: "1rem 5px!important",
                    maxWidth: "300px!important",
                    background: (theme) => theme.palette.primary.light,
                    "&.Mui-disabled": {
                      background: (theme) =>
                        alpha(theme.palette.primary.lighter, 0.65),
                    },
                  },
                })}
                onClick={() => {
                  if (value > 1) {
                    handleChange(String(Number(value) - 1));
                  }
                }}
                disabled={formik.isSubmitting}
              >
                {translate("Previous")}
              </Button>
            )}
            <SubmitButton
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmitForm}
              type="button"
              title={value >= 3 ? translate("RegisterNow") : translate("Next")}
              sx={(theme) => ({
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
              })}
              disabled={formik.isSubmitting}
            />
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default B2BTab;
