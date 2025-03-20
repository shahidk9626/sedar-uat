import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import PropTypes from "prop-types";
import MetModal from "../theMet/metModal";
import { useState } from "react";
import { useRouter } from "next/router";

const SamplePieces = ({ data = {} }) => {
  const [open, setOpen] = useState(false);
  const { t: translate } = useTranslation();
  const artModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const pathName = router?.pathname;
  console.log(router,'data of met page', data);
  
  return (
    <>
      <MetModal isOpen={isModalOpen} closeModal={closeModal} />

      <Box sx={{ backgroundColor: (theme) => theme.palette.grey[200], pb: 4, pt: 8 }}>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item md={6} sm={6} xs={12} xxs={12}>
              <Box>
                {/* <Typography
                  component="h1" 
                  dangerouslySetInnerHTML={{
                    __html: data?.PARENT?.CHILD[0]?.title,
                  }}
                  sx={(theme) => ({
                    "& h2": {
                      letterSpacing: 0,
                      ...theme.typography.typography31,
                      fontWeight: "normal",
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      color: theme.palette.dark.darker,
                      margin: "0px",
                      paddingTop: "0px!important",
                      paddingBottom: "0px!important",
                    },
                    "& h1": {
                      letterSpacing: 0,
                      ...theme.typography.typography41,
                      fontWeight: "normal",
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      color: theme.palette.dark.darker,
                      margin: "0px",
                    },
                    "& p": {
                      ...theme.typography.typography20,
                      pl: { lg: 4, md: 4, sm: 0, xs: 0, xxs: 0 },
                      pt: { lg: 4, md: 4, sm: 0, xs: 0, xxs: 0 },
                      letterSpacing: 1.1,
                      color: theme.palette.dark.darker,
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      marginBlockStart: "0px!important",
                      marginBlockEnd: "8px!important",
                      py: 7,
                    },
                  })}
                /> */}
                <Box component="h1">
                  {data?.PARENT?.CHILD[0]?.title}
                </Box>

              </Box>
            </Grid>
            <Grid item md={6} sm={6} xs={12} xxs={12}>
              {data?.PARENT?.CHILD.map((elem, index) => {
                return (
                  <Box key={`SIMPLPIECES-${index}`}>
                  <Typography
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: elem?.description,
                    }}
                    sx={(theme) => ({
                      "& h2": {
                        letterSpacing: 0,
                        ...theme.typography.typography31,
                        fontWeight: "normal",
                        color: theme.palette.dark.darker,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        marginBottom: "-60px",
                      },
                      "& p": {
                        ...theme.typography.typography20,
                        pl: { lg: 4, md: 4, sm: 0, xs: 0, xxs: 0 },
                        pt: { lg: 0, md: 0, sm: 0, xs: 0, xxs: 0 },
                        color: theme.palette.dark.darker,
                        letterSpacing: 1.1,
                        fontFamily: theme.fontFaces.helveticaNeueLight,
                        marginBlockStart: "0px!important",
                        marginBlockEnd: "8px!important",
                        py: 7,
                      },
                    })}
                  />
                  <Box sx={{ margin: { lg: 4, md: 4, sm: 0, xs: 0, xxs: 0 } }}>
                    <Button
                      size="large"
                      LinkComponent={NextLink}
                      sx={{
                        width: {
                          lg: "280px",
                          md: "280px",
                          sm: "100%",
                          xs: "100%",
                          xxs: "100%",
                        },
                        borderRadius: "0px",
                        py: 1.2,
                        fontFamily: (theme) => theme.fontFaces.helveticaNeueBold,
                        color: (theme) => theme.palette.dark.darker,
                        backgroundColor: (theme) => theme.palette.primary.lighter,
                        padding: "16px 5px",
                        fontSize: 15,
                        fontWeight: 200,
                        "&:hover": {
                          color: (theme) => theme.palette.common.white,
                        },
                      }}
                      color="warning"
                      variant="contained"
                      href={`/${elem?.link_url}`}
                    >
                      {elem?.link_title ? elem?.link_title : translate("ContactUs")}
                    </Button>
                

                    {pathName === "/the-met" && (
                      <Button
                        size="large"
                        LinkComponent={NextLink}
                        sx={{
                          width: {
                            lg: "280px",
                            md: "280px",
                            sm: "100%",
                            xs: "100%",
                            xxs: "100%",
                          },
                          ml: {
                            md: 1,
                          },
                          mt: {
                            xxs: 1,
                          },
                          mb: {
                            md: 1,
                          },
                          borderRadius: "0px",
                          py: 1.2,
                          fontFamily: (theme) => theme.fontFaces.helveticaNeueBold,
                          color: (theme) => theme.palette.dark.darker,
                          backgroundColor: (theme) => theme.palette.primary.lighter,
                          padding: "16px 5px",
                          fontSize: 15,
                          fontWeight: 200,
                          "&:hover": {
                            color: (theme) => theme.palette.common.white,
                          },
                        }}
                        color="warning"
                        variant="contained"
                        onClick={artModal}
                      >
                        {elem?.link_title ? elem?.link_title : translate("BrowseCollections")}
                      </Button>
                    )}
                  </Box>
                </Box>
                
                );
              })}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

SamplePieces.propTypes = {
  data: PropTypes.object,
};

export default SamplePieces;
