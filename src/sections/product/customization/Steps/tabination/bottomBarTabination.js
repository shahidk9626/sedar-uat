import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify/Iconify";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';
import { CustomLink } from "@/components/link";

const BottomBarTabination = ({
  setTabChange,
  tabChange,
  onNextHandle,
  onPreviousHandle,
  priceArray,
  stepsArray,
  productInfo

}) => {
  const { t: translate } = useTranslation();
  const { locale, query } = useRouter();
  const { slug } = query;
  const sys_id = slug && slug.length === 7 ? slug[6] : 0;
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName } = cookies || {};



  return (
    <Box
      sx={{
        height: "100%",
        zIndex: 4,
        position: { lg: "relative", md: "relative", sm: "sticky", xs: "sticky", xxs: "sticky" },
        bottom: 0
      }}
    >
      <Box
        sx={{

          backgroundColor: (theme) => theme.palette.common.black,
          p: 2,
          py: { lg: 4.3, md: 2, sm: 2, xs: 1, xxs: 1 },
          height: "100%"
        }}
      >

        <Grid container spacing={1} height="100%" alignItems="center" >
          <Grid item lg={4} md={5} sm={5} xs={5} xxs={5}>
            <Box
              sx={{
                display: {
                  md: "none",
                  sm: "block",
                  xs: "block",
                  xxs: "block",
                },
                // borderBottom: (theme) => `1px solid ${theme.palette.common.white}`,
              }}
            >
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeue,
                  fontSize: theme.typography.typography12,
                  color: theme.palette.common.white,
                })}
              >
                {stepsArray?.MATERIAL_SELECTION?.material_info?.SII_ITEM_ID?.split('-')?.splice(1)?.join('-')}

                {stepsArray && stepsArray?.MATERIAL_SELECTION ? <Typography
                  component="span"
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeue,
                    fontSize: theme.typography.typography12,
                    color: theme.palette.primary.dark,
                  })}
                >
                  {" "}
                  - {stepsArray.MATERIAL_SELECTION?.material_info?.COLOR_DESC}

                </Typography> : ''}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                  fontSize: theme.typography.typography16,
                  color: theme.palette.common.white,
                })}
              >
                {productInfo && productInfo.SPI_TOOLTIP ? productInfo.SPI_TOOLTIP : ''}
              </Typography>
            </Box>
            <Box
              sx={{
                display: {
                  md: "block",
                  sm: "none",
                  xs: "none",
                  xxs: "none",
                },
              }}
            >
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeue,
                  fontSize: theme.typography.typography12,
                  color: theme.palette.common.white,
                })}
              >
                {stepsArray?.MATERIAL_SELECTION?.material_info?.SII_ITEM_ID?.split('-')?.splice(1)?.join('-')}

                {stepsArray && stepsArray.MATERIAL_SELECTION?.material_info ? <Typography
                  component="span"
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeue,
                    fontSize: theme.typography.typography12,
                    color: theme.palette.primary.dark,
                  })}
                >
                  {" "}
                  - {stepsArray.MATERIAL_SELECTION?.material_info?.COLOR_DESC}
                </Typography> : ''}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                  fontSize: theme.typography.typography16,
                  color: theme.palette.common.white,
                })}
              >
                {productInfo && productInfo.SPI_TOOLTIP ? productInfo.SPI_TOOLTIP : ''}
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={3} md={7} sm={7} xs={7} xxs={7} textAlign={{ lg: "center", md: "end", sm: "end", xs: "end", xxs: "end" }}>

            <Box display={{ xxs: "none", xs: "none", sm: "block", md: "block", lg: "block" }}>
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                  fontSize: theme.typography.typography16,
                  color: priceArray.SOL_VALUE && priceArray.SOL_VALUE > 0 ? '#FFFFFF' : ''
                })}
              >
                {translate("Total")} {translate(productInfo?.CCY_CODE)}  {priceArray?.SOL_VALUE ? priceArray?.SOL_VALUE : 0}
              </Typography>
            </Box>


          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} xxs={12} display={{ lg: "none", md: "none", sm: "none", xs: "block", xxs: "block" }}>
            <Divider sx={{ borderColor: "common.white" }} />
          </Grid>
          <Grid item lg={5} md={12} sm={12} xs={12} xxs={12} textAlign="end">
            <Stack direction="row" alignItems="center" justifyContent={{ xxs: "space-between", xs: "normal", sm: "end", lg: "end", md: "end", }} spacing={2}>
              <Box display={{ lg: "none", md: "none", sm: "none" }}>

                <Stack direction="row" alignItems="center" spacing={0.2} height="auto">
                  <Iconify
                    icon="ic:baseline-arrow-back-ios-new"
                    color="white"
                    sx={{
                      direction: "ltr",
                      ...(langName == "ar" && {
                        transform: "rotate(180deg)",
                      }),
                    }}
                  />
                  <CustomLink lang={locale} link={slug?.[0] + "/" + slug?.[1]} sx={{ fontFamily: (theme) => theme.fontFaces.helveticaNeue, color: "common.white", fontSize: "16px", paddingRight: "15px" }}>
                    {translate("Back")}
                  </CustomLink>
                  {/* <Button variant="" sx={{ fontFamily: (theme) => theme.fontFaces.helveticaNeue, color: "common.white", fontSize: "16px" }}>{translate("Back")}</Button> */}
                  {tabChange == "preview" ? (
                    <Button
                      variant="contained"
                      sx={{ borderRadius: "0px", fontFamily: (theme) => theme.fontFaces.helveticaNeue, }}
                      onClick={() => setTabChange("0")}
                    >
                      {translate("Close")}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      sx={{ borderRadius: "0px", fontFamily: (theme) => theme.fontFaces.helveticaNeue, }}
                      onClick={() => setTabChange("preview")}
                    >
                      {translate("Preview")}
                    </Button>
                  )}
                </Stack>
              </Box>

              <Box display={{ xxs: "block", xs: "block", sm: "none", md: "none", lg: "none" }}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueBold,
                    fontSize: theme.typography.typography16,
                    color: priceArray.SOL_VALUE && priceArray.SOL_VALUE > 0 ? '#FFFFFF' : ''
                  })}
                >
                  {translate("Total")} {translate(productInfo?.CCY_CODE)}  {priceArray?.SOL_VALUE ? priceArray?.SOL_VALUE : 0}
                </Typography>
              </Box>

              {tabChange != "preview" &&
                <Stack spacing={2} direction="row" justifyContent="end" sx={{ margin: "-6px !important" }}>
                  <Box display={{ xxs: "none", xs: "none", sm: "block", md: "block", lg: "block" }}>
                    {tabChange != "1" && (
                      <Button
                        sx={(theme) => ({
                          fontFamily: theme.fontFaces.helveticaNeue,
                          fontSize: theme.typography.typography14,
                          backgroundColor: (theme) => theme.palette.grey[2200],
                          color: (theme) => theme.palette.common.white,
                          borderRadius: "0px",

                          "&:hover": {
                            backgroundColor: (theme) => theme.palette.grey[2300],
                          },
                        })}
                        //  onClick={onPreviousHandle}
                        onClick={() => { onPreviousHandle('PREV') }}
                      >
                        {translate("PrevStep")}
                      </Button>
                    )}
                  </Box>
                  {tabChange != "5" && (
                    <Button
                      onClick={() => { onNextHandle('NEXT') }}
                      sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeue,
                        fontSize: theme.typography.typography14,
                        backgroundColor: (theme) => theme.palette.grey[2200],
                        color: (theme) => theme.palette.common.white,
                        borderRadius: "0px",
                        "&:hover": {
                          backgroundColor: (theme) => theme.palette.grey[2300],
                        },
                      })}
                    >
                      {translate("NextStep")}
                    </Button>
                  )}
                </Stack>}

              {tabChange == "5" && priceArray.SOL_VALUE > 0 && (
                <Button
                  variant="contained"
                  onClick={() => { onNextHandle('ADDTOCART') }}
                  color="primary"
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeue,
                    fontSize: theme.typography.typography14,

                    borderRadius: "0px",
                  })}
                >
                  {sys_id > 0 ? translate("UpdatetoCart") : translate("AddtoCart")}
                </Button>
              )}

            </Stack>

          </Grid>
        </Grid>
      </Box>
    </Box >
  );
};

export default BottomBarTabination;
