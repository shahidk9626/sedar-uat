import DynamicComponentRenderer from "@/components/importDynamicComponents";

const CookiePolicySection = ({ cookiePolicyPageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          cookiePolicyPageData?.result?.COMPONENT &&
          cookiePolicyPageData?.result?.COMPONENT?.length > 0 &&
          cookiePolicyPageData?.result?.COMPONENT
        }
        enq_type="C"
      />
    </>
  );
};

export default CookiePolicySection;
