import DynamicComponentRenderer from "@/components/importDynamicComponents";

const BrandsSection = ({ brandPageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          brandPageData?.result?.COMPONENT &&
          brandPageData?.result?.COMPONENT?.length > 0 &&
          brandPageData?.result?.COMPONENT
        }
        enq_type="C"
      />
    </>
  );
};

export default BrandsSection;
