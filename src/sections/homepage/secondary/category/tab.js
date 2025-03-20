import { useAuthContext } from "@/auth/useAuthContext";
import CircleLoader from "@/components/circleLoader";
import { CustomTab, CustomTabList } from "@/styles/homepage/category";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";

const Tabs = ({
  children = React.Children,
  value = "",
  handleChange = () => { },
  tabData = [],
  keyName = "Tab",
  progress,
  animation,
}) => {
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const [langName, setLangName] = useState("en");

  React.useEffect(() => {
    setLangName(cookies.langName);
  }, [cookies, locale]);

  return (
    <Box
      key={langName}
      width="100%"
      component="div"
      id="Category"
      sx={{
        maxWidth: "1520px",
        width: "100%",
        textAlign: "center",
        mx: "auto",
      }}
    >
      <Grid container alignItems="center" columnSpacing={0}>
        <Grid item md={0.9}>
          <Box
            component="div"
            sx={{
              cursor: "pointer",
              zIndex: 1,
            }}
            id="categoryPrev"
          >
            <Box
              key={langName}
              component="div"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              sx={{
                transform: langName == "ar" ? "scaleX(-1) !important" : "unset",
              }}
            >
              <CircleLoader
                action={-1}
                animation={animation}
                progress={progress}
                activeColor="#ccc"
                color="#FDCC5D"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={10.2}>
          <TabContext value={String(value)}>
            <CustomTabList onChange={handleChange}>
              {tabData &&
                tabData?.length > 0 &&
                tabData.map((item, index) => {
                  return (
                    <CustomTab
                      sx={{
                        fontFamily: (theme) =>
                          theme.fontFaces.helveticaNeueBold,
                      }}
                      label={item?.title}
                      value={String(index + 1)}
                      key={`${index}-TABS-DATA-${keyName}-${index}`}
                    />
                  );
                })}
            </CustomTabList>
            {children}
          </TabContext>
        </Grid>
        <Grid item md={0.9}>
          <Box
            component="div"
            sx={{
              cursor: "pointer",
              zIndex: 1,
            }}
            id="categoryNext"
          >
            <Box
              key={langName}
              component="div"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              sx={{
                transform: langName == "ar" ? "scaleX(-1) !important" : "unset",
              }}
            >
              <CircleLoader
                action={1}
                animation={animation}
                progress={progress}
                activeColor="#FDCC5D"
                color="#ccc"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
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
