import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import {
  QuickQuestionsButton,
  QuickQuestionsCardContent,
  QuickQuestionsTitle,
} from "@/styles/contact";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import PropTypes from "prop-types";

const QuickContactSection = ({ data = {} }) => {

  return (
    <section>
      <Container sx={{ pt: 5 }}>
        <Grid container textAlign="center" justifyContent="center">
          {data?.PARENT && data?.PARENT?.CHILD && (
            <Grid item md={12} xs={12} xxs={12} sm={12}>
              <Typography
                component={"div"}
                dangerouslySetInnerHTML={{
                  __html: data?.PARENT?.description,
                }}
                sx={(theme) => ({
                  "& h2": {
                    letterSpacing: 0,
                    ...theme.typography.typography49,
                    fontWeight: "normal",
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    marginBottom: "0px",
                    color: theme.palette.common.black,
                  },
                  "& h1": {
                    letterSpacing: 0,
                    ...theme.typography.typography39,
                    fontWeight: "normal",
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    marginBottom: "0px",
                    color: theme.palette.common.black,
                  },
                  "& p": {
                    ...theme.typography.typography24,
                    letterSpacing: 1,
                    mb: 0,
                    fontWeight: 400,
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    marginBlockStart: "8px!important",
                    marginBlockEnd: "8px!important",
                    color: "common.black",
                  },
                })}
              />
            </Grid>
          )}
        </Grid>
      </Container>
      <Container sx={{ pt: 5, pb: 4 }} maxWidth="xl">
        <Grid container spacing={{ md: 3, sm: 2, xs: 1, xxs: 1 }}>
          {data?.PARENT &&
            data?.PARENT?.CHILD?.map((item, index) => {
              return (
                <Grid item lg={3} md={6} sm={6} xs={6} xxs={6} key={index}>
                  <Card
                    sx={{
                      pt: { lg: 6, md: 6, sm: 0, xs: 0, xxs: 0 },
                      pb: 4,
                      background: (theme) =>
                        theme.palette.contact_multi_color[index],
                      borderRadius: "0px!important",
                      height: "100%",
                      "&:hover": {
                        transition: "transform 0.15s ease-in-out",
                        transform: "scale3d(1.05, 1.05, 1)",
                      },
                    }}
                  >
                    <QuickQuestionsCardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          margin: "auto",
                          height: "100%",
                        }}
                      >
                        <NextLazyLoadImage
                          src={item?.image_path}
                          alt="contactImage"
                          width={169}
                          height={152}
                          sx={{
                            width: "100%!important",
                            height: "100%!important",
                            objectFit: "contain!important",
                          }}
                          sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                          objectFit="contain"
                          upLgWidth={169}
                          downLgWidth={169}
                          downMdWidth={169}
                          downSmWidth={130}
                          downXsWidth={130}
                        />
                      </Box>
                      <QuickQuestionsTitle
                        variant="typography23"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueBold
                        }
                        component="h5"
                        color="common.black"
                      >
                        {item?.title}
                      </QuickQuestionsTitle>
                      {item?.SUB_CHILD && item?.SUB_CHILD?.length > 0 ? (
                        <Box>
                          <Stack
                            direction="row"
                            spacing={{ md: 2, sm: 2, xs: 0, xxs: 0 }}
                            justifyContent="center"
                          >
                            {item?.SUB_CHILD.map((subItem, subIndex) => {
                              return (
                                <Box
                                  key={`SOCIAL_ICON-${subIndex}`}
                                  sx={{
                                    color: (theme) =>
                                      theme.palette.common.black,
                                    width: {
                                      lg: "100%",
                                      md: "100%",
                                      sm: "100%",
                                      xs: "100%",
                                      xxs: "100%",
                                    },
                                  }}
                                  alignContent="center"
                                  textAlign="center"
                                >
                                  <CustomLink
                                    link={subItem?.link_url}
                                    target="_blank"
                                  >
                                    <NextLazyLoadImage
                                      src={subItem?.image_path}
                                      alt="social-icon"
                                      width={21}
                                      height={21}
                                      sx={{
                                        width: {
                                          lg: "20px!important",
                                          md: "20px!important",
                                          sm: "15px!important",
                                          xs: "15px!important",
                                          xxs: "15px!important",
                                        },
                                        height: "auto!important",
                                        objectFit: "cover!important",
                                      }}
                                      sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                                      objectFit="contain"
                                      upLgWidth={20}
                                      downLgWidth={20}
                                      downMdWidth={20}
                                      downSmWidth={20}
                                      downXsWidth={20}
                                    />
                                  </CustomLink>
                                </Box>
                              );
                            })}
                          </Stack>
                        </Box>
                      ) : (
                        <Box sx={{ width: "100%" }}>
                          <Link href={item?.link_url}>
                            <QuickQuestionsButton
                              fullWidth
                              variant="contained"
                              sx={{
                                px: {
                                  md: "3rem",
                                  sm: "2.5rem",
                                  xs: "1.4px",
                                  xxs: "1.4px",
                                },
                                py: "0.70rem",
                              }}
                            >
                              {item?.link_title}
                            </QuickQuestionsButton>
                          </Link>
                        </Box>
                      )}
                    </QuickQuestionsCardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </section>
  );
};

QuickContactSection.propTypes = {
  data: PropTypes.object,
};

export default QuickContactSection;
