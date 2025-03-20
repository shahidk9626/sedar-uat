import WebLayout from "@/layouts/web";
import SeoHeader from "@/modules/seoHeader";
import WebSiteShema from "@/modules/websiteSchema";
import { useDispatch } from "@/redux/store";
import { setSSGReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import useResponsive from "@/hooks/useResponsive";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { apiSSGHFDataService } from "@/utils/apiSSGHFDataService";
import ReactFullpage from "@fullpage/react-fullpage";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import DynamicComponentRenderer, {
  ImportDynamicComponent,
} from "@/components/importDynamicComponents";
import StickyBar from "@/sections/homepage/primary/landing/stickyBar";
import PropTypes from "prop-types";

export const getStaticProps = async (context) => {
  const { locale } = context;

  let homePageData = null,
    landing;
  const layout = {
    HEADER: {},
    FOOTER: {},
    SEO: null,
  };

  try {
    // Fetching landing page data or homepage data based on locale
    if (locale === "default") {
      const response = await apiSSGV2DataService.getAll(`v2/homepage/first`, {
        content: "landing_page_v2",
        locale,
      });
      landing = response?.data || {};
    } else {
      const response = await apiSSGV2DataService.getAll(`v2/homepage/first`, {
        content: "homepage",
        locale,
      });
      homePageData = response?.data?.result || {};
    }

    // Fetching header and footer data
    const headerFooterResponse = await apiSSGHFDataService.getAll(`v2/header`, {
      content: locale === "default" ? "landing_page" : "homepage",
      page_name: locale == "default" ? "landing_page" : "homepage",
      locale,
    });
    const headerFooterData = headerFooterResponse?.data?.result || {};
    // Assigning header and footer data
    layout.HEADER = {
      TOPBAR: headerFooterData?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: headerFooterData?.HEADER?.SGMIDSEC || [],
      CATEGORIES: headerFooterData?.HEADER?.SGMEGAMENU || [],
      LOGO: headerFooterData?.HEADER?.LOGO || null,
    };

    layout.FOOTER = {
      firstSection: headerFooterData?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: headerFooterData?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: headerFooterData?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: headerFooterData?.FOOTER?.SG_FOOTER_4 || [],
    };

    layout.SEO = headerFooterData?.SEO || null;
  } catch (error) {
    console.log("Error fetching homepage data:", error);
  }

  const productType = "BROWSE_COLLECTION";

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      homepageData: homePageData,
      layout,
      locale,
      landing: landing || null,
      productType,
      revalidate:
        parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,

    },
  };
};

