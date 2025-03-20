import SkeletonPaymentSuccess from "@/components/skeleton/pages/paymentSuccessPage";
import { getAccessibilityPageData } from "@/redux/slices/accessibility";
import { getLayout } from "@/redux/slices/layout";
import { wrapper } from "@/redux/store";
import PaymentSuccessSection from "@/sections/paymentSuccess";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";


const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonPaymentSuccess />,
  ssr: false,
});


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale, res } = context;
    const { dispatch, getState } = store;

    // res.setHeader(
    //   "Cache-Control",
    //   `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
    //   }`
    // );

    await setReduxCookies(context, store);


    await dispatch(
      getLayout({
        page_name: "payment-success",
      })
    );
    await dispatch(
      getAccessibilityPageData({
        content: "accessibility",
      })
    );
    const { layout } = getState().layout;
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"], null, [
          "en",
          "no",
        ])),
        layout: layout,
        // Will be passed to the page component as props
      },
    };
  }
);

const PaymentSuccess = (props) => {
  const { layout } = props;
  return (<WebLayout layout={layout}>
    <PaymentSuccessSection />
  </WebLayout>);
};
export default PaymentSuccess;
