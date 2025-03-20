import StyledCustomPopover from "@/components/customPopover";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const CountryCard = ({ elem, BgColor = "", colorIndex = "" }) => {
  const [show, setShow] = useState({
    open: false,
    anchor: null,
  });
  const handleShow = (event) => {
    setShow({ open: !show.open, anchor: event ? event?.currentTarget : null });
  };

  const handleClose = () => {
    setShow({ open: false, anchor: null });
  };

  const cardStyles = {
    height: "100%",
    borderRadius: "0px",
    overflow: "visible!important",
    px: { sm: 2, xs: 2, xxs: 2 },
    position: "relative!important",
    py: { sm: 1.5, xs: 1.5, xxs: 0.5 },
    "&.MuiCard-root": {
      backgroundColor:
        BgColor && !colorIndex
          ? (theme) => theme.palette[BgColor]
          : BgColor && colorIndex
            ? (theme) => theme.palette[BgColor][colorIndex]
            : (theme) => theme.palette.common.white,
    },
    "& .with_hover": {
      display: "none",
    },
    ":hover": {
      "&.MuiCard-root": {
        backgroundColor: (theme) => theme.palette.primary.light,
        "& .without_hover": {
          display: "none",
        },
        "& .with_hover": {
          display: "block",
        },
      },
    },
  };

  const imageStyles = {
    width: "40px!important",
    height: "60px!important",
    objectFit: "contain",
  };

  const typographyStyle = (theme, grandElem) => {
    return {
      ":hover": {
        color: theme.palette.common.white,
      },
      color: theme.palette.common.black,
      cursor: "pointer",
      letterSpacing: 0,
      ...theme.typography.h6,
      fontWeight: "normal",
      // fontFamily:
      //   grandElem?.class_name === "arabic"
      //     ? theme.fontFaces.helveticaNeueBoldArabic
      //     : theme.fontFaces.helveticaNeueMedium,
      fontFamily:theme.fontFaces.helveticaNeueBoldArabic,
      mb: 0,
    };
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box component="div" position="relative">
        <Card onClick={handleShow} sx={cardStyles}>
          <Stack
            py={{ sm: 0.4, xs: 0.4, xxs: 0.2 }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: "100%!important" }}
          >
            <Box>
              <NextLazyLoadImage
                className="without_hover"
                src={elem.image_path}
                alt="Image"
                width={40}
                height={60}
                sx={imageStyles}
                objectFit="contain"
                upLgWidth={70}
                downLgWidth={70}
                downMdWidth={70}
                downSmWidth={70}
                downXsWidth={70}
              />
              <NextLazyLoadImage
                className="with_hover"
                src={elem.image_path_portrait}
                alt="Image"
                width={40}
                height={60}
                sx={imageStyles}
                objectFit="contain"
                upLgWidth={70}
                downLgWidth={70}
                downMdWidth={70}
                downSmWidth={70}
                downXsWidth={70}
              />
            </Box>
            <Stack direction="column" spacing={2}>
              {elem?.GRAND_CHILD?.map((grandElem, index) => (
                <Box key={`GRANDCHILD_COUNTRY_MOBILE-${index}`}>
                  <Typography sx={(theme) => typographyStyle(theme, grandElem)}>
                    {grandElem?.link_title}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Card>
        <StyledCustomPopover anchorEl={show.anchor} open={show.open}>
          {elem?.GRAND_CHILD?.map((grandElem, index) => (
            <Box key={`GRANDCHILD_COUNTRY_MOBILE-${index}`}>
              <CustomLink link={grandElem?.link_url || "#"}>
                <Typography sx={(theme) => typographyStyle(theme, grandElem)}>
                  {grandElem?.link_title}
                </Typography>
              </CustomLink>
            </Box>
          ))}
        </StyledCustomPopover>
      </Box>
    </ClickAwayListener>
  );
};

export default CountryCard;
