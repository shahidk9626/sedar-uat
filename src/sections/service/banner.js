import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Banner = ({ data = {} }) => {
  return (
    <Box position="relative">
      <NextLazyLoadImage
        src={data?.PARENT?.image_path}
        alt={data?.PARENT?.image_path}
        width={1269}
        height={357}
        sx={{
          width: "100%!important",
          height: "100%!important",
          objectFit: "cover!important",
        }}
        sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
        objectFit="contain"
        upLgWidth={1269}
        downLgWidth={1269}
        downMdWidth={1269}
        downSmWidth={870}
        downXsWidth={582}
      />
      <Box sx={{ position: "absolute", top: "65%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <Typography
          component="h1"
          variant="typography10"
          fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
          color="common.white"
          fontWeight="400"
          textAlign="center"
          mb="45px"
        >
          {data?.PARENT?.title}
        </Typography>
      </Box>
    </Box>
  );
};

Banner.propTypes = {
  data: PropTypes.object,
};


export default Banner;
