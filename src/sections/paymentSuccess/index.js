import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import PaymentError from "./errorPage";
import PaymentSuccess from "./success";
import ModificationSuccess from "./modification-success";
import PaymentPointsPay from "./points-pay";
import PaymentCapture from "./capture";
import TamaraPaymentAuthorise from "./tamara";

const PaymentSuccessSection = () => {
  const { query, push, locale } = useRouter();

  return (
    <Stack
      sx={{ alignItems: "center", justifyContent: "center", }}
    >
      {query?.page_name == "success" && <PaymentSuccess />}
      {query?.page_name == "sample" && <PaymentSuccess />}
      {query?.page_name == "modification" && <ModificationSuccess />}
      {query?.page_name == "error" && <PaymentError />}
      {query?.page_name == "pointsPay" && <PaymentPointsPay />}
      {query?.page_name == "capture" && <PaymentCapture />}
      {query?.page_name == "tamaraPayentAuthorise" && (
        <TamaraPaymentAuthorise />
      )}
    </Stack>
  );
};

export default PaymentSuccessSection;
