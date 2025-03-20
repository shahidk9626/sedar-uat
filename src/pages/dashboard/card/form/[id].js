import ProfileSkeleton from "@/components/skeleton/layout/profile";
import AddNewCardSkeleton from "@/components/skeleton/layout/profile/addNewCardSkeleton";
import ProfileLayout from "@/layouts/profile";
import { getLayout } from "@/redux/slices/layout";
import { wrapper } from "@/redux/store";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const SnackbarProvider = dynamic(
  () => import("@/components/snackbar/SnackbarProvider"),
  {
    ssr: false,
  }
);

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <ProfileSkeleton />,
  ssr: false,
});

const AddNewCardSection = dynamic(
  () => import("@/sections/profile/card/add/index"),
  {
    loading: () => <AddNewCardSkeleton />,
    ssr: true,
  }
);

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

const Card = (props) => {
  const { layout } = props;
  return (
    <WebLayout layout={layout}>
      <ProfileLayout>
        <SnackbarProvider>
          <AddNewCardSection />
        </SnackbarProvider>
      </ProfileLayout>
    </WebLayout>
  );
};

export default Card;
