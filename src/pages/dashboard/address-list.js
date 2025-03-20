import AuthGuard from "@/auth/AuthGuard";
import ProfileSkeleton from "@/components/skeleton/layout/profile";
import AddressListSkeleton from "@/components/skeleton/layout/profile/addressListSkeleton";
import ProfileLayout from "@/layouts/profile";
import ProfileProvider from "@/provider/profile/profileProvider";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <ProfileSkeleton />,
  ssr: true,
});

const AddressListSection = dynamic(
  () => import("@/sections/profile/addressList"),
  {
    loading: () => <AddressListSkeleton />,
    ssr: true,
  }
);

export const getServerSideProps = async (context) => {
  const { locale, res, req } = context;
  // const { dispatch, getState } = store;
  const { cookies } = req;
  const GET_ALL_COOKIES = (await cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    ? JSON.parse(cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : null;

  // res.setHeader(
  //   "Cache-Control",
  //   `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
  //   }`
  // );

  const addressListLayout = await LayoutData({
    cookies: GET_ALL_COOKIES,
    locale: locale,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      addressListLayout: addressListLayout || null,
      // Will be passed to the page component as props
    },
  };
};

const AddressList = (props) => {
  const { addressListLayout } = props;

  const layout = {
    HEADER: {
      TOPBAR: addressListLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: addressListLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: addressListLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: addressListLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: addressListLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: addressListLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: addressListLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: addressListLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: addressListLayout?.result?.SEO,
  };

  return (
    <>
      <WebLayout layout={layout}>
        <AuthGuard>
          <ProfileProvider>
            <ProfileLayout>
              <AddressListSection />
            </ProfileLayout>
          </ProfileProvider>
        </AuthGuard>
      </WebLayout>
    </>
  );
};

export default AddressList;
