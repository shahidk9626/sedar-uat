import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const Strength = ({ data = {} }) => {
  const router = useRouter();

  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "10%" }}>
        <Box>
          <Typography
            component="div"
            variant="typography18"
            dangerouslySetInnerHTML={{
              __html: data?.PARENT?.description,
            }}
            sx={(theme) => ({
              mb: 8,
              "& h2": {
                letterSpacing: 0,
                ...theme.typography.typography32,
                fontWeight: theme.typography.fontWeightLight,
                textAlign: "center",
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                lineHeight: 1.3,
                color: theme.palette.common.black
              },
              "& p": {
                ...theme.typography.typography17,
                fontFamily: theme.fontFaces.helveticaNeueLight,
                letterSpacing: 0.5,
                fontWeight: 200,
                textAlign: "center",
                color: theme.palette.common.black,
                marginBlockStart: "8px!important",
                marginBlockEnd: "8px!important",
              },
            })}
          />
        </Box>

        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: {
              lg: "center",
              md: "center",
              sm: "start",
              xs: "start",
              xxs: "start",
            },
          }}
        >
          {data?.PARENT?.CHILD[0]?.SUB_CHILD?.map((item, index) => (
            <Grid
              item
              lg={2}
              md={2}
              sm={4}
              xs={4}
              xxs={4}
              key={`STRENGTH-OF-SEDAR-${index}`}
              textAlign="-webkit-center"
            >
              <Box>
                <NextLazyLoadImage
                  src={item?.image_path}
                  alt="home"
                  width={73}
                  height={80}
                  sx={{
                    width: "40%!important",
                    height: "80px!important",
                    objectFit: "scale-down!important",
                  }}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                  objectFit="contain"
                  upLgWidth={73}
                  downLgWidth={73}
                  downMdWidth={73}
                  downSmWidth={104}
                  downXsWidth={64}
                />
              </Box>
              {data?.PARENT?.link_title &&
                <Box>
                  <Typography
                    component="h3"
                    sx={(theme) => ({
                      ...theme.typography.typography19,
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      letterSpacing: 0,
                      textAlign: "center",
                      color: theme.palette.common.black,
                      pt: 2
                    })}
                  >
                    {item?.title}
                  </Typography>
                </Box>
              }
            </Grid>
          ))}
        </Grid>
        {data?.PARENT?.link_title &&

          <Box mt={8} textAlign={"center"}>
            <Button
              onClick={() => router.push(`${data?.PARENT?.link_url}`)}
              variant="contained"
              color="warning"
              sx={(theme) => ({
                py: 1.8,
                borderRadius: "0",
                px: 2,
                width: { lg: "22%", md: "22%", xs: "100%", xxs: "100%" },
                ...theme.typography.typography15,
                fontFamily: theme.fontFaces.helveticaNeueBold,
                color: theme.palette.common.black,
                backgroundColor: theme.palette.primary.lighter,
                ":hover": {
                  color: theme.palette.common.white,
                }
              })}
            >
              {data?.PARENT?.link_title}
            </Button>
          </Box>
        }
      </Container>
      <Box mt={5}></Box>
    </>
  );
};

Strength.propTypes = {
  data: PropTypes.object,
};


export default Strength;
