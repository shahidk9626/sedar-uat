import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";

const CardHeading = () => {
  const [value, setValue] = React.useState("1");
  const { t: translate } = useTranslation();

  return (
    <>
      <Container maxWidth="xl">
        <Box
          pl={{ lg: 3, md: 3, sm: 6, xs: 0, xxs: 0 }}
          pr={{ lg: 3, md: 3, sm: 6, xs: 0, xxs: 0 }}
          sx={{
            width: "100%",
            typography: "body1",
            pt: 0,
            mt: { lg: "0", md: "0", sm: "-47px", xs: "-47px", xxs: "-47px" },
          }}
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
                        fontWeight: 300,
                        lineHeight: "15px",
                        ...theme.typography.typography16,
                        color: (theme) => theme.palette.grey[8000],
                        fontFamily: theme.fontFaces.helveticaNeueBold,
                      })}
                    >
                      {translate("SavedCards")}
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

export default CardHeading;
