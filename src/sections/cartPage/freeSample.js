import Iconify from "@/components/iconify";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CartPageSaveForLater } from "@/styles/cartPage";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const FreeSample = ({
  data,
  formik,
  handleDialogueOpen,
  updateCartTable,
}) => {
  const { t: translate } = useTranslation();
  return data?.free_sample?.map((item, index) => {
    if (item?.SOL_ITEM_LABEL == "SAMPLE") {
      return (
        <Box key={`CART-ITEM-SAMPLE_-${index}`}>
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.grey[3600],
              p: 2,
              pt: { xxs: 4, xs: 4, sm: 2, md: 2, lg: 2 },
              position: "relative",
            })}
          >
            <Grid container spacing={2}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Grid container columnSpacing={0} alignItems="center">
                  <Grid item lg={1} md={1} sm={1} xs={1} xxs={1}>
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
                  </Grid>
                  <Grid item lg={2} md={2} sm={3} xs={3} xxs={3}>
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
                    <Box pl={2}>
                      <Box>
                        <Typography
                          sx={(theme) => ({
                            fontFamily: theme.fontFaces.helveticaNeueMedium,
                            fontSize: 16,
                            color: "common.black",
                          })}
                        >
                          {item?.SFP_TITLE}
                        </Typography>
                      </Box>
                      {item?.brand_info && item?.brand_info?.SII_BR_DESC && (
                        <Box>
                          <Typography
                            component="span"
                            sx={(theme) => ({
                              fontFamily: theme.fontFaces.helveticaNeueMedium,
                              fontSize: 14,
                              color: "common.black",
                            })}
                          >
                            {translate("Brand")} :
                          </Typography>
                          <Typography
                            component="span"
                            sx={(theme) => ({
                              color: theme.palette.grey[500],
                              fontFamily: theme.fontFaces.helveticaNeue,
                              fontSize: 14,
                            })}
                          >
                            {item?.brand_info?.SII_BR_DESC}
                          </Typography>
                        </Box>
                      )}
                      {item?.brand_info?.SII_ITEM_ID && (
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
                            {item?.brand_info?.SII_ITEM_ID}
                          </Typography>
                        </Box>
                      )}
                      {item?.SOL_WIDTH > 0 && item?.SOL_HEIGHT > 0 && (
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
                            {item?.SOL_WIDTH} x {item?.SOL_HEIGHT}
                            {translate("cmcart")}
                          </Typography>
                        </Box>
                      )}
                      <Box>
                        <Box>
                          <Typography
                            component="span"
                            sx={{ color: "#9e6493" }}
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeue
                            }
                          >
                            {translate("free_sample")}
                          </Typography>
                        </Box>
                      </Box>
                      <Box pl={2}>
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
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 1 }} />
              </Grid>
            </Grid>
            <Box
              sx={{
                position: "absolute",
                right: { xxs: 5, xs: 5, sm: 10, md: 15 },
                top: { xxs: 5, xs: 5, sm: 10, md: 15 },
              }}
            >
              <Iconify
                width={28}
                icon="radix-icons:cross-2"
                onClick={() => handleDialogueOpen("removeItemOpen", item)}
                sx={{ cursor: "pointer" }}
              />
            </Box>
          </Box>
        </Box>
      );
    }
  });
};

export default FreeSample;
