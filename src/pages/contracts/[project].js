import HospitalitySkeleton from "@/components/skeleton/pages/hospitality";
import { getLayout } from "@/redux/slices/layout";
import { getProjectPageData } from "@/redux/slices/project";
import { wrapper } from "@/redux/store";
import HospitalityPageSection from "@/sections/hospitality";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <HospitalitySkeleton />,
  ssr: true,
});


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale, res, query } = context;
    const { dispatch, getState } = store;

    res.setHeader(
      "Cache-Control",
      `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
      }`
    );

    await setReduxCookies(context, store);



    await dispatch(getLayout({
      page_name:query?.project,
      seo_type:'contracts',
    }));

    await dispatch(
      getProjectPageData({
        content: "contracts",
        slug_url: query?.project,
        seo_type:'contracts',
      })
    );
    const { layout } = getState().layout;
    const { data } = getState().project;
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"], null, [
          "en",
          "no",
        ])),
        layout: layout,
        data: data,
        // Will be passed to the page component as props
      },
    };
  }
);

const HospitalityPage = (props) => {
  const { layout, data } = props;
  return (
    <WebLayout layout={layout}>
      <HospitalityPageSection data={data} />
    </WebLayout>
  );
};
export default HospitalityPage;
