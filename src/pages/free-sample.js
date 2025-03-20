import FreeSampleMainSkeleton from "@/components/skeleton/layout/freeSample";
import FreeSampleSection from "@/sections/freeSample";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import {
  getQueryKeysStringUrl,
  getQueryKeysValuesObject,
  getQueryKeysValuesStringUrl,
  getQueryValuesStringUrl,
} from "@/utils/serverSideAction";
import { find } from "lodash";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <FreeSampleMainSkeleton />,
  ssr: true,
});

export const getServerSideProps = async (context) => {
  const { locale, res, req, query } = context;
  const { cookies } = req;
  const GET_ALL_COOKIES = (await cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    ? JSON.parse(cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : {};

  res.setHeader(
    "Cache-Control",
    `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
    }`
  );
  const queryKeysString = getQueryKeysStringUrl(query);

  const queryValuesString = getQueryValuesStringUrl(query);

  const QueryKeysValues = getQueryKeysValuesObject(true, query);

  const [freeSampleLayout, freeSampleCategory, freeSampleContent] =
    await Promise.all([
      LayoutData({
        param: {
          page_name: "free_sample",
        },
        locale: locale,
      }),
      apiSSRV2DataService.getAll({
        path: "freesample/category",
        locale: locale,
        param: {
          content: "free_sample",
          productId: query?.productId || null,
        },
        cookies: GET_ALL_COOKIES,
      }),
      apiSSRV2DataService.getAll({
        path: "v2/homepage/first",
        locale: locale,
        param: {
          content: "free_sample",
        },
        cookies: GET_ALL_COOKIES,
      }),
    ]);

  let freeSampleProducts = null;
  if (query?.productId) {
    freeSampleProducts =
      (await freeSampleCategory?.result) && freeSampleCategory?.result?.length
        ? find(freeSampleCategory?.result, {
          id: query?.productId,
        })
        : {};
  } else {
    freeSampleProducts =
      freeSampleCategory && freeSampleCategory?.result?.length > 0
        ? freeSampleCategory?.result[0]
        : [];
  }

  const pageNumber = query && query.page ? query.page : 0;

  let material, url, thirdUrl;

  if (
    (query && query?.category) ||
    (query && query?.product) ||
    (query && query?.sub_category)
  ) {
    material = {
      slug_url: query?.slug_url,
      category: query?.category,
      product: query?.product,
      sub_category: query?.sub_category,
      type: "free_sample",
      page_number: 0,
      product_name: freeSampleCategory?.result?.[0]["product"][0]?.desc || "",
    };
  } else {
    material = {
      slug_url: freeSampleCategory?.result?.[0]["product"][0]?.link_url || "",
      sub_category: freeSampleCategory?.result?.[0]?.link_url || "",
      productId: freeSampleCategory?.result?.[0]?.id || "",
      category: freeSampleCategory?.result?.[0]?.parent_category || "",
      product: freeSampleCategory?.result?.[0]["product"][0]?.item_code || "",
      type: "free_sample",
      page_number: 0,
      product_name: freeSampleCategory?.result[0]["product"]?.[0]?.desc,
    };
  }

  if (material.type && material.type == "free_sample") {
    url = {
      content: "item_info_listing",
      slug_url: material.slug_url,
      category_slug: "",
      product_slug: material.slug_url,
      limit: "21",
      page: pageNumber,
      filters: queryKeysString,
      filter_values: queryValuesString,
      type: material.type,
      ...QueryKeysValues,
    };

    thirdUrl = {
      category: material?.category,
      sub_category: material?.sub_category,
      product: material?.product,
      page: pageNumber,
      limit: "21",
      ...QueryKeysValues,
    };
    const filterQueryParams = {
      category: material.category,
      sub_category: material.sub_category,
    };

    const [productsData, productFilter] = await Promise.all([
      apiSSRV2DataService.getAll({
        path: `v2/third`,
        param: thirdUrl,
        cookies: GET_ALL_COOKIES,
        locale: locale,
      }),
      apiSSRV2DataService.getAll({
        path: `v2/filters`,
        param: filterQueryParams,
        cookies: GET_ALL_COOKIES,
        locale: locale,
      }),
    ]);

    if (
      productsData?.result?.MATERIAL?.active_page >
      productsData?.result?.MATERIAL?.page_count
    ) {
      const data = {
        ...query,
        page: 1,
      };
      const getQueryStringUrls = getQueryKeysValuesStringUrl(true, data)
        ? `?${getQueryKeysValuesStringUrl(true, data)}`
        : "";

      return {
        redirect: {
          destination: `/${locale}/free-sample${getQueryStringUrls}`,
          statusCode: 301,
        },
      };
    }

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"], null, [
          "en",
          "no",
        ])),
        material: material,
        productsData: productsData || null,
        freeSampleLayout: freeSampleLayout || null,
        freeSampleCategory: freeSampleCategory || null,
        freeSampleContent: freeSampleContent || null,
        freeSampleProducts: freeSampleProducts || null,
        productFilter: productFilter || null,
        // Will be passed to the page component as props
      },
    };
  } else {
    return {
      redirect: {
        destination: `/${locale}`,
        statusCode: 301,
      },
    };
  }
};

const ToolsAndGuides = (props) => {
  const {
    material,
    content,
    productsData,
    freeSampleCategory,
    freeSampleLayout,
    freeSampleContent,
    freeSampleProducts,
    productFilter,
  } = props;

  const ProductFilters = useMemo(() => {
    const colorFilter =
      productFilter?.result &&
      productFilter?.result?.FILTERS?.length > 0 &&
      productFilter?.result?.FILTERS.find((item) => item?.SFT_CODE == "009");
    return colorFilter || null;
  }, [productFilter]);

  const layout = {
    HEADER: {
      TOPBAR: freeSampleLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: freeSampleLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: freeSampleLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: freeSampleLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: freeSampleLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: freeSampleLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: freeSampleLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: freeSampleLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: freeSampleLayout?.result?.SEO,
  };

  return (
    <WebLayout layout={layout}>
      <FreeSampleSection
        material={material}
        content={content}
        productsData={productsData}
        freeSampleContent={freeSampleContent}
        freeSampleProducts={freeSampleProducts}
        ProductFilters={ProductFilters}
        freeSampleCategory={freeSampleCategory}
      />
    </WebLayout>
  );
};

export default ToolsAndGuides;
