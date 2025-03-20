import { CustomTab, CustomTabList } from "@/styles/homepage/category";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import React, { useState } from "react";

const Tabs = ({
  children = React.Children,
  value = "",
  handleChange = () => { },
  tabData = [],
  keyName = "Tab",
}) => {
  const [selectedTab, setSelectedTab] = useState("1");
  return (
    <Box component="div" width="100%">
      <Container maxWidth="xl">
        <TabContext value={String(value)}>
          <CustomTabList
            onChange={handleChange}
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
            }}
          >
            {tabData &&
              tabData?.length > 0 &&
              tabData.map((item, index) => {
                const tabValue = String(index + 1);
                return (
                  <CustomTab
                    onClick={() => setSelectedTab(tabValue)}
                    label={item?.title}
                    value={String(index + 1)}
                    key={`${index}-TABS-DATA-${keyName}-${index}`}
                    sx={(theme) => ({
                      mt: 3,
                      fontFamily: theme.fontFaces.helveticaNeueBold,
                      ...theme.typography.typography18,
                      borderBottom:
                        selectedTab === tabValue
                          ? `2px solid ${theme.palette.primary[300]}`
                          : "none",
                      paddingLeft: "20px",
                    })}
                  />
                );
              })}
          </CustomTabList>
          {children}
        </TabContext>
      </Container>
    </Box>
  );
};

Tabs.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  tabData: PropTypes.array,
  keyName: PropTypes.string,
};

export default Tabs;
