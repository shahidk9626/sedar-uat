import { CustomLink } from "@/components/link";
import React from "react";
import { useTranslation } from "next-i18next";
import Stack from "@mui/material/Stack";
import { EditOption } from "@/styles/cartPage";
import { useRouter } from "next/router";

const stock_validation = ["NOT_ACTIVE", "OUTOFSTOCK"];
const SaveEditOptionModule = ({ data }) => {
  const { locale } = useRouter();
  const { t: translate } = useTranslation();
  return (
    <>
      <Stack direction="row" alignItems="center">
        {stock_validation.indexOf(data.SFI_STATUS_NEW) == -1 ? (
          <>
            {data.SOL_ITEM_LABEL == "QUICK_BUY" ? (
              <CustomLink
                lang={locale}
                className="editoption"
                link={`/${data.SPI_CATEGORY}/${data.SPI_SUB_CATEGORY}/${data.SPI_LINK_URL
                  }/${data.brand_info ? data.brand_info.SII_ITEM_ID : ""}/${data.SOL_SYS_ID
                  }/customize`}
              >
                <EditOption sx={{ display: "inline", pr: 2 }}>
                  {translate("Editoptions")}{" "}
                </EditOption>
              </CustomLink>
            ) : data.SOL_ITEM_LABEL == "ADD_TO_CART" ? (
              ""
            ) : (
              <CustomLink
                lang={locale}
                className="editoption"
                link={
                  `/${data.SPI_CATEGORY}/${data.SPI_SUB_CATEGORY}/${data.SPI_LINK_URL}/customize/edit/` +
                  data.SOL_SYS_ID
                }
              >
                <EditOption sx={{ display: "inline", pr: 0.5 }}>
                  {translate("Editoptions")}{" "}
                </EditOption>
              </CustomLink>
            )}
          </>
        ) : (
          ""
        )}
      </Stack>
    </>
  );
};

export default SaveEditOptionModule;
