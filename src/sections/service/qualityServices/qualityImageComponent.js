import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const QualityImageComponent = ({
  title = "",
  image_path = "/assets/loading_image/lazyLoadImage.svg",
  description = "",
  direction = "",
  artModal,
  buttonLabel,
  url
}) => {
  const { t: translate } = useTranslation();
  const { pathname } = useRouter();
  return (
    <Grid
      container
      direction={direction}
      alignItems="center"
      spacing={4}
    >
      <Grid item md={6} sm={6} xs={12} xxs={12}>
        <NextLazyLoadImage
          src={image_path ?? "/assets/loading_image/lazyLoadImage.svg"}
          alt="qualityServiceImage"
          width={594}
          height={479}
          sx={{
            width: "100%!important",
            height: "100%!important",
            objectFit: "cover!important",
            marginTop:"20px"

          }}
          sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
          objectFit="contain"
          upLgWidth={594}
          downLgWidth={594}
          downMdWidth={594}
          downSmWidth={387}
          downXsWidth={522}
        />
      </Grid>
      <Grid item md={6} sm={6} xs={12} xxs={12}>
        <Box>
          <Typography
            component="div"
            sx={(theme) => ({
              letterSpacing: 0,
              ...theme.typography.typography32,
              fontWeight: "normal",
              color: theme.palette.dark.darker,
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              mb: 0,
            })}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography
            component="div"
            dangerouslySetInnerHTML={{ __html: description }}
            sx={(theme) => ({
              "& h2": {
                letterSpacing: 0,
                ...theme.typography.typography32,
                fontWeight: "normal",
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                mb: 0,
              },
              "& p": {
                ...theme.typography.typography45,
                pl: { lg: 4, md: 4, sm: 0, xs: 0, xxs: 0 },
                pt: { lg: 4, md: 4, sm: 0, xs: 0, xxs: 0 },
                letterSpacing: 1.1,
                padding: "28.8px",
                m: 0,
                color: theme.palette.dark.darker,
                fontFamily: theme.fontFaces.helveticaNeueLight,
              },
            })}
          />

          {pathname === '/the-met' && (
            <>
              {url === '/blinds-shades/the-met-blinds' ? (
                <Button
                  size="large"
                  sx={{
                    width: {
                      lg: "40%",
                      md: "40%",
                      sm: "100%",
                      xs: "100%",
                      xxs: "100%",
                    },
                    borderRadius: "0px",
                    py: 1.2,
                    ml: {
                      lg: 4,
                      md: 4,
                      sm: 0,
                      xs: 0,
                      xxs: 0,
                    },
                    mb: {
                      lg: 0,
                      md: 2,
                      sm: 2,
                      xs: 2,
                      xxs: 2,
                    },
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
                >
                  <Link
                    variant="contained"
                    fullWidth
                    href={`${url}`}
                    sx={(theme) => ({
                      py: { md: 2, sm: 1, xs: 0, xxs: 0 },
                      px: { md: 2, sm: 1, xs: 0, xxs: 0 },
                      borderRadius: "0px",
                      fontSize: "15.4px",
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      fontWeight: 400,
                      color: theme.palette.dark.darker,
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "transparent",
                        textDecoration: "none",
                      },
                      width: "100%",
                    })}
                  >
                    {buttonLabel}
                  </Link>
                </Button>
              ) : (
                <Button
                  size="large"
                  onClick={artModal}
                  sx={{
                    width: {
                      lg: "40%",
                      md: "40%",
                      sm: "100%",
                      xs: "100%",
                      xxs: "100%",
                    },
                    borderRadius: "0px",
                    py: 1.2,
                    ml: {
                      lg: 4,
                      md: 4,
                      sm: 0,
                      xs: 0,
                      xxs: 0,
                    },
                    mb: {
                      lg: 0,
                      md: 2,
                      sm: 2,
                      xs: 2,
                      xxs: 2,
                    },
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
                >
                  {buttonLabel}
                </Button>
              )}

              <Button
                size="large"
                sx={{
                  width: {
                    lg: "40%",
                    md: "40%",
                    sm: "100%",
                    xs: "100%",
                    xxs: "100%",
                  },
                  borderRadius: "0px",
                  py: 1.2,
                  ml: {
                    lg: 4,
                    md: 4,
                    sm: 0,
                    xs: 0,
                    xxs: 0,
                  },
                  mb: {
                    lg: 0,
                    md: 2,
                    sm: 2,
                    xs: 2,
                    xxs: 2,
                  },
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
              >
                <Link
                  variant="contained"
                  fullWidth
                  href={`${url}`}
                  sx={(theme) => ({
                    py: { md: 2, sm: 1, xs: 0, xxs: 0 },
                    px: { md: 2, sm: 1, xs: 0, xxs: 0 },
                    borderRadius: "0px",
                    fontSize: "15.4px",
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontWeight: 400,
                    color: theme.palette.dark.darker,
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "transparent",
                      textDecoration: "none",
                    },
                    width: "100%",
                  })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Layer_1"
                    width="24px"
                    height="18px"
                    viewBox="0 0 128 128"
                    enableBackground="new 0 0 128 128"
                    xmlSpace="preserve"
                  >
                    <path
                      fill="#000000"
                      d="M104,0H24C15.164,0,8,7.164,8,16v96c0,8.836,7.164,16,16,16h80c8.836,0,16-7.164,16-16V16  C120,7.164,112.836,0,104,0z M112,112c0,4.414-3.586,8-8,8H24c-4.406,0-8-3.586-8-8V16c0-4.414,3.594-8,8-8h80c4.414,0,8,3.586,8,8  V112z"
                    />
                    <rect x="32" y="24" fill="#000000" width="64" height="8" />
                    <rect x="32" y="40" fill="#000000" width="64" height="8" />
                    <rect x="32" y="56" fill="#000000" width="64" height="8" />
                    <rect x="32" y="72" fill="#000000" width="32" height="8" />
                  </svg>
                  {translate("downloadBrochure")}
                </Link>
              </Button>
            </>
          )}

        </Box>
      </Grid>
    </Grid>
  );
};

QualityImageComponent.propTypes = {
  direction: PropTypes.string,
  title: PropTypes.string,
  image_path: PropTypes.string,
  description: PropTypes.string,
  artModal: PropTypes.func,
  buttonLabel: PropTypes.string,
};


export default QualityImageComponent;
