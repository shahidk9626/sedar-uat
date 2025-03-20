import { FranchiseServiceHeading } from "@/styles/franchise";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import ServicesSwiper from "./servicesSwiper";

const Services = ({ data = {} }) => {
  return (
    <Container maxWidth="xl">
      <FranchiseServiceHeading
        component="div"
        dangerouslySetInnerHTML={{
          __html: data?.PARENT?.description,
        }}
        sx={{
          textAlign: {
            lg: "start",
            md: "start",
            sm: "start",
            xs: "center",
            xxs: "center",
          },
        }}
      />
      <Box py={4}>
        <ServicesSwiper data={data?.PARENT?.CHILD} />
      </Box>
    </Container>
  );
};

Services.propTypes = {
  data: PropTypes.object,
};

export default Services;
