import DynamicComponentRenderer from "@/components/importDynamicComponents";


const ServicePageSection = ({ servicePageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          servicePageData?.result?.COMPONENT &&
          servicePageData?.result?.COMPONENT?.length > 0 &&
          servicePageData?.result?.COMPONENT
        }
        enq_type="H"
      />
    </>
  );
};

export default ServicePageSection;
