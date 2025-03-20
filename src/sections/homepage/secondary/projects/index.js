/* eslint-disable jsx-a11y/alt-text */
import Iconify from "@/components/iconify";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import SnackbarProvider from "@/components/snackbar";
import useResponsive from "@/hooks/useResponsive";
import AboutMedia from "@/sections/about/aboutMedia";
import {
  ProjectBoxBackground,
  ProjectTitle,
  StartProjectTitle,
} from "@/styles/homepage/projects";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import React ,{useMemo} from "react";
import ScrollInto from "react-scroll-into-view";
import ProjectForm from "./projectForm";

const Projects = ({ data = {}, isLanding }) => {
  const isMdDown = useResponsive("down", "md");
  const { t: translate } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const maxLength = isMdDown ? 100 : 600;
  const description =
    data?.PARENT?.CHILD?.[0]?.description || data?.PARENT?.description;

  const handleOpenClose = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.lightPink,
        ...(isLanding && {
          height: { md: "auto", sm: "100dvh", xs: "100dvh", xxs: "100dvh" },
        }),
      }}
    >
      <ProjectBoxBackground
        sx={{ py: isLanding ? 8 : "4rem", px: isLanding ? "3.2rem" : "10rem" }}
      >
        <Grid container spacing={4}>
          <Grid item lg={6.5} md={6} sm={12} xs={12} xxs={12}>
            <Box mt={isLanding ? 10 : 0}>
              <NextLazyLoadImage
                src={
                  data?.PARENT?.image_path ||
                  data?.PARENT?.CHILD?.[0]?.image_path
                }
                alt={data?.PARENT?.title}
                width="631"
                height="479"
                sx={{
                  maxWidth: "100%!important",
                  width: "100%!important",
                  height: "100%!important",
                  objectFit: "cover",
                  backgroundSize: "cover",
                }}
                sizes="(min-width: 0px) and (max-width: 1920px) 80vw"
                objectFit="cover"
                upLgWidth={600}
                downLgWidth={500}
                downMdWidth={240}
                downSmWidth={400}
                downXsWidth={300}
              />
            </Box>
          </Grid>
          <Grid
            item
            lg={5.5}
            md={6}
            sm={6}
            xs={12}
            xxs={12}
            sx={{ position: "relative" }}
          >
            <Stack spacing={isLanding ? 2 : 4}>
              <ProjectTitle component="h3" variant="typography14">
                {data?.PARENT?.title}
              </ProjectTitle>
              <Typography
                component="h4"
                variant="typography7"
                fontWeight={500}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                letterSpacing={0.5}
                color="common.black"
                mt={2}
                dangerouslySetInnerHTML={{
                  __html: data?.PARENT?.CHILD?.[0]?.title,
                }}
              />
              <Typography
                component="div"
                variant="typography18"
                letterSpacing={1}
                dangerouslySetInnerHTML={{
                  __html:
                    typeof description === "string"
                      ? description?.length > maxLength
                        ? `${description.slice(0, maxLength)}...`
                        : description
                      : "",
                }}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                color="common.black"
                mt={0}
                sx={{
                  "& p": {
                    marginBlockStart: "0rem!important",
                    marginBlockEnd: "0rem!important",
                    fontSize: "18px",
                  },
                }}
              />
              {isLanding && (
                <Typography
                  component="span"
                  variant="typography16"
                  onClick={() => {
                    setShow(!show);
                  }}
                  display="inline-block"
                  sx={{
                    fontFamily: (theme) => theme.fontFaces.helveticaNeueMedium,
                    cursor: "pointer",
                    textDecoration: "underline",
                    letterSpacing: 0.5,
                    color: (theme) => theme.palette.primary.main,
                    ":after": {
                      content: "''",
                      display: "block",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  {translate("ReadMore")}
                </Typography>
              )}

              <ScrollInto selector="#StartProjectContract">
                <StartProjectTitle
                  component="p"
                  variant="typography15"
                  onClick={handleOpenClose}
                  mt={0}
                >
                  {data?.PARENT?.CHILD?.[0]?.link_title}
                </StartProjectTitle>
              </ScrollInto>
            </Stack>
          </Grid>
        </Grid>
      </ProjectBoxBackground>
      {data?.PARENT?.CHILD?.[1] && <AboutMedia data={data} />}
      <Box id="StartProjectContract">
        {open &&
          <Collapse in={open}>
            <SnackbarProvider>
              <ProjectForm open={open} handleOpenClose={handleClose} />
            </SnackbarProvider>
          </Collapse>
        }
      </Box>
      <Dialog
        open={show}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" sx={{ textAlign: "right" }}>
          <IconButton
            size="small"
            sx={{
              borderRadius: "50%",
            }}
            onClick={() => {
              setShow(false);
            }}
          >
            <Iconify icon="gridicons:cross" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={true}>
          <Typography
            component="div"
            variant="typography18"
            letterSpacing={1}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
            fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
            color="common.black"
            mt={5}
            sx={{
              "& p": {
                marginBlockStart: "0rem!important",
                marginBlockEnd: "0rem!important",
                fontSize: "18px",
              },
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

Projects.propTypes = {
  data: PropTypes.object,
};

export default React.memo(Projects);
