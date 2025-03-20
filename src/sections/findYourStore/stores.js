import useResponsive from "@/hooks/useResponsive";
import { setActiveColor, setCenter, setZoom } from "@/redux/slices/map";
import { useDispatch, useSelector } from "@/redux/store";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import React from "react";

const Stores = ({ scrollToMap }) => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { showRoom, activeColor } = useSelector((state) => state.map);
  const isDownSm = useResponsive("down", "sm");

  const showCountry = (data, key) => {
    const dataKey = data.SSA_CITY_NAME[key][0];
    const centerData = {
      lat: parseFloat(dataKey.SSA_LATITUDE),
      lng: parseFloat(dataKey.SSA_LONGITUDE),
    };
    dispatch(setCenter(centerData));
    dispatch(setZoom(11));
    if (isDownSm && typeof window !== "undefined") {
      scrollToMap();
    }
  };

  const handleOpen = (index) => {
    setOpen(open === index ? false : index);
  };

  return (
    <Card
      sx={{
        background: "common.white",
        borderRadius: 0,
        textAlign: {
          lg: "start",
          md: "start",
          sm: "center",
          xs: "center",
          xxs: "center",
        },
      }}
    >
      <CardContent sx={{ margin: "0 auto", padding: "25px 65px" }}>
        <Typography
          variant="typography48"
          component="h2"
          fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
          color={(theme) => theme.palette.common.black}
          fontWeight={400}
        >
          {translate("Our_Stores")}
        </Typography>
        {showRoom &&
          showRoom?.map((row, index) => (
            <Box sx={{ my: 2 }} key={`SHOWROOM-MAP-${index}`}>
              <Typography
                component="div"
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                fontSize={(theme) => theme.typography.typography22}
                color={(theme) => theme.palette.common.black}
                fontWeight={400}
                lineHeight="23px"
                textAlign="start"
                pl={{ lg: 0, md: 0, sm: 1, xs: 1, xxs: 1 }}
                sx={{ cursor: "pointer", fontSize: "20.32px" }}
                onClick={() => handleOpen(index)}
              >
                {row.SCN_DESC}
              </Typography>
              <Collapse in={open === index}>
                <Stack spacing={1.5} mt={2}>
                  {Object.keys(row.SSA_CITY_NAME).map((key, childIndex) => (
                    <Typography
                      key={`${key}-${childIndex}-${index}`}
                      component="p"
                      variant="typography16"
                      fontFamily={(theme) =>
                        theme.fontFaces.helveticaNeueMedium
                      }
                      color={(theme) => alpha(theme.palette.common.black, 0.58)}
                      textAlign="start"
                      pl={{ lg: 0, md: 0, sm: 1, xs: 1, xxs: 1 }}
                      sx={(theme) => ({
                        transition: theme.transitions.create(["borderBottom"], {
                          easing: theme.transitions.easing.easeInOut,
                          duration: theme.transitions.duration.shorter,
                        }),
                        ...(key === activeColor && {
                          borderBottom: `1px solid ${theme.palette.primary.main}`,
                        }),
                        cursor: "pointer",
                      })}
                      onClick={() => {
                        showCountry(row, key);
                        dispatch(setActiveColor(key));
                      }}
                    >
                      {key}
                    </Typography>
                  ))}
                </Stack>
              </Collapse>
            </Box>
          ))}
      </CardContent>
    </Card>
  );
};

Stores.propTypes = {
  showRoom: PropTypes.arrayOf(
    PropTypes.shape({
      SCN_DESC: PropTypes.string.isRequired,
      SSA_CITY_NAME: PropTypes.objectOf(
        PropTypes.arrayOf(
          PropTypes.shape({
            SSA_LATITUDE: PropTypes.string.isRequired,
            SSA_LONGITUDE: PropTypes.string.isRequired,
          })
        )
      ).isRequired,
    })
  ),
  activeColor: PropTypes.string,
};

export default Stores;
