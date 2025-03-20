import WebLayoutSkeleton from "@/components/skeleton/layout";
import BlogDetail from "@/sections/blog/detail";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { BlogDetailData } from "@/utils/blog";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import { isEmpty } from "lodash";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <WebLayoutSkeleton />,
  ssr: true,
});

export const getServerSideProps = async (context) => {
  const { locale, res, req, query } = context;
  const { cookies } = req;
  const GET_ALL_COOKIES = (await cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    ? JSON.parse(cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : null;
  const { slug } = query;
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=10, stale-while-revalidate=${
      process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
    }`
  );
  const slugUrl = (slug && slug?.pop()) || "";
  const [blogDetailLayout, blogDetail] = await Promise.all([
    LayoutData({
      params: { page_name: "blog" },
      cookies: GET_ALL_COOKIES,
      locale: locale,
    }),
    apiSSRV2DataService.getAll({
      path: `v2/homepage/first`,
      cookies: GET_ALL_COOKIES,
      locale: locale,
      param: { content: "blog", slug_url: slugUrl },
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      blogDetailLayout: blogDetailLayout,
      data: blogDetail,
      // Will be passed to the page component as props
    },
  };
};

const BlogDetailPage = (props) => {
  const { blogDetailLayout, data } = props;
  const blogData =
    data?.result?.COMPONENT && data?.result?.COMPONENT?.length
      ? data?.result?.COMPONENT[0]?.PARENT
      : "";
  const breadCrumbData =
    !isEmpty(data?.result?.BREADCRUMB) &&
    Object.entries(data?.result?.BREADCRUMB).map(([key, value]) => ({
      title: key,
      link: value,
    }));
  const layout = useMemo(
    () => ({
      HEADER: {
        TOPBAR: blogDetailLayout?.result?.HEADER?.SG_TOP_BAR || [],
        MIDMENU: blogDetailLayout?.result?.HEADER?.SGMIDSEC || [],
        CATEGORIES: blogDetailLayout?.result?.HEADER?.SGMEGAMENU || [],
        LOGO: blogDetailLayout?.result?.HEADER?.LOGO || null,
      },
      FOOTER: {
        firstSection: blogDetailLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
        secondSection: blogDetailLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
        thirdSection: blogDetailLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
        fourthSection: blogDetailLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
      },
      SEO: blogDetailLayout?.result?.SEO,
    }),
    [blogDetailLayout]
  );

  return (
    <WebLayout layout={layout}>
      <BlogDetail
        data={BlogDetailData}
        blogData={blogData}
        breadCrumbData={breadCrumbData || {}}
      />
    </WebLayout>
  );
};

export default BlogDetailPage;
