import DynamicComponentRenderer from "@/components/importDynamicComponents";

const FreeSampleSection = ({
  material,
  productsData,
  freeSampleContent,
  freeSampleProducts,
  ProductFilters,
  freeSampleCategory,
}) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          freeSampleContent?.result?.COMPONENT &&
          freeSampleContent?.result?.COMPONENT?.length > 0 &&
          freeSampleContent?.result?.COMPONENT
        }
        material={material}
        productsData={productsData}
        freeSampleProducts={freeSampleProducts}
        ProductFilters={ProductFilters}
        freeSampleCategory={freeSampleCategory}
        enq_type="C"
      />
    </>
  );
};

export default FreeSampleSection;
