import { NextFillImage } from "@/components/image";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import React from "react";
import BrandCollapse from "./brandCollapse";
import MobileBrand from "./mobileBrand/mobileBrand";

const Brands = ({ data = {} }) => {
  const [bgColor, setBgColor] = React.useState(null);
  const [checked, setChecked] = React.useState(null);

  const handleChange = (index) => {
    setChecked((prevIndex) => (prevIndex === index ? null : index));
    setBgColor(index);
  };
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {data?.CHILD?.map((item, index) => (
            <Grid
              item
              lg={4}
              md={4}
              sm={4}
              xs={4}
              xxs={4}
              key={`BRAND-COLLAPSE-${index}`}
              py={2}
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
              <Stack
                alignItems="center"
                justifyContent="center"
                width="100%"
                height={263}
                onClick={() => handleChange(index)}
                sx={(theme) => ({
                  backgroundColor:
                    bgColor === index
                      ? theme.palette.info.moreLighter
                      : theme.palette.grey[2900],
                  cursor: "pointer",
                })}
              >
                <NextFillImage
                  src={item?.image_path}
                  alt="Image"
                  sx={{
                    width: "100%!important",
                    height: "100%!important",
                    objectFit: "contain",
                    backgroundSize: "contain",
                    "&.MuiCard-root": {
                      borderRadius: 0,
                      boxShadow: "none",
                      position: "relative!important",
                      width: "190px!important",
                      height: "100%!important",
                    },
                  }}
                  sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                  objectFit="contain"
                />
              </Stack>
              <Collapse
                in={checked === index}
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
                <BrandCollapse data={item} />
              </Collapse>
            </Grid>
          ))}
        </Grid>
        <Box
          py={10}
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
      </Container>
    </>
  );
};

Brands.propTypes = {
  data: PropTypes.object,
};

export default Brands;
