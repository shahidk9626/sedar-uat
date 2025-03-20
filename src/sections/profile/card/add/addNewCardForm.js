import { useAuthContext } from "@/auth/useAuthContext";
import { SelectBox, TextBox, ToggleBox } from "@/components/form";
import useResponsive from "@/hooks/useResponsive";
import { useDispatch } from "@/redux/store";
import { apiDataService } from "@/utils/apiDataService";
import { getMonths, getYears } from "@/utils/constant";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const AddNewCardForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { push, query } = useRouter();
  const { id } = query;
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user, JWTAuthToken, USER_ID } = cookies || {};
  const isSmallScreen = useResponsive("down", "sm");

  const formik = useFormik({
    initialValues: {
      SCC_ACTIVE_YN: "false",
      SCC_CARD_NUMBER: "",
      SCC_CARD_HOLDER: "",
      SCC_EXP_MONTH: "01",
      SCC_EXP_YEAR: new Date().getFullYear().toString().substr(-2),
    },
    validate: (value) => {
      const errors = {};
      if (!value.SCC_CARD_NUMBER) {
        errors.SCC_CARD_NUMBER = translate("Thisfieldisrequired");
      }
      if (!value.SCC_CARD_HOLDER) {
        errors.SCC_CARD_HOLDER = translate("Thisfieldisrequired");
      }
      return errors;
    },
    onSubmit: async (values, { setFieldError }) => {
      let url =
        id != "add"
          ? "dashboard/customerCard/update/" + id
          : "dashboard/customerCard";

      await dispatch(
        apiDataService.post(url, {
          ...values,
          userId: USER_ID,
          cust_user_id: user?.cust_email_id,
          auth_token: JWTAuthToken,
        })
      )
        .then((response) => {
          if (response && response?.data?.return_status == 0) {
            if (response?.data?.return_status == 0) {
              enqueueSnackbar(`${translate("Success")}`, {
                variant: "success",
                autoHideDuration: 4000
              });
            }
            push("/dashboard/card");
          } else if (response && response?.data?.return_status == -111) {
            for (const [key, value] of Object.entries(values)) {
              if (response?.data?.result) {
                setFieldError(key, response.data.result[key]);
              }
            }
          }
        })
        .catch((error) => {
          enqueueSnackbar(`${translate("Failed")}`, {
            variant: "error",
            autoHideDuration: 4000
          });
        });
    },
  });

  const bindData = async (id) => {
    if (user) {
      await dispatch(
        apiDataService.getAll(`dashboard/customerCard/${id}`, {
          cust_user_id: user?.cust_email_id,
          auth_token: JWTAuthToken,
        })
      )
        .then((response) => {
          if (response && response?.data?.return_status == 0) {
            for (const [key] of Object.entries(formik.values)) {
              formik.setFieldValue([key], response?.data?.result[key]);
            }
          }
        })

        .catch((error) => {
          enqueueSnackbar(`${translate("Failed")}`, {
            variant: "error",
            autoHideDuration: 4000
          });
        });
    }
  };

  React.useEffect(() => {
    if (id != "add") {
      bindData(id);
    }
  }, [id]);

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ height: 15, mt: "25px" }}
      >
        <Box width="70%"></Box>
        <Box>
          <ToggleBox
            fullWidth
            label={
              <Typography
                sx={(theme) => ({
                  fontSize: "18px",
                  lineHeight: "normal",
                  fontWeight: 400,
                  fontFamily: theme.fontFaces.helveticaNeue,
                  color: theme.palette.common.black,
                })}
              >
                {translate("Active")}
              </Typography>
            }
            name="SCC_ACTIVE_YN"
            value={formik?.values?.SCC_ACTIVE_YN == "Y"}
            checked={formik?.values?.SCC_ACTIVE_YN == "Y"}
            onChange={(e) => {
              if (e.target.checked) {
                formik.setFieldValue("SCC_ACTIVE_YN", "Y");
              } else {
                formik.setFieldValue("SCC_ACTIVE_YN", "false");
              }
            }}
            error={formik.touched.SCC_ACTIVE_YN && formik.errors.SCC_ACTIVE_YN}
            helperText={
              formik.touched.SCC_ACTIVE_YN && formik.errors.SCC_ACTIVE_YN
            }
            required
          />
        </Box>
      </Stack>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={12} sm={12} xs={12} xxs={12}>
            <TextBox
              maxLength={16}
              fullWidth={isSmallScreen ? true : false}
              label={translate("Debit_Credit_Card_Number")}
              type="text"
              variant="standard"
              name="SCC_CARD_NUMBER"
              value={formik.values.SCC_CARD_NUMBER}
              onChange={formik.handleChange}
              helperText={
                formik.touched.SCC_CARD_NUMBER && formik.errors.SCC_CARD_NUMBER
              }
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12} xxs={12} mb={4}>
            <TextBox
              fullWidth={isSmallScreen ? true : false}
              label={translate("Name_On_card")}
              type="text"
              variant="standard"
              name="SCC_CARD_HOLDER"
              value={formik.values.SCC_CARD_HOLDER}
              onChange={formik.handleChange}
              helperText={
                formik.touched.SCC_CARD_HOLDER && formik.errors.SCC_CARD_HOLDER
              }
            />
          </Grid>
          <Grid item md={3} sm={6} xs={6} xxs={6}>
            <SelectBox
              fullWidth
              label={translate("Card_Month")}
              type="text"
              variant="standard"
              name="SCC_EXP_MONTH"
              value={formik.values.SCC_EXP_MONTH}
              onChange={(e) => {
                formik.setFieldValue("SCC_EXP_MONTH", e.target.value);
              }}
              options={getMonths(translate)}
              inputLabelProps={{
                shrink: true,
              }}
              helperText={
                formik.touched.SCC_EXP_MONTH && formik.errors.SCC_EXP_MONTH
              }
              error={
                formik.touched.SCC_EXP_MONTH && formik.errors.SCC_EXP_MONTH
              }
            />
          </Grid>
          <Grid item md={6} sm={6} xs={6} xxs={6}>
            <SelectBox
              fullWidth={isSmallScreen ? true : false}
              label={translate("CardYear")}
              type="text"
              variant="standard"
              name="SCC_EXP_YEAR"
              value={formik.values.SCC_EXP_YEAR}
              onChange={(e) => {
                formik.setFieldValue("SCC_EXP_YEAR", e.target.value);
              }}
              options={getYears()}
              inputLabelProps={{
                shrink: true,
              }}
              helperText={
                formik.touched.SCC_EXP_YEAR && formik.errors.SCC_EXP_YEAR
              }
              error={formik.touched.SCC_EXP_YEAR && formik.errors.SCC_EXP_YEAR}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} xxs={12} mt={4}>
            <Box>
              <Button
                variant="outlined"
                fullWidth
                type="submit"
                sx={(theme) => ({
                  py: 1.8,
                  borderRadius: "0px",
                  color: (theme) => theme.palette.common.black,
                  backgroundColor: (theme) => theme.palette.primary.light,
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.light,
                  },
                  ...theme.typography.typography16,
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                })}
              >
                {translate("SaveCard")}
              </Button>
            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} xxs={12} my={2}>
            <Typography
              sx={(theme) => ({
                fontFamily: theme.fontFaces.helveticaNeue,
                fontSize: theme.typography.typography16,
                color: theme.palette.grey[2200],
              })}
            >
              {translate("cardInfoNotice")}
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddNewCardForm;
