import { NextFillImage } from "@/components/image";
import { OrderDetails } from "@/styles/auth";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import ReasonReturnForm from "./reasonReturnForm";
import { useTranslation } from "next-i18next";

const ReturnItemDetail = () => {
  const [step, setStep] = React.useState(0);
  const { t: translate } = useTranslation();

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <>
      {step === 0 && (
        <Box
          my={4}
          pt={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 }}
          sx={{
            border: (theme) => `1px solid ${theme.palette.grey[2100]}`,
          }}
        >
          <Grid p={2} container spacing={1} alignItems={"center"}>
            <Grid item lg={2} md={2} sm={2} xs={12} xxs={12}>
              <OrderDetails>OS-213817-1</OrderDetails>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
              <Stack direction={"row"} spacing={2}>
                <Box width={125}>
                  <NextFillImage
                    src={"/assets/profile/table.jpg"}
                    sx={{
                      width: "100%!important",
                      height: "100%!important",
                      objectFit: "scale-down",
                      backgroundSize: "scale-down",
                      "&.MuiCard-root": {
                        borderRadius: 0,
                        boxShadow: "none",
                        position: "relative!important",
                        width: "100%!important",
                        height: "100%!important",
                      },
                    }}
                    alt="cdsaas"
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                    objectFit="scale-down"
                  />
                </Box>
                <Box>
                  <OrderDetails>
                  {translate("ItemCode")}:
                    <Typography
                      component="span"
                      px={0.5}
                      sx={(theme) => ({
                        fontSize: theme.typography.typography15,
                        fontFamily: theme.fontFaces.helveticaNeue,
                        color: theme.palette.grey[3900],
                      })}
                    >
                      FR449C
                    </Typography>
                  </OrderDetails>
                  <OrderDetails py={1}>Suncscreen Roller Shades</OrderDetails>
                  <Typography
                    mt={4}
                    sx={(theme) => ({
                      fontSize: theme.typography.typography14,
                      fontFamily: theme.fontFaces.helveticaNeueRegular,
                    })}
                  >
                    Return Validity Before:
                    <Typography
                      component="span"
                      pl={1}
                      sx={(theme) => ({
                        fontSize: theme.typography.typography14,
                        fontFamily: theme.fontFaces.helveticaNeueRegular,
                        fontWeight: theme.typography.fontWeightBold,
                      })}
                    >
                      Apr 18 - 2020
                    </Typography>
                  </Typography>
                  <Typography
                    sx={(theme) => ({
                      fontSize: theme.typography.typography14,
                      fontFamily: theme.fontFaces.helveticaNeueRegular,
                    })}
                  >
                    Return Amount:
                    <Typography
                      component="span"
                      pl={1}
                      sx={(theme) => ({
                        fontSize: theme.typography.typography14,
                        fontFamily: theme.fontFaces.helveticaNeueRegular,
                        fontWeight: theme.typography.fontWeightBold,
                      })}
                    >
                      AED 170.00
                    </Typography>
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12} xxs={12}>
              <OrderDetails>AED 0.00</OrderDetails>
              <Typography
                sx={(theme) => ({
                  fontSize: theme.typography.typography12,
                  fontFamily: theme.fontFaces.helveticaNeueRegular,
                  color: theme.palette.grey[2200],
                  textDecoration: "line-through",
                  display: "inline",
                })}
              >
                AED 0.00
              </Typography>
              <Typography
                pl={1}
                component="span"
                sx={(theme) => ({
                  fontSize: theme.typography.typography12,
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                  color: theme.palette.error.main,
                })}
              >
                50% OFF
              </Typography>
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12} xxs={12} pl={4}>
              <Typography
                sx={(theme) => ({
                  fontSize: theme.typography.typography14,
                  fontFamily: theme.fontFaces.helveticaNeueRegular,
                })}
              >
                Apr 18 - 2020
              </Typography>
            </Grid>
          </Grid>
          <ReasonReturnForm handleNext={handleNext} />
        </Box>
      )}
      {step === 1 && (
        <Stack alignItems={"center"} justifyContent={"center"} height={"60vh"}>
          <Card sx={{ width: "600px", py: 5 }}>
            <CardContent>
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <CheckCircleRounded
                  sx={{
                    fontSize: "50px",
                    color: (theme) => theme.palette.success.main,
                  }}
                />
              </Box>
              <OrderDetails padding="10px" textAlign="center">
                Return Request Accepted
              </OrderDetails>
              <Typography
                sx={(theme) => ({
                  fontSize: theme.typography.typography14,
                  fontFamily: theme.fontFaces.helveticaNeueRegular,
                  textAlign: "center",
                })}
              >
                Please keep the item ready for pick up
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      )}
    </>
  );
};

export default ReturnItemDetail;
