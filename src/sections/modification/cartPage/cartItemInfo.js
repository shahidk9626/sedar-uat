import { useAuthContext } from "@/auth/useAuthContext";
import { TextBox } from "@/components/form";
import useCartContext from "@/provider/cart/cartContext";
import { updateLineTable } from "@/redux/slices/product";
import { apiDataService } from "@/utils/apiDataService";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartDilogue from "./addToCartDilogue";
import CustomBreadCrumb from "./breadCrumb";
import CartSummary from "./cartSummary";
import CollectionLocationDilogue from "./collectionLocationDilogue";
import FreeSample from "./freeSample";
import InfoDialog from "./infoDialog";
import MoreDetailDialog from "./moreDetailDialog";
import MoreDetailDialogSecond from "./moreDetailDialogSecond";
import RemoveItemDilogue from "./removeItemDilogue";
import SavedItems from "./savedItems";
import SectionOne from "./sectionOne";
import SectionThree from "./sectionThree";
import SectionTwo from "./sectionTwo";

const CartItemInfo = ({ data = [], formik, checkoutFormik }) => {
  const router = useRouter();
  const { getMyCartData } = useCartContext();
  const { state } = useAuthContext();
  const { cookies, isAuthenticated } = state;
  const { modificationUser } = cookies || {};
  let head_sys_id = modificationUser?.head_sys_id
    ? modificationUser?.head_sys_id
    : 0;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { deliveryPolicyFun, cartCityList } = useSelector(
    (state) => state.cartPage
  );
  const [dialogueState, setDialogueState] = useState({
    deliveryOpen: { open: false, data: "" },
    collectOpen: false,
    locationOpen: { open: false, data: null },
    removeItemOpen: { open: false, data: "" },
    moreDetailOpen: { open: false, data: null },
    moreDetailSecondOpen: { open: false, data: "" },
    info: { open: false, data: "" },
  });

  const {
    deliveryOpen,
    locationOpen,
    removeItemOpen,
    moreDetailOpen,
    moreDetailSecondOpen,
    info,
  } = dialogueState;

  const handleDialogueOpen = useCallback((key, data) => {
    setDialogueState((prevState) => ({
      ...prevState,
      [key]: { open: true, data: data },
    }));
  }, []);

  const handleDialogueClose = useCallback((key) => {
    setDialogueState((prevState) => ({
      ...prevState,
      [key]: { open: false, data: null },
    }));
  }, []);
  const orderDelete = async (data) => {
    try {
      const response = await dispatch(
        apiDataService.Delete(`v2/cart/${data?.SOL_SYS_ID}`)
      );
      if (response?.status === 200) {
        enqueueSnackbar(response?.data?.error_message) ||
          `${translate("Success")}`;
        handleDialogueClose("removeItemOpen");
        getMyCartData({
          params: { soh_sys_id: head_sys_id || 0 },
        });
      }
    } catch (error) {
      console.log(`${translate("SomethingWentWrong")}`, error);
    }
  };

  const updateCartTable = async (SOL_SYS_ID, line_type, line_value) => {
    try {
      const response = await dispatch(
        updateLineTable({
          SOL_SYS_ID: SOL_SYS_ID,
          values: {
            line_type: line_type,
            line_value: line_value,
            soh_sys_id: 0,
          },
        })
      );
      const data = response?.data;
      if (data.error_message == "Success" && data.return_status == 0) {
        getMyCartData({
          params: { soh_sys_id: head_sys_id || 0 },
        });
      } else {
        dispatch(slice.actions.hasAddToCartError(data));
      }
    } catch (error) {
      console.log("TEST CARTPAGE", error);
    }
  };
  return (
    <Box
      my={{ lg: 5, md: 5, sm: 0, xs: 0, xxs: 0 }}
      sx={(theme) => ({
        backgroundColor: {
          lg: theme.palette.common.white,
          md: theme.palette.common.white,
          sm: theme.palette.common.white,
          xxs: theme.palette.grey[3500],
          xs: theme.palette.grey[3500],
        },
      })}
    >
      <Container maxWidth="xl">
        <CustomBreadCrumb />
        <Grid container spacing={2}>
          <Grid item md={8} sm={7} xs={12} xxs={12}>
            <Stack spacing={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                display={{
                  lg: "flex",
                  md: "flex",
                  sm: "none",
                  xs: "none",
                  xxs: "none",
                }}
              >
                <Box>
                  <Typography
                    component="span"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      fontSize: 25,
                    })}
                  >
                    {translate("Cart")} ( {data?.cart_count?.QTY}{" "}
                    {translate("items")} )
                  </Typography>
                </Box>
                <Box onClick={() => router.push("/")}>
                  <Button
                    sx={{
                      borderRadius: "0px",
                      py: 1.5,
                      px: 3,
                      fontFamily: (theme) => theme.fontFaces.helveticaNeueBold,
                    }}
                    variant="outlined"
                    color="dark"
                  >
                    {translate("ContinueShopping")}
                  </Button>
                </Box>
              </Stack>

              {data &&
                data?.cart_count?.QTY &&
                data?.cart_count?.QTY?.length > 0 && (
                  <React.Fragment>
                    {data?.complete?.length > 0 && <SectionOne />}
                    {data?.complete?.map((item, index) => {
                      if (item?.SOL_ITEM_LABEL != "SAMPLE") {
                        return (
                          <Box
                            sx={(theme) => ({
                              backgroundColor: {
                                lg: theme.palette.common.white,
                                md: theme.palette.common.white,
                                sm: theme.palette.common.white,
                                xxs: theme.palette.common.white,
                                xs: theme.palette.common.white,
                              },
                            })}
                            id={"ordercol_" + item.SOL_SYS_ID}
                            key={`CART-ITEM-${index}`}
                          >
                            <SectionTwo
                              index={index}
                              data={data}
                              isAuthenticated={isAuthenticated}
                              item={item}
                              handleDialogueOpen={handleDialogueOpen}
                              updateCartTable={updateCartTable}
                            />
                          </Box>
                        );
                      }
                    })}
                    {data &&
                      data?.free_sample &&
                      data?.free_sample?.length > 0 && (
                        <>
                          <Box
                            display={{
                              lg: "block",
                              md: "block",
                              sm: "none",
                              xs: "none",
                              xxs: "none",
                            }}
                            sx={(theme) => ({
                              backgroundColor: theme.palette.grey[3500],
                              p: 1,
                            })}
                          >
                            <Grid container spacing={2}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Typography
                                  sx={(theme) => ({
                                    fontFamily:
                                      theme.fontFaces.helveticaNeueMedium,
                                    fontSize: 14,
                                    color: "common.black",
                                  })}
                                >
                                  {translate("free_sample")}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                          <FreeSample
                            data={data}
                            handleDialogueOpen={handleDialogueOpen}
                            handleDialogueClose={handleDialogueClose}
                            updateCartTable={updateCartTable}
                          />
                        </>
                      )}

                    <Box>
                      <TextBox
                        label={
                          <Typography
                            color={(theme) => theme.palette.common.black}
                          >
                            {translate("Order_Notes")}
                          </Typography>
                        }
                        fullWidth
                        variant="standard"
                        multiline={true}
                      />
                    </Box>
                    <SectionThree
                      checkoutFormik={checkoutFormik}
                      handleDialogueOpen={handleDialogueOpen}
                      deliveryPolicyFun={deliveryPolicyFun}
                    />
                  </React.Fragment>
                )}
              <Box my={3}>
                <SavedItems data={data} updateCartTable={updateCartTable} />
              </Box>
            </Stack>
          </Grid>
          {data &&
            data?.cart_count?.QTY &&
            data?.cart_count?.QTY?.length > 0 &&
            head_sys_id?.length > 0 && (
              <Grid item md={4} sm={5} xs={12} xxs={12}>
                <CartSummary
                  data={data}
                  deliveryPolicyFun={deliveryPolicyFun}
                  formik={formik}
                  checkoutFormik={checkoutFormik}
                  handleDilogueLocationOpen={handleDialogueOpen}
                />
              </Grid>
            )}
        </Grid>
      </Container>
      <RemoveItemDilogue
        open={removeItemOpen.open}
        setOpen={() => handleDialogueClose("removeItemOpen")}
      >
        <Typography variant="typography18" letterSpacing={0.5}>
          {translate("Areyousureremove")}
        </Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <Button
            variant="contained"
            sx={{
              fontFamily: (theme) => theme.fontFaces.helveticaNeueMedium,
              fontWeight: 200,
              fontSize: "12px",
              color: (theme) => theme.palette.grey[5900],
              backgroundColor: (theme) => theme.palette.common.black,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.common.black,
              },
            }}
            onClick={() => orderDelete(removeItemOpen.data)}
          >
            {translate("Yes")}
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDialogueClose("removeItemOpen")}
            sx={{
              fontFamily: (theme) => theme.fontFaces.helveticaNeueMedium,
              fontWeight: 200,
              fontSize: "12px",
              color: (theme) => theme.palette.grey[5900],
              backgroundColor: (theme) => theme.palette.common.black,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.common.black,
              },
            }}
          >
            {translate("No")}
          </Button>
        </Stack>
      </RemoveItemDilogue>
      <CollectionLocationDilogue
        open={locationOpen}
        setOpen={() => handleDialogueClose("locationOpen")}
        cartCityList={cartCityList}
        checkoutFormik={checkoutFormik}
      />
      <Box>
        <MoreDetailDialog
          open={moreDetailOpen}
          handleClose={() => handleDialogueClose("moreDetailOpen")}
        />
        <MoreDetailDialogSecond
          open={moreDetailSecondOpen}
          handleClose={() => handleDialogueClose("moreDetailSecondOpen")}
        />
        {info?.data?.policyDataList?.length > 0 && (
          <InfoDialog
            open={info}
            handleClose={() => handleDialogueClose("info")}
          />
        )}
      </Box>
      {deliveryOpen?.data?.policyDataList?.length > 0 && (
        <CartDilogue
          title={deliveryOpen.data.policyDataList[0].title}
          open={deliveryOpen.open}
          setOpen={() => handleDialogueClose("deliveryOpen")}
        >
          <Typography
            component="div"
            dangerouslySetInnerHTML={{
              __html: deliveryOpen.data.policyDataList[0].description,
            }}
          />
        </CartDilogue>
      )}
    </Box>
  );
};

CartItemInfo.propTypes = {
  data: PropTypes.array,
};

export default React.memo(CartItemInfo);
