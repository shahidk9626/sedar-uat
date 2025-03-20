import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";

const ImageMagzine = ({ data = {}, parentData }) => {
  return (
    <CustomLink link={`/blog/${parentData?.link_url}/${data?.link_url}`}>
      <Box>
        <NextLazyLoadImage
          src={data?.image_path}
          alt="cdsaas"
          width="400"
          height="258"
          placeholder="blur"
          loading="eager"
          sx={{
            width: "100%!important",
            height: "100%!important",
            objectFit: "cover!important",
            "&.MuiCard-root": {
              borderRadius: 0,
              boxShadow: "none",
              position: "relative!important",
              width: "100%!important",
              height: "100%!important",
            },
          }}
          upLgWidth={400}
          downLgWidth={400}
          downMdWidth={400}
          downSmWidth={728}
          downXsWidth={490}
          sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
        />
      </Box>
      <Box mt={3}>
        <Typography component="p" variant="typography45" sx={{ fontFamily: (theme) => theme.fontFaces.helveticaNeue }}>
          {data?.title}
        </Typography>
        <Typography component="p" variant="typography45" sx={{ fontFamily: (theme) => theme.fontFaces.helveticaNeue }}>
          {parentData?.title}
        </Typography>
      </Box>
    </CustomLink>
  );
};

ImageMagzine.propTypes = {
  data: PropTypes.object,
};

export default ImageMagzine;
