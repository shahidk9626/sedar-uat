import AnnouncementLogoComponent from "@/components/announcementLogo";
import SnackbarProvider from "@/components/snackbar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import React from "react";
import ScrollInto from "react-scroll-into-view";
import useResponsive from "@/hooks/useResponsive";
import { useRouter } from "next/router";

const ConsultationForm = dynamic(() => import("./consultationForm"), {
  ssr: false,
});

const AnnouncementModule = ({ data, enq_type = "C" }) => {
  const { locale } = useRouter();
  const langName = locale != "default" ? locale.split("-")[1] : "en";
  const isDownMd = useResponsive("down", "md");

  console.log(langName,'localelalel')
  const [open, setOpen] = React.useState(false);
  const { t: translate } = useTranslation();
  const handleOpenClose = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.warning.dark,
          padding: {
            md: "40px 0",
            sm: "30px",
            xs: "30px",
            xxs: "30px",
          },
          marginBottom: {
            md: "-20px",
            sm: "0px",
            xs: "0px",
            xxs: "0px",
          },
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          justifyContent={{
            md: "start",
            sm: "space-between",
            xs: "space-between",
            xxs: "space-between",
          }}
          ml={{
            md: 10,

          }}
          width="95%"
          alignItems="center"
        >
          <ScrollInto selector="#freeConsultation" >
            <Box sx={{display:langName == "ar" && !isDownMd ? "flex" : '',padding:langName == "ar" ? "10px" : ''}}>
              <Typography
                component="div"
                variant="typography42"
                // fontWeight={400}
                color="common.white"
                sx={{
                  maxWidth: {
                    md: "100%",
                    sm: "500px",
                    xs: "300px",
                    xxs: "300px",
                  },
                  marginBottom: {
                    md: 0,
                    sm: 0,
                    xxs: 0,
                    xs: 0
                  },
                  fontSize: {
                    xs: "1.0rem !important",
                    xxs: "1.0rem !important",
                  },
                }}
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                dangerouslySetInnerHTML={{ __html: data?.PARENT?.CHILD?.[0].description ? data?.PARENT?.CHILD?.[0].description : data?.PARENT?.description }}
              />

              <Typography
                component="span"
                variant="typography42"
                // fontWeight={500}
                sx={{
                  borderBottom: (theme) =>
                    `2px solid ${theme.palette.common.white}`,
                  paddingBottom: "5px",
                  cursor: "pointer",
                  color: "white",
                  fontSize: {
                    xs: "1.25rem !important",
                    xxs: "1.25rem !important",
                  },
                  marginLeft: langName == "ar" && !isDownMd ? "15px" : ''
                }}
                onClick={handleOpenClose}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
              >
                {translate("Writetous")}
              </Typography>
            </Box>


          </ScrollInto>

        </Stack>
        {data && data?.PARENT && data?.PARENT?.image_path && (
          <AnnouncementLogoComponent url={data?.PARENT?.image_path} />
        )}
      </Box>
      {open && data && data?.PARENT && data?.PARENT && (
        <Collapse in={open} sx={{ width: "100%" }}>
          <SnackbarProvider>
            <Box id="freeConsultation">
              <ConsultationForm
                data={
                  data?.PARENT?.CHILD &&
                  data?.PARENT?.CHILD?.length > 0 &&
                  data?.PARENT?.CHILD
                }
                handleOpenClose={handleOpenClose}
                open={open}
                enq_type={enq_type}
              />
            </Box>
          </SnackbarProvider>
        </Collapse>
      )}
    </>
  );
};

export default React.memo(AnnouncementModule);
