import DynamicComponentRenderer from "@/components/importDynamicComponents";

const FaqsSection = ({ faqPageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          faqPageData?.result?.COMPONENT &&
          faqPageData?.result?.COMPONENT?.length > 0 &&
          faqPageData?.result?.COMPONENT
        }
        enq_type="C"
      />
    </>
  );
};

export default FaqsSection;
