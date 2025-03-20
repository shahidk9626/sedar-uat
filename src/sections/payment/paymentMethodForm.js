import { useAuthContext } from "@/auth/useAuthContext";
import { SubmitButton } from "@/components/button";
import { SelectBox, TextBox } from "@/components/form";
import { RegexDigit, getMonths, getYears } from "@/utils/constant";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";

const PaymentMethodForm = ({ formik }) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user } = cookies || {};
  const { t: translate } = useTranslation();

  React.useEffect(() => {
    formik.setFieldValue(
      "expiry_date",
      formik.values.SCC_EXP_YEAR + "" + formik.values.SCC_EXP_MONTH
    );
  }, [formik.values.SCC_EXP_MONTH, formik.values.SCC_EXP_YEAR]);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
            <TextBox
              fullWidth
              label={
                <Typography
                  sx={{
                    color: (theme) => theme.palette.common.black,
                    fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                  }}
                >
                  {translate("Debit_Credit_Card_Number")}
                </Typography>
              }
              type="text"
              variant="standard"
              name="card_number"
              value={formik.values.card_number}
              helperText={
                formik.touched.card_number && formik.errors.card_number
              }
              autoComplete="off"
              error={formik.touched.card_number && formik.errors.card_number}
              maxLength={16}
              minLength={15}
              onChange={(e) => {
                let newValue = e.target.value.replace(RegexDigit, "");
                formik.setFieldValue("card_number", newValue);
              }}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={6} xxs={6}>
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
          <Grid item lg={4} md={4} sm={6} xs={6} xxs={6}>
            <SelectBox
              fullWidth
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
          <Grid item lg={4} md={4} sm={6} xs={6} xxs={6}>
            <TextBox
              fullWidth
              label={
                <Typography
                  sx={{
                    color: (theme) => theme.palette.common.black,
                    fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                  }}
                >
                  {translate("Card_CVV")}
                </Typography>
              }
              type="text"
              variant="standard"
              name="card_security_code"
              value={formik.values.card_security_code}
              onChange={(e) => {
                let newValue = e.target.value.replace(RegexDigit, "");
                formik.setFieldValue("card_security_code", newValue);
              }}
              helperText={
                formik.touched.card_security_code &&
                formik.errors.card_security_code
              }
              maxLength={3}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
            <TextBox
              fullWidth
              label={
                <Typography
                  sx={{
                    color: (theme) => theme.palette.common.black,
                    fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                  }}
                >
                  {translate("Card_Holder_Name")}
                </Typography>
              }
              type="text"
              variant="standard"
              name="card_holder_name"
              value={formik.values.card_holder_name}
              onChange={formik.handleChange}
              helperText={
                formik.touched.card_holder_name &&
                formik.errors.card_holder_name
              }
            />
          </Grid>
          {user?.cust_cr_uid != "GUEST-USER" && (
            <Grid item md={12} sm={12} xs={12} xxs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={formik.values.SCC_ACTIVE_YN}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "SCC_ACTIVE_YN",
                        e.target.checked ? "Y" : "N"
                      );
                    }}
                    name="SCC_ACTIVE_YN"
                    checked={formik.values.SCC_ACTIVE_YN === "Y"}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                      color: "common.black",
                    }}
                  >
                    {translate("Save_my_card_details")}
                  </Typography>
                }
              />
            </Grid>
          )}
        </Grid>
        <Stack
          my={2}
          spacing={2}
          direction={"row"}
          sx={{ justifyContent: "end", width: "100%" }}
        >
          <SubmitButton
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            maxWidth="200px"
            size="large"
            title={translate("PAY")}
            fontWeight={200}
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
          />
        </Stack>
      </form>
    </>
  );
};

export default PaymentMethodForm;
