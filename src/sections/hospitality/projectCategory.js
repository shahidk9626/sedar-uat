import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const ProjectCategory = ({ data = [] }) => {
  return (
    <Box my={5}>
      <Container maxWidth="xl">
        <Grid container spacing={{ lg: 8, md: 8, sm: 1, xs: 1, xxs: 1 }}>
          {data?.PARENT?.CHILD?.map((elem, index) => {
            return (
              <Grid
                item
                md={4}
                sm={4}
                xs={6}
                xxs={6}
                key={`PROJECT_CATEGORY-${index}`}
              >
                <Box>
                  <NextLazyLoadImage
                    src={elem?.image_path}
                    alt={data?.PARENT?.image_path}
                    width={364}
                    height={429}
                    sx={{
                      width: "100%!important",
                      height: "100%!important",
                      objectFit: "cover!important",
                    }}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                    objectFit="contain"
                    upLgWidth={364}
                    downLgWidth={364}
                    downMdWidth={364}
                    downSmWidth={265}
                    downXsWidth={261}
                  />
                </Box>
                <Box my={5}>
                  <Typography
                    sx={(theme) => ({
                      ...theme.typography.typography20,
                      lineHeight: {
                        lg: "30px",
                        md: "30px",
                        sm: "23px",
                        xs: "23px",
                        xxs: "23px",
                      },
                      color: (theme) => theme.palette.common.black,
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                    })}
                  >
                    {elem?.title}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        <Box></Box>
      </Container>
    </Box>
  );
};

ProjectCategory.propTypes = {
  data: PropTypes.array,
};


export default ProjectCategory;
