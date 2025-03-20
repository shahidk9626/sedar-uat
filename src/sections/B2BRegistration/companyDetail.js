import { TextBox } from "@/components/form";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

const businessLineOptions = ["curtains", "blinds", "wallpaper"];

const CompanyDetail = ({ formik = {}, fieldRefs }) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("NoofBranches")}
            type="text"
            variant="standard"
            name="no_of_branch"
            inputRef={fieldRefs.no_of_branch}
            value={formik.values.no_of_branch}
            onChange={formik.handleChange}
            helperText={
              formik.touched.no_of_branch && formik.errors.no_of_branch
            }
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("NoofStaff")}
            type="text"
            variant="standard"
            name="no_of_staff"
            inputRef={fieldRefs.no_of_staff}
            value={formik.values.no_of_staff}
            onChange={formik.handleChange}
            helperText={formik.touched.no_of_staff && formik.errors.no_of_staff}
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <TextBox
            fullWidth
            label={translate("NoofRunningTheBusiness")}
            type="text"
            variant="standard"
            name="years_in_business"
            inputRef={fieldRefs.years_in_business}
            value={formik.values.years_in_business}
            onChange={formik.handleChange}
            helperText={
              formik.touched.years_in_business &&
              formik.errors.years_in_business
            }
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
          <Typography
            sx={(theme) => ({
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              fontSize: "16px",
              color: theme.palette.common.black,
            })}
          >
            Business Line
          </Typography>
          {businessLineOptions.map((option) => {
            return (
              <>
                <FormControlLabel
                  sx={{ mr: 5 }}
                  control={
                    <Checkbox
                      inputRef={fieldRefs.business_line}
                      value={
                        formik.values.business_line &&
                        formik.values.business_line.includes(option)
                      }
                      checked={
                        formik.values.business_line &&
                        formik.values.business_line.includes(option)
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          formik.setFieldValue("business_line", [
                            ...formik.values.business_line,
                            option,
                          ]);
                        } else {
                          formik.setFieldValue(
                            "business_line",
                            formik.values.business_line.filter(
                              (v) => v != option
                            )
                          );
                        }
                      }}
                      name="business_line"
                      helperText={
                        formik.touched.business_line &&
                        formik.errors.business_line
                      }
                    />
                  }
                  label={
                    <Typography
                      sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeue,
                        fontSize: "15px",
                        color: theme.palette.common.black,
                        textTransform: "capitalize",
                      })}
                    >
                      {option}
                    </Typography>
                  }
                />
              </>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

CompanyDetail.propTypes = {
  formik: PropTypes.object,
};

export default CompanyDetail;
