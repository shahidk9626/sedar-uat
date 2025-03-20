import Iconify from "@/components/iconify";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const CustomSwiperArrow = ({ children }) => {
  return (
    <Grid
      container
      alignItems="center"
      columnSpacing={{ md: 4, sm: 4, xs: 0, xxs: 0 }}
    >
      <Grid item md={1} sm={2} xs={12} xxs={12}>
        <Box
          component="div"
          sx={{
            position: "relative",
            width: "100%",
            zIndex: 10,
            cursor: "pointer",
            textAlign: "center",
          }}
          id="relatedStoriesPrev"
        >
          <Iconify width={50} icon="cil:arrow-left" />
        </Box>
      </Grid>
      <Grid item md={10} sm={8} xs={12} xxs={12}>
        {children}
      </Grid>
      <Grid item md={1} sm={2} xs={12} xxs={12}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            zIndex: 10,
            cursor: "pointer",
            textAlign: "center",
          }}
          id="relatedStoriesNext"
          component="div"
        >
          <Iconify width={50} icon="cil:arrow-right" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CustomSwiperArrow;
