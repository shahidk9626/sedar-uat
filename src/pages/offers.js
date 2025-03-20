import OfferPageSkeleton from "@/components/skeleton/offers";
import ProductProvider from "@/provider/product/productProvider";
import OffersPageSection from "@/sections/offers";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <OfferPageSkeleton />,
  ssr: true,
});

export const getServerSideProps = async (context) => {
  const { locale, res, req } = context;
  const { cookies } = req;
  const GET_ALL_COOKIES = (await cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    ? JSON.parse(cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : null;
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
    }`
  );


  const [productLayout, offerData] = await Promise.all([
    LayoutData({
      param: {
        page_name: "product_offer",
      },
      cookies: GET_ALL_COOKIES,
      locale: locale,
    }),
    apiSSRV2DataService.getAll({
      path: `v2/homepage/first`,
      param: {
        content: "product_offer",
      },
      cookies: GET_ALL_COOKIES,
      locale: locale,
    }),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      productLayout: productLayout || null,
      data: offerData,
    },
  };
};

const OffersPage = (props) => {
  const { productLayout, data } = props;

  const layout = useMemo(() => {
    return {
      HEADER: {
        TOPBAR: productLayout?.result?.HEADER?.SG_TOP_BAR || [],
        MIDMENU: productLayout?.result?.HEADER?.SGMIDSEC || [],
        CATEGORIES: productLayout?.result?.HEADER?.SGMEGAMENU || [],
        LOGO: productLayout?.result?.HEADER?.LOGO || null,
      },
      FOOTER: {
        firstSection: productLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
        secondSection: productLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
        thirdSection: productLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
        fourthSection: productLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
      },
      SEO: productLayout?.result?.SEO,
    };
  }, [productLayout]);

  const offerData = useMemo(() => {
    let offers = [];
    data?.result &&
      data?.result?.COMPONENT?.length > 0 &&
      data?.result?.COMPONENT.forEach((element) => {
        if (
          element?.PARENT &&
          element?.PARENT?.component_url ==
          "Component/OfferProductList/Index" &&
          element?.PARENT?.CHILD &&
          element?.PARENT?.CHILD?.length > 0
        ) {
          element?.PARENT?.CHILD.forEach((childElement, childIndex) => {
            offers.push({
              CHILD: [],
              ...childElement?.MATERIAL_LIST,
              ...childElement,
            });
            if (
              childElement?.MATERIAL_LIST?.result &&
              childElement?.MATERIAL_LIST?.result?.length > 0
            ) {
              childElement?.MATERIAL_LIST?.result.forEach((grandChild) => {
                offers[childIndex]?.CHILD.push(grandChild);
              });
            }
          });
        }
      });

    return offers;
  }, [data]);

  return (
    <WebLayout layout={layout}>
      <ProductProvider>
        <OffersPageSection data={data} offerData={offerData} />
      </ProductProvider>
    </WebLayout>
  );
};
export default OffersPage;
