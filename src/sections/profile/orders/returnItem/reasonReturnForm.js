import { SelectAutocomplete } from "@/components/form";
import { OrderDetails } from "@/styles/auth";
import { ReasonSelect } from "@/utils/constant";
import { useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";

const ReasonReturnForm = ({ handleNext }) => {
  const { t: translate } = useTranslation();
  const formik = useFormik({
    initialValues: {
      select_reason: "",
      select_reason_detail: "",
      new_piece: "",
      preferred_time: "",
      i_agree: "",
    },
    validate: (value) => {
      const errors = {};
      if (!value.select_reason) {
        errors.select_reason = translate("Thisfieldisrequired");
      }
      if (!value.select_reason_detail) {
        errors.select_reason_detail = translate("Thisfieldisrequired");
      }
      if (!value.new_piece) {
        errors.new_piece = translate("Thisfieldisrequired");
      }
      if (!value.preferred_time) {
        errors.preferred_time = translate("Thisfieldisrequired");
      }
    },
  });
  const onSubmit = (values) => {};

  return (
    <>
      <Box
        p={4}
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.grey[2100]}`,
        }}
      >
        <OrderDetails>Reason To Return</OrderDetails>
        <Typography
          mt={1}
          sx={(theme) => ({
            fontSize: theme.typography.typography14,
            fontFamily: theme.fontFaces.helveticaNeueRegular,
          })}
        >
          This information is only used to improve our services
        </Typography>
        <Box mt={4}>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
                <SelectAutocomplete
                  fullWidth
                  label={"Select Reason"}
                  type="text"
                  variant="standard"
                  name="select_reason"
                  value={formik.values.select_reason}
                  onChange={(e) => {
                    formik.setFieldValue("select_reason", e);
                  }}
                  options={ReasonSelect(translate)}
                  inputLabelProps={{
                    shrink: true,
                  }}
                  helperText={
                    formik.touched.select_reason && formik.errors.select_reason
                  }
                  error={
                    formik.touched.select_reason && formik.errors.select_reason
                  }
                  required={true}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
                <SelectAutocomplete
                  fullWidth
                  label={"Select Reason Detail"}
                  type="text"
                  variant="standard"
                  name="select_reason_detail"
                  value={formik.values.select_reason_detail}
                  onChange={(e) => {
                    formik.setFieldValue("select_reason_detail", e);
                  }}
                  options={ReasonSelect(translate)}
                  inputLabelProps={{
                    shrink: true,
                  }}
                  helperText={
                    formik.touched.select_reason_detail &&
                    formik.errors.select_reason_detail
                  }
                  error={
                    formik.touched.select_reason_detail &&
                    formik.errors.select_reason_detail
                  }
                  required={true}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
                <OrderDetails>Request Return</OrderDetails>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
                <SelectAutocomplete
                  fullWidth
                  label={"I want a new Piece"}
                  type="text"
                  variant="standard"
                  name="new_piece"
                  value={formik.values.new_piece}
                  onChange={(e) => {
                    formik.setFieldValue("new_piece", e);
                  }}
                  options={ReasonSelect(translate)}
                  inputLabelProps={{
                    shrink: true,
                  }}
                  helperText={
                    formik.touched.new_piece && formik.errors.new_piece
                  }
                  error={formik.touched.new_piece && formik.errors.new_piece}
                  required={true}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
                <SelectAutocomplete
                  fullWidth
                  label={"Preferred Time"}
                  type="text"
                  variant="standard"
                  name="preferred_time"
                  value={formik.values.preferred_time}
                  onChange={(e) => {
                    formik.setFieldValue("preferred_time", e);
                  }}
                  options={ReasonSelect(translate)}
                  inputLabelProps={{
                    shrink: true,
                  }}
                  helperText={
                    formik.touched.preferred_time &&
                    formik.errors.preferred_time
                  }
                  error={
                    formik.touched.preferred_time &&
                    formik.errors.preferred_time
                  }
                  required={true}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
                <Typography
                  sx={(theme) => ({
                    fontSize: theme.typography.typography14,
                    fontFamily: theme.fontFaces.helveticaNeueRegular,
                  })}
                >
                  We will pick up the item you wish to return from the shipping
                  address where it was
                </Typography>
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
                    "I confirm the product is un used with original tags intact"
                  }
                />
              </Grid>
              <Grid item md={3} sm={12} xs={12} xxs={12}>
                <Box>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      py: 1.8,
                      borderRadius: "0px",
                      color: (theme) => theme.palette.grey[2800],
                      border: (theme) =>
                        `1px solid ${theme.palette.grey[2100]}`,
                      "&:hover": {
                        border: (theme) =>
                          `1px solid ${theme.palette.grey[2100]}`,
                      },
                    }}
                  >
                    {translate("Cancel")}
                  </Button>
                </Box>
              </Grid>
              <Grid item md={3} sm={12} xs={12} xxs={12}>
                <Box>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      py: 1.8,
                      borderRadius: "0px",
                      color: (theme) => theme.palette.common.black,
                      background: (theme) => theme.palette.primary.light,
                      "&:hover": {
                        background: (theme) => theme.palette.primary.light,
                      },
                    }}
                    onClick={handleNext}
                  >
                    Proceed
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ReasonReturnForm;