export default function Home(props) {
  const [homePageData, setHomePageData] = React.useState(props);
  const { homepageData, layout, landing } = props;
  const dispatch = useDispatch();
  const [showAppBar, setShowAppBar] = React.useState(false);
  const fullPageRef = React.useRef();
  const { state } = useAuthContext();
  const { cookies } = state;
  const router = useRouter();
  const isDownLg = useResponsive("down", "lg");
  const isUpLg = useResponsive("up", "lg");
  const { locale } = router;

  React.useEffect(() => {
    setHomePageData(props);
  }, [props]);

  React.useEffect(() => {
    setSSGReduxCookies(router, { dispatch: dispatch, cookies: cookies });
  }, [router]);

  function ShowScrollHeader(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    return (
      <Slide appear={false} in={trigger}>
        {children}
      </Slide>
    );
  }

  ShowScrollHeader.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {locale == "default" ? (
          <>
            <SeoHeader data={layout} router={router} />
            {router.pathname == "/" ? (
              <WebSiteShema data={layout?.SEO} router={router} />
            ) : (
              ""
            )}
            {isDownLg && (
              <Box
                component="div"
                sx={{
                  position: "relative",
                }}
              >
                <Box component="div" id="menu">
                  <Slide appear={false} in={showAppBar}>
                    <Box
                      component="div"
                      sx={(theme) => ({
                        zIndex: 1200,
                        transition: theme.transitions.create(
                          ["all", "position"],
                          {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.shorter,
                          }
                        ),
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        display: "block",
                      })}
                    >
                      <StickyBar
                        data={landing?.result?.COMPONENT?.[0]?.PARENT?.CHILD[0]}
                        HEADER_IMAGE={
                          landing?.result?.COMPONENT?.[0]?.PARENT?.CHILD?.[1]
                            ?.image_path_portrait
                        }
                      />
                    </Box>
                  </Slide>
                </Box>
                <ReactFullpage
                  licenseKey={""}
                  beforeLeave={function (
                    origin,
                    destination,
                    direction,
                    trigger
                  ) {
                    if (destination?.index >= 1) {
                      setShowAppBar(true);
                    } else if (direction == "up" && destination?.index == 1) {
                      setShowAppBar(false);
                    } else {
                      setShowAppBar(false);
                    }
                  }}
                  scrollingSpeed={1000}
                  credits={{
                    enabled: false,
                    label: "",
                    position: "unset",
                  }}
                  menu="#menu"
                  bigSectionsDestination="top"
                  interlockedSlides={true}
                  offsetSections={true}
                  cards={true}
                  cardsOptions={{
                    perspective: 100,
                    fadeContent: true,
                    fadeBackground: true,
                  }}
                  parallax={true}
                  parallaxOptions={{
                    type: "cover",
                    percentage: 400,
                    property: "translate",
                  }}
                  lazyLoading={true}
                  ref={fullPageRef}
                  render={(props) => {
                    return (
                      <ReactFullpage.Wrapper>
                        {landing?.result?.COMPONENT &&
                          landing?.result?.COMPONENT?.length > 0 &&
                          landing?.result?.COMPONENT?.map((item, index) => {
                            return (
                              <Box
                                key={index}
                                component="div"
                                className="section"
                                sx={{
                                  position: "relative",
                                  height: {
                                    md: "auto",
                                    sm: "100dvh!important",
                                    xs: "100dvh!important",
                                    xxs: "100dvh!important",
                                  },
                                  overflow: "hidden",
                                  display: "block",
                                }}
                              >
                                <ImportDynamicComponent
                                  url={item?.PARENT.component_url}
                                  data={item}
                                  breadcrumb={item?.result?.BREADCRUMB || ""}
                                  isLanding={true}
                                  enq_type="C"
                                  onPauseScroll={() => {
                                    if (fullPageRef.current) {
                                      fullPageRef.current.fullpageApi.setAllowScrolling(
                                        false
                                      );
                                    }
                                  }}
                                  onResumeScroll={() => {
                                    if (fullPageRef.current) {
                                      fullPageRef.current.fullpageApi.setAllowScrolling(
                                        true
                                      );
                                    }
                                  }}
                                />
                              </Box>
                            );
                          })}
                      </ReactFullpage.Wrapper>
                    );
                  }}
                />
                <Box
                  sx={{
                    position: "fixed",
                    bottom: 0,
                    zIndex: 5,
                    width: "100%",
                    p: 2,
                    backgroundColor: (theme) => theme.palette.common.black,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="space-around"
                  >
                    {landing?.result?.COMPONENT?.[0]?.PARENT?.CHILD?.length >
                      0 &&
                      landing?.result?.COMPONENT?.[0]?.PARENT?.CHILD[4]?.SUB_CHILD?.map(
                        (icon, index) => {
                          return (
                            <Box key={`ICON_LANDING-${index}`}>
                              <CustomLink link={icon.link_url} target="_blank">
                                <NextLazyLoadImage
                                  src={icon?.image_path}
                                  alt={icon?.image_path}
                                  width={20}
                                  height={20}
                                  sx={{
                                    width: "20px!important",
                                    height: "100%!important",
                                    objectFit: "contain!important",
                                  }}
                                  sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                                  objectFit="contain"
                                  upLgWidth={20}
                                  downLgWidth={20}
                                  downMdWidth={20}
                                  downSmWidth={20}
                                  downXsWidth={20}
                                />
                              </CustomLink>
                            </Box>
                          );
                        }
                      )}
                  </Stack>
                </Box>
              </Box>
            )}
            {isUpLg && (
              <Box
                component="div"
                sx={{
                  display: {
                    lg: "block",
                    md: "none",
                    sm: "none",
                    xs: "none",
                    xxs: "none",
                  },
                }}
              >
                <Box component="div" id="menu">
                  <ShowScrollHeader {...props}>
                    <Box
                      component="div"
                      sx={(theme) => ({
                        zIndex: 1200,
                        transition: theme.transitions.create(
                          ["all", "position"],
                          {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.shorter,
                          }
                        ),
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        display: "block",
                      })}
                    >
                      <StickyBar
                        data={landing?.result?.COMPONENT?.[0]?.PARENT?.CHILD[0]}
                        HEADER_IMAGE={
                          landing?.result?.COMPONENT?.[0]?.PARENT?.CHILD?.[1]
                            ?.image_path_portrait
                        }
                      />
                    </Box>
                  </ShowScrollHeader>
                </Box>

                <DynamicComponentRenderer
                  data={
                    landing?.result?.COMPONENT &&
                    landing?.result?.COMPONENT?.length > 0 &&
                    landing?.result?.COMPONENT
                  }
                  enq_type="C"
                  isLanding={true}
                />
              </Box>
            )}
          </>
        ) : (
          <>
            <WebLayout layout={layout}>
              <DynamicComponentRenderer
                data={
                  homepageData?.COMPONENT &&
                  homepageData?.COMPONENT?.length > 0 &&
                  homepageData?.COMPONENT
                }
                layout={layout}
                enq_type="C"
                homeTopCategories={layout?.HEADER?.CATEGORIES}
              />
            </WebLayout>
          </>
        )}
      </main>
    </>
  );
}