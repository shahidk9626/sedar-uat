import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const FreeSampleCategory = ({
  material = [],
  productsData,
  freeSampleProducts,
  ProductFilters,
  freeSampleCategory,
}) => {
  return (
    <Container maxWidth="xl">
      <Box>
        <Step1 freeSampleCategory={freeSampleCategory} />
      </Box>
      <Box id="SelectModelOf">
        <Step2 freeSampleProducts={freeSampleProducts} />
      </Box>
      <Box pt={10} id="OrderYourDesiredSample">
        <Step3
          material={material}
          productsData={productsData}
          ProductFilters={ProductFilters}
          freeSampleProducts={freeSampleProducts}
        />
      </Box>
    </Container>
  );
};

FreeSampleCategory.propTypes = {
  material: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default FreeSampleCategory;
