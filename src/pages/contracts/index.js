import SkeletonContracts from "@/components/skeleton/pages/contractsPage";
import { getContractPageData } from "@/redux/slices/contract";
import { getLayout } from "@/redux/slices/layout";
import { wrapper } from "@/redux/store";
import ContractPageSection from "@/sections/contract";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { eng } from "@/utils/constant";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonContracts />,
  ssr: true,
});

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale, res } = context;
    const { dispatch, getState } = store;

    res.setHeader(
      "Cache-Control",
      `public, s-maxage=10, stale-while-revalidate=${
        process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
      }`
    );

    await setReduxCookies(context, store);

    const localeUrl = `${getState()?.locale?.cookies?.countryName || global}-${
      getState()?.locale?.cookies?.langName || eng
    }`;

    await dispatch(getLayout({
      page_name:'contracts',
      seo_type:'contracts',
    }));

    
    await dispatch(
      getContractPageData({
        content: "contracts",
      })
    );
    const { layout } = getState().layout;
    const { data } = getState().contract;
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

const ContractPage = (props) => {
  const { layout, data } = props;
  return (
    <WebLayout layout={layout}>
      <ContractPageSection data={data} />
    </WebLayout>
  );
};

export default ContractPage;
