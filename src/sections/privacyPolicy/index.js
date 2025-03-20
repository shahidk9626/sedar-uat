import DynamicComponentRenderer from "@/components/importDynamicComponents";

const PrivacyPolicySection = ({ privacyPolicyLayoutPageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          privacyPolicyLayoutPageData?.result?.COMPONENT &&
          privacyPolicyLayoutPageData?.result?.COMPONENT?.length > 0 &&
          privacyPolicyLayoutPageData?.result?.COMPONENT
        }
        enq_type="C"
      />
    </>
  );
};

export default PrivacyPolicySection;
