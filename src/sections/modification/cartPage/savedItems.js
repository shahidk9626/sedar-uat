import { QuantityBox } from "@/components/form";
import { NextFillImage } from "@/components/image";
import { CartPageSaveForLater } from "@/styles/cartPage";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import SaveEditOptionModule from "./saveEditOption";

const SavedItems = ({ data = [], updateCartTable }) => {
  const { t: translate } = useTranslation();
  const formik = useFormik({
    initialValues: {
      quantity: 1,
    },
  });

  if (data && data.save_later.length === 0) {
    return null;
  }
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
          md: "block",
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
        data?.save_later.map((item, index) => (
          <Box key={`SAVE-DATA-${index}`}>
            <Box
              sx={(theme) => ({
                backgroundColor: theme.palette.grey[4600],
                p: 2,
                pt: { xxs: 4, xs: 4, sm: 2, md: 2 },
                position: "relative",
              })}
            >
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Stack direction="row" spacing={2} alignItems="center">
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
                    <Box>
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
                            width: "80px!important",
                            height: "100%!important",
                          },
                        }}
                        alt="Cart_summary"
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                        objectFit="contain"
                      />
                    </Box>
                    <Box>
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
                        <Box>
                          <Typography
                            component="span"
                            sx={(theme) => ({
                              fontFamily: theme.fontFaces.helveticaNeueMedium,
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
                            {" "}
                            {item?.brand_info?.SII_ITEM_ID}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            component="span"
                            sx={(theme) => ({
                              fontFamily: theme.fontFaces.helveticaNeueMedium,
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
                            {item?.SOL_WIDTH}x{item?.SOL_HEIGHT} CM ( W & H )
                          </Typography>
                        </Box>
                        {item.SOL_ITEM_LABEL == "SAMPLE" ? (
                          <Typography
                            sx={(theme) => ({
                              fontFamily: theme.fontFaces.helveticaNeueRegular,
                              fontSize: theme.typography.typography16,
                              color: "#9e6493",
                            })}
                          >
                            {translate("free_sample")}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </Box>
                      <Box>
                        <Stack direction={"row"}>
                          {/* <SaveEditOptionModule data={item} /> */}
                          <CartPageSaveForLater
                            onClick={() =>
                              updateCartTable(
                                item?.SOL_SYS_ID,
                                "CART_STATUS",
                                "COMPLETED"
                              )
                            }
                            component="span"
                            sx={{ borderLeft: 'none' }}
                          >
                            {translate("move_to_cart")}
                          </CartPageSaveForLater>
                        </Stack>
                      </Box>
                    </Box>
                  </Stack>
                  <Divider
                    sx={{
                      mt: 3,
                      display: {
                        lg: "none",
                        md: "none",
                        sm: "block",
                        xs: "block",
                        xxs: "block",
                      },
                    }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Grid container spacing={2}>
                    <Grid item lg={4} md={4} sm={6} xs={6} xxs={6}>
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
                    <Grid item lg={4} md={4} sm={6} xs={6} xxs={6}>
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
                                fontFamily: theme.fontFaces.helveticaNeueBold,
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
                      md={4}
                      sm={0}
                      xs={0}
                      xxs={0}
                      display={{
                        lg: "block",
                        md: "block",
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
        ))}
    </Box>
  );
};

SavedItems.propTypes = {
  data: PropTypes.array,
};


export default SavedItems;
