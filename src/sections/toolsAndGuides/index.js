import DynamicComponentRenderer from "@/components/importDynamicComponents";

const ToolsAndGuidesSection = ({ toolsAndGuidesPageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          toolsAndGuidesPageData?.result?.COMPONENT &&
          toolsAndGuidesPageData?.result?.COMPONENT?.length > 0 &&
          toolsAndGuidesPageData?.result?.COMPONENT
        }
        enq_type="H"
        open={true}
        isCloseShow={false}
      />
    </>
  );
};

export default ToolsAndGuidesSection;
