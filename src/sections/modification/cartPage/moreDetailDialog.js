import { NextFillImage } from "@/components/image";
import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const MoreDetailDialog = ({ open, handleClose }) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <Dialog open={open.open} onClose={handleClose}>
        <DialogTitle
          sx={(theme) => ({ fontSize: theme.typography.typography31 })}
        >
          {open?.data?.PRODUCT_DESC}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <Divider />
        <DialogContent>
          <Grid container spacing={2} direction={"row"} my={4}>
            <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
              <NextFillImage
                src={open?.data?.SOL_IMAGE_PATH}
                sx={{
                  width: "100%!important",
                  height: "100%!important",
                  objectFit: "contain",
                  backgroundSize: "contain",
                  "&.MuiCard-root": {
                    borderRadius: 0,
                    boxShadow: "none",
                    position: "relative!important",
                    width: "80%!important",
                    height: "100%!important",
                  },
                }}
                alt="Cart_summary"
                sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                objectFit="contain"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
              <Box>
                <Typography
                  sx={(theme) => ({
                    ...theme.typography.typography18,
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                  })}
                >
                  {translate("ItemCode")} :{" "}
                  {open?.data?.ROLL_CALCULATION?.ITEM_ID}
                </Typography>
                <Typography
                  sx={(theme) => ({
                    ...theme.typography.typography18,
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                  })}
                >
                  {translate("Dim")} : {open?.data?.SOL_WIDTH} x{" "}
                  {open?.data?.SOL_HEIGHT} {translate("cmcart")}
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    letterSpacing: 0.54,
                    fontSize: theme.typography.typography18,
                  })}
                >
                  {translate("recommended_mgs", {
                    roll: open?.data?.ROLL_CALC,
                  })}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MoreDetailDialog;
