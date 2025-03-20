import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import FaqsHeadingSection from "./heading";
import VerticalTabs from "./tab";

const TabAccordionSection = ({ data = [] }) => {
  return (
    <>
      <Box>
        <FaqsHeadingSection data={data} />
      </Box>
      <Container maxWidth="xl">
        <VerticalTabs data={data?.CHILD} />
      </Container>
    </>
  );
};

TabAccordionSection.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default TabAccordionSection;
