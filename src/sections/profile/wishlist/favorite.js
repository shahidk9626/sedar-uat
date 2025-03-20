import { SubmitButton } from "@/components/button";
import { NextFillImage } from "@/components/image";
import { WishListMyFavoritesHeading } from "@/styles/auth";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import { useTranslation } from "next-i18next";

const FavoriteSection = () => {
  const { t: translate } = useTranslation();
  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: {
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
              xxs: "none",
            },
          }}
        >
          <WishListMyFavoritesHeading>
          {translate("CreateyourFavouriteMoodBoards")}
          </WishListMyFavoritesHeading>
        </Box>
        <Grid
          container
          gap={{ lg: 6, md: 6, sm: 2, xs: 2, xxs: 2 }}
          mb={3}
          mt={{ lg: 6, md: 6, sm: 0, xs: 0, xxs: 0 }}
          justifyContent={"center"}
        >
          <Grid
            item
            lg={3}
            md={3}
            sm={12}
            xs={12}
            xxs={12}
            sx={(theme) => ({
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: {
                lg: "0",
                md: "0",
                sm: "10px",
                xs: "10px",
                xxs: "10px",
              },
              px: 3,
              py: { lg: 4, md: 4, sm: 0, xs: 0, xxs: 0 },
            })}
          >
            <Grid container alignItems={"center"}>
              <Grid item lg={12} md={12} sm={2} xs={2} xxs={2}>
                <Typography
                  sx={(theme) => ({
                    fontSize: theme.typography.typography31,
                    color: theme.palette.primary.main,
                  })}
                >
                  01
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={2} xs={2} xxs={2}>
                <Stack
                  width={{
                    lg: "100%",
                    md: "100%",
                    sm: "60%",
                    xs: "60%",
                    xxs: "60%",
                  }}
                  height={100}
                  justifyContent={"center"}
                  mt={{ lg: 6, md: 6, sm: 0, xs: 0, xxs: 0 }}
                >
                  <NextFillImage
                    src={"/assets/profile/heart.avif"}
                    sx={{
                      width: "100%!important",
                      height: "100%!important",
                      objectFit: "scale-down",
                      backgroundSize: "scale-down",
                      "&.MuiCard-root": {
                        borderRadius: 0,
                        boxShadow: "none",
                        position: "relative!important",
                        width: "100%!important",
                        height: "100%!important",
                      },
                    }}
                    alt="cdsaas"
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                    objectFit="scale-down"
                  />
                </Stack>
              </Grid>
              <Grid item lg={12} md={12} sm={8} xs={8} xxs={8}>
                <Typography
         
                  sx={(theme) => ({
                    fontSize: theme.typography.typography20,
                    textAlign: "center",
                    fontWeight: theme.typography.fontWeightBold,
                  })}
                >
                   {translate("SaveittoFavourites")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={12}
            xs={12}
            xxs={12}
            component={Link}
            href={"/dashboard/moodboards"}
            sx={(theme) => ({
              border: `1px solid ${theme.palette.primary.main}`,
              textDecoration: "none",
              borderRadius: {
                lg: "0",
                md: "0",
                sm: "10px",
                xs: "10px",
                xxs: "10px",
              },
              px: 3,
              py: { lg: 4, md: 4, sm: 0, xs: 0, xxs: 0 },
            })}
          >
            <Grid spacing={2} container alignItems={"center"}>
              <Grid item lg={12} md={12} sm={2} xs={2} xxs={2}>
                <Typography
                  mb={2}
                  sx={(theme) => ({
                    fontSize: theme.typography.typography31,
                    color: theme.palette.primary.main,
                  })}
                >
                  02
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={3} xs={3} xxs={3}>
                <Stack
                  pb={2}
                  alignItems={"center"}
                  m={2}
                  width={"80%"}
                  sx={{
                    border: (theme) =>
                      `1px dashed ${theme.palette.primary.main}`,
                  }}
                >
                  <Typography
                    sx={(theme) => ({
                      fontSize: theme.typography.typography9,
                      p: 1,
                      color: theme.palette.grey[2100],
                    })}
                  >
                    {translate("ForMyRoom")}
                  </Typography>
                  <NextFillImage
                    src={"/assets/profile/heart2.png"}
                    sx={{
                      width: "100%!important",
                      height: "100%!important",
                      objectFit: "scale-down",
                      backgroundSize: "scale-down",
                      "&.MuiCard-root": {
                        borderRadius: 0,
                        boxShadow: "none",
                        position: "relative!important",
                        width: "30%!important",
                        height: "30%!important",
                      },
                    }}
                    alt="cdsaas"
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                    objectFit="scale-down"
                  />
                </Stack>
              </Grid>
              <Grid item lg={12} md={12} sm={7} xs={7} xxs={7}>
                <Typography
                  py={2}
                  sx={(theme) => ({
                    fontSize: theme.typography.typography20,
                    textAlign: "center",
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.common.black,
                  })}
                >
                  {translate("CreateaModeBoard")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={12}
            xs={12}
            xxs={12}
            component={Link}
            href={"/dashboard/moodboards-favorites"}
            sx={(theme) => ({
              border: `1px solid ${theme.palette.primary.main}`,
              textDecoration: "none",
              borderRadius: {
                lg: "0",
                md: "0",
                sm: "10px",
                xs: "10px",
                xxs: "10px",
              },
              px: 3,
              py: { lg: 4, md: 4, sm: 0, xs: 0, xxs: 0 },
            })}
          >
            <Grid container alignItems={"center"}>
              <Grid item lg={12} md={12} sm={2} xs={2} xxs={2}>
                <Typography
                  sx={(theme) => ({
                    fontSize: theme.typography.typography31,
                    color: theme.palette.primary.main,
                  })}
                >
                  03
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={4} xs={4} xxs={4} m={2}>
                <Typography
                  sx={(theme) => ({
                    fontSize: theme.typography.typography9,
                    color: theme.palette.grey[2100],
                    textAlign: "center",
                    width: "100%",
                  })}
                >
                  {translate("ForMyRoom")}
                </Typography>
                <Grid container mt={0.1} spacing={1}>
                  {[...Array(3)].map((item, index) => (
                    <Grid
                      item
                      lg={6}
                      md={6}
                      sm={6}
                      xs={6}
                      xxs={6}
                      key={`CARD-IMAGE-${index}`}
                    >
                      <NextFillImage
                        src={"/assets/profile/group4.webp"}
                        sx={{
                          width: "90%!important",
                          height: "90%!important",
                          objectFit: "scale-down",
                          backgroundSize: "scale-down",
                          "&.MuiCard-root": {
                            borderRadius: 0,
                            boxShadow: "none",
                            position: "relative!important",
                            width: "90%!important",
                            height: "90%!important",
                          },
                        }}
                        alt="cdsaas"
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                        objectFit="scale-down"
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} sm={4} xs={4} xxs={4}>
                <Typography
                  py={2}
                  sx={(theme) => ({
                    fontSize: theme.typography.typography20,
                    textAlign: "center",
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.common.black,
                  })}
                >
                  {translate("SeeitallTogether")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box
          mb={3}
          textAlign={"center"}
          sx={{
            display: {
              lg: "none",
              md: "none",
              sm: "block",
              xs: "block",
              xxs: "block",
            },
          }}
        >
          <SubmitButton title="Shop Now" fullWidth />
        </Box>
      </Container>
    </>
  );
};

export default FavoriteSection;
