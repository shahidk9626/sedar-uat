import CommonPageComponent from "@/components/common-page";
import { useTranslation } from "next-i18next";

const NotFound = () => {
  const { t: translate } = useTranslation();
  return (
    <>
      <CommonPageComponent
        imageSx={{
          aspectRatio: "1 / 1",
          width: { lg: "30% !important", md: "30% !important", sm: "30% !important", xs: "50% !important", xxs: "75% !important" },
        }}
        imageWidth="50%"
        imgBoxSx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
        image="/assets/dashboard/Group.png"
        title={translate("NoActiveOrders")}
        heading={translate("Therenorecentordertoshow")}
        buttonText={translate("StartShopping")}
        link="/"
      />
    </>
  );
};

export default NotFound;
