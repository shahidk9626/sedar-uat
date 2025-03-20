import FloatPrice from "@/modules/product/floatPrice";
import { OrderDetails } from "@/styles/auth";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const ViewDetail = ({ data, item }) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <Box>
        <Grid container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {item &&
              item?.payment_info.map((childItem, childIndex) => {
                return (
                  <Box key={childIndex} m={3}>
                    {childItem.PG_CARD_NUMBER ? (
                      <Typography
                        component="p"
                        variant="typography24"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueLight
                        }
                        color={(theme) => theme.palette.grey[6400]}
                      >
                        **************
                      </Typography>
                    ) : (
                      ""
                    )}
                    {childItem.PG_PAYMENT_OPTION ? (
                      <Typography
                        component="p"
                        variant="typography24"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueLight
                        }
                        letterSpacing={1}
                        color={(theme) => theme.palette.grey[6400]}
                      >
                        {childItem.PG_PAYMENT_OPTION}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {childItem.PG_PAYMENT_TYPE ? (
                      <Typography
                        component="p"
                        variant="typography24"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueLight
                        }
                        letterSpacing={1}
                        color={(theme) => theme.palette.grey[6400]}
                      >
                        {childItem.PG_PAYMENT_TYPE}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                );
              })}
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box mb={2}>
              <OrderDetails mb={1}>{translate("OrderSummary")}</OrderDetails>
              <Typography
                sx={(theme) => ({
                  fontSize: theme.typography.typography24,
                  fontFamily: theme.fontFaces.helveticaNeueLight,
                  color: theme.palette.grey[6400],
                  letterSpacing: 1,
                })}
              >
                {translate("items_subtotal")}:
                <Typography
                  pl={1}
                  component="span"
                  sx={(theme) => ({
                    fontSize: theme.typography.typography24,
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    color: theme.palette.grey[6400],
                    fontWeight: 600,
                  })}
                >
                  {translate(data?.SOL_CCY_CODE)}{" "}
                  <FloatPrice price={data?.SOL_VALUE} defaultDecimal={2} />
                </Typography>
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: theme.typography.typography24,
                  fontFamily: theme.fontFaces.helveticaNeueLight,
                  color: theme.palette.grey[6400],
                  letterSpacing: 0.8,
                })}
              >
                {translate("Shipping")}:
                <Typography
                  pl={1}
                  component="span"
                  sx={(theme) => ({
                    fontSize: theme.typography.typography24,
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    color: theme.palette.grey[6400],
                    fontWeight: 600,
                    letterSpacing: 0.8,
                  })}
                >
                  {data?.SOL_SHIP_VALUE > 0 ? (
                    <FloatPrice
                      price={data?.SOL_SHIP_VALUE}
                      defaultDecimal={2}
                    />
                  ) : (
                    translate("Free")
                  )}
                </Typography>
              </Typography>
              {data?.SOL_PROMO_VALUE > 0 ? (
                <Typography
                  pr={1}
                  sx={(theme) => ({
                    fontSize: theme.typography.typography24,
                    fontFamily: theme.fontFaces.helveticaNeueThin,
                    fontWeight: theme.typography.fontWeightBold,
                    letterSpacing: 0.8,
                  })}
                >
                  {translate("Promo_discount")}:
                  <OrderDetails pl={1} component="span">
                    <FloatPrice price={data?.SOL_PROMO_VALUE} />
                  </OrderDetails>
                </Typography>
              ) : (
                ""
              )}
            </Box>
            <Divider color="grey" />
            <Box mt={1.5} mb={1}>
              <Typography
                component="label"
                variant="typography24"
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  color: theme.palette.common.black,
                  letterSpacing: 0.8,
                })}
              >
                {translate("Total")} :
                <Typography
                  pl={1}
                  component="span"
                  variant="typography24"
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontWeight: 500,
                    color: theme.palette.primary[100],
                  })}
                >
                  {translate(data?.SOL_CCY_CODE)}
                  <FloatPrice
                    price={data?.SOL_GROSS_VALUE}
                    defaultDecimal={2}
                  />
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewDetail;
