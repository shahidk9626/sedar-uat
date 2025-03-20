import SkeletonFindYourStore from "@/components/skeleton/pages/findYourStorePage";
import {
  setCenter,
  setPositions,
  setShowRoom,
  setShowRoomDetail,
  setZoom
} from "@/redux/slices/map";
import { useDispatch } from "@/redux/store";
import FindYourStoreSection from "@/sections/findYourStore";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
// import FindYourStoreSection from "@/sections/findYourStore";
import {
  setClientSideReduxCookie
} from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Script from "next/script";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonFindYourStore />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [findYourStorelayout, findYourStorePageData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "find_your_store",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`showroom/fetch`, {
      locale,
    }),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      findYourStorelayout: findYourStorelayout,
      findYourStorePageData: findYourStorePageData?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const FindYourStore = (props) => {
  const { findYourStorelayout, findYourStorePageData } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    dispatch(setShowRoom(findYourStorePageData?.result));
    let position = [];
    Object.entries(findYourStorePageData?.position).forEach(([key, value]) => {
      position.push({
        lat: parseFloat(value.SSA_LATITUDE),
        lng: parseFloat(value.SSA_LONGITUDE),
      });
    });
    dispatch(setPositions(position));
    dispatch(setShowRoomDetail(findYourStorePageData?.position));
    dispatch(setCenter(position[0]));
    dispatch(setZoom(9));
  }, [findYourStorePageData]);

  const layout = {
    HEADER: {
      TOPBAR: findYourStorelayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: findYourStorelayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: findYourStorelayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: findYourStorelayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: findYourStorelayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: findYourStorelayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: findYourStorelayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: findYourStorelayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: findYourStorelayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);
  return (
    <>
      <Script
        id="googlemaps"
        type="text/javascript"
        strategy="be"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCipOxW46MLf5AMEjZMIKzpbZCx1caKcH8&libraries=geometry,drawing,places"
      />
      <WebLayout layout={layout}>
        <FindYourStoreSection />
      </WebLayout>
    </>
  );
};
export default FindYourStore;
