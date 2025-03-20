import { useAuthContext } from "@/auth/useAuthContext";
import { CustomLink } from "@/components/link";
import { EditOption } from "@/styles/cartPage";
import { useTranslation } from "next-i18next";
import Stack from "@mui/material/Stack";
import { useSelector } from "@/redux/store";
import { useRouter } from "next/router";
import Link from '@mui/material/Link';

const stock_validation = ["NOT_ACTIVE", "OUTOFSTOCK"];
const CartEditOptionModule = ({ data }) => {
  const { locale } = useRouter();
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user, modificationUser } = cookies || {};
  let head_sys_id = modificationUser?.head_sys_id
    ? modificationUser?.head_sys_id
    : 0;
  return (
    <>
      <Stack direction="row" alignItems="center">
        {user && user.cust_type == "ADMIN" && head_sys_id > 0 ? (
          <span>
            {data.brand_info && data.PRODUCT_YN == "Y" ? (
              <>
                <Link
                  lang={locale}
                  className="editoption"
                  href={
                    `${data.SPI_CATEGORY}/${data.SPI_SUB_CATEGORY}/${data.SPI_LINK_URL}/${data.brand_info.SII_CODE}/customize/edit/` +
                    data.SOL_SYS_ID
                  }
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    "&:hover": {
                      textDecoration: 'none'
                    }
                  })}
                >
                  <EditOption sx={{ display: "inline", pr: 2 }}>
                    {translate("Editoptions")}{" "}
                  </EditOption>
                </Link>
              </>
            ) : (
              ""
            )}
          </span>
        ) : stock_validation.indexOf(data.SFI_STATUS_NEW) == -1 ? (
          <>
            {data.SOL_ITEM_LABEL == "QUICK_BUY" ? (
              <CustomLink
                lang={locale}
                className="editoption"
                link={`${data.SPI_CATEGORY}/${data.SPI_SUB_CATEGORY}/${data.SPI_LINK_URL
                  }/${data.brand_info ? data.brand_info.SII_CODE : ""}/${data.SOL_SYS_ID
                  }`}
              >
                <EditOption sx={{ display: "inline", pr: 2 }}>
                  {translate("Editoptions")}{" "}
                </EditOption>
              </CustomLink>
            ) : data.SOL_ITEM_LABEL == "ADD_TO_CART" &&
              data.PRODUCT_YN == "N" &&
              data.ALLOW_CUSTOMIZATION_YN == "Y" ? (
              <CustomLink
                lang={locale}
                className="editoption"
                link={`${data.SPI_CATEGORY}/${data.SPI_SUB_CATEGORY}/${data.SPI_LINK_URL
                  }/${data.brand_info ? data.brand_info.SII_CODE : ""}/${data.SOL_SYS_ID
                  }`}
              >
                <EditOption sx={{ display: "inline", pr: 2 }}>
                  {translate("Editoptions")}{" "}
                </EditOption>
              </CustomLink>
            ) : data.SOL_ITEM_LABEL == "ADD_TO_CART" ? (
              ""
            ) : (
              <Link
                lang={locale}
                className="editoption"
                href={
                  `${data.SPI_CATEGORY}/${data.SPI_SUB_CATEGORY}/${data.SPI_LINK_URL}/${data.brand_info.SII_CODE}/customize/edit/` +
                  data.SOL_SYS_ID
                }
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  "&:hover": {
                    textDecoration: 'none'
                  }
                })}
              >
                <EditOption sx={{ display: "inline", pr: 2 }}>
                  {translate("Editoptions")}{" "}
                </EditOption>
              </Link>
            )}
          </>
        ) : (
          ""
        )}
      </Stack>
    </>
  );
};

export default CartEditOptionModule;
