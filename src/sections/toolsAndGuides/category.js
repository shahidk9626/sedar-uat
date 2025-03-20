import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyFillImage from "@/components/image/nextLazyFillLoadImage";
import { ToolsAndGuidesCategoryHeading } from "@/styles/toolsAndGuides";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import ToolGuideDilaog from "./ToolGuideDialog";
import Tabs from "./tab";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const ToolsGuideCategory = ({ data = {} }) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};

  const [open, setOpen] = React.useState({
    open: false,
    data: null,
  });

  const handleClickOpen = (item) => {
    setOpen({ open: true, data: item });
  };

  const handleClose = () => {
    setOpen((prev) => ({ ...prev, open: false }));
  };

  const [value, setValue] = React.useState(1);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [tabValue, setTabValue] = React.useState(1);
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box
      sx={{
        ...(themeDirection === "ltr"
          ? {
            backgroundPositionX: "right",
          }
          : {
            backgroundPositionX: "left",
          }),
        backgroundImage: "url(/assets/ToolsAndGuides/rightbg.avif)",
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Container maxWidth="xl">
        <Box component="div" pl={4}>
          <ToolsAndGuidesCategoryHeading
            component="div"
            dangerouslySetInnerHTML={{
              __html: data?.PARENT?.description,
            }}
          />
        </Box>
      </Container>
      <Box sx={{
        padding: "20px",
        display: {
          md: "block",
          sm: "block",
          xs: "none",
          xxs: "none",
        },
      }}>
        <Tabs
          handleChange={handleChangeTab}
          value={String(tabValue)}
          tabData={data?.PARENT?.CHILD}
          keyName="ToolsGuide-Category"

        >
          {data?.PARENT?.CHILD &&
            data?.PARENT?.CHILD?.length > 0 &&
            data?.PARENT?.CHILD.map((item, index) => {
              console.log(item, 'tools item');
              return (
                <TabPanel
                  value={String(index + 1)}
                  key={`TAB-PANELS-CHILD-CATEGORIESS-${index}`}
                >
                  <Box
                    component="div"
                    id="Category"
                    sx={{
                      ...(themeDirection === "rtl" && {
                        direction: "rtl!important",
                      }),
                    }}
                  >
                    <Grid container spacing={2}>
                      {item?.SUB_CHILD &&
                        item?.SUB_CHILD?.length > 0 &&
                        item?.SUB_CHILD.map((childItem, childIndex) => (
                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={6}
                            xs={6}
                            xxs={6}
                            key={`Guide-Tool-${childIndex}`}
                          >
                            <Box
                              component="div"
                              onClick={() => handleClickOpen(childItem)}
                              sx={{ cursor: "pointer" }}
                            >
                              <NextLazyFillImage
                                src={childItem.image_path || ""}
                                alt="error"
                                objectFit="cover"
                                sx={{
                                  width: "100%!important",
                                  height: "100%!important",
                                  objectFit: "cover",
                                }}
                                width={1400}
                                height={1400}
                                upLgWidth={1400}
                                downLgWidth={1400}
                                downMdWidth={1400}
                                downSmWidth={1000}
                                downXsWidth={1000}
                                sizes="(min-width: 0px) and (max-width: 1920px) 30vw"
                                aspectRatio="413 / 222"
                              />
                              <Typography
                                component="h5"
                                variant="typography17"
                                fontWeight={500}
                                fontFamily={(theme) =>
                                  theme.fontFaces.helveticaNeueMedium
                                }
                                color="common.black"
                                textAlign="left"
                              >
                                {childItem.title}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                    </Grid>
                  </Box>
                </TabPanel>
              );
            })}
        </Tabs>
      </Box>
      <Box sx={{
        padding: "20px",
        display: {
          md: "none",
          sm: "none",
          xs: "block",
          xxs: "block",
        },
      }}>
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <Select
            labelId="tools-guide-select-label"
            value={value}
            onChange={handleChange}
            sx={(theme) => ({
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.lighter,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.lighter,
                },
              },
              "& .MuiSelect-select": {
                color: theme.palette.primary.light,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.lighter,
                borderRadius: "0px",
                color: theme.palette.primary.light,
              },
            })}
          >
            {data?.PARENT?.CHILD?.map((item, index) => (
              <MenuItem key={`MENU-ITEM-${index}`} value={index + 1}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {data?.PARENT?.CHILD?.map((item, index) => (
          value === index + 1 && (
            <Box
              key={`CATEGORY-PANEL-${index}`}
              component="div"
              id="Category"
              sx={{
                ...(themeDirection === "rtl" && { direction: "rtl!important" }),
              }}
            >
              <Grid container spacing={2}>
                {item?.SUB_CHILD &&
                  item?.SUB_CHILD.length > 0 &&
                  item?.SUB_CHILD.map((childItem, childIndex) => (
                    <Grid
                      item
                      lg={4}
                      md={4}
                      sm={6}
                      xs={6}
                      xxs={6}
                      key={`Guide-Tool-${childIndex}`}
                    >
                      <Box
                        component="div"
                        onClick={() => handleClickOpen(childItem)}
                        sx={{ cursor: "pointer" }}
                      >
                        <NextLazyFillImage
                          src={childItem.image_path || ""}
                          alt="error"
                          objectFit="cover"
                          sx={{
                            width: "100%!important",
                            height: "100%!important",
                            objectFit: "cover",
                          }}
                          width={1400}
                          height={1400}
                          upLgWidth={1400}
                          downLgWidth={1400}
                          downMdWidth={1400}
                          downSmWidth={1000}
                          downXsWidth={1000}
                          sizes="(min-width: 0px) and (max-width: 1920px) 30vw"
                          aspectRatio="413 / 222"
                        />
                        <Typography
                          component="h5"
                          variant="typography17"
                          fontWeight={500}
                          fontFamily={(theme) =>
                            theme.fontFaces.helveticaNeueMedium
                          }
                          color="common.black"
                          textAlign="left"
                        >
                          {childItem.title}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )
        ))}
      </Box>
      <ToolGuideDilaog
        open={open.open}
        handleClose={handleClose}
        data={open.data}
      />
    </Box>
  );
};

ToolsGuideCategory.propTypes = {
  data: PropTypes.object,
  value: PropTypes.any,
  handleChange: PropTypes.func,
};

export default ToolsGuideCategory;
