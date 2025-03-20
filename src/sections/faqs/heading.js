import { FaqsHeading } from "@/styles/faqs";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";

const FaqsHeadingSection = ({ data = [] }) => {
  return (
    <>
      <Box component="div">
        <Container maxWidth="xl">
          <FaqsHeading
            component="div"
            mb={6}
            dangerouslySetInnerHTML={{
              __html: data?.description,
            }}
          />
        </Container>
      </Box>
    </>
  );
};

FaqsHeadingSection.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


export default FaqsHeadingSection;
