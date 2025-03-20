import CommonPageComponent from "@/components/common-page";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Success = () => {
  const { query } = useRouter();
  const { t: translate } = useTranslation();
  const { email } = query;

  return (
    <CommonPageComponent
      image="/assets/success/success.png"
      title={translate("request_submitted_successfully")}
      heading={`${translate("Youwillreceiveanemailconfirmationto")}`}
      mt={{ margintTop: "0" }}
      mail={`${email}`}
      buttonText={translate("ContinueShopping")}
      link="/"
      sxButton={{ marginTop: "25px" }}
      imageSx={{
        width: "60px!important",
      }}
      imgBoxSx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    />
  );
};

export default Success;
