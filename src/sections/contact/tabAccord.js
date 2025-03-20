import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import VerticalTabs from "./tab";


const TabAccordionSection = ({ data = {} }) => {
  return (
    <div>
      <Container maxWidth="xl">
        <Typography
          sx={(theme) => ({
            "& h1,p,h2,h3,h4,": {
              letterSpacing: 0.5,
              ...theme.typography.typography39,
              fontWeight: "normal",
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              mb: 0,
              color: theme.palette.common.black
            }
          })}
          dangerouslySetInnerHTML={{
            __html: data?.PARENT?.description,
          }}
        />
        <VerticalTabs data={data?.PARENT} />
      </Container>
    </div>
  );
};

TabAccordionSection.propTypes = {
  data: PropTypes.object,
};


export default TabAccordionSection;
