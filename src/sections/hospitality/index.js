import DynamicComponentRenderer from "@/components/importDynamicComponents";

const HospitalityPageSection = ({ data }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          data?.result?.COMPONENT &&
          data?.result?.COMPONENT?.length > 0 &&
          data?.result?.COMPONENT
        }
        enq_type="S"
      />
    </>
  );
};

export default HospitalityPageSection;
