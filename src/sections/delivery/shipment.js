import MuiCustomButton from "@/components/button/customButton";
import { NextFillImage } from "@/components/image";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import SnackbarProvider from "@/components/snackbar";
import { OrderSummarySection } from "@/modules/orderSummary";
import OutOfCoverageArea from "@/modules/outOfCoverageArea";
import useCartContext from "@/provider/cart/cartContext";
import { setMeasurementServiceInfo } from "@/redux/slices/delivery";
import { useDispatch, useSelector } from "@/redux/store";
import { CartPageShipment, CartPageShipmentDelivery } from "@/styles/cartPage";
import { apiDataService } from "@/utils/apiDataService";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { find } from "lodash";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CartDynamicBreadcrumb from "../cart/dynamicBreadcrumb";


const Shipment = ({ data, updateShippingPrice, deliveryCount }) => {

  const dispatch = useDispatch();
  const { cartState } = useCartContext();
  const { cartPopupData, cart, isCartLoading } = cartState;
  const { deliveryData, measurementServiceInfo, deliveryError, countryInfo } =
    useSelector((state) => state.delivery);
  const { address } = useSelector((state) => state.profileSetting);
  const [shipping_price, setShipping_price] = useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const { t: translate } = useTranslation();
  const router = useRouter();


  const addressCadId =
    address &&
    address?.result?.length > 0 &&
    find(address?.result, { cad_default_yn: "Y" })?.cad_id;

  let shipping_id = addressCadId;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const deliveryTypeFun = async (key, val, shipment_data = false) => {
    if (shipment_data && shipment_data.length > 0) {
      let del_days = shipment_data[0]["DEL_DAYS"];
      let measurement_req_val =
        val == "DO02"
          ? measurementServiceInfo[del_days]["SOL_MEASUREMENT_REQD_YN"]
          : "N";

      measurementServiceFun(measurement_req_val, shipment_data, val);
    }

    if (
      deliveryData &&
      deliveryData?.shipping_price?.ARAMEX_FEES &&
      deliveryData?.shipping_price?.ARAMEX_FEES > 0
    ) {
      let ship_price = deliveryData?.shipping_price?.ARAMEX_FEES
        ? deliveryData?.shipping_price?.ARAMEX_FEES
        : 0;
      setShipping_price(ship_price);

      if (shipment_data && shipment_data.length > 0) {
        updateShippingPrice(shipping_id, ship_price, shipment_data, "DO04");
      }
    } else if (
      ["delivery_with_installation"].indexOf(key) >= 0 &&
      val == "DO02"
    ) {
      let ship_price = deliveryData?.shipping_price?.DS_INSTALLATION_ZONE_FEES
        ? deliveryData?.shipping_price?.DS_INSTALLATION_ZONE_FEES
        : 0;
      setShipping_price(ship_price);

      if (shipment_data && shipment_data.length > 0) {
        updateShippingPrice(shipping_id, ship_price, shipment_data, "DO02");
      }
    } else if (deliveryData && val == "DO01") {
      let ship_price = deliveryData?.shipping_price?.DS_DELIVERY_ZONE_FEES
        ? deliveryData?.shipping_price?.DS_DELIVERY_ZONE_FEES
        : 0;
      setShipping_price(ship_price);
      if (shipment_data && shipment_data.length > 0) {
        updateShippingPrice(shipping_id, ship_price, shipment_data, "DO01");
      }
    } else {
    }
  };

  useEffect(() => {
    if (shipping_id && shipping_price && address?.result) {
      setTimeout(() => {
        updateShippingPrice(shipping_id, shipping_price);
      }, 100);
    }
  }, [shipping_price, shipping_id, address?.result]);

  const measurementServiceFun = async (
    val,
    shipment_data,
    carrier_code = false
  ) => {
    let data = { shipment_data: shipment_data, measurement_service: val };

    let del_days = shipment_data[0]["DEL_DAYS"];

    let carrier_code_val = carrier_code
      ? carrier_code
      : measurementServiceInfo[del_days]["SOL_CARRIER_CODE"];

    dispatch(
      setMeasurementServiceInfo({
        key: del_days,
        SOL_CARRIER_CODE: carrier_code_val,
        SOL_MEASUREMENT_REQD_YN: val,
      })
    );

    try {
      const response = await dispatch(
        apiDataService.post("shipping/measurementService", data)
      );
      if (response?.data) {
        console.log(response?.data, "shipping/measurementService");
      }
    } catch (error) {
      console.log("measurementService ERROR", error);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (
        deliveryData?.shipping_price &&
        deliveryData?.shipping_price.ARAMEX_FEES &&
        deliveryData?.shipping_price.ARAMEX_FEES > 0
      ) {
        deliveryTypeFun("delivery_only", "DO04");
      }
      deliveryData?.shipping_price &&
        Object.keys(deliveryData?.shipment_list || {}) &&
        Object.keys(deliveryData?.shipment_list || {}).map(
          (delivery_days, i) => {
            if (
              deliveryData?.shipping_price &&
              deliveryData?.shipment_list[delivery_days]
                .delivery_with_installation &&
              deliveryData?.shipment_list[delivery_days]
                .delivery_with_installation.length > 0
            ) {
              deliveryTypeFun("delivery_with_installation", "DO02");
            } else if (
              deliveryData?.shipping_price &&
              deliveryData?.shipment_list[delivery_days].delivery_only &&
              deliveryData?.shipment_list[delivery_days].delivery_only.length >
              0
            ) {
              deliveryTypeFun("delivery_only", "DO01");
            } else {
            }
          }
        );
    }, 500);
  }, [deliveryData, cart, address?.result]);

  return (
    <>
      <Box
        p={{ lg: 5, md: 5, sm: 1, xs: 0, xxs: 0 }}
        sx={{
          position: "sticky",
          top: 0,
        }}
      >
        <Box
          p={1}
          width={170}
          sx={{
            display: {
              lg: "block",
              md: "block",
              sm: "block",
              xs: "none",
              xxs: "none",
            },
          }}
        >
          <CustomLink link="/">
            <NextLazyLoadImage
              src={"/assets/shoppingAddress/smalllogo.webp"}
              alt="Sedar Logo"
              width={170}
              height={77}
              sx={{
                width: "100%!important",
                height: "100%!important",
                objectFit: "cover!important",
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
              objectFit="contain"
              upLgWidth={170}
              downLgWidth={170}
              downMdWidth={170}
              downSmWidth={170}
              downXsWidth={170}
            />
          </CustomLink>
        </Box>
        <Box
          sx={{
            display: {
              lg: "none",
              md: "none",
              sm: "none",
              xs: "block",
              xxs: "block",
            },
          }}
        >
          <Accordion
            sx={(theme) => ({
              "& .MuiAccordionSummary-root": {
                background: (theme) => theme.palette.common.white,
              },
            })}
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMore color="primary" />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography
                sx={(theme) => ({
                  flexShrink: 0,
                  fontSize: theme.typography.typography45,
                  fontFamily: theme.fontFaces.helveticaNeue,
                  color: theme.palette.primary.main,
                })}
              >
                {expanded === false
                  ? `${translate("Show_Order_Summary")}`
                  : `${translate("Hide_Order_Summary")}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SnackbarProvider>
                <OrderSummarySection isDelivery={true} />
              </SnackbarProvider>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box my={4} ml={1} mr={1}>
          <CartDynamicBreadcrumb />
        </Box>
        {data &&
          data?.shipment_list &&
          Object.keys(data?.shipment_list)?.length > 0
          ? Object.keys(data?.shipment_list)?.map(
            (delivery_days, deliverDayIndex) => {
              let business_day = 1;

              if (delivery_days > 1 && delivery_days < 5) {
                business_day = delivery_days - 1;
              } else if (delivery_days >= 5) {
                business_day = delivery_days - 2;
              } else {
                business_day = delivery_days;
              }
              return (
                <Box
                  my={2}
                  key={`SHIPMENT-DELIFER-${deliverDayIndex + 3}`}
                  ml={5}
                  mr={5}
                >
                  {Object.keys(data?.shipment_list[delivery_days]) &&
                    Object.keys(data?.shipment_list[delivery_days])?.length >
                    0 &&
                    Object.keys(data?.shipment_list[delivery_days]).map(
                      (shipment_type, index) => {
                        return (
                          <Grid
                            key={`DELIVERY-ITEM-${index}`}
                            container
                            my={1}
                            spacing={2}
                          >
                            <Grid xs={12} xxs={12}>
                              <Box>
                                <CartPageShipment>{`${translate("Shipment", {
                                  shipment_no: deliverDayIndex + 1,
                                })}`}</CartPageShipment>
                              </Box>
                            </Grid>
                            {data?.shipment_list[delivery_days][
                              shipment_type
                            ] &&
                              data?.shipment_list[delivery_days][
                                shipment_type
                              ]?.length > 0 &&
                              data?.shipment_list[delivery_days][
                                shipment_type
                              ].map((item, subIndex) => {
                                return (
                                  <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={3}
                                    xs={12}
                                    xxs={12}
                                    key={`ITEMS)ABCFGT-${subIndex}`}
                                  >
                                    <Box
                                      sx={{
                                        position: "relative",
                                      }}
                                    >
                                      {deliveryCount &&
                                        deliveryCount[item?.SOL_SYS_ID] && (
                                          <Box
                                            component="div"
                                            sx={(theme) => ({
                                              position: "absolute",
                                              left: 5,
                                              top: 5,
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              borderRadius: "50%",
                                              zIndex: 12,
                                              ...theme.typography
                                                .typography12,
                                            })}
                                          >
                                            <Chip
                                              color="primary"
                                              size="small"
                                              label={
                                                deliveryCount[
                                                  item?.SOL_SYS_ID
                                                ]
                                                  ? deliveryCount[
                                                  item?.SOL_SYS_ID
                                                  ]
                                                  : 0
                                              }
                                            />
                                          </Box>
                                        )}
                                      <NextLazyLoadImage
                                        src={
                                          item.SOL_IMAGE_PATH
                                            ? item.IMAGE_PATH +
                                            item.SOL_IMAGE_PATH
                                            : `/assets/images/profile/MaskGroup4322.png`
                                        }
                                        alt={item.SOL_IMAGE_PATH}
                                        width="400"
                                        height="300"
                                        sizes="(min-width: 0px) and (max-width: 1920px) 400vw"
                                        objectFit="contain"
                                        sx={{
                                          width: "150px!important",
                                          height: "150px!important",
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
                                      />
                                    </Box>
                                  </Grid>
                                );
                              })}
                            <Grid xs={12} xxs={12}>
                              <Box p={2}>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  defaultValue={
                                    data?.shipment_list[delivery_days][
                                      shipment_type
                                    ][0]?.SOL_CARRIER_CODE
                                  }
                                  onChange={(event) => {
                                    deliveryTypeFun(
                                      shipment_type,
                                      event.target.value,
                                      data?.shipment_list[delivery_days][
                                      shipment_type
                                      ]
                                    );
                                  }}
                                >
                                  <Stack
                                    direction={{
                                      lg: "row",
                                      md: "row",
                                      sm: "column",
                                      xs: "column",
                                      xxs: "column",
                                    }}
                                    spacing={{
                                      lg: 4,
                                      md: 4,
                                      sm: 1,
                                      xs: 1,
                                      xxs: 1,
                                    }}
                                  >
                                    {data?.shipment_list[delivery_days][
                                      shipment_type
                                    ][0].SOL_CARRIER_CODE != "DO04" && (
                                        <FormControlLabel
                                          control={<Radio />}
                                          label={
                                            <CartPageShipmentDelivery>
                                              {translate("Delivery")}
                                            </CartPageShipmentDelivery>
                                          }
                                          value="DO01"
                                        />
                                      )}
                                    {data?.shipment_list[delivery_days][
                                      shipment_type
                                    ][0].SOL_CARRIER_CODE == "DO04" && (
                                        <FormControlLabel
                                          control={<Radio />}
                                          label={
                                            <CartPageShipmentDelivery>
                                              {translate("Aramex_Delivery")}
                                            </CartPageShipmentDelivery>
                                          }
                                          value="DO04"
                                          defaultValue={
                                            data?.shipment_list[delivery_days][
                                              shipment_type
                                            ][0]?.SOL_CARRIER_CODE == "DO01"
                                              ? true
                                              : false
                                          }
                                        />
                                      )}

                                    <FormControlLabel
                                      disabled={
                                        [
                                          "delivery_with_installation",
                                        ].indexOf(shipment_type) == -1
                                          ? true
                                          : false
                                      }
                                      control={<Radio />}
                                      value="DO02"
                                      label={
                                        <>
                                          <CartPageShipmentDelivery
                                            sx={(theme) => ({
                                              fontSize:
                                                theme.typography.typography16,
                                              fontFamily:
                                                theme.fontFaces.helveticaNeue,
                                              fontWeight: 400,
                                            })}
                                          >
                                            {translate(
                                              "Delivery_With_Installation"
                                            )}
                                          </CartPageShipmentDelivery>
                                          {[
                                            "delivery_with_installation",
                                          ].indexOf(shipment_type) == -1 && (
                                              <Typography
                                                sx={(theme) => ({
                                                  ...theme.typography.caption,
                                                  color:
                                                    theme.palette.primary.main,
                                                })}
                                              >
                                                {translate(
                                                  "Installation_not_available"
                                                )}
                                              </Typography>
                                            )}
                                        </>
                                      }
                                    />
                                  </Stack>
                                </RadioGroup>
                              </Box>
                              {data?.shipment_list[delivery_days][
                                shipment_type
                              ][0]?.SOL_CARRIER_CODE == "DO02" &&
                                measurementServiceInfo?.[delivery_days]?.[
                                "SOL_CARRIER_CODE"
                                ] == "DO02" && (
                                  <Box>
                                    <Box>
                                      <Typography
                                        component="p"
                                        variant="typography16"
                                        sx={(theme) => ({
                                          fontFamily:
                                            theme.fontFaces
                                              .helveticaNeueLight,
                                          color: theme.palette.common.black,
                                          letterSpacing: 0.5,
                                        })}
                                      >
                                        {translate(
                                          "Free_Measurement_service"
                                        )}
                                      </Typography>
                                      <Typography
                                        component="p"
                                        variant="typography13"
                                        sx={(theme) => ({
                                          opacity: 0.5,
                                          fontFamily:
                                            theme.fontFaces
                                              .helveticaNeueLight,
                                          letterSpacing: 0.5,
                                        })}
                                      >
                                        (
                                        {translate("Additional_days", {
                                          days: data?.country_info
                                            ?.SCN_MEASUREMENT_DAYS,
                                        })}
                                        )
                                      </Typography>
                                    </Box>
                                    <Divider color="lightgrey" />
                                    <Box mt={2} p={2}>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        defaultValue={
                                          data?.shipment_list[delivery_days][
                                            shipment_type
                                          ][0]?.SOL_MEASUREMENT_REQD_YN
                                        }
                                        onChange={(event) => {
                                          measurementServiceFun(
                                            event.target.value,
                                            data?.shipment_list[
                                            delivery_days
                                            ][shipment_type]
                                          );
                                        }}
                                      >
                                        <Stack
                                          direction={{
                                            lg: "row",
                                            md: "row",
                                            sm: "column",
                                            xs: "column",
                                            xxs: "column",
                                          }}
                                          spacing={1}
                                        >
                                          <FormControlLabel
                                            control={<Radio />}
                                            label={
                                              <CartPageShipmentDelivery>
                                                {translate(
                                                  "No_sizes_are_confirmed"
                                                )}
                                              </CartPageShipmentDelivery>
                                            }
                                            value="N"
                                          />
                                          <FormControlLabel
                                            control={<Radio />}
                                            label={
                                              <CartPageShipmentDelivery>
                                                {translate(
                                                  "Yes_confirmation_needed"
                                                )}
                                              </CartPageShipmentDelivery>
                                            }
                                            value="Y"
                                          />
                                        </Stack>
                                      </RadioGroup>
                                    </Box>
                                    <Box mt={1} mb={1}>
                                      {measurementServiceInfo?.[
                                        delivery_days
                                      ]?.["SOL_MEASUREMENT_REQD_YN"] ==
                                        "Y" && (
                                          <Typography
                                            component="p"
                                            variant="typography14"
                                            sx={(theme) => ({
                                              fontFamily:
                                                theme.fontFaces.helveticaNeue,
                                              color: theme.palette.primary.main,
                                            })}
                                          >
                                            {translate(
                                              "Yes_confirmation_message"
                                            )}
                                          </Typography>
                                        )}
                                      {measurementServiceInfo?.[
                                        delivery_days
                                      ]?.["SOL_MEASUREMENT_REQD_YN"] ==
                                        "N" && (
                                          <Typography
                                            component="p"
                                            variant="typography14"
                                            sx={(theme) => ({
                                              fontFamily:
                                                theme.fontFaces.helveticaNeue,
                                              color: theme.palette.primary.main,
                                            })}
                                          >
                                            {translate(
                                              "No_sizes_are_confirmed_message"
                                            )}
                                          </Typography>
                                        )}
                                    </Box>
                                  </Box>
                                )}

                              <Stack direction={"row"} spacing={2} my={1}>
                                <Box
                                  width={{
                                    lg: 15,
                                    md: 15,
                                    sm: "10%",
                                    xs: "10%",
                                    xxs: "10%",
                                  }}
                                >
                                  <NextFillImage
                                    src="/assets/delivery/mover-truck.png"
                                    alt="home"
                                    sizes="(min-width: 0px) and (max-width: 1920px) 400vw"
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
                                        width: "max-content!important",
                                        height: "100%!important",
                                      },
                                    }}
                                  />
                                </Box>

                                {countryInfo &&
                                  countryInfo?.SCN_DEL_PROMPT_MSG_YN == "Y" &&
                                  countryInfo?.SCN_DEL_PROMPT_MSG ? (
                                  <Box component="div">
                                    <Typography
                                      component="p"
                                      variant="typography16"
                                      pt={2}
                                      letterSpacing={0}
                                      color="primary"
                                      fontFamily={(theme) =>
                                        theme.fontFaces.helveticaNeue
                                      }
                                    >
                                      {parse(countryInfo.SCN_DEL_PROMPT_MSG)}
                                    </Typography>
                                  </Box>
                                ) : (
                                  ""
                                )}

                                <Box>
                                  <Typography
                                    color={(theme) =>
                                      theme.palette.common.black
                                    }
                                    fontFamily={(theme) =>
                                      theme.fontFaces.helveticaNeueLight
                                    }
                                    fontSize="16px"
                                    fontWeight={400}
                                    sx={{ letterSpacing: 0.5 }}
                                  >
                                    {translate("Plannedshipping", {
                                      business_day:
                                        measurementServiceInfo?.[
                                          delivery_days
                                        ]?.["SOL_MEASUREMENT_REQD_YN"] == "Y"
                                          ? Number(
                                            data?.country_info
                                              ?.SCN_MEASUREMENT_DAYS
                                          ) + Number(business_day)
                                          : business_day,
                                      delivery_days:
                                        measurementServiceInfo?.[
                                          delivery_days
                                        ]?.["SOL_MEASUREMENT_REQD_YN"] == "Y"
                                          ? Number(
                                            data?.country_info
                                              ?.SCN_MEASUREMENT_DAYS
                                          ) + Number(delivery_days)
                                          : delivery_days,
                                    })}
                                  </Typography>
                                </Box>
                              </Stack>
                            </Grid>
                          </Grid>
                        );
                      }
                    )}
                </Box>
              );
            }
          )
          : ""}

        <Box
          my={4}
          sx={{ textAlign: "end", width: "100%" }}
          position="sticky"
          bottom={0}
          zIndex={14}
        >
          {!isCartLoading &&
            cartPopupData?.complete?.length > 0 &&
            data?.shipment_list &&
            Object.keys(data?.shipment_list)?.length > 0 ? (
            <MuiCustomButton
              fullWidth={true}
              buttonSx={(theme) => ({
                "&.MuiButton-root": {
                  [theme.breakpoints.up("lg")]: {
                    width: "50%", // Adjust the width as per your requirement for large screens
                  },
                  [theme.breakpoints.between("md", "lg")]: {
                    width: "50%", // Adjust the width as per your requirement for medium screens
                  },
                  [theme.breakpoints.down("md")]: {
                    width: "100%", // Adjust the width as per your requirement for small screens
                  },
                  borderRadius: "0px!important",
                  padding: "1rem!important",
                  background: theme.palette.primary.light,
                  ":hover": {
                    background: `${theme.palette.primary.light}!important`,
                  },
                  color: `${theme.palette.grey[4900]}!important`,
                  ...theme.typography.typography16,
                  fontFamily: theme.fontFaces.helveticaNeue,
                  fontWeight: 200,
                  letterSpacing: 0.5,
                },
              })}
              variant="contained"
              color="primary"
              title={translate("Continue_to_payment")}
              disabled={addressCadId && addressCadId ? false : true}
              onClick={() => {
                if (addressCadId) {
                  router.push("/cart/payment");
                }
              }}
            />
          ) : (

            !isCartLoading &&
            cartPopupData?.complete?.length > 0 &&
            data?.shipment_list &&
            Object.keys(data?.shipment_list)?.length <= 0 &&
            deliveryData?.return_status == "-301" && (
              <OutOfCoverageArea href="/cartPage" />
            )
          )}
        </Box>
      </Box>
    </>
  );
};

export default Shipment;
