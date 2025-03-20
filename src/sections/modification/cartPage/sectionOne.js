import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
const SectionOne = () => {
  const { t: translate } = useTranslation();
  return (
    <Box
      display={{
        lg: "block",
        md: "block",
        sm: "none",
        xs: "none",
        xxs: "none",
      }}
      sx={(theme) => ({
        backgroundColor: theme.palette.grey[3500],
        p: 1,
      })}
    >
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography
            sx={(theme) => ({
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              fontSize: 14,
              color: "common.black",
            })}
          >
            {translate("Product")}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  fontSize: 14,
                  color: "common.black",
                })}
              >
                {translate("Price")}
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  fontSize: 14,
                  color: "common.black",
                })}
              >
                {translate("QUANTITY")}
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  fontSize: 14,
                  color: "common.black",
                })}
              >
                {translate("Total")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SectionOne;
