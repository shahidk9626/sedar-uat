import useResponsive from "@/hooks/useResponsive";
import { BrandPageCollaps, BrandsCollapse } from "@/styles/brands";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
import NextLink from "next/link";
import PropTypes from "prop-types";
import React, { useState } from "react";
import MobileBrand from "./mobileBrand/mobileBrand";

const CollapseContent = ({ data = {}, handleClose = () => { } }) => {
  return (
    <>
      <BrandsCollapse>
        <Box component="div" className="collapsecontent">
          <Stack
            direction="row"
            alignItems="start"
            justifyContent="space-between"
            className="heading py-4"
          >
            <Typography
              component={"h3"}
              variant="typography20"
              fontWeight={200}
            >
              {data?.title}
            </Typography>
            <Box>
              <CloseIcon className="closebutton" onClick={handleClose} />
            </Box>
          </Stack>
          <Box component="div" className="textcontent">
            {data?.description ? parse(data?.description) : ""}
            {data?.link_title ? (
              <Button
                variant="contained"
                color="warning"
                LinkComponent={NextLink}
                sx={(theme) => ({
                  color: "common.black",
                  fontWeight: 300,
                  py: "0.82rem",
                  width: "auto",
                  marginTop: "20px",
                  px: "25px",
                  borderRadius: 0,
                  height: "auto",
                  ...theme.typography.typography15,
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                  bgcolor: theme.palette.primary.lighter,
                  "&:hover": {
                    color: (theme) => `${theme.palette.common.white}!important`,
                  },
                })}
                href={`/${data?.link_url}`}
              >
                {data?.link_title}
              </Button>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </BrandsCollapse>
    </>
  );
};

const BrandPage = ({ data }) => {
  const isDownMd = useResponsive("down", "md");
  const [brandData, setBrandData] = React.useState([]);
  const [collapse, setCollapse] = useState({
    data: null,
    index: null,
  });

  const manipulateArray = () => {
    let newData =
      data?.PARENT?.CHILD && data?.PARENT?.CHILD.length > 0
        ? data?.PARENT?.CHILD
        : [];
    let parentArray = [];
    let brandArray = [];
    let bindCount = isDownMd ? 2 : 3;

    newData.forEach((element, index) => {
      brandArray.push(element);

      if (brandArray.length === bindCount || index === newData.length - 1) {
        parentArray.push({
          brand: [...brandArray],
          isCollapsed: true,
          index: parentArray.length + 1,
        });
        brandArray = [];
      }
    });
    setBrandData(parentArray);
  };
  React.useEffect(() => {
    manipulateArray();
  }, [data.CHILD, isDownMd]);

  const handleOpenCollapse = (data) => {
    setCollapse({
      data: data?.data,
      index: data?.index,
      parentIndex: data?.parentIndex,
    });
  };
  const handleCloseCollapse = () => {
    setCollapse({
      data: null,
      index: null,
      parentIndex: null,
    });
  };

  return (
    <BrandPageCollaps className="BrandPage">
      <Container
        maxWidth="lg"
        className="max-width"
        sx={{
          display: {
            lg: "block",
            md: "block",
            sm: "none",
            xs: "none",
            xxs: "none",
          },
        }}
      >
        <Box component="div">
          <Grid container spacing={2}>
            {brandData &&
              brandData?.length > 0 &&
              brandData.map((parentItem, parentIndex) => {
                return (
                  <React.Fragment
                    key={`${parentItem?.index}-PRANT_BRAND-NAME-${parentIndex}`}
                  >
                    {parentItem?.brand &&
                      parentItem?.brand.map((childItem, childIndex) => {
                        return (
                          <Grid
                            key={`bran${parentIndex + 1}dData-${childIndex + 2
                              }`}
                            item
                            xxs={6}
                            xs={6}
                            sm={6}
                            md={4}
                            lg={4}
                            xl={4}
                          >
                            <Box
                              onClick={() =>
                                handleOpenCollapse({
                                  index: parentItem?.index,
                                  data: childItem,
                                  parentIndex: childIndex,
                                })
                              }
                              component="div"
                              sx={{
                                width: "100%",
                                padding: "30px",
                                position: "relative",
                                cursor: "pointer",
                                background: (theme) => theme.palette.grey[7400],
                                fontSize: "1.5em",
                                textAlign: "center",
                                ...(collapse?.index == parentItem?.index &&
                                  collapse?.parentIndex == childIndex && {
                                  background: (theme) =>
                                    theme.palette.grey[7500],
                                }),
                              }}
                            >
                              <Box
                                component="div"
                                sx={{
                                  textALign: "center",
                                  padding: "30%",
                                  height: "100%",
                                  ...(collapse?.index == parentItem?.index &&
                                    collapse?.parentIndex == childIndex && {
                                    "& img": {
                                      filter: "invert(100)",
                                    },
                                  }),
                                }}
                              >
                                <picture>
                                  <source
                                    media="(max-width: 575.98px)"
                                    srcSet={childItem.image_path_portrait}
                                  />
                                  <source
                                    media="(min-width: 576px) and (max-width: 767.98px)"
                                    srcSet={childItem.image_path_landscape}
                                  />
                                  <source
                                    media="(min-width: 768px) and (max-width: 991.98px)"
                                    srcSet={childItem.image_path_03}
                                  />
                                  <source
                                    media="(min-width: 992px) and (max-width: 1200px)"
                                    srcSet={childItem.image_path_02}
                                  />
                                  <source
                                    media="(min-width: 1201px) and (max-width: 1400px)"
                                    srcSet={childItem.image_path_01}
                                  />
                                  <Box
                                    component="img"
                                    src={childItem.image_path}
                                    alt={childItem.image_alt_seo}
                                    style={{
                                      position: "absolute",
                                      left: "50%",
                                      top: "50%",
                                      transform: "translate(-50%, -50%)",
                                      img: {
                                        display: "block",
                                        maxWidth: "100%",
                                      },
                                    }}
                                    width="auto"
                                    height="auto"
                                  />
                                </picture>
                              </Box>
                            </Box>
                          </Grid>
                        );
                      })}
                    {parentItem?.isCollapsed && (
                      <Grid item xs={12} sm={12} md={12}>
                        <Collapse in={collapse?.index == parentItem?.index}>
                          <CollapseContent
                            data={collapse?.data}
                            handleClose={handleCloseCollapse}
                          />
                        </Collapse>
                      </Grid>
                    )}
                  </React.Fragment>
                );
              })}
          </Grid>
        </Box>
      </Container>
      <Box
        px={1}
        sx={{
          display: {
            lg: "none",
            md: "none",
            sm: "block",
            xs: "block",
            xxs: "block",
          },
        }}
      >
        <MobileBrand data={data} />
      </Box>
    </BrandPageCollaps>
  );
};

BrandPage.propTypes = {
  data: PropTypes.object,
  handleClose: PropTypes.func,
};

export default BrandPage;
