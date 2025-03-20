import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
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
      <Dialog
        open={open.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle
          sx={(theme) => ({
            lineHeight: "23px",
            fontWeight: 500,
            color: theme.palette.common.black,
            fontFamily: theme.fontFaces.helveticaNeueMedium,
            fontSize: theme.typography.typography19,
          })}
        >
          {open?.data?.SFP_TITLE}
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
        <DialogContent sx={{ mt: 4, mb: 4 }}>
          <Grid container direction={"row"} spacing={5}>
            <Grid item lg={5} md={5} sm={12} xs={12} xxs={12} px={2}>
              <Box>
                <NextLazyLoadImage
                  src={open?.data?.SOL_IMAGE_PATH}
                  alt="product Image"
                  width={328}
                  height={384}
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "cover!important",
                  }}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100v80vww"
                  objectFit="contain"
                  upLgWidth={328}
                  downLgWidth={328}
                  downMdWidth={328}
                  downSmWidth={671}
                  downXsWidth={467}
                />
              </Box>
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12} xxs={12}>
              <Grid container rowSpacing={1.5}>
                {open?.data?.brand_info?.SII_ITEM_ID && (
                  <>
                    <Grid item lg={4} md={4} sm={4} xs={4} xxs={4}>
                      <Box>
                        <Typography
                          sx={(theme) => ({
                            fontSize: "16px",
                            lineHeight: "19px",
                            fontWeight: 500,
                            color: theme.palette.common.black,
                            fontFamily: theme.fontFaces.helveticaNeueMedium,
                          })}
                        >
                          {translate("ItemCode")}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={8} xxs={8}>
                      <Box>
                        <Typography
                          variant="span"
                          sx={(theme) => ({
                            fontSize: "16px",
                            lineHeight: "24px",
                            fontWeight: 400,
                            fontFamily: theme.fontFaces.helveticaNeueMedium,
                            color: theme.palette.grey[2200],
                          })}
                        >
                          : {open?.data?.brand_info?.SII_ITEM_ID}
                        </Typography>
                      </Box>
                    </Grid>
                  </>
                )}
                {open?.data?.SOL_WIDTH && open?.data?.SOL_HEIGHT && (
                  <>
                    <Grid item lg={4} md={4} sm={4} xs={4} xxs={4}>
                      <Box>
                        <Typography
                          sx={(theme) => ({
                            fontSize: "16px",
                            lineHeight: "19px",
                            fontWeight: 500,
                            color: theme.palette.common.black,
                            fontFamily: theme.fontFaces.helveticaNeueMedium,
                          })}
                        >
                          {translate("Dim")}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={8} xxs={8}>
                      <Box>
                        <Typography
                          variant="span"
                          sx={(theme) => ({
                            fontSize: "16px",
                            lineHeight: "24px",
                            fontWeight: 400,
                            fontFamily: theme.fontFaces.helveticaNeue,
                            color: theme.palette.grey[2200],
                          })}
                        >
                          : {open?.data?.SOL_WIDTH}x{open?.data?.SOL_HEIGHT}{" "}
                          {translate("cmcart")}
                        </Typography>
                      </Box>
                    </Grid>{" "}
                  </>
                )}
                {open?.data?.info_data &&
                  Object.keys(open?.data?.info_data).map((item, index) => {
                    return (
                      <React.Fragment key={`DATA-${index}`}>
                        {item == "MEASUREMENT" ||
                          item == "MATERIAL_SELECTION" ? (
                          <>
                          </>
                        ) : item == "QUANTITY" &&
                          open?.data?.info_data[item] &&
                          open?.data?.info_data[item]["SOI_PCS"] ? (
                          <>
                            <Grid item lg={4} md={4} sm={4} xs={4} xxs={4}>
                              <Box>
                                <Typography
                                  sx={(theme) => ({
                                    fontSize: "16px",
                                    lineHeight: "19px",
                                    fontWeight: 500,
                                    color: theme.palette.common.black,
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                  })}
                                >
                                  {translate(item)}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item lg={8} md={8} sm={8} xs={8} xxs={8}>
                              <Box>
                                <Typography
                                  variant="span"
                                  sx={(theme) => ({
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    fontWeight: 400,
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
                        )
                          : item == "LENGTH_OF_WIRE" ? (
                            <>
                              <Grid item lg={4} md={4} sm={4} xs={4} xxs={4}>
                                <Box>
                                  <Typography
                                    sx={(theme) => ({
                                      fontSize: "16px",
                                      lineHeight: "19px",
                                      fontWeight: 500,
                                      color: theme.palette.common.black,
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueMedium,
                                    })}
                                  >
                                    {translate(item)}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item lg={8} md={8} sm={8} xs={8} xxs={8}>
                                <Box>
                                  <Typography
                                    variant="span"
                                    sx={(theme) => ({
                                      fontSize: "16px",
                                      lineHeight: "24px",
                                      fontWeight: 400,
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueMedium,
                                      color: theme.palette.grey[2200],
                                    })}
                                  >
                                    :{" "}
                                    {open?.data?.info_data[item] &&
                                      open?.data?.info_data[item]["SOI_WIDTH"]} {translate('LMT')}
                                  </Typography>
                                </Box>
                              </Grid>
                            </>
                          ) : item == "TYPE_OF_REMOTE" ? (
                            <>
                              <Grid item lg={4} md={4} sm={4} xs={4} xxs={4}>
                                <Box>
                                  <Typography
                                    sx={(theme) => ({
                                      fontSize: "16px",
                                      lineHeight: "19px",
                                      fontWeight: 500,
                                      color: theme.palette.common.black,
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueMedium,
                                    })}
                                  >
                                    {translate(item)}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item lg={8} md={8} sm={8} xs={8} xxs={8}>
                                <Box>
                                  <Typography
                                    variant="span"
                                    sx={(theme) => ({
                                      fontSize: "16px",
                                      lineHeight: "24px",
                                      fontWeight: 400,
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueMedium,
                                      color: theme.palette.grey[2200],
                                    })}
                                  >
                                    :{" "}
                                    {open?.data?.info_data[item] &&
                                      open?.data?.info_data[item]["ITEM_ID"]}
                                  </Typography>
                                </Box>
                              </Grid>
                            </>
                          )
                            : item == "WINDOW_DEPTH" ? (
                              <>
                                <Grid item lg={4} md={4} sm={4} xs={4} xxs={4}>
                                  <Box>
                                    <Typography
                                      sx={(theme) => ({
                                        fontSize: "16px",
                                        lineHeight: "19px",
                                        fontWeight: 500,
                                        color: theme.palette.common.black,
                                        fontFamily:
                                          theme.fontFaces.helveticaNeueMedium,
                                      })}
                                    >
                                      {translate(item)}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item lg={8} md={8} sm={8} xs={8} xxs={8}>
                                  <Box>
                                    <Typography
                                      variant="span"
                                      sx={(theme) => ({
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        fontWeight: 400,
                                        fontFamily:
                                          theme.fontFaces.helveticaNeueMedium,
                                        color: theme.palette.grey[2200],
                                      })}
                                    >
                                      :{" "}
                                      {open?.data?.info_data[item] &&
                                        open?.data?.info_data[item]["SOI_DEPTH"]} {t('CM')}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </>
                            )
                              : (
                                open?.data?.info_data[item] &&
                                open?.data?.info_data[item]["SPS_DESC"] && (
                                  <>
                                    <Grid item lg={4} md={4} sm={4} xs={4} xxs={4}>
                                      <Box>
                                        <Typography
                                          sx={(theme) => ({
                                            fontSize: "16px",
                                            lineHeight: "19px",
                                            fontWeight: 500,
                                            color: theme.palette.common.black,
                                            fontFamily:
                                              theme.fontFaces.helveticaNeueMedium,
                                          })}
                                        >
                                          {translate(item)}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item lg={8} md={8} sm={8} xs={8} xxs={8}>
                                      <Box>
                                        <Typography
                                          variant="span"
                                          sx={(theme) => ({
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                            fontWeight: 400,
                                            fontFamily:
                                              theme.fontFaces.helveticaNeueMedium,
                                            color: theme.palette.grey[2200],
                                          })}
                                        >
                                          :{" "}
                                          {open?.data?.info_data[item] &&
                                            open?.data?.info_data[item]["SPS_DESC"]}
                                          {open?.data?.info_data[item] &&
                                            open?.data?.info_data[item]['ITEM_ID'] ? <span className='text-secondary'>({open?.data?.info_data[item]['ITEM_ID']})</span> : ''}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                  </>
                                )
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
