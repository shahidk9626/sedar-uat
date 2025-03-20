import { OrderTab } from "@/styles/auth";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import React from "react";
import AllFav from "./allFav";
import { useTranslation } from "next-i18next";

const MoodFavDetail = () => {
  const [value, setValue] = React.useState("1");
  const { t: translate } = useTranslation();

  const handleChange = (event, newValue) => {

    setValue(newValue);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box
          pt={{ lg: 4, md: 4, sm: 0, xs: 0, xxs: 0 }}
          pl={{ lg: 4, md: 4, sm: 0, xs: 0, xxs: 0 }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                sx={{
                  "& .MuiTabs-indicator": {
                    height: "0.8px",
                  },
                }}
                onChange={handleChange}
              >
                <Tab label={<OrderTab>{translate("ForMyRoom")}</OrderTab>} value={"1"} />
                <Tab label={<OrderTab>Kitchen</OrderTab>} value={"2"} />
                <Tab label={<OrderTab>Outdoor</OrderTab>} value={"3"} />
              </TabList>
            </Box>
            <TabPanel value={"1"} sx={{ p: 0 }}>
              <AllFav />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
};

export default MoodFavDetail;
