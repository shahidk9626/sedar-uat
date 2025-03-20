import DynamicComponentRenderer from "@/components/importDynamicComponents";

const HomeAutomationSection = ({ homeAutomationPageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          homeAutomationPageData?.result?.COMPONENT &&
          homeAutomationPageData?.result?.COMPONENT?.length > 0 &&
          homeAutomationPageData?.result?.COMPONENT
        }
        enq_type="C"
      />
    </>
  );
};

export default HomeAutomationSection;
