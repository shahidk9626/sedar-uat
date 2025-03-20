import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import SnackbarProvider from "@/components/snackbar";
import { AboutMediaDate, AboutMediaDetails } from "@/styles/about";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import { useState } from "react";
import ProjectForm from "../homepage/secondary/projects/projectForm";



const AboutMedia = ({ data = {} }) => {
  const { t: translate } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpenClose = () => setOpen(!open);

  return (
    <Box sx={{ backgroundColor: "#f5ece0" }}>
      <Container maxWidth="xl">
        <Box
          sx={(theme) => ({
            backgroundImage: "url(/assets/about/halfcircle.png)",
            position: "relative",
            backgroundRepeat: "no-repeat",
            backgroundPositionX: (theme.direction == 'rtl' ? 'left' : "right"),
            backgroundAttachment: "fixed",
          })}
        >
          <Grid container py={5} sx={{ pb: { md: 0, sm: 0, xs: 4, xxs: 4 } }}>
            <Grid item md={6} sm={8} xs={12} xxs={12}>
              <Box pl={0}>
                <Typography
                  component="h2"
                  typography="typography40"
                  fontWeight={200}
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                  sx={(theme) => ({
                    borderLeft: `2.5px solid ${theme.palette.primary.light}`,
                    color: "common.black",
                    pl: 3,
                  })}
                >
                  {data?.PARENT?.CHILD[1]?.title}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={6} sm={4} xs={0} xxs={0}>
              <Box
                sx={{
                  display: { md: "block", sm: "none", xs: "none", xxs: "none" },
                }}
                pr={8}
              >
                <CustomLink link={data?.PARENT?.CHILD[1]?.link_url}>
                  <Typography
                    component="h6"
                    textAlign="right"
                    fontSize={15}
                    fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                    sx={(theme) => ({
                      borderBottom: `2px solid ${theme.palette.primary.light}`,
                      float: "right",
                      position: "relative",
                      zIndex: 1,
                    })}
                  >
                    {translate("MoreStories")}
                  </Typography>
                </CustomLink>
              </Box>
            </Grid>
          </Grid>

          <Grid
            container
            pb={{ lg: 10, md: 10, sm: 0, xs: 0, xxs: 0 }}
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            {data?.PARENT?.CHILD[1]?.SUB_CHILD?.map((elem, index) => (
              <Grid item md={6} sm={6} xs={6} key={`ABOUT_MAG-${index}`}>
                <Box
                  width={{
                    lg: "100%",
                    md: "100%",
                    sm: "100%",
                    xs: "100%",
                    xxs: "100%",
                  }}
                >
                  <CustomLink link={"#"}>
                    <NextLazyLoadImage
                      src={elem?.image_path}
                      alt="cdsaas"
                      width={675}
                      height={435}
                      placeholder="blur"
                      loading="eager"
                      sx={{
                        backgroundSize: "contain",
                        objectFit: "contain!important",
                        borderRadius: 0,
                        boxShadow: "none",
                        position: "relative!important",
                        width: "100%!important",
                        height: "100%!important",
                      }}
                      upLgWidth={675}
                      downLgWidth={675}
                      downMdWidth={675}
                      downSmWidth={389}
                      downXsWidth={529}
                      sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                    />
                  </CustomLink>
                </Box>
                <Box mt={3}>
                  <AboutMediaDetails
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: elem?.description,
                    }}
                  />
                </Box>
                <Box>
                  <AboutMediaDate
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: elem?.title,
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Collapse in={open}>
        <Box id="StartProjectForm">
          <SnackbarProvider>
            <ProjectForm handleOpenClose={handleOpenClose} />
          </SnackbarProvider>
        </Box>
      </Collapse>
    </Box>
  );
};

AboutMedia.propTypes = {
  data: PropTypes.object,
};

export default AboutMedia;
