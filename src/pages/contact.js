import SkeletonContact from "@/components/skeleton/pages/contactPage";
import SnackbarProvider from "@/components/snackbar";
import {
  setCenter,
  setPositions,
  setShowRoom,
  setShowRoomDetail,
  setZoom,
} from "@/redux/slices/map";
import { useDispatch } from "@/redux/store";
import ContactPageSection from "@/sections/contact";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { LayoutData } from "@/utils/layout";
import { setClientSideReduxCookie } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonContact />,
  ssr: true,
});

export const getStaticProps = async (context) => {
  const { locale } = context;
  const [contactLayout, contactPageData, contactMap] = await Promise.all([
    LayoutData({
      param: {
        page_name: "contact_form",
      },
      locale: locale,
    }),
    apiSSGV2DataService.getAll(`v2/homepage/first`, {
      content: "contact_form",
      locale,
    }),
    apiSSGV2DataService.getAll(`showroom/fetch`, {
      locale,
    }),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      contactLayout: contactLayout,
      contactPageData: contactPageData?.data,
      contactMap: contactMap?.data,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
      // Will be passed to the page component as props
    },
  };
};

const ContactPage = (props) => {
  const { contactLayout, contactPageData, contactMap } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    dispatch(setShowRoom(contactMap?.result));
    let position = [];
    Object.entries(contactMap?.position).forEach(([key, value]) => {
      position.push({
        lat: parseFloat(value.SSA_LATITUDE),
        lng: parseFloat(value.SSA_LONGITUDE),
      });
    });
    dispatch(setPositions(position));
    dispatch(setShowRoomDetail(contactMap?.position));
    dispatch(setCenter(position[0]));
    dispatch(setZoom(9));
  }, [contactMap]);

  const layout = {
    HEADER: {
      TOPBAR: contactLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: contactLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: contactLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: contactLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: contactLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: contactLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: contactLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: contactLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: contactLayout?.result?.SEO,
  };

  React.useEffect(() => {
    setClientSideReduxCookie({ dispatch: dispatch, router: router });
  }, [router]);
  return (
    <WebLayout layout={layout}>
      <SnackbarProvider>
        <ContactPageSection contactPageData={contactPageData} />
      </SnackbarProvider>
    </WebLayout>
  );
};
export default ContactPage;
