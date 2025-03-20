import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const DialogBanner = ({ handleOpenClose = () => { }, open, data = {} }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={() => handleOpenClose()}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent sx={{ py: 2 }}>
          <Box
            sx={{
              mb: 2,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Typography
                component="h2"
                variant="typography46"
                sx={(theme) => ({
                  borderLeft: `2px solid ${theme.palette.primary.light}`,
                  padding: "0 1rem 0 1rem",
                  color: (theme) => theme.palette.dark.darker,
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  fontWeight: 400,
                })}
              >
                {data?.title}
              </Typography>
              <Box>
                <IconButton size="small" onClick={handleOpenClose}>
                  <Close />
                </IconButton>
              </Box>
            </Stack>
            <Divider />
          </Box>
          <Typography
            component="p"
            variant="typography14"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
            color="common.black"
            dangerouslySetInnerHTML={{
              __html: data?.description,
            }}
            sx={{
              letterSpacing: 1,
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

DialogBanner.propTypes = {
  handleOpenClose: PropTypes.func,
  open: PropTypes.bool,
};

export default DialogBanner;
