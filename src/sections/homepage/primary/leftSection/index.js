import Box from "@mui/material/Box";
import ImageSection from "./image";
import Tag from "./tag";

const LeftSection = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Tag />
      <ImageSection />
    </Box>
  );
};

export default LeftSection;
