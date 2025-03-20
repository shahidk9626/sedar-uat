import { useAuthContext } from "@/auth/useAuthContext";
import SnackbarProvider from "@/components/snackbar";
import useProfileContext from "@/provider/profile/useProfileContext";
import { getProfileAddress } from "@/redux/slices/auth/profile";
import { useDispatch } from "@/redux/store";
import { AddressHeadingText, AddressText } from "@/styles/auth";
import { apiDataService } from "@/utils/apiDataService";
import Add from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import AddNewAddressDialog from "./addNewAddressDialog";
import RemoveAddressDialog from "./removeAddressDialog";


const AddressDetail = () => {
  const { profileState, getAddress } = useProfileContext();
  const { address } = profileState;
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user, JWTAuthToken, USER_ID } = cookies || {};
  const dispatch = useDispatch();
  const [newAddress, setNewAddress] = useState({
    id: "new",
    open: false,
    data: null,
  });
  const [open, setOpen] = useState({
    id: "",
    open: false,
  });

  const handleClose = () => {
    setOpen({ open: false, id: "" });
  };

  const handleClose2 = () => {
    setNewAddress({
      id: "new",
      open: false,
      data: null,
    });
  };

  const setDefaultAddress = (id) => {
    if (user) {
      dispatch(
        apiDataService.post(
          `dashboard/default_address_update/${id}/${USER_ID}`,
          {
            cust_user_id: user?.cust_email_id,
            auth_token: JWTAuthToken,
            cad_default_yn: "Y",
          }
        )
      )
        .then((response) => {
          if (response.status === 200) {
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
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ marginTop: { lg: 0, md: 0, sm: 3, xs: 3, xxs: 3 } }}
      >
        <Box pl={{ lg: 3, md: 3, sm: 6, xs: 0, xxs: 0 }}>
          <Grid container spacing={2}>
            {address &&
              address?.result &&
              address?.result?.length > 0 &&
              address?.result?.map((item, index) => {
                const result = [
                  item?.cad_building_name_no,
                  item?.cad_floor_no,
                  item?.cad_nearest_landmark,
                ]
                  .filter(Boolean)
                  .join(", ");
                return (
                  <Grid
                    item
                    xl={4}
                    lg={6}
                    md={6}
                    sm={6}
                    xs={6}
                    xxs={12}
                    key={`ADD-ADDRESS-${index}`}
                  >
                    <Card
                      onClick={() => {
                        if (item?.cad_default_yn != "Y") {
                          setDefaultAddress(item.cad_id);
                        }
                      }}
                      variant="outlined"
                      sx={{
                        ...(item?.cad_default_yn == "Y" && {
                          border: (theme) =>
                            `2px solid ${theme.palette.primary.main}`,
                        }),
                        "&:hover": {
                          border: (theme) =>
                            `1px solid ${theme.palette.primary.main}`,
                        },
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                        borderRadius: "1px",
                        border: "2px solid lightgrey",
                      }}
                    >
                      <CardContent>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Box>
                            <FormControlLabel
                              value="male"
                              control={
                                <Radio
                                  checked={item?.cad_default_yn == "Y"}
                                />
                              }
                              label={
                                <>
                                  <AddressHeadingText
                                    sx={{
                                      color: (theme) =>
                                        theme.palette.grey[6400],
                                    }}
                                  >
                                    {item?.cad_first_name} {item?.cad_last_name}
                                  </AddressHeadingText>
                                </>
                              }
                            />
                          </Box>
                          <Box>
                            <Chip
                              color="primary"
                              label={item?.cad_address_type}
                              variant="outlined"
                              sx={(theme) => ({
                                height: "23px",
                                cursor: "pointer",
                                fontSize: "12px",
                                fontFamily: theme.fontFaces.helveticaNeueBold,
                                fontWeight: 500,
                              })}
                            />
                          </Box>
                        </Stack>
                        <Box mt={2} pl={3}>
                          <AddressText
                            sx={{
                              color: (theme) => theme.palette.grey[6400],
                            }}
                          >{`${result}, `}</AddressText>
                          <AddressText
                            sx={{
                              color: (theme) => theme.palette.grey[6400],
                            }}
                          >
                            {item?.cad_city_area_desc},{item?.cad_city_desc},
                            {item?.cad_country}
                          </AddressText>
                          <AddressText
                            sx={{
                              color: (theme) => theme.palette.grey[6400],
                            }}
                          >
                            {item?.cad_postal_code}
                          </AddressText>
                          <AddressText>
                            {translate("Landmark")} :
                            {item?.cad_nearest_landmark}
                          </AddressText>
                          <AddressText>
                            {translate("Mobile")}:{item?.cad_contact_number}
                          </AddressText>
                          <AddressText>
                            {translate("Email")}: {user?.cust_email_id}
                          </AddressText>
                        </Box>

                        <Stack direction={"row"} spacing={2} pt={2} pl={3}>
                          <Button
                            variant="outlined"
                            sx={{
                              py: 0.2,
                              px: 2.5,
                              borderRadius: "4px",
                              fontFamily: (theme) =>
                                theme.fontFaces.helveticaNeueMedium,
                              color: (theme) => theme.palette.common.black,
                              border: (theme) =>
                                `2px solid ${theme.palette.grey[2100]}`,
                              "&:hover": {
                                border: (theme) =>
                                  `2px solid ${theme.palette.grey[2100]}`,
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpen({ open: true, id: item?.cad_id });
                            }}
                          >
                            {translate("Remove")}
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setNewAddress({
                                open: true,
                                id: item?.cad_id,
                                data: item,
                              });
                            }}
                            variant="outlined"
                            sx={{
                              py: 0.2,
                              px: 2.5,
                              borderRadius: "4px",
                              fontFamily: (theme) =>
                                theme.fontFaces.helveticaNeueMedium,
                              color: (theme) => theme.palette.common.black,
                              border: (theme) =>
                                `2px solid ${theme.palette.grey[2100]}`,
                              "&:hover": {
                                border: (theme) =>
                                  `2px solid ${theme.palette.grey[2100]}`,
                              },
                            }}
                          >
                            {translate("Edit")}
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
        <Box
          p={4}
          px={{ lg: 1, md: 1, sm: 0, xs: 0, xxs: 0 }}
          pl={{ lg: 3, md: 3, sm: 6, xs: 0, xxs: 0 }}
        >
          <Button
            variant="outlined"
            onClick={() => setNewAddress({ open: true, id: "new" })}
            sx={(theme) => ({
              fontWeight: 200,
              py: 1.2,
              borderRadius: "0px",
              color: (theme) => theme.palette.common.black,
              border: (theme) => `2px solid ${theme.palette.grey[2100]}`,
              borderRadius: "0px",
              width: {
                lg: "38%",
                md: "38%",
                sm: "100%",
                xs: "100%",
                xxs: "100%",
              },
              "&:hover": {
                border: (theme) => `2px solid ${theme.palette.grey[2100]}`,
              },
              fontFamily: theme.fontFaces.helveticaNeueBold,
              ...theme.typography.typography16,
            })}
            startIcon={<Add />}
          >
            {translate("AddNewAddress")}
          </Button>
        </Box>
      </Container>
      <SnackbarProvider>
        <RemoveAddressDialog open={open} handleClose={handleClose} />
        <AddNewAddressDialog
          newAddress={newAddress}
          handleClose2={handleClose2}
        />
      </SnackbarProvider>
    </>
  );
};

export default AddressDetail;
