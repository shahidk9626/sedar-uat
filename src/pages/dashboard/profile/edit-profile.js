import ProfileSkeleton from "@/components/skeleton/layout/profile";
import EditProfileSkeleton from "@/components/skeleton/layout/profile/editProfileSkeleton";
import ProfileLayout from "@/layouts/profile";
import { getEditProfile } from "@/redux/slices/auth/profile";
import { getLayout } from "@/redux/slices/layout";
import { wrapper } from "@/redux/store";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <ProfileSkeleton />,
  ssr: false,
});

const EditProfileSection = dynamic(
  () => import("@/sections/profile/accountSetting/editProfile"),
  {
    loading: () => <EditProfileSkeleton />,
    ssr: false,
  }
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale, res, req } = context;
    const { dispatch, getState } = store;
    const GET_ALL_COOKIES = await req.cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES] ? JSON.parse(req.cookies[
      NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES
    ]) : {};

    // res.setHeader(
    //   "Cache-Control",
    //   `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
    //   }`
    // );

    await setReduxCookies(context, store);

    const { JWTAuthToken, user, USER_ID } = GET_ALL_COOKIES;


    await dispatch(getLayout());
    if (USER_ID) {
      await dispatch(
        getEditProfile({
          USER_ID: USER_ID,
          cust_user_id: user?.cust_email_id,
          auth_token: JWTAuthToken,
        })
      );
    }
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

const EditProfile = (props) => {
  const { layout } = props;
  return (
    <WebLayout layout={layout}>
      <ProfileLayout>
        <EditProfileSection />
      </ProfileLayout>
    </WebLayout>
  );
};

export default EditProfile;
