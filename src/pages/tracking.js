import SkeletonTracking from "@/components/skeleton/pages/trackingPage";
import { getLayout } from "@/redux/slices/layout";
import { wrapper } from "@/redux/store";
import TrackingPageSection from "@/sections/tracking";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonTracking />,
  ssr: true,
});


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale, res, req } = context;
    const { dispatch, getState } = store;

    // res.setHeader(
    //   "Cache-Control",
    //   `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
    //   }`
    // );

    await setReduxCookies(context, store);
    await dispatch(
      getLayout({
        page_name: "tools_and_guides",
      })
    );
    const { layout } = getState().layout

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"], null, [
          "en",
          "no",
        ])),
        layout: layout
        // Will be passed to the page component as props
      },
    };
  }
);

const Tracking = (props) => {
  const { layout } = props;
  return (
    <WebLayout layout={layout}>
      <TrackingPageSection />
    </WebLayout>);
};


export default Tracking;
