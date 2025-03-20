import { TextBox } from "@/components/form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const ChangePasswordFormSection = ({ formik }) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <>
      <Container maxWidth="xl">
        <Box my={2} sx={{ width: "100%", typography: "body1" }}>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={8} sm={8} xs={12} xxs={12}>
                <TextBox
                  fullWidth
                  label={translate("OldPassword")}
                  type="password"
                  variant="standard"
                  name="current_password"
                  value={formik.values.current_password}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.current_password &&
                    formik.errors.current_password
                  }
                />
              </Grid>
              <Grid item md={8} sm={8} xs={12} xxs={12}>
                <TextBox
                  fullWidth
                  label={translate("NewPassword")}
                  type="password"
                  variant="standard"
                  name="new_password"
                  value={formik.values.new_password}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.new_password && formik.errors.new_password
                  }
                  bottomTextSx={{
                    fontFamily: (theme) => theme.fontFaces.helveticaNeue,
                    fontSize: "12px",
                    color: (theme) => theme.palette.grey[5200],
                  }}
                  bottomText="8 Characters, 1 Special, 1 Uppercase, 1 Numeric"
                  required
                />
              </Grid>
              <Grid item md={8} sm={8} xs={12} xxs={12}>
                <TextBox
                  fullWidth
                  label={translate("Confirmpassword")}
                  type="password"
                  variant="standard"
                  name="confirm_password"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password
                  }
                  required
                />
              </Grid>
            </Grid>
            <Stack
              direction={{
                lg: "row",
                md: "row",
                sm: "row",
                xs: "row",
                xxs: "column",
              }}
              spacing={4}
              pl={2}
              my={4}
              width={"100%"}
            >
              <Button
                variant="outlined"
                fullWidth
                sx={(theme) => ({
                  ...theme.typography.typography16,
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                  maxWidth: {
                    lg: "35%",
                    md: "35%",
                    sm: "35%",
                    xs: "35%",
                    xxs: "90%",
                  },
                  width: "100%",
                  py: 1.8,
                  borderRadius: "0px",
                  color: (theme) => theme.palette.common.black,
                  border: (theme) => `1px solid ${theme.palette.common.black}`,
                  "&:hover": {
                    border: (theme) =>
                      `1px solid ${theme.palette.common.black}`,
                  },
                })}
                onClick={() =>
                  router.push("/dashboard/profile/account-setting")
                }
              >
                {translate("Cancel")}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                type="submit"
                sx={(theme) => ({
                  ...theme.typography.typography16,
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                  maxWidth: {
                    lg: "35%",
                    md: "35%",
                    sm: "35%",
                    xs: "35%",
                    xxs: "90%",
                  },
                  width: "100%",
                  py: 1.8,
                  borderRadius: "0px",
                  color: (theme) => theme.palette.common.black,
                  backgroundColor: (theme) => theme.palette.primary.light,
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.light,
                  },
                })}
              >
                {translate("Update")}
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default ChangePasswordFormSection;
