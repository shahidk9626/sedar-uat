import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const Banner = ({ data = [] }) => {
  return (
    <Box>
      <NextLazyLoadImage
        src={data?.image_path}
        alt={data?.PARENT?.image_path}
        width={1267}
        height={337}
        sx={{
          width: "100%!important",
          height: "100%!important",
          objectFit: "cover!important",
        }}
        sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
        objectFit="contain"
        upLgWidth={1267}
        downLgWidth={1267}
        downMdWidth={1267}
        downSmWidth={858}
        downXsWidth={545}
      />
    </Box>
  );
};

Banner.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


export default Banner;
