import { QuantityBox } from "@/components/form";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import ItemCode from "@/modules/product/itemCode";
import { CartPageSaveForLater } from "@/styles/cartPage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import SaveEditOptionModule from "./saveEditOption";
import Iconify from "@/components/iconify";
import RemoveItemDilogue from "./removeItemDilogue";
import { useState } from "react";
import { apiDataService } from "@/utils/apiDataService";
import { useSnackbar } from "notistack";
import useCartContext from "@/provider/cart/cartContext";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import { useAuthContext } from "@/auth/useAuthContext";
import { useDispatch } from "react-redux";

const SavedItems = ({ data = {}, updateCartTable }) => {
  const dispatch = useDispatch();
  const { getMyCartData } = useCartContext();
  const { enqueueSnackbar } = useSnackbar();
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { modificationUser } = cookies || {};
  let head_sys_id = modificationUser?.head_sys_id
    ? modificationUser?.head_sys_id
    : 0;
  const [open, setOpen] = useState({ open: false, data: null });


  const handleDialogOpen = (data) => {
    setOpen({ open: true, data: data });
  };

  const handleDialogClose = () => {
    setOpen((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  if (data && data?.save_later?.length === 0) {
    return null;
  }

  const orderDelete = async (id) => {
    try {
      const response = await dispatch(apiDataService.Delete(`v2/cart/${id}`));
      if (response?.status === 200) {
        enqueueSnackbar(response?.data?.error_message) ||
          `${translate("Success")}`;
        handleDialogClose();
        getMyCartData({
          params: { soh_sys_id: head_sys_id || 0 },
          isGoogleAnalytics: true,
        });

        GoogleAnalytics && GoogleAnalytics.removeFromCart(data);
      }
    } catch (error) {
      console.log(`${translate("SomethingWentWrong")}`, error);
    }
  };

  return (
    <Box
      p={1}
      sx={(theme) => ({
        border: {
          xxs: "none",
          lg: `1px solid ${theme.palette.common.black}`,
          md: `1px solid ${theme.palette.common.black}`,
          sm: "none",
        },
        backgroundColor: theme.palette.grey[4600],
      })}
    >
      <Box p={2}>
        <Typography
          sx={(theme) => ({
            fontSize: theme.typography.typography28,
            fontFamily: theme.fontFaces.helveticaNeueMedium,
            color: "common.black",
          })}
        >
          {translate("Savedforlater")} {data?.save_later?.length}{" "}
          {translate("items")}
        </Typography>
      </Box>
      <Box
        display={{
          lg: "block",
          md: "none",
          sm: "none",
          xs: "none",
          xxs: "none",
        }}
        sx={(theme) => ({
          backgroundColor: theme.palette.grey[3500],
          p: 1,
        })}
      >
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography
              sx={(theme) => ({
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                fontSize: 14,
                color: "common.black",
              })}
            >
              {translate("Product")}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontSize: 14,
                    color: "common.black",
                  })}
                >
                  {translate("Price")}
                </Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontSize: 14,
                    color: "common.black",
                  })}
                >
                  {translate("QUANTITY")}
                </Typography>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontSize: 14,
                    color: "common.black",
                  })}
                >
                  {translate("Total")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {data &&
        data?.save_later &&
        data?.save_later?.length > 0 &&
        data?.save_later.map(
          (item, index) => (
            (
              <Box key={`SAVE-DATA-${index}`}>
                <Box
                  sx={(theme) => ({
                    backgroundColor: theme.palette.grey[4600],
                    p: 2,
                    pt: { xxs: 2, xs: 2, sm: 2, md: 2 },
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
                        lg: 10,
                      },
                    }}
                  >
                    <Iconify
                      onClick={() => handleDialogOpen(item?.SOL_SYS_ID)}
                      width={28}
                      icon="radix-icons:cross-2"
                      sx={{ cursor: "pointer" }}
                    />
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid
                          item
                          lg={1}
                          md={1}
                          sm={1}
                          xs={1}
                          xxs={1}
                          alignContent={"center"}
                        >
                          <Box>
                            <Typography
                              sx={(theme) => ({
                                fontFamily: theme.fontFaces.helveticaNeueMedium,
                                color: theme.palette.grey[2200],
                                fontSize: 16,
                              })}
                              component="span"
                            >
                              {(index + 1).toString().padStart(2, "0")}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          lg={2}
                          md={2}
                          sm={3}
                          xs={3}
                          xxs={3}
                          alignContent={"center"}
                        >
                          <Box
                            component="div"
                            sx={{
                              width: {
                                lg: "90%!important",
                                md: "90%!important",
                                sm: "100%!important",
                                xs: "70%!important",
                                xxs: "50px!important",
                              },
                            }}
                          >
                            <NextLazyLoadImage
                              src={item?.SOL_IMAGE_PATH}
                              alt={"Cart_summary"}
                              width={70}
                              height={54}
                              sx={{
                                width: "100%!important",
                                height: "100%!important",
                                objectFit: "cover!important",
                              }}
                              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                              objectFit="contain"
                              upLgWidth={70}
                              downLgWidth={70}
                              downMdWidth={70}
                              downSmWidth={73}
                              downXsWidth={85}
                            />
                          </Box>
                        </Grid>
                        <Grid item lg={8} md={8} sm={8} xs={8} xxs={8}>
                          <Box>
                            <Typography
                              sx={(theme) => ({
                                fontFamily: theme.fontFaces.helveticaNeueMedium,
                                fontSize: 16,
                                color: "common.black",
                              })}
                            >
                              {item?.PRODUCT_DESC}
                            </Typography>
                          </Box>
                          <Box>
                            {item?.info_data &&
                              item?.info_data["MATERIAL_SELECTION"] && (
                                <Box>
                                  <Typography
                                    component="span"
                                    sx={(theme) => ({
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueMedium,
                                      fontSize: 14,
                                      color: "common.black",
                                    })}
                                  >
                                    {translate("ItemCode")} :
                                  </Typography>
                                  <Typography
                                    component="span"
                                    sx={(theme) => ({
                                      color: theme.palette.grey[500],
                                      fontFamily: theme.fontFaces.helveticaNeue,
                                      fontSize: 14,
                                    })}
                                  >
                                    <ItemCode
                                      code={
                                        item?.info_data["MATERIAL_SELECTION"][
                                        "ITEM_ID"
                                        ]
                                      }
                                    />
                                  </Typography>
                                </Box>
                              )}
                            {item?.SOL_WIDTH > 0 && item?.SOL_HEIGHT > 0 && (
                              <Box>
                                <Typography
                                  component="span"
                                  sx={(theme) => ({
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                    fontSize: 14,
                                    color: "common.black",
                                  })}
                                >
                                  {translate("Dim")} :
                                </Typography>
                                <Typography
                                  component="span"
                                  sx={(theme) => ({
                                    color: theme.palette.grey[500],
                                    fontFamily: theme.fontFaces.helveticaNeue,
                                    fontSize: 14,
                                  })}
                                >
                                  {" "}
                                  {item?.SOL_WIDTH}x{item?.SOL_HEIGHT} CM ( W &
                                  H )
                                </Typography>
                              </Box>
                            )}
                            {item?.info_data &&
                              item?.info_data["CONTROL_TYPE"] && (
                                <Box>
                                  <Typography
                                    component="span"
                                    sx={(theme) => ({
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueMedium,
                                      fontSize: 14,
                                      color: "common.black",
                                    })}
                                  >
                                    {translate("CONTROL_TYPE")} :
                                  </Typography>
                                  <Typography
                                    component="span"
                                    sx={(theme) => ({
                                      color: theme.palette.grey[500],
                                      fontFamily: theme.fontFaces.helveticaNeue,
                                      fontSize: 14,
                                    })}
                                  >
                                    {" "}
                                    {
                                      item?.info_data["CONTROL_TYPE"][
                                      "SPS_DESC"
                                      ]
                                    }
                                  </Typography>
                                </Box>
                              )}
                            {item?.info_data &&
                              item?.info_data["MOUNTING_OPTION"] && (
                                <Box>
                                  <Typography
                                    component="span"
                                    sx={(theme) => ({
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueMedium,
                                      fontSize: 14,
                                      color: "common.black",
                                    })}
                                  >
                                    {translate("MOUNTING_OPTION")} :
                                  </Typography>
                                  <Typography
                                    component="span"
                                    sx={(theme) => ({
                                      color: theme.palette.grey[500],
                                      fontFamily: theme.fontFaces.helveticaNeue,
                                      fontSize: 14,
                                    })}
                                  >
                                    {" "}
                                    {
                                      item?.info_data["MOUNTING_OPTION"][
                                      "SPS_DESC"
                                      ]
                                    }
                                  </Typography>
                                </Box>
                              )}
                            {item.SOL_ITEM_LABEL == "SAMPLE" && (
                              <Typography
                                sx={(theme) => ({
                                  fontFamily:
                                    theme.fontFaces.helveticaNeueRegular,
                                  fontSize: theme.typography.typography16,
                                  color: "#9e6493",
                                })}
                              >
                                {translate("free_sample")}
                              </Typography>
                            )}
                          </Box>
                          <Stack direction="row" alignItems="center">
                            {/* <SaveEditOptionModule data={item} /> */}
                            <CartPageSaveForLater
                              onClick={() =>
                                updateCartTable(
                                  item?.SOL_SYS_ID,
                                  "CART_STATUS",
                                  "COMPLETED"
                                )

                              }
                              sx={{ borderLeft: 'none' }}
                              component="span"
                            >
                              {translate("move_to_cart")}
                            </CartPageSaveForLater>
                          </Stack>
                        </Grid>
                      </Grid>

                      <Divider
                        sx={{
                          mt: 3,
                          display: {
                            lg: "none",
                            md: "block",
                            sm: "block",
                            xs: "block",
                            xxs: "block",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12} xxs={12}>
                      <Grid container spacing={2}>
                        <Grid item lg={4} md={6} sm={6} xs={6} xxs={6}>
                          <Stack direction={"row"} spacing={1}>
                            <Typography
                              sx={(theme) => ({
                                fontFamily: theme.fontFaces.helveticaNeueBold,
                                fontSize: 16,
                                color: "common.black",
                              })}
                            >
                              {item?.SOL_CCY_CODE}{" "}
                            </Typography>
                            <Typography
                              sx={(theme) => ({
                                fontFamily: theme.fontFaces.helveticaNeueBold,
                                fontSize: 16,
                                color: "common.black",
                              })}
                            >
                              {item?.SOL_PRICE}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={6} xxs={6}>
                          {item.SOL_ITEM_LABEL == "SAMPLE" ? (
                            <Box
                              justifyContent="center"
                              ml={{
                                lg: 0,
                                md: 0,
                                sm: 7,
                                xs: 10,
                                xxs: 10,
                              }}
                            >
                              <Typography
                                sx={(theme) => ({
                                  fontFamily: theme.fontFaces.helveticaNeueBold,
                                  fontSize: 16,
                                  color: "common.black",
                                })}
                              >
                                {item?.SOL_QTY}
                              </Typography>
                            </Box>
                          ) : (
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
                                    updateCartTable(
                                      item?.SOL_SYS_ID,
                                      "ORDER_QTY",
                                      "0"
                                    );
                                  }
                                }}
                                textBoxDisabled={true}
                                color="dark"
                                // label="Quantity"
                                formLabelSx={(theme) => ({
                                  ...theme.typography.typography14,
                                  fontFamily: theme.fontFaces.helveticaNeueBold,
                                  color: theme.palette.common.black,
                                })}
                                inputSx={(theme) => ({
                                  "& .MuiOutlinedInput-input": {
                                    padding: "8.5px 14px !important",
                                    textAlign: "center",
                                  },
                                  "& .Mui-disabled": {
                                    ...theme.typography.typography15,
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueBold,
                                    color: theme.palette.common.black,
                                    WebkitTextFillColor: (theme) =>
                                      `${theme.palette.common.black} !important`,
                                  },
                                })}
                                decrementQuantity={() => {
                                  if (item?.SOL_QTY > 1) {
                                    let QTY = Number(item?.SOL_QTY) - 1;
                                    updateCartTable(
                                      item?.SOL_SYS_ID,
                                      "ORDER_QTY",
                                      QTY
                                    );
                                  }
                                }}
                                incrementQuantity={() => {
                                  if (item?.SOL_QTY >= 0) {
                                    let QTY = Number(item?.SOL_QTY) + 1;
                                    updateCartTable(
                                      item?.SOL_SYS_ID,
                                      "ORDER_QTY",
                                      QTY
                                    );
                                  }
                                }}
                              />
                            </Box>
                          )}
                        </Grid>
                        <Grid
                          item
                          lg={4}
                          md={0}
                          sm={0}
                          xs={0}
                          xxs={0}
                          display={{
                            lg: "block",
                            md: "none",
                            sm: "none",
                            xs: "none",
                            xxs: "none",
                          }}
                        >
                          <Box>
                            <Typography
                              sx={(theme) => ({
                                fontFamily: theme.fontFaces.helveticaNeueBold,
                                fontSize: 16,
                                color: "common.black",
                              })}
                            >
                              {item?.SOL_CCY_CODE} {item?.SOL_VALUE}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider sx={{ mt: 3 }} />
                </Box>
              </Box>
            )
          )
        )}

      <RemoveItemDilogue open={open?.open} setOpen={handleDialogClose}>
        <Typography variant="typography18" letterSpacing={0.5}>
          {translate("Areyousureremove")}
        </Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <Button
            onClick={() => orderDelete(open?.data)}
            variant="contained"
            sx={{
              fontFamily: (theme) => theme.fontFaces.helveticaNeueMedium,
              fontSize: "12px",
              fontWeight: 200,
              color: (theme) => theme.palette.grey[5900],
              backgroundColor: (theme) => theme.palette.common.black,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.common.black,
              },
            }}
          >
            {translate("Yes")}
          </Button>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            sx={{
              fontFamily: (theme) => theme.fontFaces.helveticaNeueMedium,
              fontWeight: 200,
              fontSize: "12px",
              color: (theme) => theme.palette.grey[5900],
              backgroundColor: (theme) => theme.palette.common.black,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.common.black,
              },
            }}
          >
            {translate("No")}
          </Button>
        </Stack>
      </RemoveItemDilogue>
    </Box >
  );
};

SavedItems.propTypes = {
  data: PropTypes.object,
};

export default SavedItems;
