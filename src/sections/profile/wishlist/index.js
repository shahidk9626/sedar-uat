// import CustomBreadCrumb from "./breadCrumb";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
const SkeletonCommon = dynamic(
  () => import("@/components/skeleton/SkeletonCommon"),
  { ssr: true }
);
const CustomBreadCrumb = dynamic(() => import("@/components/breadCrumb"), {
  loading: () => (
    <SkeletonCommon
      parentSkeletonKeyName="PARENT-Banner"
      parentCount={1}
      childSkeletonKeyName="CHILD-Banner"
      childCount={0}
      stackSpacing={4}
      imageVariant="linear"
      row="row"
      center="center"
      imgSx={{
        width: "100%",
        height: "40px",
        borderRadius: "5px",
      }}
      lineSx={{
        width: "100%",
        height: "300px",
        borderRadius: "5px",
      }}
      lineVariant="rectangular"
      lineRow="row"
      imageAnimation="wave"
      lineAnimation="wave"
      childWidth="0%"
      isImageShow={true}
    />
  ),
  ssr: true,
});
const FavoriteSection = dynamic(() => import("./favorite"), {
  loading: () => (
    <SkeletonCommon
      parentSkeletonKeyName="PARENT-Banner"
      parentCount={1}
      childSkeletonKeyName="CHILD-Banner"
      childCount={3}
      stackSpacing={5}
      imageVariant="linear"
      row="row"
      center="center"
      imgSx={{
        width: "100%",
        height: "80px",
        borderRadius: "5px",
      }}
      lineSx={{
        width: "80%",
        height: "300px",
        borderRadius: "5px",
      }}
      lineVariant="rectangular"
      lineRow="row"
      imageAnimation="wave"
      lineAnimation="wave"
      childWidth="100%"
      isImageShow={false}
    />
  ),
  ssr: true,
});
const Heading = dynamic(() => import("./heading"), {
  loading: () => (
    <SkeletonCommon
      parentSkeletonKeyName="PARENT-Banner"
      parentCount={1}
      childSkeletonKeyName="CHILD-Banner"
      childCount={0}
      stackSpacing={4}
      imageVariant="linear"
      row="row"
      center="center"
      imgSx={{
        width: "100%",
        height: "80px",
        borderRadius: "5px",
      }}
      lineSx={{
        width: "100%",
        height: "300px",
        borderRadius: "5px",
      }}
      lineVariant="rectangular"
      lineRow="row"
      imageAnimation="wave"
      lineAnimation="wave"
      childWidth="0%"
      isImageShow={true}
    />
  ),
  ssr: true,
});
const WishListSection = () => {
  const { t: translate } = useTranslation();
  const wishlistBreadCrumb = [
    {
      title: translate("Wishlist"),
      isLink: false,
    },
  ];
  return (
    <>
      <CustomBreadCrumb data={wishlistBreadCrumb} key="WishListSection" />
      <Heading />
      <FavoriteSection />
    </>
  );
};

export default WishListSection;
