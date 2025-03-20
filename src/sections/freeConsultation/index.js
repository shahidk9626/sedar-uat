import DynamicComponentRenderer from "@/components/importDynamicComponents";


const FreeConsultationSection = ({ freeConsultationPageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          freeConsultationPageData?.result?.COMPONENT &&
          freeConsultationPageData?.result?.COMPONENT?.length > 0 &&
          freeConsultationPageData?.result?.COMPONENT
        }
        enq_type="H"
        open={true}
        isCloseShow={false}

      />
    </>
  );
};

export default FreeConsultationSection;
