import AuthGuard from "@/auth/AuthGuard";
import ProfileSkeleton from "@/components/skeleton/layout/profile";
import MobileProfileSkeleton from "@/components/skeleton/layout/profile/mobileProfileSkeleton";
import ProfileLayout from "@/layouts/profile";
import { getEditProfile } from "@/redux/slices/auth/profile";
import { getLayout } from "@/redux/slices/layout";
import { wrapper } from "@/redux/store";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { setReduxCookies } from "@/utils/serverSideAction";
import Box from "@mui/material/Box";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <ProfileSkeleton />,
  ssr: true,
});

const ProfileMobileSection = dynamic(
  () => import("@/sections/profile/profileMobile"),
  {
    loading: () => <MobileProfileSkeleton />,
    ssr: true,
  }
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale, res, req } = context;
    const { dispatch, getState } = store;
    const GET_ALL_COOKIES = await req.cookies[
      NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES
    ] ? JSON.parse(req.cookies[
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
    if (user) {
      await dispatch(
        getEditProfile({
          USER_ID: USER_ID,
          cust_user_id: user?.cust_email_id,
          auth_token: JWTAuthToken,
        })
      );
    }
    const { layout } = getState().layout;
    const { user: updateUser } = GET_ALL_COOKIES;
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"], null, [
          "en",
          "no",
        ])),
        layout: layout,
        user: updateUser,
        // Will be passed to the page component as props
      },
    };
  }
);

const Profile = (props) => {
  const { layout, user } = props;
  return (
    <WebLayout layout={layout}>
      <AuthGuard>
        <ProfileLayout mt={2} layout={layout}>
          <Box
            display={{
              lg: "none",
              md: "none",
              sm: "block",
              xs: "block",
              xxs: "block",
            }}
          >
            <ProfileMobileSection user={user} />
          </Box>
        </ProfileLayout>
      </AuthGuard>
    </WebLayout>
  );
};

export default Profile;
