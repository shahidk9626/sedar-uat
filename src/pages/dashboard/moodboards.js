import WebLayoutSkeleton from "@/components/skeleton/layout";
import { getLayout } from "@/redux/slices/layout";
import { getToolGuidesPageData } from "@/redux/slices/tools-and-guides";
import { wrapper } from "@/redux/store";
import MoodBoardsSection from "@/sections/profile/wishlist/moodboards";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <WebLayoutSkeleton />,
  ssr: true,
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


    await dispatch(getLayout());
    await dispatch(
      getToolGuidesPageData({
        content: "tools_and_guides",
      })
    );
    const { layout } = getState().layout;
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

const MoodBoards = (props) => {
  const { layout } = props;
  return (<WebLayout layout={layout}>
    <MoodBoardsSection />
  </WebLayout>);
};

export default MoodBoards;
