import DynamicComponentRenderer from "@/components/importDynamicComponents";

const ContractPageSection = ({ data }) => {
  return (
    <>
      <DynamicComponentRenderer data={data?.result?.COMPONENT && data?.result?.COMPONENT?.length > 0 && data?.result?.COMPONENT} enq_type="H" />
    </>
  );
};

export default ContractPageSection;
