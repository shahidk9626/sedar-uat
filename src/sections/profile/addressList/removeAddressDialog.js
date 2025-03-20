import { useAuthContext } from "@/auth/useAuthContext";
import useProfileContext from "@/provider/profile/useProfileContext";
import { getProfileAddress } from "@/redux/slices/auth/profile";
import axiosInstance from "@/utils/axios";
import Close from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

const RemoveAddressDialog = ({ open = false, handleClose = () => { } }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { getAddress } = useProfileContext();
  const { state } = useAuthContext();
  const { cookies } = state;
  const {
    user,
    JWTAuthToken,
    USER_ID,
    cniso,
    visitorId,
    site,
    langName,
    CCYCODE,
    CCYDECIMALS,
    countryName,
  } = cookies || {};
  const { t: translate } = useTranslation();

  const deleteAddress = async () => {
    let formData = new FormData();

    let data = {
      cust_user_id: user.cust_email_id,
      auth_token: JWTAuthToken,
      site: site,
      cn_iso: cniso,
      visitorId: visitorId,
      lang: langName,
      currency: CCYCODE,
      ccy_decimal: CCYDECIMALS,
      country: countryName,
    };

    for (var key in data) {
      formData.append(key, data[key]);
    }

    await axiosInstance
      .post(`dashboard/delete_address/${open.id}/${USER_ID}`, formData)
      .then((response) => {
        if (response?.status === 200) {
          enqueueSnackbar(
            response?.data?.error_message || `${translate("Success")}`,
            {
              variant: "success",
              autoHideDuration: 4000
            }
          );
        }
        handleClose();
        if (user) {
          getAddress({
            USER_ID,
            cust_user_id: user?.cust_email_id,
            auth_token: JWTAuthToken,
          });
          dispatch(
            getProfileAddress({
              USER_ID: USER_ID,
              cust_user_id: user.cust_email_id,
              auth_token: JWTAuthToken,
            })
          );
        }
      })
      .catch((error) => {
        enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
          variant: "error",
          autoHideDuration: 4000
        });
      });
  };

  return (
    <>
      <Dialog
        open={open?.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
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
        </DialogTitle>
        <DialogContent
          sx={{
            py: "35px",
            width: {
              lg: "500px",
              md: "500px",
              sm: "100%",
              xs: "100%",
              xxs: "100%",
            },
          }}
        >
          <Stack spacing={3} alignItems={"center"}>
            <Typography
              sx={(theme) => ({
                ...theme.typography.typography16,
                fontFamily: theme.fontFaces.helveticaNeue,
                fontWeight: 200,
                letterSpacing: 0.5,
                color: (theme) => theme.palette.common.black,
              })}
            >
              {translate("AreyousureremovethisAdress")}
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <Button
                variant="outlined"
                sx={{
                  py: 0.2,
                  fontWeight: 200,
                  px: 2.5,
                  borderRadius: "4px",
                  color: (theme) => theme.palette.common.black,
                  fontFamily: (theme) => theme.fontFaces.helveticaNeueBold,
                  border: (theme) => `2px solid ${theme.palette.grey[2100]}`,
                  "&:hover": {
                    border: (theme) => `2px solid ${theme.palette.grey[2100]}`,
                  },
                }}
                onClick={handleClose}
              >
                {translate("Cancel")}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  fontWeight: 200,
                  py: 0.2,
                  px: 2.5,
                  borderRadius: "4px",
                  color: (theme) => theme.palette.common.black,
                  fontFamily: (theme) => theme.fontFaces.helveticaNeueBold,
                  border: (theme) => `2px solid ${theme.palette.grey[2100]}`,
                  "&:hover": {
                    border: (theme) => `2px solid ${theme.palette.grey[2100]}`,
                  },
                }}
                onClick={deleteAddress}
              >
                {translate("Delete")}
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

RemoveAddressDialog.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  handleClose: PropTypes.func,
};

export default RemoveAddressDialog;
