import ProductSlugSkeleton from "@/components/skeleton/layout/productSlug";
import ProductPageSlugSection from "@/sections/productSlug";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <ProductSlugSkeleton />,
  ssr: true,
});

export const getServerSideProps = async (context) => {
  const { locale, res, req, query } = context;
  const { cookies } = req;
  const { slug } = query || {};

  res.setHeader(
    "Cache-Control",
    `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
    }`
  );
  const GET_ALL_COOKIES = cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES]
    ? JSON.parse(cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : {};
  const category_slug =
    context?.query?.slug && context?.query?.slug.length > 0
      ? context?.query?.slug[0]
      : "undefined";
  const sub_category_slug =
    context?.query?.slug && context?.query?.slug.length > 0
      ? context?.query?.slug[1]
      : "undefined";

  const [productLayout, productsSlugPageData, firstData] = await Promise.all([
    LayoutData({
      param: {
        seo_type: "PRODUCT",
        page_name: slug && slug.length > 0 ? slug.pop(1) : "",
      },
      cookies: GET_ALL_COOKIES,
      locale: locale,
    }),
    apiSSRV2DataService.getAll({
      path: `v2/product/third`,
      param: {
        content: "product_category_listing",
        category_redirect_type: "product",
        category_slug: category_slug,
        slug_url: sub_category_slug,
        filters: "",
      },
      cookies: GET_ALL_COOKIES,
      locale: locale,
    }),
    apiSSRV2DataService.getAll({
      path: `v2/first`,
      param: {
        content: "product_category_listing",
        slug_url: sub_category_slug,
        category: category_slug,
      },
      cookies: GET_ALL_COOKIES,
      locale: locale,
    }),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      productLayout: productLayout,
      productsSlugPageData: productsSlugPageData,
      firstData: firstData,
      // Will be passed to the page component as props
    },
  };
};

const ProductPageSlug = (props) => {
  const { productLayout, productsSlugPageData, firstData } = props;
  const layout = {
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

  return (
    <WebLayout layout={layout}>
      <ProductPageSlugSection
        firstData={firstData}
        productsSlugPageData={productsSlugPageData}
      />
    </WebLayout>
  );
};
export default ProductPageSlug;
