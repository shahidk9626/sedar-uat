import { useAuthContext } from "@/auth/useAuthContext";
import AccountSettingSkeleton from "@/components/skeleton/layout/profile/accountSettingSkeleton";
import useProfileContext from "@/provider/profile/useProfileContext";
import { useRouter } from "next/router";
import React from "react";
import AccountDetail from "./accountDetail";
import AccountHeading from "./accountHeading";

const AccountSettingSection = () => {
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { USER_ID, user, JWTAuthToken } = cookies;
  const { getProfile, profileState } = useProfileContext();
  const { profile, isProfileLoading } = profileState;

  React.useEffect(() => {
    if (locale && USER_ID && JWTAuthToken && user?.cust_email_id) {
      getProfile(
        {
          USER_ID,
          cust_user_id: user?.cust_email_id,
          auth_token: JWTAuthToken,
        },
        locale
      );
    }
  }, [locale, USER_ID, user?.cust_email_id, JWTAuthToken]);

  if (isProfileLoading) {
    return <AccountSettingSkeleton />;
  }

  return (
    <>
      <AccountHeading />
      <AccountDetail data={profile?.result} />
    </>
  );
};
export default AccountSettingSection;
