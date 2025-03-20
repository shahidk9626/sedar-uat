import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { useDispatch } from "@/redux/store";
import { apiDataService } from "@/utils/apiDataService";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import $ from "jquery";
import { useTranslation } from "next-i18next";

const PayFortInstallmentsMerchantPage = () => {
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { cniso, CCYCODE } = cookies || {};

  if (
    ["AE", "SA"].indexOf(cniso) == -1 ||
    ["AED", "SAR"].indexOf(CCYCODE) == -1
  ) {
    return false;
  }

  const payFortInstallmentsMerchant = () => {
    dispatch(apiDataService.post("payment/merchantPage/installments"))
      .then((response) => {
        let res_data = response.data;
        $("body").append(res_data.form);
        $("#payfort_payment_form input[type=submit]").click();
      })
      .catch((e) => {
        console.log(e, "InstallmentMerchantPage ERROR");
      });
  };

  return (
    <>
      <Box
        component="div"
        onClick={payFortInstallmentsMerchant}
        sx={{ cursor: "pointer" }}
        mt={0}
      >
        <Stack
          direction={{
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
            xxs: "column",
          }}
          textAlign={{
            lg: "start",
            md: "start",
            sm: "center",
            xs: "center",
            xxs: "center",
          }}
          justifyContent="left"
          alignItems="center"
          spacing={1}
        >
          <Typography
            sx={(theme) => ({
              ...theme.typography.typography15,
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              fontWeight: 200,
              letterSpacing: 0.5,
              color: theme.palette.common.black,
            })}
          >
            {translate("Payfortinstallments_payment")}
          </Typography>
          <NextLazyLoadImage
            src="/assets/images/payment/Payfortinstallments_EN.png"
            alt="sedarglobal"
            width={92}
            height={22.7}
            sx={{
              width: "92px!important",
              height: "100%!important",
              objectFit: "cover!important",
            }}
            sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
            objectFit="contain"
            upLgWidth={92}
            downLgWidth={92}
            downMdWidth={92}
            downSmWidth={92}
            downXsWidth={92}
          />
        </Stack>
      </Box>
    </>
  );
};

export default PayFortInstallmentsMerchantPage;
