import DynamicComponentRenderer from "@/components/importDynamicComponents";
import SkeletonBlog from "@/components/skeleton/pages/blogPage";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonBlog />,
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
    `public, s-maxage=10, stale-while-revalidate=${
      process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
    }`
  );
  const [blogLayout, blogData] = await Promise.all([
    LayoutData({
      params: { page_name: "blog" },
      cookies: GET_ALL_COOKIES,
      locale: locale,
    }),
    apiSSRV2DataService.getAll({
      path: `v2/homepage/first`,
      cookies: GET_ALL_COOKIES,
      locale: locale,
      param: { content: "blog" },
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      blogLayout: blogLayout,
      data: blogData || "",
      // Will be passed to the page component as props
    },
  };
};

const BlogPage = (props) => {
  const { blogLayout, data } = props;
  const layout = useMemo(
    () => ({
      HEADER: {
        TOPBAR: blogLayout?.result?.HEADER?.SG_TOP_BAR || [],
        MIDMENU: blogLayout?.result?.HEADER?.SGMIDSEC || [],
        CATEGORIES: blogLayout?.result?.HEADER?.SGMEGAMENU || [],
        LOGO: blogLayout?.result?.HEADER?.LOGO || null,
      },
      FOOTER: {
        firstSection: blogLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
        secondSection: blogLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
        thirdSection: blogLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
        fourthSection: blogLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
      },
      SEO: blogLayout?.result?.SEO,
    }),
    [blogLayout]
  );
  return (
    <WebLayout layout={layout}>
      <DynamicComponentRenderer
        data={
          data?.result?.COMPONENT &&
          data?.result?.COMPONENT?.length > 0 &&
          data?.result?.COMPONENT
        }
        enq_type="C"
      />
    </WebLayout>
  );
};

export default BlogPage;
