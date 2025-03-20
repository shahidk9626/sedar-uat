import SnackbarProvider from "@/components/snackbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";
import EditProfileFormSection from "./editProfileForm";
import EditHeading from "./heading";

const EditProfileForm = () => {
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  const { t: translate } = useTranslation();
  return (
    <>
      <Container maxWidth="xl">
        <Box
          pl={{ lg: 4, md: 4, sm: 0, xs: 0, xxs: 0 }}
          sx={{ width: "100%", typography: "body1" }}
        >
          {updateSuccess && (
            <Box>
              <Typography>
                {translate("YourProfileUpdatedSuccessfully")}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
      <EditHeading />
      <SnackbarProvider>
        <EditProfileFormSection setUpdateSuccess={setUpdateSuccess} />
      </SnackbarProvider>
    </>
  );
};

export default EditProfileForm;
