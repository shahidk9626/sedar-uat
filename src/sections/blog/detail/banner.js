import CustomBreadCrumb from "@/components/breadCrumb";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const BlogDetailBanner = ({ data, breadCrumbData, blogData }) => {
  const pt = blogData?.CHILD
    ? { lg: 0, md: 0, sm: 8, xs: 8, xxs: 8 }
    : { lg: 0, md: 0, sm: 2, xs: 2, xxs: 2 };
  return (
    <Box
      component="div"
      sx={(theme) => ({
        position: "relative",
        height: blogData?.CHILD ? "40vh" : "auto",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          bottom: "30%",
          right: 0,
          background: theme.palette.blog.light,
          zIndex: -1,
        },
      })}
    >
      <Container maxWidth="lg">
        <CustomBreadCrumb data={breadCrumbData} boxSx={{ pt: 0, py: 2 }} />
        <Stack
          spacing={1.5}
          width="100%"
          justifyContent="center"
          alignItems="center"
          pt={pt}
        >
          <Typography
            component="h3"
            variant="typography43"
            sx={(theme) => ({
              textAlign: "center",
              width: { md: "500px", sm: "100%", xs: "100%", xxs: "100%" },
              fontFamily: theme.fontFaces.helveticaNeueMedium,
            })}
          >
            {blogData?.title}
          </Typography>
          {!blogData?.CHILD && (
            <NextLazyLoadImage
              src={blogData?.image_path}
              alt={blogData?.image_path}
              width={600}
              height={300}
              sx={{
                width: "100%!important",
                height: "100%!important",
                objectFit: "cover!important",
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
              objectFit="contain"
              upLgWidth={600}
              downLgWidth={600}
              downMdWidth={600}
              downSmWidth={600}
              downXsWidth={600}
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default BlogDetailBanner;
