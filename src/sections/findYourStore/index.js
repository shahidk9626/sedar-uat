import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { useRef } from "react";
import FindYourStoreHeading from "./heading";
import StoreMap from "./map";
import Stores from "./stores";

const FindYourStoreSection = ({ data = {} }) => {
  const mapRef = useRef(null);

  const scrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Box
      component="div"
      sx={(theme) => ({
        padding: "50px 0",
        pt: { sm: 0, xs: 0, xxs: 0 },
        background: theme.palette.grey[2900],
      })}
    >
      <Container maxWidth="xl">
        <FindYourStoreHeading description={data} />
        <Grid
          container
          spacing={3}
          sx={{
            flexDirection: {
              lg: "row",
              md: "row",
              sm: "row",
              xs: "column-reverse",
              xxs: "column-reverse",
            },
          }}
        >
          <Grid item lg={3} md={4} sm={4} xs={12} xxs={12}>
            <Stores scrollToMap={scrollToMap} />
          </Grid>
          <Grid item lg={9} md={8} sm={8} xs={12} xxs={12}>
            <Box component="div" ref={mapRef}>
              <StoreMap />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

FindYourStoreSection.propTypes = {
  data: PropTypes.object,
};

export default FindYourStoreSection;
