import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const Banner = ({ data = {} }) => {
  return (
    <>
      <Box>
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
      </Box>
    </>
  );
};

Banner.propTypes = {
  data: PropTypes.object,
};


export default Banner;
