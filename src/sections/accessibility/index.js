import DynamicComponentRenderer from "@/components/importDynamicComponents";
import Box from "@mui/material/Box";

const AccessibilitySection = ({ accessibilityPageData }) => {
  return (
    <Box>
      <DynamicComponentRenderer
        data={
          accessibilityPageData?.result?.COMPONENT &&
          accessibilityPageData?.result?.COMPONENT?.length > 0 &&
          accessibilityPageData?.result?.COMPONENT
        }
        enq_type="C"
      />
    </Box>
  );
};

export default AccessibilitySection;
