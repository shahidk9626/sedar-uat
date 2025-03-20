import DynamicComponentRenderer from "@/components/importDynamicComponents";

const CurtainAndBlindSection = ({ data }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          data?.result?.COMPONENT &&
          data?.result?.COMPONENT?.length > 0 &&
          data?.result?.COMPONENT
        }
        isCloseShow={false}
        enq_type="C"
      />
    </>
  );
};

export default CurtainAndBlindSection;
