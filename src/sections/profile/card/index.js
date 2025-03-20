import { useAuthContext } from "@/auth/useAuthContext";
import SavedCardSkeleton from "@/components/skeleton/layout/profile/savedCardSkeleton";
import SnackbarProvider from "@/components/snackbar";
import useSaveCardContext from "@/provider/saveCard/useSaveCardContext";
import { useRouter } from "next/router";
import React from "react";
import CardDetail from "./cardDetail";
import CardHeading from "./cardHeading";
import NewCardDetail from "./newCardDetail";


const CardSection = () => {
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user, JWTAuthToken } = cookies;
  const { saveCardState, getCardPayment } = useSaveCardContext();
  const { isCardPaymentLoading, cardPayment } = saveCardState;

  React.useEffect(() => {
    if (locale && user && JWTAuthToken) {
      getCardPayment({
        cust_user_id: user?.cust_email_id,
        auth_token: JWTAuthToken,
      });
    }
  }, [locale, user?.cust_email_id, JWTAuthToken]);

  if (isCardPaymentLoading) {
    return <SavedCardSkeleton />;
  }

  return (
    <>
      <CardHeading />
      {cardPayment && cardPayment?.result && cardPayment?.result?.length > 0 ? (
        <SnackbarProvider>
          <NewCardDetail data={cardPayment} getCardPayment={getCardPayment} />
        </SnackbarProvider>
      ) : (
        <CardDetail />
      )}
    </>
  );
};

export default CardSection;
