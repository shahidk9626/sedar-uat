import { NextFillImage } from "@/components/image";
import Stack from "@mui/material/Stack";
import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MobileBrand = ({ data = {} }) => {
  const router = useRouter();
  const [openBrand, setOpenBrand] = React.useState({
    open: false,
    data: null,
  });

  const handleClickOpen = (data) => {
    setOpenBrand({ open: true, data: data });
  };

  const handleClose = () => {
    setOpenBrand({ open: false, data: null });
  };
  return (
    <>
      <Grid container spacing={1}>
        {(data?.CHILD || data?.PARENT?.CHILD || [])?.map((item, index) => {
          return (
            <Grid
              item
              lg={4}
              md={4}
              sm={4}
              xs={4}
              xxs={4}
              key={`BRAND-FOR-MOBILE-${index}`}
              onClick={() => handleClickOpen(item)}
            >
              <Box
                componentt="div"
                sx={{
                  width: "100%",
                  height: "100px",
                  p: 2,
                  border: "1px solid #c1c9d0",
                  backgroundColor: "#F9FAFB",
                }}
              >
                <NextFillImage
                  src={item?.image_path}
                  alt="Image"
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "contain",
                    p: 1,
                    backgroundSize: "contain",
                    "&.MuiCard-root": {
                      borderRadius: 0.5,
                      boxShadow: "none",
                      position: "relative!important",
                      width: "100%!important",
                      height: "100%!important",
                    },
                  }}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  objectFit="contain"
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Dialog
        open={openBrand.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiPaper-rounded": {
            borderRadius: "5px!important",
            padding: 0,
          },
        }}
      >
        <DialogTitle>
          <Close
            sx={{ fontSize: "30px", float: "right" }}
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: "25px" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={(theme) => ({
                letterSpacing: 0,
                ...theme.typography.typography39,
                fontWeight: "normal",
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                mb: 0,
              })}
            >
              {openBrand?.data?.title}
            </Typography>
          </Stack>
          <Typography
            component="div"
            dangerouslySetInnerHTML={{
              __html: openBrand?.data?.description,
            }}
            sx={(theme) => ({
              "& p": {
                letterSpacing: 0,
                ...theme.typography.typography20,
                fontWeight: "normal",
                fontFamily: theme.fontFaces.helveticaNeueLight,
                mb: 0,
                lineHeight: "1.8",
              },
            })}
          />
          <Box pt={2}>
            <Button
              onClick={() => router.push(`${openBrand?.data?.link_url}`)}
              variant="contained"
              color="warning"
              fullWidth
              sx={{ py: 1.8, borderRadius: "0px" }}
            >
              {openBrand?.data?.link_title}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

MobileBrand.propTypes = {
  data: PropTypes.object,
};

export default MobileBrand;
