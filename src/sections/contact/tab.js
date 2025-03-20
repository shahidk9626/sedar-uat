import { TabListStyled } from "@/styles/contact";
import { TabContext, TabPanel } from "@mui/lab";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import * as React from "react";
import CustomizedAccordions from "./accordian";
import { useState } from "react";

VerticalTabs.propTypes = {
  data: PropTypes.object,
};

export default function VerticalTabs({ data = {} }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", py: 5 }}
    >
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={activeIndex.toString()}>
          <Grid container>
            <Grid item md={4} sm={12} xs={12} xxs={12}>
              <TabListStyled>
                {data?.CHILD?.map((item, index) => (
                  <Box
                    key={index}
                    component="h3"
                    onClick={() => handleTabClick(index)}
                    sx={{
                      fontFamily: (theme) => theme.fontFaces.helveticaNeueMedium,
                      color: (theme) =>
                        activeIndex === index
                          ? theme.palette.primary.main
                          : theme.palette.common.black,
                      fontWeight: 500,
                      cursor: "pointer",
                      borderBottom: (theme) =>
                        activeIndex === index
                          ? `2px solid ${theme.palette.primary.main}`
                          : "2px solid transparent",
                      transition: "color 0.3s, border-bottom 0.3s",
                      "&:hover": {
                        color: (theme) => theme.palette.primary.main,
                      },
                      py: 1,
                    }}
                  >
                    {item?.title}
                  </Box>
                ))}
              </TabListStyled>
            </Grid>

            <Grid item md={8} xs={12} xxs={12}>
              {data?.CHILD?.map((item, index) => (
                <TabPanel
                  key={index}
                  value={index.toString()}
                  sx={{ display: activeIndex === index ? "block" : "none" }}
                >
                  <CustomizedAccordions subData={item} />
                </TabPanel>
              ))}
            </Grid>
          </Grid>
        </TabContext>
      </Box>
    </Box>
  );
}
