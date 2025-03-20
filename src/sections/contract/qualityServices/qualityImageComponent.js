import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { ContractQualityImage } from "@/styles/contracts";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

const QualityImageComponent = ({ image_path, description, direction = "" }) => {
  return (
    <>
      <Grid
        container
        direction={direction}
        alignItems="center"
        spacing={4}
        py={{ lg: 6, md: 6, sm: 3, xs: 2, xxs: 2 }}
      >
        <Grid item md={6} sm={6} xs={12} xxs={12}>
          <NextLazyLoadImage
            src={image_path}
            alt="qualityServiceImage"
            width={594}
            height={479}
            sx={{
              width: "100%!important",
              height: "100%!important",
              objectFit: "cover!important",
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
            <ContractQualityImage
              component="div"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

QualityImageComponent.propTypes = {
  direction: PropTypes.string,
};

export default QualityImageComponent;
