import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";


const WhySedarCollectionMobile = ({ image = "", description = "", title = "" }) => {
  return (
    <Box component="div">
      <Box
        component="div"
      >
        <NextLazyLoadImage
          src={image}
          alt={image}
          width={1269}
          height={357}
          sx={{
            width: "300px!important",
            height: "100%!important",
            objectFit: "cover!important",
            m: "auto"
          }}
          sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
          objectFit="contain"
          upLgWidth={1269}
          downLgWidth={1269}
          downMdWidth={1269}
          downSmWidth={870}
          downXsWidth={582}
        />
      </Box>
      <Box
        component="div"
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          component="div"
          sx={{
            borderLeft: (theme) => `2px solid ${theme.palette.primary.light}`,
            pl: 1,
          }}
        >
          <Typography
            fontSize={20}
            textTransform="uppercase"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            color="common.black"
          >
            {title}
          </Typography>
        </Box>
        <Box px={3} component="div" >
          <Typography
            component="span"
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
                ...theme.typography.typography18,
                fontFamily: theme.fontFaces.helveticaNeueLight,
                marginBlockStart: "8px!important",
                marginBlockEnd: "8px!important",
              },
            })}
          />
        </Box>
      </Box>
    </Box>
  );
};


WhySedarCollectionMobile.propTypes = {
  image: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  direction: PropTypes.string,

};


export default WhySedarCollectionMobile;
