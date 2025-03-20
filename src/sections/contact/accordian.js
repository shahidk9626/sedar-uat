import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ContactAccordion,
} from "@/styles/contact";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";

CustomizedAccordions.propTypes = {
  subData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

CustomizedAccordions.defaultProps = {
  subData: [],
};

export default function CustomizedAccordions({ subData }) {
  const [expanded, setExpanded] = React.useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {subData?.SUB_CHILD?.map((subItem, subIndex) => {
        return (
          <Accordion
            key={`CONTACT_ACCORDIAN-${subIndex}`}
            expanded={expanded === subIndex}
            onChange={handleChange(subIndex)}
          >
            <AccordionSummary>
              <Typography
                component="p"
                variant="typography45"
                fontWeight={600}
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                color="common.black"
              >
                {subItem?.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ContactAccordion
                component="div"
                variant="typography45"
                color="common.black"
                dangerouslySetInnerHTML={{
                  __html: subItem?.description,
                }}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
