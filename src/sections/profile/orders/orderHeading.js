import OrderDetail from "@/modules/order/orderDetail";
import { OrderTab } from "@/styles/auth";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import { useTranslation } from "next-i18next";
import React from "react";
import ReturnDetail from "./returnHistory/returnDetail";
import ReturnItem from "./returnItem";

const OrderHeading = ({ data }) => {
  const { t: translate } = useTranslation();

  const [value, setValue] = React.useState("1");

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
                <Tab
                  label={<OrderTab>{translate("MyOrders")}</OrderTab>}
                  value={"1"}
                />
              </TabList>
            </Box>
            <TabPanel value={"1"} sx={{ p: 0 }}>
              <OrderDetail
                data={
                  data && data?.result && data?.result?.length > 0
                    ? data?.result
                    : []
                }
              />
            </TabPanel>
            <TabPanel value={"2"} sx={{ p: 0 }}>
              <ReturnDetail />
            </TabPanel>
            <TabPanel value={"3"} sx={{ p: 0 }}>
              <ReturnItem />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
};

export default OrderHeading;
