import RightArrow from "@/assets/homepage/rightArrow";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import React from "react";

const Brands = ({ data = {} }) => {
  const { t: translate } = useTranslation();
  const isDownMd = useResponsive("down", "md");
  return (
    <Box>
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <Stack width="100%" textAlign="center" spacing={2} alignItems="center">
          <Typography
            component="h2"
            variant="typography16"
            letterSpacing="1.6px"
            fontWeight={500}
            textTransform="uppercase"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            display={{
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
              xxs: "none",
            }}
          >
            {data?.PARENT?.title}
          </Typography>

          <Grid
            container
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "space-around" }}
          >
            <Grid
              item
              lg={6}
              md={6}
              sm={6}
              xs={6}
              xxs={6}
              display={{
                lg: "none",
                md: "none",
                sm: "block",
                xs: "block",
                xxs: "block",
              }}
            >
              <Typography
                component="p"
                variant="h4"
                fontWeight={500}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                textAlign={"start"}
                color="common.black"
              >
                {data?.PARENT?.title}
              </Typography>
            </Grid>

            <Grid
              item
              lg={6}
              md={6}
              sm={6}
              xs={6}
              xxs={6}
              display={{
                lg: "none",
                md: "none",
                sm: "block",
                xs: "block",
                xxs: "block",
                textAlign: "end",
              }}
            >
              <CustomLink link={data?.PARENT?.link_url}>
                <Typography
                  component="p"
                  variant="typography17"
                  color="primary"
                  display="inline-flex"
                  gap="4px"
                  alignItems="center"
                  letterSpacing=".42px"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                >
                  {translate("View_All")}
                  <RightArrow />
                </Typography>
              </CustomLink>
            </Grid>
          </Grid>

          <Box component="div">
            <Grid
              container
              alignItems="center"
              columnSpacing={{ md: 2, sm: 1, xs: 1, xxs: 1 }}
              rowSpacing={1}
              justifyContent="center"
            >
              {data?.PARENT?.CHILD &&
                data?.PARENT?.CHILD?.length > 0 &&
                data?.PARENT?.CHILD[1]?.SUB_CHILD &&
                data?.PARENT?.CHILD[1]?.SUB_CHILD
                  .map((item, index) => {
                    if (index >= (isDownMd ? 6 : 8)) {
                      return "";
                    }
                    return (
                      <Grid
                        item
                        md={3}
                        sm={3}
                        xs={4}
                        xxs={4}
                        key={`BRANDS-CHILD-${index}`}
                      >
                        <Box
                          component="div"
                          sx={{
                            position: "relative!important",
                            width: {
                              md: "100%!important",
                              sm: "100%!important",
                              xs: "100%!important",
                              xxs: "100%!important",
                            },
                            height: {
                              md: "100%!important",
                              sm: "100px!important",
                              xs: "100px!important",
                              xxs: "100px!important",
                            },
                            border: {
                              md: "0px",
                              sm: `1px solid  #c1c9d0`,
                              xs: "1px solid  #c1c9d0",
                              xxs: "1px solid  #c1c9d0",
                            },
                            borderRadius: {
                              md: "0px",
                              sm: "10px",
                              xs: "5px",
                              xxs: "5px",
                            },
                          }}
                        >
                          <NextLazyLoadImage
                            src={item?.image_path}
                            alt={item?.title}
                            width={139}
                            height={45}
                            placeholder="blur"
                            loading="eager"
                            sx={{
                              width: "95%!important",
                              height: "95%!important",
                              objectFit: "contain!important",
                              padding: {
                                lg: "10% 20%!important",
                                md: "10% 20%!important",
                                sm: 1,
                                xs: 1,
                                xxs: 1,
                              },
                            }}
                            upLgWidth={140}
                            downLgWidth={120}
                            downMdWidth={100}
                            downSmWidth={80}
                            downXsWidth={80}
                            sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                          />
                        </Box>
                      </Grid>
                    );
                  })}
            </Grid>
          </Box>
          <CustomLink link={data?.PARENT?.link_url}>
            <Typography
              display={{
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
                xxs: "none",
              }}
              component="p"
              variant="typography15"
              sx={{
                borderBottom: (theme) =>
                  `2px solid ${theme.palette.warning.light}`,
                width: "max-content",
                cursor: "pointer",
                letterSpacing: 1,
              }}
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            >
              {translate("MoreBrands")}
            </Typography>
          </CustomLink>
        </Stack>
      </Container>
    </Box>
  );
};

Brands.propTypes = {
  data: PropTypes.object,
};

export default React.memo(Brands);
