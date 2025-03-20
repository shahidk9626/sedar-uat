import DynamicComponentRenderer from "@/components/importDynamicComponents";

const CustomPrintSection = ({ customPrintPageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          customPrintPageData?.result?.COMPONENT &&
          customPrintPageData?.result?.COMPONENT?.length > 0 &&
          customPrintPageData?.result?.COMPONENT
        }
        isCloseShow={false}
        enq_type="C"
      />
    </>
  );
};

export default CustomPrintSection;
