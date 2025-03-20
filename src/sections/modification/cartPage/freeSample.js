import Iconify from "@/components/iconify";
import { NextFillImage } from "@/components/image";
import { CartPageSaveForLater } from "@/styles/cartPage";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const FreeSample = ({
  data,
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
                        fontSize: 16,
                        color: theme.palette.grey[2200],
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
                        {item?.SFP_TITLE}
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
                        {item?.SOL_WIDTH} x {item?.SOL_HEIGHT}
                        {translate("cmcart")}
                      </Typography>
                    </Box>
                    <Box
                      onClick={() => handleDialogueOpen("moreDetailOpen", item)}
                    >
                      <Box>
                        <Typography component="span" sx={{ color: "#9e6493" }}>
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
                </Stack>
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
