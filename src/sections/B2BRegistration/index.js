import { useSelector } from "@/redux/store";
import dynamic from "next/dynamic";
import React from "react";

const B2BRegistrationSection = ({ data }) => {
  const SkeletonCommon = dynamic(
    () => import("@/components/skeleton/SkeletonCommon"),
    {
      ssr: true,
    }
  );

  const Join = dynamic(() => import("./join"), {
    loading: () => (
      <SkeletonCommon
        parentSkeletonKeyName=" PARENT-JOIN"
        parentCount={2}
        childSkeletonKeyName="CHILD-JOIN"
        childCount={0}
        stackSpacing={0}
        imageVariant="linear"
        row="row"
        imgSx={{
          width: "100%",
          height: "60px",
          borderRadius: "5px",
        }}
        lineSx={{
          width: "0%",
          height: "90px",
          borderRadius: "10px",
        }}
        lineVariant="rectangular"
        lineRow="column"
        imageAnimation="wave"
        lineAnimation="wave"
        childWidth="0%"
        isImageShow={true}
      />
    ),
    ssr: true,
  });
  const B2BTab = dynamic(() => import("./b2dTab"), {
    loading: () => (
      <SkeletonCommon
        parentSkeletonKeyName=" PARENT-B2BTAB"
        parentCount={1}
        childSkeletonKeyName="CHILD-B2BTAB"
        childCount={4}
        stackSpacing={2}
        imageVariant="linear"
        row="column"
        imgSx={{
          width: "100%",
          height: "90px",
          borderRadius: "5px",
        }}
        lineSx={{
          width: "100%",
          height: "60px",
          borderRadius: "10px",
        }}
        lineVariant="rectangular"
        lineRow="column"
        imageAnimation="wave"
        lineAnimation="wave"
        childWidth="100%"
        isImageShow={true}
      />
    ),
    ssr: true,
  });
  const SnackbarProvider = dynamic(
    () => import("@/components/snackbar/SnackbarProvider"),
    {
      ssr: false,
    }
  );
  return (
    <>

      <Join data={data?.PARENT} />
      <SnackbarProvider>
        <B2BTab data={data?.PARENT} />
      </SnackbarProvider>

    </>
  );
};

export default B2BRegistrationSection;
