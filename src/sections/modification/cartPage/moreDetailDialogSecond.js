import { NextFillImage } from "@/components/image";
import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";

const MoreDetailDialogSecond = ({ open, handleClose }) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <Dialog open={open.open} onClose={handleClose}>
        <DialogTitle
          sx={(theme) => ({ fontSize: theme.typography.h4, fontFamily: theme.fontFaces.helveticaNeueMedium })}
        >
          {open?.data?.PRODUCT_DESC}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <Divider />
        <DialogContent>
          <Grid container direction={"row"} my={4} spacing={0}>
            <Grid item lg={6} md={6} sm={12} xs={12} xxs={12} px={2}>
              <NextFillImage
                src={open?.data?.SOL_IMAGE_PATH}
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
                alt="Cart_summary"
                sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                objectFit="contain"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
              <Grid container>
                <Grid item lg={6} md={6} sm={6} xs={6} xxs={6}>
                  <Box>
                    <Typography
                      sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeueMedium,

                      })}
                    >
                      {translate("ItemCode")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} xxs={6}>
                  <Box>

                    <Typography
                      variant="span"
                      sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        color: theme.palette.grey[2200],
                      })}
                    >
                      : {" "} {open?.data?.brand_info?.SII_ITEM_ID}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} xxs={6}>
                  <Box>
                    <Typography
                      sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                      })}
                    >
                      {translate("Dim")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} xxs={6}>
                  <Box>
                    <Typography
                      variant="span"
                      sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        color: theme.palette.grey[2200],
                      })}
                    >
                      :{" "} {open?.data?.SOL_HEIGHT} x {open?.data?.SOL_WIDTH} CM ( W &
                      H )
                    </Typography>

                  </Box>
                </Grid>
                {open?.data?.info_data &&
                  Object.keys(open?.data?.info_data).map((item, index) => {
                    return (
                      <React.Fragment key={`DATA-${index}`}>
                        {item == "MEASUREMENT" ||
                          item == "MATERIAL_SELECTION" ? (
                          ""
                        ) : item == "QUANTITY" ? (
                          <>
                            <Grid item lg={6} md={6} sm={6} xs={6} xxs={6}>
                              <Box>
                                <Typography
                                  sx={(theme) => ({
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                    color: theme.palette.grey[2200],
                                  })}
                                >
                                  {translate(item)}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6} xxs={6}>
                              <Box>
                                <Typography
                                  variant="span"
                                  sx={(theme) => ({
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                    color: theme.palette.grey[2200],
                                  })}
                                >
                                  :{" "}
                                  {open?.data?.info_data[item] &&
                                    open?.data?.info_data[item]["SOI_PCS"]}
                                </Typography>
                              </Box>
                            </Grid>
                          </>
                        ) : (
                          <>
                            <Grid item lg={6} md={6} sm={6} xs={6} xxs={6}>
                              <Box>
                                <Typography
                                  sx={(theme) => ({
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                    color: theme.palette.grey[2200],
                                  })}
                                >
                                  {translate(item)}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6} xxs={6}>
                              <Box>
                                <Typography
                                  variant="span"
                                  sx={(theme) => ({
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                    color: theme.palette.grey[2200],
                                  })}
                                >
                                  :{" "}
                                  {open?.data?.info_data[item] &&
                                    open?.data?.info_data[item]["SPS_DESC"]}
                                </Typography>
                              </Box>
                            </Grid>
                          </>
                        )}
                      </React.Fragment>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MoreDetailDialogSecond;
