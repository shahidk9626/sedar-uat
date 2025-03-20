import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";
import AboutSedarSlider from "./mobileView/aboutSedarSlider";
import WhySedarCollection from "./whySedarCollection";
import PropTypes from "prop-types";

const AboutSedar = ({ data = {} }) => {
  return (
    <Box component="div">
      <Container
        maxWidth="xl"
        sx={{ display: { md: "block", sm: "block", xs: "none", xxs: "none" } }}
      >
        <Box component="div" mt={10}>
          <Box
            sx={{
              borderLeft: (theme) => `2px solid ${theme.palette.primary.light}`,
              pl: 3,
            }}
          >
            <Typography
              component="h2"
              letterSpacing={1.5}
              fontSize={18}
              lineHeight={"19px"}
              fontWeight={500}
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              color={(theme) => theme.palette.grey[1600]}
              dangerouslySetInnerHTML={{
                __html: data?.PARENT?.title,
              }}
              textTransform={"uppercase"}
            />
          </Box>
          <Box mt={3}>
            <Typography
              component="div"
              letterSpacing={1.5}
              color="common.black"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              sx={{
                pl: { md: 3, sm: 3, xs: 3, xxs: 3 },
                "& p": {
                  margin: "0px",
                  width: { md: "68%", sm: "100%", xs: "100%", xxs: "100%" },
                },
              }}
              variant="typography38"
              dangerouslySetInnerHTML={{
                __html: data?.PARENT?.description,
              }}
            />
          </Box>
        </Box>
        {data?.PARENT?.CHILD?.map((elem, index) => {
          return (
            <Box key={`WHY_SEDAR-${index}`} mt={16}>
              <WhySedarCollection
                image={elem?.image_path}
                description={elem?.description}
                title={elem?.title}
                direction={index % 2 ? "row-reverse" : "row"}
              />
            </Box>
          );
        })}
      </Container>
      <Box
        component="div"
        sx={{ display: { md: "none", sm: "none", xs: "block", xxs: "block" } }}
      >
        <AboutSedarSlider data={data} />
      </Box>
    </Box>
  );
};

AboutSedar.propTypes = {
  data: PropTypes.object,
};

export default AboutSedar;
