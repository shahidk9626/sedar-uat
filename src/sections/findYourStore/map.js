import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import {
  getMapData,
  setInfoPosition,
  setMapMarker,
  setShowRoomView,
  setShowingInfoWindow,
} from "@/redux/slices/map";
import { useDispatch, useSelector } from "@/redux/store";
import { StoreMapBox } from "@/styles/findYourStore";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  GoogleMap,
  InfoWindowF,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";

const styles = [
  {
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#dadada" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c9" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
];

const StoreMap = () => {
  const { t: translate } = useTranslation();
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName, visitorId, CCYCODE, site } = cookies || {};
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
  });
  const {
    positions,
    center,
    zoom,
    showingInfoWindow,
    infoPosition,
    showRoomDetail,
    showRoomView,
  } = useSelector((state) => state.map);

  React.useEffect(() => {
    if (locale && langName && site && visitorId && CCYCODE) {
      dispatch(getMapData());
    }
  }, [locale, cookies]);

  const onLoad = (mapMarker) => {
    dispatch(setMapMarker(mapMarker));
  };

  const onMarkerClick = (data, key) => {
    dispatch(setShowRoomView(showRoomDetail[key]));
    dispatch(setInfoPosition(data));
    dispatch(setShowingInfoWindow(true));
  };

  const onInfoWindowClose = () => {
    dispatch(setShowingInfoWindow(false));
  };


  return (
    <>
      {isLoaded && typeof window !== "undefined" ? (
        <StoreMapBox component="div">
          <GoogleMap
            id="marker-example"
            className="mapStyle"
            center={{
              lat: Number(center?.lat || 0),
              lng: Number(center?.lng || 0),
            }}
            zoom={Number(zoom || 0)}
            options={{ styles }}
          >
            {positions &&
              positions?.length > 0 &&
              positions.map((row, key) => (
                <Marker
                  icon={{
                    path: google.maps?.SymbolPath.CIRCLE,
                    scale: 3,
                  }}
                  position={{
                    lat: Number(row?.lat || 0),
                    lng: Number(row?.lng || 0),
                  }}
                  key={key}
                  clickable
                  onClick={() => onMarkerClick(row, key)}
                  onLoad={onLoad}
                />
              ))}
            {showingInfoWindow && (
              <Card
                component={InfoWindowF}
                position={infoPosition}
                onCloseClick={() => onInfoWindowClose()}
                sx={{
                  "& .gm-style-iw-ch": {
                    paddingTop: "35px",
                  },
                  "&.gm-style-iw.gm-style-iw-c": {
                    position: "absolute!important",
                  },
                }}
              >
                <Box>
                  <NextLazyLoadImage
                    src={showRoomView.SSA_IMAGE_PATH}
                    alt={showRoomView.SSA_CITY_NAME}
                    sx={{
                      width: "225px!important",
                      height: "150px!important",
                      objectFit: "cover",
                      mb: 2,
                      backgroundSize: "cover",
                    }}
                    upLgWidth={300}
                    downLgWidth={300}
                    downMdWidth={300}
                    downSmWidth={300}
                    downXsWidth={300}
                    width={200}
                    height={200}
                    objectFit="cover"
                  />
                  <Stack rowGap={0}>
                    <Typography
                      component={"p"}
                      variant="typography13"
                      fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                      color="common.black"
                    >
                      {showRoomView.SSA_CITY_NAME}
                    </Typography>
                    <Typography
                      component="p"
                      variant="typography13"
                      dangerouslySetInnerHTML={{
                        __html: showRoomView.SSA_ADDRESS_DESC,
                      }}
                      sx={{
                        "& p,span": {
                          marginBlockEnd: "0em !important",
                          marginBlockStart: "0em !important",
                        },
                      }}
                      fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                      color="common.black"
                    />
                    <Typography
                      component="p"
                      variant="typography13"
                      fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                      color="common.black"
                      sx={{
                        direction: langName == "ar" ? "rtl" : "none",
                        textAlign: langName == "ar" ? "end" : "none",
                      }}
                    >
                      {showRoomView.SSA_PHONE_NO}
                    </Typography>
                    <Typography
                      component="a"
                      variant="typography13"
                      fontFamily={(theme) =>
                        theme.fontFaces.helveticaNeueMedium
                      }
                      href={showRoomView.SSA_GEO_LOCATION}
                      target="_blank"
                      rel="noreferrer"
                      sx={{
                        textDecoration: "none",
                        color: (theme) => theme.palette.primary.main,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        textDecoration: "underline",
                        mb: 3,
                      }}
                    >
                      {translate("view_on_google_maps")}
                    </Typography>
                  </Stack>
                </Box>
              </Card>
            )}
          </GoogleMap>
        </StoreMapBox>
      ) : (
        ""
      )}
    </>
  );
};

StoreMap.propTypes = {
  cookies: PropTypes.shape({
    langName: PropTypes.string,
    visitorId: PropTypes.string,
    CCYCODE: PropTypes.string,
    site: PropTypes.string,
  }).isRequired,
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ),
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
  showingInfoWindow: PropTypes.bool,
  infoPosition: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  showRoomDetail: PropTypes.arrayOf(
    PropTypes.shape({
      SSA_CITY_NAME: PropTypes.string,
      SSA_IMAGE_PATH: PropTypes.string,
      SSA_ADDRESS_DESC: PropTypes.string,
      SSA_PHONE_NO: PropTypes.string,
      SSA_GEO_LOCATION: PropTypes.string,
    })
  ),
  showRoomView: PropTypes.shape({
    SSA_CITY_NAME: PropTypes.string,
    SSA_IMAGE_PATH: PropTypes.string,
    SSA_ADDRESS_DESC: PropTypes.string,
    SSA_PHONE_NO: PropTypes.string,
    SSA_GEO_LOCATION: PropTypes.string,
  }),
};

export default StoreMap;
