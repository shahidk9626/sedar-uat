import { HomePageLoadingScreen } from "@/components/loading-screen";
import SkeletonLanding from "@/components/skeleton/pages/landingPage";
import useResponsive from "@/hooks/useResponsive";
import CanonicalTag from "@/modules/canonicalTag";
import SeoHeader from "@/modules/seoHeader";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import LandingMobile from "./mobile/landingMobile";
import Head from "next/head";

const GsapAnimation = dynamic(() => import("./gsapAnimation"), {
  loading: () => <SkeletonLanding />,
  ssr: true,
});

const LandingPageSection = ({ data, layout, productType }) => {
  const router = useRouter();
  const isDownLg = useResponsive("down", "lg");
  const isUpLg = useResponsive("up", "lg");
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
          <SeoHeader data={layout} router={router} />

    <Head>
      <CanonicalTag router={router} pagetype={productType} />
    </Head>
      

      {!isLoaded ||
        (isDownLg == "undefined" && isUpLg == "undefined" && (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={1200}
            sx={{ backgroundColor: "common.white" }}
          >
            <HomePageLoadingScreen />
          </Box>
        ))}
      {isDownLg && (
        <Box overflow="hidden" height="100dvh">
          <LandingMobile data={data?.result?.COMPONENT} />
        </Box>
      )}
      {isUpLg && (
        <Box overflow="hidden" height="100dvh">
          <GsapAnimation data={data} />
        </Box>
      )}
    </>
  );
};

export default LandingPageSection;
