import { RadioBox } from "@/components/form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import CartDilogue from "./addToCartDilogue";
const assets_path = process.env.NEXT_PUBLIC_IMAGE_URL + "assets/";

const CollectionLocationDilogue = ({
  open = false,
  setOpen = false,
  cartCityList,
  checkoutFormik,
}) => {
  const { t: translate } = useTranslation();

  return (
    <CartDilogue
      title={translate("Shipment_location")}
      open={open.open}
      setOpen={setOpen}
      fullWidth={true}
      maxWidth="md"
    >
      <Box>
        <Box sx={{ marginBottom: "20px" }}>
          <Typography component="p" variant="typography16">
            {translate("Shipment_location_mgs")}
          </Typography>
        </Box>
        <Stack spacing={1}>
          {cartCityList?.clickCollectResult &&
            cartCityList?.clickCollectResult?.length > 0 &&
            cartCityList?.clickCollectResult.map((item, index) => {
              return (
                <Box
                  key={`${item?.SSA_ADDRESS_TITLE}-${index}`}
                  sx={(theme) => ({
                    backgroundColor: theme.palette.grey[4800],
                    padding: "10px",
                    cursor: "pointer",
                  })}
                  onClick={() => {
                    checkoutFormik.setFieldValue("showRoomVal", item);
                    setOpen(false);
                  }}
                >
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item md={1}>
                      <RadioBox
                        formControlSx={{ width: "auto" }}
                        formSx={{ justifyContent: "left" }}
                        checked={
                          checkoutFormik?.values?.showRoomVal?.SSA_SYS_ID ==
                          item.SSA_SYS_ID
                        }
                        value={
                          checkoutFormik?.values?.showRoomVal?.SSA_SYS_ID ==
                          item.SSA_SYS_ID
                        }
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Typography
                        component="p"
                        variant="typography14"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueLight
                        }
                      >
                        {item?.SSA_ADDRESS_TITLE}
                      </Typography>
                    </Grid>
                    <Grid item md={2}>
                      <Typography
                        component="p"
                        variant="typography14"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueLight
                        }
                      >
                        {item?.SSA_CITY_NAME}
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography
                        component="p"
                        variant="typography14"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueLight
                        }
                      >
                        <Box
                          component="a"
                          sx={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                          href={"tel:" + item.SSA_PHONE_NO}
                        >
                          {item.SSA_PHONE_NO}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item md={1}>
                      <Typography
                        component="p"
                        variant="typography14"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueLight
                        }
                      >
                        <Box
                          component="a"
                          sx={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                          href={
                            item.SSA_GEO_LOCATION.length > 5
                              ? item.SSA_GEO_LOCATION
                              : "https://www.google.ae/maps/place/SEDAR"
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            alt="google map"
                            src={assets_path + "icon/google-maps.png"}
                            width="20px"
                            height="20px"
                          />
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
        </Stack>
      </Box>
    </CartDilogue>
  );
};

CollectionLocationDilogue.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.bool,
};


export default CollectionLocationDilogue;
