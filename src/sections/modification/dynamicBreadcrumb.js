import { CustomLink } from "@/components/link";
import useCartContext from "@/provider/cart/cartContext";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const CartDynamicBreadcrumb = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const { cartState } = useCartContext();
  const { cart } = cartState;
  const { header_info } = cart || {};

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          "& .MuiBreadcrumbs-separator": {
            m: "0px",
            width: "6%",
          },
        }}
        separator={<ArrowForwardIos sx={{ width: "15px" }} />}
      >
        <CustomLink
          link={`/modification?head_sys_id=${header_info && header_info?.SOH_SYS_ID ? header_info?.SOH_SYS_ID : 0
            }`}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.common.black,
              opacity: router?.pathname == "/cart/clickCollect" ? 1 : 0.7,
            }}
            variant="typography18"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
          >
            {translate("CartInfo")}
          </Typography>
        </CustomLink>

        <CustomLink
          link={`/modification/shipping?head_sys_id=${header_info?.SOH_SYS_ID}`}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.common.black,
              opacity: router?.pathname == "/cart/clickCollect" ? 1 : 0.7,
            }}
            variant="typography18"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
          >
            {translate("ShippingInfo")}
          </Typography>
        </CustomLink>

        {header_info && header_info?.SOH_CARRIER_CODE == "DO02" ? (
          <CustomLink
            link={`/modification/delivery?head_sys_id=${header_info?.SOH_SYS_ID}`}
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.common.black,
                opacity: router?.pathname == "/cart/clickCollect" ? 1 : 0.7,
              }}
              variant="typography18"
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
            >
              {translate("Delivery")}
            </Typography>
          </CustomLink>
        ) : (
          ""
        )}
      </Breadcrumbs>
    </>
  );
};

export default CartDynamicBreadcrumb;
