import Iconify from "@/components/iconify";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Content = ({ social, blogData }) => {
  return (
    <>
      <Stack spacing={2} mt={4}>
        <Typography
          component="div"
          dangerouslySetInnerHTML={{
            __html: blogData?.description,
          }}
          sx={(theme) => ({
            textOverflow: "ellipsis",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "0",
            "& p": {
              "& strong": {
                fontSize: "16px",
                fontFamily: theme.fontFaces.helveticaNeueLight,
                letterSpacing: 0.5,
                color: theme.palette.common.black,
              },
              fontSize: "16px",
              color: theme.palette.common.black,
              fontFamily: theme.fontFaces.helveticaNeueLight,
              letterSpacing: 1,
              marginTop: 0,
              marginBottom: 0,
            },
          })}
        />
      </Stack>
      {blogData?.CHILD && (
        <Box>
          <Grid
            container
            columnSpacing={{ md: 4, sm: 0, xs: 0, xxs: 0 }}
            rowSpacing={{ md: 4, sm: 3, xs: 3, xxs: 3 }}
          >
            {blogData?.CHILD && blogData?.CHILD.map((child, index) => {
              return (
                <Grid
                  item
                  md={blogData?.CHILD?.length <= 2 ? 6 : 4}
                  key={`PARENT_INDEX-CATEGORY-${index}`}
                >
                  <CustomLink link={`/blog/${blogData?.link_url}/${child?.link_url}`} >
                    <Box>
                      <NextLazyLoadImage
                        src={child?.image_path}
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
                        {child?.title}
                      </Typography>
                      <Typography component="p" variant="typography45" sx={{ fontFamily: (theme) => theme.fontFaces.helveticaNeue }}>
                        {blogData?.title}
                      </Typography>
                    </Box>
                  </CustomLink>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      <Stack direction="row" alignItems="center" spacing={2} mt={4}>
        <Typography
          component="p"
          variant="typography20"
          fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
        >
          {social?.title}
        </Typography>
        {social &&
          social?.links?.length > 0 &&
          social?.links.map((item, index) => {
            return (
              <Box
                key={`Social-Blog-${index}`}
                sx={(theme) => ({
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: theme.palette.grey[200],
                  borderRadius: "50%",
                })}
              >
                <Iconify icon={item?.title} />
              </Box>
            );
          })}
      </Stack>
    </>
  );
};

export default Content;
