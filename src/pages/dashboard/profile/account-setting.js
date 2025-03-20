import AuthGuard from "@/auth/AuthGuard";
import ProfileSkeleton from "@/components/skeleton/layout/profile";
import AccountSettingSkeleton from "@/components/skeleton/layout/profile/accountSettingSkeleton";
import ProfileLayout from "@/layouts/profile";
import ProfileProvider from "@/provider/profile/profileProvider";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <ProfileSkeleton />,
  ssr: false,
});


const AccountSettingSection = dynamic(
  () => import("@/sections/profile/accountSetting"),
  {
    loading: () => <AccountSettingSkeleton />,
    ssr: false,
  }
);

export const getServerSideProps = async (context) => {
  const { locale, res, req } = context;
  const { cookies } = req;
  const GET_ALL_COOKIES = (await cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    ? JSON.parse(cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : null;

  // res.setHeader(
  //   "Cache-Control",
  //   `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES || 9
  //   }`
  // );
  const accountSettingLayout = await LayoutData({
    cookies: GET_ALL_COOKIES,
    locale: locale,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      accountSettingLayout: accountSettingLayout,
      // Will be passed to the page component as props
    },
  };
};

const AccountSetting = (props) => {
  const { accountSettingLayout } = props;

  const layout = {
    HEADER: {
      TOPBAR: accountSettingLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: accountSettingLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: accountSettingLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: accountSettingLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: accountSettingLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: accountSettingLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: accountSettingLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: accountSettingLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: accountSettingLayout?.result?.SEO,
  };

  return (
    <WebLayout layout={layout}>
      <AuthGuard>
        <ProfileProvider>
          <ProfileLayout>
            <AccountSettingSection />
          </ProfileLayout>
        </ProfileProvider>
      </AuthGuard>
    </WebLayout>
  );
};

export default AccountSetting;
