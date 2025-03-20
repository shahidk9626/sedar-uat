import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";
import AddNewCardForm from "./addNewCardForm";

const AddNewCardHeading = () => {
  const { t: translate } = useTranslation();

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Container maxWidth="xl">
        <Box>
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
                  label={
                    <Typography
                      sx={(theme) => ({
                        ...theme.typography.typography16,
                        fontWeight: 200,
                        color: (theme) => theme.palette.common.black,
                        fontFamily: theme.fontFaces.helveticaNeueBold
                      })}
                    >
                      {translate("AddNewCard")}
                    </Typography>
                  }
                  value="1"
                />
              </TabList>
            </Box>
            <TabPanel value={"1"} sx={{ p: 0 }}>
              <AddNewCardForm />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
};

export default AddNewCardHeading;
