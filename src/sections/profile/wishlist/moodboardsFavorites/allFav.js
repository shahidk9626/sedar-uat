import ColorSelect from "@/components/button/colorSelect";
import Iconify from "@/components/iconify";
import { NextFillImage } from "@/components/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "next-i18next";

const AllFav = () => {
  const [hoverButtons, setHoverButtons] = React.useState(false);
  const { t: translate } = useTranslation();
  return (
    <>
      <Box my={4}>
        <Grid container spacing={2}>
          {[...Array(4)].map((items, index) => {
            return (
              <Grid
                item
                md={3}
                sm={6}
                xs={6}
                xxs={6}
                key={`Product_Card-${index}`}
              >
                <Card
                  sx={{
                    borderRadius: "0px",
                    border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                    boxShadow: hoverButtons
                      ? "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px"
                      : "",
                  }}
                  onMouseOver={() => setHoverButtons(true)}
                  onMouseOut={() => setHoverButtons(false)}
                >
                  <Box
                    sx={{
                      position: "relative",
                    }}
                  >
                    <Box>
                      <NextFillImage
                        src="/assets/product/cardpp.png"
                        sx={{
                          width: "100%!important",
                          height: "100%!important",
                          objectFit: "contain",
                          backgroundSize: "contain",
                          "&.MuiCard-root": {
                            borderRadius: 0,
                            boxShadow: "none",
                            position: "relative!important",
                            width: "100%!important",
                            height: "100%!important",
                          },
                        }}
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                        objectFit="contain"
                        alt="ddd"
                      />
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "0%",
                        width: "90%",
                        left: "0%",
                        m: 2,
                        transform: "translate(0%, 0%)",
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Box>
                          <NextFillImage
                            src="/assets/product/checkBox.png"
                            sx={{
                              width: "100%!important",
                              height: "100%!important",
                              objectFit: "contain",
                              backgroundSize: "contain",
                              "&.MuiCard-root": {
                                borderRadius: 0,
                                boxShadow: "none",
                                position: "relative!important",
                                width: "100%!important",
                                height: "100%!important",
                              },
                            }}
                            sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                            objectFit="contain"
                            alt="ddd"
                          />
                        </Box>
                        <Box>
                          <Iconify
                            sx={{ cursor: "pointer" }}
                            onClick={() => setDilogueOpen(true)}
                            icon="mdi:heart"
                            color={(theme) => theme.palette.grey[200]}
                            width={30}
                          />
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                  <Box px={1.5} py={2}>
                    <Grid container>
                      <Grid item md={12} sm={12} xs={12} xxs={12}>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Box component="div" mt={1}>
                            <ColorSelect color="Darkblue" borderColor="grey" />
                          </Box>
                          <Box>
                            <NextFillImage
                              alt="ddd"
                              src="/assets/product/premiumcollection.png"
                              sx={{
                                width: "100%!important",
                                height: "100%!important",
                                objectFit: "contain",
                                backgroundSize: "contain",
                                "&.MuiCard-root": {
                                  borderRadius: 0,
                                  boxShadow: "none",
                                  position: "relative!important",
                                  width: "100%!important",
                                  height: "100%!important",
                                },
                              }}
                              sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                              objectFit="contain"
                            />
                          </Box>
                        </Stack>
                        <Box mt={2}>
                          <Box>
                            <Typography
                              component="span"
                              fontSize={{
                                md: "14px",
                                sm: "14px",
                                xs: "12px",
                                xxs: "12px",
                              }}
                              fontFamily={(theme) =>
                                theme.fontFaces.helveticaNeueMedium
                              }
                              ty
                              sx={{
                                color: (theme) => theme.palette.grey[1000],
                              }}
                            >
                              MIN2822-5
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              fontSize={{
                                md: "17px",
                                sm: "16px",
                                xs: "14px",
                                xxs: "14px",
                              }}
                              fontFamily={(theme) =>
                                theme.fontFaces.helveticaNeueMedium
                              }
                            >
                              Sunscreen Roller Blinds
                            </Typography>
                          </Box>
                        </Box>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          spacing={1}
                        >
                          <Box>
                            <Typography
                              fontFamily={(theme) =>
                                theme.fontFaces.helveticaNeueBold
                              }
                              sx={{
                                whiteSpace: "nowrap",
                                fontSize: {
                                  md: "21px",
                                  sm: "18px",
                                  xs: "16px",
                                  xxs: "14px",
                                },
                                color: (theme) => theme.palette.primary.dark,
                              }}
                            >
                              USD 178.75
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Box>
                      <Typography
                        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                        sx={{
                          fontSize: "12px",
                          color: (theme) => theme.palette.grey[1200],
                          textDecoration: "line-through",
                          textDecorationColor: (theme) =>
                            theme.palette.error.darkerRed,
                        }}
                        component="span"
                      >
                        USD 178.75
                      </Typography>
                      <Typography
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueMedium
                        }
                        sx={{
                          fontSize: "14px",
                          ml: 0.5,
                          color: (theme) => theme.palette.error.darkerRed,
                        }}
                        component="span"
                      >
                        35% OFF
                      </Typography>
                    </Box>
                    <Stack
                      spacing={2}
                      mt={2}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      direction={{
                        lg: "row",
                        md: "row",
                        sm: "column",
                        xs: "column",
                        xxs: "column",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="dark"
                        sx={{
                          borderRadius: 0,
                          width: "120px",
                          border: (theme) =>
                            `1px solid ${theme.palette.grey[2100]}`,
                          "&:hover": {
                            border: (theme) =>
                              `1px solid ${theme.palette.grey[2100]}`,
                          },
                        }}
                      >
                        {translate("AddtoCart")}
                      </Button>
                      <Button
                        variant="text"
                        sx={{
                          color: (theme) => theme.palette.grey[2200],
                          textDecoration: "underline",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {translate("Remove")}
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default AllFav;
