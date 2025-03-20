import { QuantityBox } from "@/components/form";
import Iconify from "@/components/iconify";
import { NextFillImage } from "@/components/image";
import useResponsive from "@/hooks/useResponsive";
import FloatPrice from "@/modules/product/floatPrice";
import { CartPageRate, CartPageSaveForLater } from "@/styles/cartPage";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";
import CartEditOptionModule from "./cartEditOption";


const SectionTwo = ({
  item,
  handleDialogueOpen,
  updateCartTable,
  index,
  data,
  isAuthenticated,
}) => {
  const isSmallScreen = useResponsive("down", "sm");
  const { t: translate } = useTranslation();
  const isMobile = useResponsive("down", "sm");
  return (
    <React.Fragment>
      <Box
        sx={(theme) => ({
          pl: 2,
          pr: 2,
          pb: 2,
          // pt: { xxs: 4, xs: 4, sm: 2, md: 2 },
          position: "relative",
        })}
      >
        <Box
          textAlign="end"
          mt={{ lg: 0, md: 0, sm: 1, xs: 1, xxs: 1 }}
          width={{
            lg: "auto",
            md: "auto",
            sm: "100%",
            xs: "100%",
            xxs: "100%",
          }}
          sx={{
            position: {
              lg: "absolute",
              md: "absolute",
              sm: "static",
              xs: "static",
              xxs: "static",
            },
            right: {
              xxs: 0,
              xs: 5,
              sm: 10,
              md: 15,
              lg: 15,
            },
            top: {
              xxs: 0,
              xs: 0,
              sm: 10,
              md: 20,
              lg: 25,
            },
          }}
        >
          <Iconify
            width={28}
            icon="radix-icons:cross-2"
            onClick={() => handleDialogueOpen("removeItemOpen", item)}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        <Grid
          container
          spacing={2}
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontSize: 16,
                    color: theme.palette.grey[2200],
                  })}
                  component="span"
                >
                  {(index + 1).toString().padStart(2, "0")}
                </Typography>
              </Box>
              <Box pl={2}>
                <NextFillImage
                  src={item?.SOL_IMAGE_PATH}
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "contain",
                    backgroundSize: "contain",
                    "&.MuiCard-root": {
                      borderRadius: 0,
                      boxShadow: "none",
                      position: "relative!important",
                      width: "60px!important",
                      height: "100%!important",
                    },
                  }}
                  alt="Cart_summary"
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  objectFit="contain"
                />
              </Box>
              <Box pl={2}>
                <Box>
                  <Typography
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      fontSize: 16,
                      lineHeight: "19px",
                      fontWeight: 400,
                      color: "common.black",
                    })}
                  >
                    {item?.SFP_TITLE}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    component="span"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      fontSize: 14,
                      lineHeight: "19px",
                      fontWeight: 300,
                      color: "common.black",
                    })}
                  >
                    {translate("ItemCode")} :
                  </Typography>
                  <Typography
                    component="span"
                    sx={(theme) => ({
                      color: theme.palette.grey[600],
                      fontFamily: theme.fontFaces.helveticaNeue,
                      fontSize: 14,
                      lineHeight: "19px",
                      fontWeight: 300,
                    })}
                  >
                    {item?.brand_info?.SII_ITEM_ID}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    component="span"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      color: "common.black",
                      fontSize: 14,
                      lineHeight: "19px",
                      fontWeight: 300,
                    })}
                  >
                    {translate("Brand")} :
                  </Typography>
                  <Typography
                    component="span"
                    sx={(theme) => ({
                      color: theme.palette.grey[600],
                      fontFamily: theme.fontFaces.helveticaNeue,
                      fontSize: 14,
                      lineHeight: "19px",
                      fontWeight: 300,
                    })}
                  >
                    {" "}
                    {item?.brand_info?.SII_BR_DESC}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    component="span"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      fontSize: 14,
                      lineHeight: "19px",
                      fontWeight: 300,
                      color: "common.black",
                    })}
                  >
                    {translate("Dim")} :
                  </Typography>
                  <Typography
                    component="span"
                    sx={(theme) => ({
                      color: theme.palette.grey[600],
                      fontFamily: theme.fontFaces.helveticaNeue,
                      fontSize: 14,
                      lineHeight: "19px",
                      fontWeight: 300,
                    })}
                  >
                    {" "}
                    {item?.SOL_WIDTH} x {item?.SOL_HEIGHT}
                    {translate("cmcart")}
                  </Typography>
                </Box>
                {data && data?.info_data && data?.info_data["CONTROL_TYPE"] && (
                  <Box>
                    <Typography
                      component="span"
                      sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        color: "common.black",
                        fontSize: 14,
                        lineHeight: "19px",
                        fontWeight: 300,
                      })}
                    >
                      {translate("CONTROL_TYPE")} :
                    </Typography>
                    <Typography
                      component="span"
                      sx={(theme) => ({
                        color: theme.palette.grey[600],
                        fontFamily: theme.fontFaces.helveticaNeue,
                        fontSize: 14,
                        lineHeight: "19px",
                        fontWeight: 300,
                      })}
                    >
                      {" "}
                      {item?.info_data?.CONTROL_TYPE?.SPS_DESC}
                    </Typography>
                  </Box>
                )}

                {data?.info_data && data?.info_data?.ROLL_CALCULATION ? (
                  <Box
                    onClick={() => handleDialogueOpen("moreDetailOpen", item)}
                  >
                    <Typography
                      component="span"
                      sx={(theme) => ({
                        textDecoration: "underline",
                        color: theme.palette.common.black,
                        fontWeight: 300,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        fontSize: 14,
                        lineHeight: "19px",
                        cursor: "pointer",
                      })}
                    >
                      {translate("MoreDetail")}
                    </Typography>
                  </Box>
                ) : data.SOL_ITEM_LABEL == "ADD_TO_CART" ? (
                  ""
                ) : (
                  <Box
                    onClick={() =>
                      handleDialogueOpen("moreDetailSecondOpen", item)
                    }
                  >
                    <Typography
                      component="span"
                      sx={(theme) => ({
                        textDecoration: "underline",
                        color: theme.palette.common.black,
                        fontWeight: 300,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        fontSize: 14,
                        lineHeight: "19px",
                        cursor: "pointer",
                      })}
                    >
                      {translate("MoreDetail")}
                    </Typography>
                  </Box>
                )}
                <Stack direction="row" alignItems="center">
                  <CartEditOptionModule data={item} />
                  {item.SOL_TOKEN_ID &&
                    item.SOL_CUST_SYS_ID > 0 &&
                    isAuthenticated ? (
                    <>
                      <CartPageSaveForLater
                        onClick={() =>
                          updateCartTable(
                            item?.SOL_SYS_ID,
                            "CART_STATUS",
                            "SAVE_LATER"
                          )
                        }
                        component="span"
                      >
                        {translate("save_for_later")}
                      </CartPageSaveForLater>
                    </>
                  ) : (
                    " "
                  )}
                </Stack>
              </Box>
            </Stack>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} mt={2}>
            <Divider
              sx={{
                display: {
                  lg: "none",
                  md: "none",
                  sm: "block",
                  xs: "block",
                  xxs: "block",
                },
                mb: 2,
              }}
            />
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item lg={4} md={4} sm={6} xs={6} xxs={6}>
                {Number(item?.SOL_PRICE) < Number(item?.SOL_OLD_PRICE) && (
                  <Box>
                    <Typography
                      sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        fontSize: 14,
                        textDecoration: "line-through",
                      })}
                    >
                      {item?.SOL_CCY_CODE}{" "}
                      <FloatPrice price={item?.SOL_OLD_PRICE} />
                    </Typography>
                  </Box>
                )}
                {isSmallScreen ? (
                  <Box>
                    <CartPageRate>
                      {item?.SOL_CCY_CODE}{" "}
                      <FloatPrice price={item?.SOL_VALUE} />
                    </CartPageRate>
                  </Box>
                ) : (
                  <Box>
                    <CartPageRate>
                      {item?.SOL_CCY_CODE}{" "}
                      <FloatPrice price={item?.SOL_OLD_PRICE} />
                    </CartPageRate>
                  </Box>
                )}
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={6} xxs={6}>
                <Box justifyContent="center">
                  <QuantityBox
                    disabled={Number(item?.SOL_PRICE) <= 0}
                    size="medium"
                    fullWidth={true}
                    name="quantity"
                    value={item?.SOL_QTY}
                    onChange={(e) => {
                      if (Number(e.target.value) >= 0) {
                        updateCartTable(
                          item?.SOL_SYS_ID,
                          "ORDER_QTY",
                          e.target.value || "0"
                        );
                      } else {
                        updateCartTable(item?.SOL_SYS_ID, "ORDER_QTY", "0");
                      }
                    }}
                    color="dark"
                    formLabelSx={(theme) => ({
                      ...theme.typography.typography14,
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      color: theme.palette.common.black,
                    })}
                    inputSx={(theme) => ({
                      "& .MuiOutlinedInput-input": {
                        padding: "8.5px 14px !important",
                        textAlign: "center",
                      },
                      "& .Mui-disabled": {
                        ...theme.typography.typography15,
                        fontFamily: theme.fontFaces.helveticaNeueBold,
                        color: theme.palette.common.black,
                        WebkitTextFillColor: (theme) =>
                          `${theme.palette.common.black} !important`,
                      },
                    })}
                    decrementQuantity={() => {
                      if (item?.SOL_QTY > 1) {
                        let QTY = Number(item?.SOL_QTY) - 1;
                        updateCartTable(item?.SOL_SYS_ID, "ORDER_QTY", QTY);
                      }
                    }}
                    incrementQuantity={() => {
                      if (item?.SOL_QTY >= 0) {
                        let QTY = Number(item?.SOL_QTY) + 1;
                        updateCartTable(item?.SOL_SYS_ID, "ORDER_QTY", QTY);
                      }
                    }}
                    textBoxDisabled={true}
                  />
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Box
                  display={{
                    lg: "block",
                    md: "block",
                    sm: "none",
                    xs: "none",
                    xxs: "none",
                  }}
                >
                  <CartPageRate>
                    {item?.SOL_CCY_CODE} <FloatPrice price={item?.SOL_VALUE} />
                  </CartPageRate>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </React.Fragment>
  );
};

export default SectionTwo;
