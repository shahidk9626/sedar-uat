import { useAuthContext } from "@/auth/useAuthContext";
import { NextImage } from "@/components/image";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import { useDispatch } from "@/redux/store";
import { apiDataService } from "@/utils/apiDataService";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useState } from "react";

const Instagram = ({ data = {} }) => {
  const [instagram, setInstagram] = useState([]);
  const dispatch = useDispatch();
  const { state } = useAuthContext();
  const { cookies } = state;
  React.useEffect(() => {
    if (cookies?.visitorId) {
      dispatch(apiDataService.getAll("/fetch/instagram"))
        .then((response) => {
          setInstagram(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [cookies]);
  return (
    <Box pt={4}>
      <Divider sx={{ mb: 8 }} />
      <Container maxWidth="xl">
        <Box
          sx={(theme) => ({
            [theme.breakpoints.up("md")]: {
              backgroundImage:
                "url('" + `/assets/images/Instagram/Path%2021189@2x.png` + "')",
              backgroundPosition: "49% 50%",
              backgroundSize: "18% 54%",
              backgroundRepeat: "no-repeat",
              pb: 8,
            },
          })}
        >
          <Stack
            direction={{
              md: "row",
              sm: "column-reverse",
              xs: "column-reverse",
              xxs: "column-reverse",
            }}
            spacing={2}
            mb={2}
          >
            <Box component={"div"} width="100%">
              <Grid container>
                {data?.CHILD &&
                  data?.CHILD.map((item, index) => {
                    return (
                      <Grid
                        item
                        lg={6}
                        md={6}
                        sm={6}
                        xs={6}
                        xxs={6}
                        key={index}
                      >
                        <Box component="div" position="relative">
                          <NextLazyLoadImage
                            src={item?.image_path}
                            alt={item?.title}
                            width={400}
                            height={400}
                            placeholder="blur"
                            loading="eager"
                            sx={{
                              width: "100%!important",
                              height: "auto!important",
                              objectFit: "contain!important",
                              padding: 1,
                            }}
                            upLgWidth={400}
                            downLgWidth={400}
                            downMdWidth={400}
                            downSmWidth={200}
                            downXsWidth={200}
                            sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                          />
                          <Box position="absolute" top={"30px"} right={"30px"}>
                            <NextImage
                              src="/assets/images/Instagram/brands-and-logotypes (2)@2.png"
                              alt="next"
                              sx={{ width: "23px !important" }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}
              </Grid>
            </Box>
            <Box
              component="div"
              width={{ md: "30%", sm: "100%", xs: "100%", xxs: "100%" }}
            />
            <Box
              component={"div"}
              width={{ md: "70%", sm: "100%", xs: "100%", xxs: "100%" }}
            >
              <Box
                component="div"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <Box
                  component="div"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems={{
                    lg: "start!important",
                    md: "start!important",
                    sm: "center!important",
                    xs: "center!important",
                    xxs: "center!important",
                  }}
                  justifyContent="center"
                >
                  <NextLazyLoadImage
                    src={data.image_path}
                    alt="next"
                    width={400}
                    height={400}
                    placeholder="blur"
                    loading="eager"
                    sx={{
                      width: {
                        lg: "13%!important",
                        md: "13%!important",
                        sm: "8%!important",
                        xs: "12%!important",
                        xxs: "12%!important",
                      },
                      height: "auto!important",
                      objectFit: "contain!important",
                      padding: 1,
                    }}
                    upLgWidth={400}
                    downLgWidth={400}
                    downMdWidth={400}
                    downSmWidth={200}
                    downXsWidth={200}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  />

                  <Typography
                    component="div"
                    textAlign={{
                      lg: "start!important",
                      md: "start!important",
                      sm: "center!important",
                      xs: "center!important",
                      xxs: "center!important",
                    }}
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      color: theme.palette.common.black,
                      "& h2": {
                        fontFamily: theme.fontFaces.helveticaNeueLight,
                        color: theme.palette.common.black,
                        ...theme.typography.typography17,
                        fontWeight: 200,
                        margin: 0,
                        letterSpacing: 0.5,
                      },
                      "& p": {
                        fontFamily: theme.fontFaces.helveticaNeueLight,
                        color: theme.palette.common.black,
                        ...theme.typography.typography17,
                        fontWeight: 200,
                        margin: 0,
                        py: 1.5,
                        letterSpacing: 0.5,
                      },
                    })}
                    dangerouslySetInnerHTML={{
                      __html: data?.description,
                    }}
                  />
                  <CustomLink link={data?.link_url} target="_blank">
                    <Typography
                      component="p"
                      variant="typography14"
                      mt={4}
                      sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        color: theme.palette.common.black,
                        letterSpacing: 1.5,
                        textDecoration: "underline",
                        textTransform: "uppercase",
                        fontWeight: 400,
                      })}
                    >
                      {data?.link_title}
                    </Typography>
                  </CustomLink>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
Instagram.propTypes = {
  data: PropTypes.object,
};

export default Instagram;
