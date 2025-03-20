import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { ContractProjectGallery } from "@/styles/contracts";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import PropTypes from "prop-types";

const ProjectGallery = ({ data = [] }) => {
  return (
    <Box pt={2}>
      <Container maxWidth="xl">
        <ContractProjectGallery
          component="div"
          dangerouslySetInnerHTML={{
            __html: data?.PARENT?.description,
          }}
        />
        <Box pb={4} pt={2}>
          <Grid container spacing={2}>
            <Grid item md={6} sm={6} xs={12} xxs={12}>
              <NextLazyLoadImage
                src={data?.PARENT?.image_path}
                alt={data?.PARENT?.image_path}
                width={602}
                height={718}
                sx={{
                  width: "100%!important",
                  height: "100%!important",
                  objectFit: "cover!important",
                }}
                sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                objectFit="contain"
                upLgWidth={602}
                downLgWidth={602}
                downMdWidth={602}
                downSmWidth={412}
                downXsWidth={385}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12} xxs={12}>
              <ImageList variant="masonry" cols={2} gap={12}>
                {data?.PARENT?.CHILD?.map((elem, index) => (
                  <ImageListItem key={`GALLERY_IMAGE-${index}`}>
                    <NextLazyLoadImage
                      srcSet={`${elem?.image_path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${elem?.image_path}?w=248&fit=crop&auto=format`}
                      alt={data?.PARENT?.image_path}
                      width={295}
                      height={294}
                      sx={{
                        width: "100%!important",
                        height: "100%!important",
                        objectFit: "cover!important",
                      }}
                      sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                      objectFit="contain"
                      upLgWidth={295}
                      downLgWidth={295}
                      downMdWidth={295}
                      downSmWidth={192}
                      downXsWidth={247}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

ProjectGallery.propTypes = {
  data: PropTypes.array,
};

export default ProjectGallery;
