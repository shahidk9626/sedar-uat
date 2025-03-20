import { CustomLink } from "@/components/link";
import { Box, Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";

const NextLazyLoadImage = dynamic(
  () => import("@/components/image/NextLazyLoadImage"),
  {
    ssr: false,
  }
);

const WhySedarCollection = ({ image = "", description = "", title = "", direction = "" }) => {
  return (
    <Box sx={{ mx: { md: 16, sm: 2, xs: 0, xxs: 0 } }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={5}
        direction={direction}
      >
        <Grid item md={6} sm={6} xs={12} xxs={12}>
          <Box
            sx={{
              width: "300px",
              height: "300px",
            }}
          >
            <CustomLink link="#">
              <NextLazyLoadImage
                src={image}
                alt="cdsaas"
                width={300}
                height={300}
                placeholder="blur"
                loading="eager"
                sx={{
                  objectFit: "contain!important",
                  borderRadius: 0,
                  boxShadow: "none",
                  position: "relative!important",
                  width: "100%!important",
                  height: "100%!important",
                }}
                upLgWidth={300}
                downLgWidth={300}
                downMdWidth={300}
                downSmWidth={300}
                downXsWidth={300}
                sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
              />
            </CustomLink>
          </Box>
        </Grid>
        <Grid item md={6} sm={6} xs={12} xxs={12}>
          <Box sx={{ textAlign: direction == "row" ? "left" : "right" }}>
            <Box
              sx={{
                borderRight: (theme) =>
                  direction != "row" &&
                  `2px solid ${theme.palette.primary.light}`,
                borderLeft: (theme) =>
                  direction != "row-reverse" &&
                  `2px solid ${theme.palette.primary.light}`,
                pl: direction != "row-reverse" && 3,
                pr: direction != "row" && 3,
                mb: 3,
              }}
            >
              <Typography
                component="h2"
                fontSize={30}
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              >
                {title}
              </Typography>
            </Box>
            <Box>
              <Typography
                component="span"
                pb={1}
                lineHeight={1.8}
                fontSize={18}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
                sx={(theme) => ({
                  "& h2": {
                    letterSpacing: 0,
                    ...theme.typography.typography31,
                    fontWeight: "normal",
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    mb: 0,
                  },
                  "& p": {
                    ...theme.typography.typography17,
                    letterSpacing: 1.3,
                    fontSize: 18,
                    fontWeight: 300,
                    lineHeight: "31px",
                    color: (theme) => theme.palette.common.black,
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    marginBlockStart: "8px!important",
                    marginBlockEnd: "8px!important",
                  },
                })}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

WhySedarCollection.propTypes = {
  image: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  direction: PropTypes.string,
};


export default WhySedarCollection;
