import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import ScrollInto from "react-scroll-into-view";
import PartnerConnect from "./partnerConnect";

const AboutHomeAutomation = ({ data = {} }) => {
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={{ lg: 0, md: 0, sm: 10, xs: 10, xxs: 10 }}
        justifyContent={"space-around"}
        pt={{ lg: 10, md: 10, sm: 5, xs: 5, xxs: 5 }}
      >
        <Grid
          item
          lg={6}
          md={6}
          sm={12}
          xs={12}
          xxs={12}
          mt={{ lg: 10, md: 10, sm: 0, xs: 0, xxs: 0 }}
        >
          <Box>
            <Typography
              component="div"
              dangerouslySetInnerHTML={{
                __html: data?.PARENT?.CHILD?.[0]?.description,
              }}
              sx={(theme) => ({
                mb: 8,
                "& h2": {
                  pl: 2,
                  letterSpacing: 0,
                  fontWeight: "normal",
                  ...theme.typography.typography43,
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  borderLeft: `2px solid ${theme.palette.primary.light}`,
                  color: theme.palette.common.black,
                },
                "& p": {
                  pl: 2,
                  ...theme.typography.typography45,
                  letterSpacing: 0.5,
                  fontWeight: 200,
                  lineHeight: 1.8,
                  fontFamily: theme.fontFaces.helveticaNeueLight,
                  marginBlockStart: "8px!important",
                  marginBlockEnd: "8px!important",
                  color: theme.palette.common.black,
                },
              })}
            />

            <Box pl={{ lg: 2, md: 2, sm: 0, xs: 0, xxs: 0 }}>
              <ScrollInto selector="#homeAutomationForm">
                <Button
                  onClick={() => router.push(`${data?.link_url}`)}
                  variant="contained"
                  color="warning"
                  sx={(theme) => ({
                    py: 1.8,
                    borderRadius: "0",
                    px: 2,
                    width: { lg: "52%", md: "45%", xs: "100%", xxs: "100%" },
                    fontFamily: theme.fontFaces.helveticaNeueBold,
                    ...theme.typography.typography15,
                    color: theme.palette.common.black,
                    backgroundColor: theme.palette.primary.lighter,
                    ":hover": {
                      color: theme.palette.common.white,
                    }
                  })}
                >
                  {data?.PARENT?.CHILD?.[0]?.link_title}
                </Button>
              </ScrollInto>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12} xxs={12}>
          <NextLazyLoadImage
            src={data?.PARENT?.CHILD?.[0]?.image_path}
            alt={data?.PARENT?.CHILD?.[0]?.image_path}
            width={407}
            height={509}
            sx={{
              width: "100%!important",
              height: "100%!important",
              objectFit: "cover!important",
            }}
            sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
            objectFit="contain"
            upLgWidth={407}
            downLgWidth={407}
            downMdWidth={407}
            downSmWidth={822}
            downXsWidth={526}
          />
        </Grid>
      </Grid>
      {/* <PartnerConnect data={data} /> */}
    </Container>
  );
};

AboutHomeAutomation.propTypes = {
  data: PropTypes.object,
};


export default AboutHomeAutomation;
