import SnackbarProvider from "@/components/snackbar";
import ProductGridModule from "@/modules/product";
import ProductProvider from "@/provider/product/productProvider";
import {
  FreeSampleStep3SubTitle,
  FreeSampleStep3Title,
  FreeSampleSteps,
  FreeSampleStepsTitle,
} from "@/styles/freeSample";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

const Step3 = ({
  material,
  productsData,
  ProductFilters,
  freeSampleProducts,
}) => {
  const { t: translate } = useTranslation();
  const { push, pathname, query } = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = React.useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [anchorEl]
  );

  const handleClose = React.useCallback(
    (keyName, value) => {
      setAnchorEl(null);
      if (keyName && value) {
        const queryValue = {
          ...query,
          [keyName]: value,
        };
        push({
          pathname: pathname,
          query: queryValue,
        });
      }
    },
    [anchorEl]
  );

  return (
    <Container maxWidth="xl" id="OrderYourDesiredSample">
      <Divider />
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item lg={4} md={4} sm={12} xxs={12}>
          <Box py={2}>
            <FreeSampleSteps>{translate("STEP_3")} :</FreeSampleSteps>
            <FreeSampleStepsTitle>
              {translate("order_your_desired_sample")}
            </FreeSampleStepsTitle>
          </Box>
        </Grid>
        <Grid
          item
          lg={4}
          md={4}
          sm={12}
          xs={12}
          xxs={12}
          sx={{
            display: {
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
              xxs: "none",
            },
          }}
        >
          <Box textAlign="center">
            <FreeSampleStep3Title>
              {freeSampleProducts?.product &&
                freeSampleProducts?.product?.length > 0 &&
                freeSampleProducts?.product.find(
                  (item) => item?.link_url == material?.slug_url
                )?.desc}
            </FreeSampleStep3Title>
            <FreeSampleStep3SubTitle>
              {productsData?.result?.MATERIAL?.total_row_count}{" "}
              {translate("Swatches_Below")}
            </FreeSampleStep3SubTitle>
          </Box>
        </Grid>
        <Grid
          item
          lg={4}
          md={4}
          sm={12}
          xs={12}
          xxs={12}
          sx={{
            display: {
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
              xxs: "none",
            },
          }}
          textAlign="-webkit-right"
        >
          <Box component="div" sx={{ width: "180px" }}>
            <Button
              fullWidth
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="outlined"
              color="dark"
              sx={{ borderRadius: "0px", borderColor: "divider" }}
              size="medium"
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography
                  component="p"
                  variant="typography12"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                >
                  {translate("Color_Filter")}
                </Typography>
                <ArrowDropDown fontSize="small" />
              </Stack>
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
                role: "listbox",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleClose()}
              TransitionComponent={Fade}
              sx={{
                "& .MuiPaper-root": { maxWidth: "180px", width: "100%" },
              }}
            >
              {ProductFilters &&
                ProductFilters?.TAGS?.map((tag, index) => (
                  <MenuItem
                    key={index}
                    onClick={() =>
                      handleClose(
                        ProductFilters?.DESCRIPTION_EN,
                        tag?.DESCRIPTION_EN
                      )
                    }
                  >
                    <Typography
                      component="span"
                      mb={0}
                      variant="typography14"
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      fontWeight={500}
                      color="common.black"
                      sx={{ width: "100%" }}
                    >
                      {tag?.DESCRIPTION}
                    </Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Box py={2}>
        <ProductProvider>
          <SnackbarProvider>
            <ProductGridModule
              gridView={3}
              materialData={productsData?.result?.MATERIAL?.result}
              gridSm={6}
              gridXs={6}
              gridXxs={6}
              type="free_sample"
              pageCount={productsData?.result?.MATERIAL?.page_count}
              activePage={
                Number(productsData?.result?.MATERIAL?.active_page) || 1
              }
            />
          </SnackbarProvider>
        </ProductProvider>
      </Box>
    </Container>
  );
};

export default Step3;
