import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { FranchiseRealityContent } from "@/styles/franchise";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import RealtySwiper from "./mobile_component/realtySwiper";

const Realty = ({ data = {} }) => {
  return (
    <Box py={10}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {data?.PARENT?.CHILD?.map((elem, index) => {
            return !index % 2 ? (
              <Grid
                key={`FRANCHISE_SLIDER-${index}`}
                item
                lg={6}
                md={6}
                sm={12}
                xs={12}
                xxs={12}
                sx={{
                  display: {
                    lg: "block",
                    md: "block",
                    sm: "none",
                    xs: "none",
                    xxs: "none",
                  },
                  borderRight: (theme) =>
                    `2px solid ${theme.palette.grey[300]}`,
                  paddingRight: "50px",
                }}
              >
                <Box>
                  <NextLazyLoadImage
                    src={elem?.image_path}
                    alt={elem?.image_path}
                    width={640}
                    height={395}
                    sx={{
                      width: "100%!important",
                      height: "100%!important",
                      objectFit: "cover!important",
                    }}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                    objectFit="contain"
                    upLgWidth={640}
                    downLgWidth={640}
                    downMdWidth={640}
                    downSmWidth={640}
                    downXsWidth={640}
                  />
                </Box>
                <Box mt={4}>
                  <FranchiseRealityContent
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: elem?.description,
                    }}
                  />
                </Box>
              </Grid>
            ) : (
              <Grid
                key={`FRANCHISE_SLIDERS-${index}`}
                item
                lg={6}
                md={6}
                sm={12}
                xs={12}
                xxs={12}
                sx={{
                  display: {
                    lg: "block",
                    md: "block",
                    sm: "none",
                    xs: "none",
                    xxs: "none",
                  },
                }}
              >
                <Box>
                  <FranchiseRealityContent
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: elem?.description,
                    }}
                  />
                </Box>
                <Box>
                  <NextLazyLoadImage
                    src={elem?.image_path}
                    alt={elem?.image_path}
                    width={796}
                    height={395}
                    sx={{
                      width: "100%!important",
                      height: "100%!important",
                      objectFit: "cover!important",
                    }}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                    objectFit="contain"
                    upLgWidth={796}
                    downLgWidth={796}
                    downMdWidth={796}
                    downSmWidth={796}
                    downXsWidth={796}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
        <Box
          sx={{
            display: {
              lg: "none",
              md: "none",
              sm: "block",
              xs: "block",
              xxs: "block",
            },
          }}
        >
          <RealtySwiper data={data?.PARENT?.CHILD} />
        </Box>
      </Container>
    </Box>
  );
};

Realty.propTypes = {
  data: PropTypes.object,
};

export default Realty;
