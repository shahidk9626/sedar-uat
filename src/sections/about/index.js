import DynamicComponentRenderer from "@/components/importDynamicComponents";
import Box from "@mui/material/Box";


const AboutPageSection = ({ aboutPageData }) => {
  return (
    <Box component="div">
      <DynamicComponentRenderer
        data={
          aboutPageData?.result?.COMPONENT &&
          aboutPageData?.result?.COMPONENT?.length > 0 &&
          aboutPageData?.result?.COMPONENT
        }
        enq_type="C"
      />
    </Box>
  );
};

export default AboutPageSection;
