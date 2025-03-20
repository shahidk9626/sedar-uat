import DynamicComponentRenderer from "@/components/importDynamicComponents";
import SkeletonB2BRegistration from "@/components/skeleton/pages/b2bReigstrationPage";
import { getB2BRegistrationPageData } from "@/redux/slices/b2b-registration";
import { getLayout } from "@/redux/slices/layout";
import { wrapper } from "@/redux/store";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Script from "next/script";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonB2BRegistration />,
  ssr: true,
});

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale, res } = context;
    const { dispatch, getState } = store;

    res.setHeader(
      "Cache-Control",
      `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
      }`
    );

    await setReduxCookies(context, store);

    await dispatch(
      getLayout({
        page_name: "b2b_registration",
      })
    );
    await dispatch(
      getB2BRegistrationPageData({
        content: "b2b_registration",
      })
    );
    const { layout } = getState().layout;
    const { data } = getState().b2BRegistration;
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"], null, [
          "en",
          "no",
        ])),
        layout: layout,
        data: data,
        // Will be passed to the page component as props
      },
    };
  }
);

const B2BRegistration = (props) => {
  const { layout, data } = props;
  return (
    <>
      <Script
        id="googlemaps"
        type="text/javascript"
        strategy="afterInteractive"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCipOxW46MLf5AMEjZMIKzpbZCx1caKcH8&libraries=geometry,drawing,places"
      />{" "}
      <WebLayout layout={layout}>
        <DynamicComponentRenderer
          data={
            data?.result?.COMPONENT &&
            data?.result?.COMPONENT?.length > 0 &&
            data?.result?.COMPONENT
          }
          enq_type="H"
        />
      </WebLayout>
    </>
  );
};

export default B2BRegistration;
