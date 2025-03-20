import { useAuthContext } from "@/auth/useAuthContext";
import AddressListSkeleton from "@/components/skeleton/layout/profile/addressListSkeleton";
import useProfileContext from "@/provider/profile/useProfileContext";
import { useRouter } from "next/router";
import React from "react";
import AddressDetail from "./addressDetail";
import AddressHeading from "./addressHeading";


const AddressListSection = () => {
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { USER_ID, user, JWTAuthToken } = cookies;
  const { profileState, getAddress } = useProfileContext();
  const { isAddressLoading } = profileState;

  React.useEffect(() => {
    if (locale && USER_ID && JWTAuthToken && user?.cust_email_id) {
      const params = {
        USER_ID,
        cust_user_id: user?.cust_email_id,
        auth_token: JWTAuthToken,
      };
      setTimeout(() => {
        getAddress(params);
      }, 500);
    }
  }, [locale, USER_ID, user?.cust_email_id, JWTAuthToken]);

  if (isAddressLoading) {
    return <AddressListSkeleton />;
  }

  return (
    <>
      <AddressHeading />
      <AddressDetail />
    </>
  );
};

export default AddressListSection;
