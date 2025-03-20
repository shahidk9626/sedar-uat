import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import { useState } from "react";
import DialogBanner from "./dialogBanner";

const Banner = ({ data = [] }) => {
  const [open, setOpen] = useState(false);
  const { t: translate } = useTranslation();
  const handleOpenClose = () => setOpen(!open);

  const renderReadMore = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return (
      <>
        {`${text.slice(0, maxLength)}... `}
        <Typography
          component="span"
          color={(theme) => theme.palette.primary[200]}
          fontFamily={(theme) => theme.fontFaces.helveticaNeue}
          letterSpacing=".54px"
          sx={{ cursor: "pointer", fontWeight: 400 }}
          variant="typography14"
          onClick={handleOpenClose}
        >
          {translate("ReadMore")}
        </Typography>
      </>
    );
  };
  const result = data?.PARENT?.CHILD ? data.PARENT.CHILD?.[0] : data.PARENT;
  return (
    <>
      {data?.PARENT && (
        <Box position="relative">
          <NextLazyLoadImage
            src={
              data?.PARENT?.CHILD?.[0]?.image_path || data?.PARENT?.image_path
            }
            alt={
              data?.PARENT?.CHILD?.[0]?.image_path || data?.PARENT?.image_path
            }
            width={1269}
            height={357}
            sx={{
              width: "100%!important",
              height: "100%!important",
              objectFit: "cover!important",
            }}
            sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
            objectFit="contain"
            upLgWidth={1269}
            downLgWidth={1269}
            downMdWidth={1269}
            downSmWidth={870}
            downXsWidth={582}
          />
          <Box
            sx={{
              position: "absolute",
              top: "65%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography
              component="h2"
              variant="typography10"
              fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              color="common.white"
              fontWeight="400"
              textAlign="center"
              mb="45px"
            >
              {data?.PARENT?.CHILD?.[0]?.title
                ? data?.PARENT?.CHILD?.[0]?.title
                : data?.PARENT?.title}
            </Typography>
            {data && (
              <Box
                display={{
                  lg: "block",
                  md: "block",
                  sm: "none",
                  xs: "none",
                  xxs: "none",
                }}
              >
                <Typography
                  component="div"
                  variant="typography14"
                  color="common.white"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                  textAlign="center"
                  letterSpacing=".54px"
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.PARENT?.CHILD?.[0]?.description ||
                      data?.PARENT?.description,
                  }}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                  }}
                />
                <Typography component="p">
                  {renderReadMore(
                    data?.PARENT?.CHILD?.[0]?.description ||
                    data?.PARENT?.description,
                    0
                  )}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
      {data?.PARENT?.CHILD?.[0]?.description && (
        <CardContent>
          <Box
            display={{
              lg: "none",
              md: "none",
              sm: "block",
              xs: "block",
              xxs: "block",
            }}
          >
            <Typography
              component="div"
              variant="typography14"
              color="common.black"
              fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
              letterSpacing=".54px"
              display={{
                lg: "none",
                md: "none",
                sm: "block",
                xs: "block",
                xxs: "block",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  data?.PARENT?.CHILD?.[0]?.description ||
                  data?.PARENT?.description,
              }}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            />
            <Typography component="p">
              {renderReadMore(
                data?.PARENT?.CHILD?.[0]?.description ||
                data?.PARENT?.description,
                0
              )}
            </Typography>
          </Box>
        </CardContent>
      )}
      <DialogBanner
        open={open}
        handleOpenClose={handleOpenClose}
        data={result}
      />
    </>
  );
};

Banner.propTypes = {
  data: PropTypes.array,
};

export default Banner;
