import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@/styles/contact";
import { FaqsAccordionText } from "@/styles/faqs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";

CustomizedAccordionsFaqs.propTypes = {
  data: PropTypes.array,
};

export default function CustomizedAccordionsFaqs({ data = [] }) {
  const [expanded, setExpanded] = React.useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {data?.map((subItem, subIndex) => {
        return (
          <Accordion
            key={`CONTACT_ACCORDIAN-${subIndex}`}
            expanded={expanded === subIndex}
            onChange={handleChange(subIndex)}
          >
            <AccordionSummary>
              <Typography
                variant="typography18"
                fontWeight={600}
                lineHeight="23px"
                color={(theme) => theme.palette.common.black}
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              >
                {subItem?.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FaqsAccordionText
                component="div"
                variant="typography18"
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
