import DynamicComponentRenderer from "@/components/importDynamicComponents";

const TermsAndConditionSection = ({ termsAndConditionsPageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          termsAndConditionsPageData?.result?.COMPONENT &&
          termsAndConditionsPageData?.result?.COMPONENT?.length > 0 &&
          termsAndConditionsPageData?.result?.COMPONENT
        }
        enq_type="C"
      />
    </>
  );
};

export default TermsAndConditionSection;
