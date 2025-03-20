import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify/Iconify";
import SnackbarProvider from "@/components/snackbar";
import { getEditProfile } from "@/redux/slices/auth/profile";
import { useDispatch } from "@/redux/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import MobileDialog from "./mobileDialog/mobileDialog";


const AccountDetail = ({ data = {} }) => {
  const router = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { JWTAuthToken, user } = cookies || {};
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { t: translate } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (user) {
      dispatch(
        getEditProfile({
          USER_ID: cookies?.USER_ID,
          cust_user_id: user?.cust_email_id,
          auth_token: JWTAuthToken,
        })
      );
    }
  }, []);

  const rows = useMemo(() => {
    return [
      createData(
        `${translate("Email")}`,
        `${data?.cust_email_id ? data?.cust_email_id : "--"}`
      ),
      createData(
        `${translate("FirstName")}`,
        `${data?.cust_first_name ? data?.cust_first_name : "--"}`
      ),
      createData(
        `${translate("LastName")}`,
        `${data?.cust_last_name ? data?.cust_last_name : "--"}`
      ),
      createData(
        `${translate("Mobile")}`,
        <Stack direction="row" spacing={2} alignItems="start">
          <Box
            component="div"
            sx={(theme) => ({
              ...(theme.direction == "rtl" && {
                direction: "rtl",
                textAlign: "end",
              }),
            })}
          >
            {user?.cust_mobile_no ? user?.cust_mobile_no : "--"}
          </Box>
          <Tooltip
            title={translate("update_mobile_no")}
            placement="bottom-start"
          >
            <IconButton onClick={handleClickOpen} sx={{ p: 0 }}>
              <Iconify
                icon="fa-solid:edit"
                width={25}
                sx={{ cursor: "pointer", color: "#3366FF" }}
              />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
      createData(
        `${translate("Country")}`,
        `${data?.cust_nationality ? data?.cust_nationality : "--"}`
      ),

      createData(
        `${translate("City")}`,
        ` ${data?.cust_city_desc ? data?.cust_city_desc : "--"}`
      ),
      createData(
        `${translate("JoinedDate")}`,
        `${data?.joined_date ? data?.joined_date : "--"}`
      ),
    ];
  }, [data, cookies]);

  function createData(info, detail) {
    return { info, detail };
  }

  return (
    <Box pl={{ lg: 12, md: 3, sm: 6, xs: 5, xxs: 5 }}>
      <Box>
        {rows.map((row, index) => (
          <Grid
            key={`Account_Setting-${row?.info || index}`}
            container
            spacing={2}
            mt={0.5}
            borderBottom={(theme) => ({
              lg: `none`,
              md: `none`,
              sm: `2px solid ${theme.palette.divider}`,
              xs: `2px solid ${theme.palette.divider}`,
              xxs: `2px solid ${theme.palette.divider}`,
            })}
          >
            <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
              <Typography
                component="div"
                variant="subtitle3"
                sx={(theme) => ({ fontFamily: theme.fontFaces.helveticaNeue })}
              >
                {row?.info}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
              {row?.info == translate("JoinedDate") ? (
                <Typography
                  sx={(theme) => ({
                    ...(theme.direction == "rtl" && {
                      direction: "rtl",
                      textAlign: "end",
                    }),
                  })}
                  component="div"
                  variant="subtitle3"
                >
                  {row?.detail}
                </Typography>
              ) : (
                <Typography component="div" variant="subtitle3">
                  {row?.detail}
                </Typography>
              )}
            </Grid>
          </Grid>
        ))}
      </Box>
      <Stack
        direction={{
          lg: "row",
          md: "row",
          sm: "row",
          xs: "row",
          xxs: "column",
        }}
        spacing={4}
        pl={{ lg: 2, md: 2, sm: 0, xs: 0, xxs: 0 }}
        my={2}
        width={"100%"}
      >
        <Button
          onClick={() => router.push("/dashboard/profile/edit-profile")}
          variant="outlined"
          sx={(theme) => ({
            ...theme.typography.typography16,
            fontFamily: theme.fontFaces.helveticaNeueBold,
            color: theme.palette.grey[4900],
            maxWidth: {
              lg: "35%",
              md: "35%",
              sm: "35%",
              xs: "35%",
              xxs: "90%",
            },
            width: "100%",
            py: 1.4,
            px: 6,
            borderRadius: "0px",
            border: (theme) => `1px solid ${theme.palette.grey[2100]}`,
            "&:hover": {
              border: (theme) => `1px solid ${theme.palette.grey[2100]}`,
            },
          })}
        >
          {translate("Edit")}
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => router.push("/dashboard/profile/change-password")}
          sx={(theme) => ({
            ...theme.typography.typography16,
            fontFamily: theme.fontFaces.helveticaNeueBold,
            color: theme.palette.grey[4900],
            maxWidth: {
              lg: "35%",
              md: "35%",
              sm: "35%",
              xs: "35%",
              xxs: "90%",
            },
            width: "100%",
            py: 1.4,
            px: 3,
            borderRadius: "0px",
            border: (theme) => `1px solid ${theme.palette.grey[2100]}`,
            "&:hover": {
              border: (theme) => `1px solid ${theme.palette.grey[2100]}`,
            },
          })}
        >
          {translate("ChangePassword")}
        </Button>
      </Stack>
      <SnackbarProvider>
        <MobileDialog
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      </SnackbarProvider>
    </Box>
  );
};

AccountDetail.propTypes = {
  data: PropTypes.object,
};

export default AccountDetail;
