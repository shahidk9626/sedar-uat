import DynamicComponentRenderer from "@/components/importDynamicComponents";


const CustomProductSection = ({ customProductPageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          customProductPageData?.result?.COMPONENT &&
          customProductPageData?.result?.COMPONENT?.length > 0 &&
          customProductPageData?.result?.COMPONENT
        }
        isCloseShow={false}
        enq_type="C"
      />
    </>
  );
};

export default CustomProductSection;
