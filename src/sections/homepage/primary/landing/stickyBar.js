import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const StickyBar = ({ data = {}, HEADER_IMAGE }) => {
  console.log('landing datasss', data)
  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.common.black, py: 2 }}>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <NextLazyLoadImage
              src={HEADER_IMAGE}
              alt={HEADER_IMAGE}
              width={400}
              height={53}
              sx={{
                width: "240px!important",
                height: "100%!important",
                objectFit: "cover!important",
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
              objectFit="contain"
              upLgWidth={400}
              downLgWidth={400}
              downMdWidth={400}
              downSmWidth={200}
              downXsWidth={200}
            />
          </Box>
          <Box ml={8}>
            <NextLazyLoadImage
              src={data?.SUB_CHILD?.[0]?.image_path}
              alt={data?.SUB_CHILD?.[0]?.image_path}
              width={60}
              height={53}
              sx={{
                display: { md: "none", sm: "block", xs: "block", xxs: "block" },
                width: "20px!important",
                height: "100%!important",
                objectFit: "cover!important",
                filter: "invert(1)",
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
              objectFit="contain"
            />
          </Box>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              display: { md: "flex", sm: "none", xs: "none", xxs: "none" },
            }}
          >
            {data?.SUB_CHILD?.map((icon, index) => {

              return (
                <Box
                  key={`ICON_LANDING-${index}`}
                  sx={{
                    display: {
                      md: "block",
                      sm: "none",
                      xs: "none",
                      xxs: "none",
                    },
                  }}
                >
                  <Box
                    component="a"
                    href={icon.link_url}
                    sx={{ textDecoration: "none" }}
                    aria-label={icon?.image_path}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <NextLazyLoadImage
                        src={icon?.image_path}
                        alt={icon?.image_path}
                        width={60}
                        height={53}
                        sx={{
                          width: "20px!important",
                          height: "100%!important",
                          objectFit: "cover!important",
                          filter: "invert(1)",
                        }}
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                        objectFit="contain"
                        upLgWidth={60}
                        downLgWidth={60}
                        downMdWidth={60}
                        downSmWidth={60}
                        downXsWidth={60}
                      />
                      <Typography color={(theme) => theme.palette.common.white}>
                        {icon.title}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              );
            })}
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              display: { md: "none", sm: "block", xs: "block", xxs: "block" },
            }}
          >
            <Box>
              <Box
                component="a"
                href={data?.SUB_CHILD?.[0]?.link_url}
                sx={{ textDecoration: "none" }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <NextLazyLoadImage
                    src={data?.SUB_CHILD?.[0]?.image_path_portrait}
                    alt={data?.SUB_CHILD?.[0]?.image_path_portrait}
                    width={60}
                    height={53}
                    sx={{
                      width: "20px!important",
                      height: "100%!important",
                      objectFit: "cover!important",
                    }}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                    objectFit="contain"
                    upLgWidth={60}
                    downLgWidth={60}
                    downMdWidth={60}
                    downSmWidth={60}
                    downXsWidth={60}
                  />

                </Stack>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

StickyBar.propTypes = {
  data: PropTypes.object,
};

export default StickyBar;
