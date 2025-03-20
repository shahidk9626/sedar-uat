import { MuiTabListStyled, TabListStyled } from "@/styles/contact";
import { TabContext, TabPanel } from "@mui/lab";
import { Divider, Grid, Tab, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import React from "react";
import CustomizedAccordions from "../contact/accordian";

VerticalTabs.propTypes = {
  data: PropTypes.array,
};

export default function VerticalTabs({ data = [] }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", mb: 4 }}
    >
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Grid container>
            <Grid item md={4} sm={12} xs={12} xxs={12}>
              <TabListStyled>
                {data.map((item, index) => {
                  return (
                    <MuiTabListStyled
                      key={`CONTACT_FAQ-${index}`}
                      orientation="vertical"
                      onChange={() => handleChange(index)}
                      aria-label="lab API tabs example"
                      value={value}
                      index={index}
                    >
                      <Tab
                        label={
                          <Typography
                            fontSize="20px"
                            lineHeight="24px"
                            fontWeight={400}
                            color={(theme) => theme.palette.common.black}
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeueMedium
                            }
                          >
                            {item?.title}
                          </Typography>
                        }
                        value={index}
                      />
                      <Divider />
                    </MuiTabListStyled>
                  );
                })}
              </TabListStyled>
            </Grid>

            <Grid item md={8} xs={12} xxs={12}>
              {data?.map((item, index) => {
                return (
                  <TabPanel value={index} key={index}>
                    <CustomizedAccordions data={item?.SUB_CHILD} />
                  </TabPanel>
                );
              })}
            </Grid>
          </Grid>
        </TabContext>
      </Box>
    </Box>
  );
}
