import DynamicComponentRenderer from "@/components/importDynamicComponents";

const ReturnRefundSection = ({ returnRefundPageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          returnRefundPageData?.result?.COMPONENT &&
          returnRefundPageData?.result?.COMPONENT?.length > 0 &&
          returnRefundPageData?.result?.COMPONENT
        }
        enq_type="C"
      />
    </>
  );
};

export default ReturnRefundSection;
