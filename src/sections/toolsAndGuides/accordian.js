import {
  Accordion,
  AccordionDetails,
  AccordionDetailsBox,
  AccordionSummary,
} from "@/styles/toolGuide";
import {
  ToolsAndGuidesAccordion,
  ToolsAndGuidesAccordionDetails,
  ToolsAndGuidesBackground,
} from "@/styles/toolsAndGuides";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";

CustomizedAccordions.propTypes = {
  data: PropTypes.object,
};

export default function CustomizedAccordions({ data = {} }) {
  const [expanded, setExpanded] = React.useState(0);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <ToolsAndGuidesBackground pb={6}>
        <Container maxWidth="lg" sx={{ paddingTop: "4%" }}>
          <Box mb={2}>
            <ToolsAndGuidesAccordion
              component="div"
              dangerouslySetInnerHTML={{
                __html: data?.PARENT?.description,
              }}
            />
          </Box>
          <Box>
            {data?.PARENT &&
              data?.PARENT?.CHILD?.map((subItem, subIndex) => {
                return (
                  <Accordion
                    key={`CONTACT_ACCORDIAN-${subIndex}`}
                    expanded={expanded === subIndex}
                    onChange={handleChange(subIndex)}
                  >
                    <AccordionSummary
                      sx={{
                        paddingTop: "0px",
                        paddingLeft: "24px",
                        paddingRight: "24px",
                      }}
                    >
                      <Typography
                        variant="typography18"
                        fontWeight={600}
                        fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                        color="common.black"
                      >
                        {subItem?.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0 }}>
                      <AccordionDetailsBox pl={4}>
                        <ToolsAndGuidesAccordionDetails
                          component="div"
                          dangerouslySetInnerHTML={{
                            __html: subItem?.description,
                          }}
                          color="common.black"
                        />
                      </AccordionDetailsBox>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
          </Box>
        </Container>
      </ToolsAndGuidesBackground>
    </>
  );
}
