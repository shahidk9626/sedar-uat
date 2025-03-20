import { useSelector } from "@/redux/store";
import Typography from "@mui/material/Typography";
import React from "react";
import parse from "html-react-parser";
import useCartContext from "@/provider/cart/cartContext";

const ReadOnlyAddress = () => {
  const { cartState } = useCartContext();
  const { cart } = cartState;
  return (
    <>
      <Typography
        variant="typography16"
        component="p"
        fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
      >
        Showroom Address
      </Typography>
      <Typography
        variant="typography16"
        component="p"
        fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
        letterSpacing=".54px"
      >
        {parse(cart?.shipping_info?.SSA_ADDRESS_DESC)}
      </Typography>
      <Typography
        variant="typography16"
        component="p"
        fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
        letterSpacing=".54px"
      >
        {cart?.shipping_info?.SSA_CITY_NAME}, {cart?.shipping_info?.SSA_SCN_ISO}
      </Typography>
      <Typography
        variant="typography16"
        component="p"
        fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
        letterSpacing=".54px"
      >
        {cart?.shipping_info?.SSA_PHONE_NO}
      </Typography>
      <Typography
        variant="typography16"
        component="p"
        fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
        letterSpacing=".54px"
        sx={{ wordWrap: "anywhere" }}
      >
        {cart?.shipping_info?.SSA_MANAGER_EMAIL_ID}
      </Typography>
    </>
  );
};

export default ReadOnlyAddress;
