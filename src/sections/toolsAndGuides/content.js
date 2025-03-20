import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import {
  ToolsAndGuidesButton,
  ToolsAndGuidesHeading,
} from "@/styles/toolsAndGuides";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import ScrollInto from "react-scroll-into-view";

const Content = ({ data = {} }) => {
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: (theme) => theme.palette.common.white,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} py={5}>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <Box>
              <ToolsAndGuidesHeading
                component="div"
                dangerouslySetInnerHTML={{
                  __html: data?.PARENT?.description,
                }}
              />
            </Box>
            <Box mt={3} sx={{ pl: { lg: 3, md: 3, sm: 0, xs: 0, xxs: 0 } }}>
              <ScrollInto selector="#scrollConsultation">
                <ToolsAndGuidesButton
                  variant="contained"
                  color="warning"
                  sx={{
                    px: { md: "3rem", sm: "2.5rem", xs: "2rem", xxs: "2rem" },
                    py: "0.82rem",
                    maxWidth: {
                      lg: "300px!important",
                      md: "300px!important",
                      sm: "500px!important",
                      xs: "500px!important",
                      xxs: "500px!important",
                    },
                    width: "100%",
                  }}
                >
                  {data?.PARENT?.link_title}
                </ToolsAndGuidesButton>
              </ScrollInto>
            </Box>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            xxs={12}
            sx={{ paddingTop: { xs: "0", sm: "25px", md: "25px", lg: "25px" } }}
          >
            <NextLazyLoadImage
              src={data?.PARENT?.image_path}
              alt={data?.PARENT?.image_path}
              width={594}
              height={511}
              sx={{
                width: "100%!important",
                height: "100%!important",
                objectFit: "cover!important",
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
              objectFit="contain"
              upLgWidth={594}
              downLgWidth={594}
              downMdWidth={594}
              downSmWidth={790}
              downXsWidth={514}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

Content.propTypes = {
  data: PropTypes.object,
};

export default Content;
