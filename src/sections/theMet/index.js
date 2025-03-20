import DynamicComponentRenderer from "@/components/importDynamicComponents";

const TheMetSection = ({ theMetPageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          theMetPageData?.result?.COMPONENT &&
          theMetPageData?.result?.COMPONENT?.length > 0 &&
          theMetPageData?.result?.COMPONENT
        }
        enq_type="C"
      />
    </>
  );
};

export default TheMetSection;
