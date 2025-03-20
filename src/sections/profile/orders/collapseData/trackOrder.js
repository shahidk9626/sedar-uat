import { useAuthContext } from "@/auth/useAuthContext";
import { NextFillImage } from "@/components/image";
import useResponsive from "@/hooks/useResponsive";
import { OrderTrackOrder } from "@/styles/auth";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const TrackOrder = ({ data, trackUser }) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const assets_path = process.env.NEXT_PUBLIC_IMAGE_URL + "assets/";
  const { t: translate } = useTranslation();
  const isMdDown = useResponsive("down", "md");

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.success.main,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.success.main,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[800]
          : theme.palette.grey[300],
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color:
      theme.palette.mode === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[300],
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: theme.palette.success.main,
    }),
    "& .QontoStepIcon-completedIcon": {
      color: theme.palette.success.main,
      zIndex: 1,
      fontSize: 24,
    },
    "& .QontoStepIcon-circle": {
      width: 12,
      height: 12,
      marginLeft: "8px",
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <CheckCircleRoundedIcon className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  return (
    <>
      <Box>
        <Stack
          sx={{ width: "100%" }}
          py={2}
          alignItems={isMdDown ? "center" : " "}
        >
          <Stepper
            connector={<QontoConnector />}
            variant="outlined"
            activeStep={
              ["Under Verification", "Order Placed"].indexOf(
                data?.SOL_ORDER_STATUS
              ) >= 0
                ? 1
                : data?.SOL_ORDER_STATUS != "Cancelled" &&
                  [
                    "Processed",
                    "Cancelled",
                    "Produced",
                    "Partially Produced",
                    "Produced (Partial Produced)",
                  ].indexOf(data?.SOL_ORDER_STATUS) >= 0
                  ? 2
                  : ["Shipped"].indexOf(data?.SOL_ORDER_STATUS) >= 0
                    ? 3
                    : ["Delivered"].indexOf(data?.SOL_ORDER_STATUS) >= 0
                      ? 4
                      : 1
            }
            sx={{
              p: 2,
              "& .MuiStepIcon-root.Mui-completed": {
                color: (theme) => theme.palette.success.main,
              },
              "& .MuiStepIcon-root.Mui-error": {
                color: (theme) => theme.palette.error.main,
              },
            }}
            alternativeLabel={!isMdDown}
            orientation={isMdDown ? "vertical" : "horizontal"}
            color
          >
            <Step>
              <StepLabel StepIconComponent={QontoStepIcon}>
                <Stack spacing={0.3}>
                  <Typography
                    component="p"
                    variant="typography24"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                    color="common.black"
                  >
                    {translate("Orderplaced")}
                  </Typography>
                  <Typography
                    component="p"
                    variant="typography24"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      color: theme.palette.common.black,
                      fontWeight: 500,
                      ...(themeDirection == "rtl" && {
                        direction: "rtl",
                        textAlign: "center",
                      }),
                    })}
                  >
                    {data.SOL_TXN_DT}
                  </Typography>
                </Stack>
              </StepLabel>
            </Step>

            <Step>
              <StepLabel
                StepIconComponent={QontoStepIcon}
                error={
                  [
                    "Processed",
                    "Cancelled",
                    "Partially Produced",
                    "Produced",
                    "Produced (Partial Produced)",
                  ].indexOf(data?.SOL_ORDER_STATUS) >= 0
                    ? true
                    : false
                }
              >
                <Stack spacing={0.3}>
                  <Typography
                    component="p"
                    variant="typography24"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                    color="common.black"
                  >
                    {[
                      "Processed",
                      "Cancelled",
                      "Partially Produced",
                      "Produced",
                      "Produced (Partial Produced)",
                    ].indexOf(data?.SOL_ORDER_STATUS) >= 0
                      ? translate(data?.SOL_ORDER_STATUS)
                      : translate("In_Process")}
                  </Typography>
                  <Typography
                    component="p"
                    variant="typography24"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                    color="common.black"
                  >
                    {["Processed", "Cancelled"].indexOf(
                      data?.SOL_ORDER_STATUS
                    ) >= 0
                      ? data.PROCESS_DT
                      : ""}
                  </Typography>
                  <Typography
                    component="p"
                    variant="typography24"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                    color="common.black"
                  >
                    {["Produced", "Partially Produced"].indexOf(
                      data?.SOL_ORDER_STATUS
                    ) >= 0
                      ? data.PROCESS_DT
                      : ""}
                  </Typography>
                </Stack>
              </StepLabel>
            </Step>

            <Step>
              <StepLabel StepIconComponent={QontoStepIcon}>
                <Stack spacing={0.3}>
                  <Typography
                    component="p"
                    variant="typography24"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                  >
                    {translate("Shipped")}
                  </Typography>
                  <Typography
                    component="p"
                    variant="typography24"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                  >
                    {data.SHIP_DT}
                  </Typography>
                </Stack>
              </StepLabel>
            </Step>

            <Step>
              <StepLabel StepIconComponent={QontoStepIcon}>
                <Stack spacing={0.3}>
                  <Typography
                    component="p"
                    variant="typography24"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                  >
                    {translate("Delivered")}
                  </Typography>
                  {["Delivered"].indexOf(data?.SOL_ORDER_STATUS) >= 0 && (
                    <Typography
                      component="p"
                      variant="typography24"
                      fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                    >
                      {data.SOL_DELIVERY_DT ? data.SOL_DELIVERY_DT : ""}
                    </Typography>
                  )}
                </Stack>
              </StepLabel>
            </Step>
          </Stepper>
        </Stack>
        <Grid container pl={3} mb={2} justifyContent={"center"}>
          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <Stack spacing={1} direction="row" sx={{ flexWrap: "wrap" }}>
              <OrderTrackOrder>{translate("Deliverto")}:</OrderTrackOrder>
              {data?.shipping_detail ? (
                <OrderTrackOrder>
                  {data?.shipping_detail
                    ? data?.shipping_detail?.CAD_FIRST_NAME
                    : ""}{" "}
                  {data?.shipping_detail
                    ? data?.shipping_detail?.CAD_LAST_NAME
                    : ""}
                  <Chip
                    label={data?.shipping_detail?.CAD_ADDRESS_TYPE}
                    variant="outlined"
                    color="primary"
                    sx={{
                      ml: 1,
                      height: "23px",
                      color: (theme) => theme.palette.primary.main,
                    }}
                  />
                  <Typography
                    component="p"
                    sx={(theme) => ({
                      fontSize: theme.typography.typography24,
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      color: theme.palette.grey[6400],
                      letterSpacing: 0.5,
                    })}
                  >
                    {data?.shipping_detail
                      ? data?.shipping_detail?.CAD_STREET_NAME_NO
                      : ""}
                    ,
                    {data?.shipping_detail
                      ? data?.shipping_detail?.CAD_BUILDING_NAME_NO
                      : ""}
                    ,
                    {data?.shipping_detail
                      ? data?.shipping_detail?.CAD_FLOOR_NO
                      : ""}{" "}
                    {data?.shipping_detail
                      ? data?.shipping_detail?.CAD_APARTMENT_NO
                      : ""}{" "}
                    {data?.shipping_detail
                      ? data?.shipping_detail?.CAD_NEAREST_LANDMARK
                      : ""}
                  </Typography>
                  <Typography
                    component="p"
                    sx={(theme) => ({
                      fontSize: theme.typography.typography24,
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      color: theme.palette.grey[6400],
                      letterSpacing: 0.5,
                    })}
                  >
                    {data?.shipping_detail
                      ? data?.shipping_detail?.AR_DESC
                      : ""}
                    ,{" "}
                    {data?.shipping_detail
                      ? data?.shipping_detail?.CT_DESC
                      : ""}
                    ,{" "}
                    {data?.shipping_detail
                      ? data?.shipping_detail?.ST_DESC
                      : ""}
                    ,
                  </Typography>
                  <Typography
                    component="p"
                    sx={(theme) => ({
                      fontSize: theme.typography.typography24,
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      color: theme.palette.grey[6400],
                      letterSpacing: 0.5,
                    })}
                  >
                    {data?.shipping_detail
                      ? data?.shipping_detail?.CAD_POSTAL_CODE
                      : ""}{" "}
                    {data?.shipping_detail
                      ? data?.shipping_detail?.CAD_COUNTRY
                      : ""}
                  </Typography>
                  <Typography
                    component="p"
                    sx={(theme) => ({
                      fontSize: theme.typography.typography24,
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      color: theme.palette.grey[6400],
                      letterSpacing: 0.5,
                    })}
                  >
                    {data?.shipping_detail
                      ? data?.shipping_detail?.CAD_SHIPPING_NOTE
                      : ""}
                  </Typography>
                </OrderTrackOrder>
              ) : data?.showroom_detail ? (
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Typography
                      component="p"
                      sx={(theme) => ({
                        fontSize: theme.typography.typography24,
                        fontFamily: theme.fontFaces.helveticaNeueLight,
                        color: theme.palette.grey[6400],
                        letterSpacing: 0.5,
                      })}
                    >
                      {" "}
                      {data?.showroom_detail
                        ? data?.showroom_detail?.SSA_ADDRESS_TITLE
                        : ""}
                    </Typography>
                    <Chip
                      label={translate("Showroom")}
                      variant="outlined"
                      color="primary"
                      sx={(theme) => ({
                        height: "23px",
                        textTransform: "uppercase",
                        color: theme.palette.primary.main,
                        fontSize: "12px!important",
                      })}
                    />
                  </Stack>
                  <Box>
                    <Typography
                      component="p"
                      sx={(theme) => ({
                        fontSize: theme.typography.typography24,
                        fontFamily: theme.fontFaces.helveticaNeueLight,
                        color: theme.palette.grey[6400],
                        letterSpacing: 0.5,
                      })}
                    >
                      {data?.showroom_detail
                        ? data?.showroom_detail?.SSA_CITY_NAME
                        : ""}
                      ,{" "}
                      {data?.showroom_detail
                        ? data?.showroom_detail?.SSA_SCN_ISO
                        : ""}{" "}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                ""
              )}
            </Stack>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
            <Stack>
              {data.shipping_detail ? (
                <Box component="div">
                  <Typography
                    component="p"
                    sx={(theme) => ({
                      fontSize: theme.typography.typography24,
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      color: theme.palette.grey[6400],
                      letterSpacing: 0.5,
                    })}
                  >
                    {translate("Mobile")} :
                    {trackUser ? trackUser?.USER_MOBILE : ""}
                  </Typography>
                  <Typography
                    component="p"
                    sx={(theme) => ({
                      fontSize: theme.typography.typography24,
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      color: theme.palette.grey[6400],
                      letterSpacing: 0.5,
                    })}
                  >
                    {translate("EmailId")} :{trackUser?.USER_EMAIL_ID}
                  </Typography>
                </Box>
              ) : data.showroom_detail ? (
                <Box>
                  <Stack direction="row">
                    <Typography
                      component="p"
                      sx={(theme) => ({
                        fontSize: theme.typography.typography24,
                        fontFamily: theme.fontFaces.helveticaNeueLight,
                        color: theme.palette.grey[6400],
                        letterSpacing: 0.5,
                      })}
                    >
                      {translate("Mobile")} :
                    </Typography>
                    <Typography
                      component="a"
                      href={"tel:" + data?.showroom_detail?.SSA_PHONE_NO}
                      sx={(theme) => ({
                        textDecoration: "none",
                        fontSize: theme.typography.typography24,
                        fontFamily: theme.fontFaces.helveticaNeueLight,
                        color: theme.palette.grey[6400],
                        letterSpacing: 0.5,
                      })}
                    >
                      {data?.showroom_detail?.SSA_PHONE_NO}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography
                      component="p"
                      sx={(theme) => ({
                        fontSize: theme.typography.typography24,
                        fontFamily: theme.fontFaces.helveticaNeueLight,
                        color: theme.palette.grey[6400],
                        letterSpacing: 0.5,
                      })}
                    >
                      {translate("Emails")}:
                    </Typography>
                    <Typography
                      component="a"
                      href={
                        "mailto:" + data?.showroom_detail?.SSA_MANAGER_EMAIL_ID.split(',')[0]}
                      sx={(theme) => ({
                        fontSize: theme.typography.typography24,
                        fontFamily: theme.fontFaces.helveticaNeueLight,
                        color: theme.palette.grey[6400],
                        letterSpacing: 0.5,
                        textDecoration: "none",
                      })}
                    >
                      { data?.showroom_detail?.SSA_MANAGER_EMAIL_ID.split(',')[0]}
                    </Typography>
                    <Box
                      component="a"
                      href={
                        data.showroom_detail.SSA_GEO_LOCATION.length > 5
                          ? data.showroom_detail.SSA_GEO_LOCATION
                          : "https://www.google.ae/maps/place/SEDAR"
                      }
                      target="_blank"
                      rel="nonereffer"
                    >
                      <NextFillImage
                        src={assets_path + "icon/google-maps.png"}
                        alt="google map"
                        sizes="(min-width: 0px) and (max-width: 1920px) 460vw"
                        objectFit="contain"
                        sx={{
                          width: "auto!important",
                          height: "auto!important",
                          objectFit: "contain",
                          backgroundSize: "contain",
                          "&.MuiCard-root": {
                            borderRadius: 0,
                            boxShadow: "none",
                            position: "relative!important",
                            width: "25px!important",
                            height: "100%!important",
                          },
                        }}
                      />
                    </Box>
                  </Stack>
                </Box>
              ) : (
                ""
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TrackOrder;
