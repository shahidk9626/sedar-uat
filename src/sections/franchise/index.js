import DynamicComponentRenderer from "@/components/importDynamicComponents";


const FranchiseSection = ({ franchisePageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          franchisePageData?.result?.COMPONENT &&
          franchisePageData?.result?.COMPONENT?.length > 0 &&
          franchisePageData?.result?.COMPONENT
        }
        enq_type="F"
      />
    </>
  );
};

export default FranchiseSection;
