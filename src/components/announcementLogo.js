/* eslint-disable jsx-a11y/alt-text */
import NextLazyLoadImage from "./image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";


const AnnouncementLogoComponent = ({ url }) => {
 const { locale } = useRouter();
 const languageName = locale != "default" ? locale.split("-")[1] : "en";
  const logoTopPosition = languageName =="en" ? "90px" : "76px";
  const logoWidth = languageName =="en"  ? "180px" : "163px";
  return (
    <Box
      sx={{
        position: "absolute",
        right: "5px",
        top: {
          lg: "20px",
          md: "20px",
          sm: "68px",
          xs: "76px",
          xxs: "80px",
        },
        width: {
          md: "215px",
          xxs: "140px",
        },
        height: {
          lg: "auto",
          md: "auto",
          sm: "50%",
          xs: "50%",
          xxs: "50%",
        },
      }}
    >
      <NextLazyLoadImage
        src={url || ""}
        width={216}
        height={110}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        alt="logo"
      />
    </Box>
  );
};

export default AnnouncementLogoComponent;