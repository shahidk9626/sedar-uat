import { SubmitButton } from "@/components/button";
import { TextBox } from "@/components/form";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import OrderDetail from "@/modules/order/orderDetail";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";

const TrackOrder = ({ formik, trackingData }) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Container maxWidth="xl">
        <Box my={3} mt={12} component="div">
          <Grid container justifyContent="center" spacing={2}>
            <Grid item md={3} sm={3} xs={3} xxs={3}>
              <TextBox
                fullWidth
                label={translate("Order_No")}
                type="text"
                variant="standard"
                name="order_number"
                value={formik.values.order_number}
                onChange={(e) =>
                  formik.setFieldValue(
                    "order_number",
                    e.target.value.trimStart()
                  )
                }
                helperText={
                  formik.touched.order_number && formik.errors.order_number
                }
              />
            </Grid>
            <Grid item md={3} sm={8} xs={9} xxs={9}>
              <TextBox
                fullWidth
                label={translate("Email")}
                type="text"
                variant="standard"
                name="email"
                value={formik.values.email}
                onChange={(e) =>
                  formik.setFieldValue("email", e.target.value.trimStart())
                }
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item md={3} sm={12} xs={12} xxs={12}>
              <SubmitButton
                variant="contained"
                color="warning"
                size="large"
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                fullWidth={true}
                fontWeight={200}
                maxWidth="100%"
                title={translate("trackOrder")}
                className="submit_btn search_button"
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} xxs={12}>
              {trackingData != false && trackingData != "NO" && trackingData ? (
                <OrderDetail data={[trackingData]} />
              ) : (
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{ height: "100%" }}
                >
                  <Box width={{ lg: "15%", md: "15%", sm: "40%", xs: "40%", xxs: "50%" }} textAlign="-webkit-center">
                    <NextLazyLoadImage
                      src={"/assets/cartPage/cartTrackEmpty.avif" || ""}
                      alt="common Page "
                      width={75}
                      height={55}
                      sx={{
                        width: "75%!important",
                        height: "100%!important",
                        objectFit: "contain!important",
                      }}
                      sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                      objectFit="contain"
                      upLgWidth={72}
                      downLgWidth={72}
                      downMdWidth={72}
                      downSmWidth={72}
                      downXsWidth={72}
                    />
                  </Box>
                  <Box mt={3}>
                    <Typography
                      sx={(theme) => ({
                        ...theme.typography.typography32,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        color: theme.palette.common.black,
                        textAlign: "center",
                      })}
                    >
                      {translate(
                        trackingData != "NO"
                          ? "NoActiveOrders"
                          : "Invalid_reference_no"
                      )}
                    </Typography>
                  </Box>
                  <Box mt={4}>
                    <Button
                      fullWidth
                      onClick={() => router.push("/")}
                      variant="contained"
                      color="warning"
                      sx={(theme) => ({
                        py: 3,
                        px: 10,
                        borderRadius: "0px",
                        width: "100%",
                        fontFamily: theme.fontFaces.helveticaNeueBold,
                        fontSize: "15px",
                        background: theme.palette.primary.light,
                        ...theme.typography.typography15,
                        lineHeight: "18px",
                        fontWeight: "400",
                        color: theme.palette.common.black,
                        ":hover": {
                          bgcolor: theme.palette.primary[200],
                          color: theme.palette.common.white,
                        },
                      })}
                    >
                      {translate("StartShopping")}
                    </Button>
                  </Box>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </form>
  );
};

export default TrackOrder;
