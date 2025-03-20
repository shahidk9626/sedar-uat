import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const ProjectHeading = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:projects@sedarglobal.com";
  };
  const { t: translate } = useTranslation();
  return (
    <Stack spacing={0.8}>
      <Typography
        fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
        color={(theme) => theme.palette.common.black}
        component="h3"
        fontSize={{
          lg: "39px",
          md: "39px",
          sm: "28px",
          xs: "28px",
          xxs: "28px",
        }}
        lineHeight={{
          lg: "49px",
          md: "49px",
          sm: "normal",
          xs: "normal",
          xxs: "normal",
        }}
        sx={{ letterSpacing: 1, fontWeight: 400 }}
      >
        {translate("Startaproject")}
      </Typography>
      <Typography
        component="p"
        fontSize="16px"
        lineHeight="14px"
        fontWeight={400}
        sx={{
          letterSpacing: 1,
          fontWeight: 400,
          color: "#555",
          fontFamily: (theme) => theme.fontFaces.helveticaNeueLight,
        }}
      >
        {translate(
          "StartaconversationorToContactusviaemailPleasefillouttheform1"
        )}{" "}
        <Typography
          component="span"
          variant="typography15"
          lineHeight="normal"
          fontWeight={300}
          color={(theme) => theme.palette.common.black}
          fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
          sx={(theme) => ({
            letterSpacing: 1,
            cursor: "pointer",
          })}
          onClick={handleEmailClick}
        >
          projects@sedarglobal.com
        </Typography>
      </Typography>
    </Stack>
  );
};

export default ProjectHeading;
