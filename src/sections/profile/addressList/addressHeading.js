import { AddressHeadingText } from "@/styles/auth";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import { useTranslation } from "next-i18next";

const AddressHeading = () => {
  const { t: translate } = useTranslation();

  return (
    <>
      <Container maxWidth="xl">
        <Box
          p={{ lg: 6, md: 6, sm: 0, xs: 0, xxs: 0 }}
          pl={{ lg: 3, md: 3, sm: 6, xs: 0, xxs: 0 }}
          sx={{ width: "100%", typography: "body1" }}
        >
          <TabContext value="1">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                sx={{
                  "& .MuiTabs-indicator": {
                    height: "0.8px",
                  },
                }}
              >
                <Tab
                  label={<AddressHeadingText>{translate("Addressbook")}</AddressHeadingText>}
                  value="1"
                />
              </TabList>
            </Box>
          </TabContext>
        </Box>
      </Container>
    </>
  );
};

export default AddressHeading;
