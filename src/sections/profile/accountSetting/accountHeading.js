import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";

const AccountHeading = () => {
  const [value, setValue] = React.useState("1");
  const { t: translate } = useTranslation();

  return (
    <>
      <Container maxWidth="xl">
        <Box
          pl={{ lg: 9, md: 0, sm: 3, xs: 3, xxs: 1 }}
          sx={{ width: "100%", typography: "body1" }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                sx={{
                  "& .MuiTabs-indicator": {
                    height: "0.8px",
                  },
                }}
              >
                <Tab
                  label={
                    <Typography
                      sx={(theme) => ({
                        ...theme.typography.typography17,
                        fontWeight: 200,
                        fontFamily: theme.fontFaces.helveticaNeueBold
                      })}
                    >
                      {translate("AccountDetails")}
                    </Typography>
                  }
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

export default AccountHeading;
