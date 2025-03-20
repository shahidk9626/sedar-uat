import { StoreDescription, StoreHeading } from "@/styles/findYourStore";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";

const FindYourStoreHeading = ({ description = "" }) => {
  const { t: translate } = useTranslation();
  return (
    <Stack
      spacing={2}
      mb={3}
      justifyContent="center"
      alignItems="center"
      padding="60px 20px 20px"
    >
      <StoreHeading component="p" variant="typography37">
        {translate("Findlocation")}
      </StoreHeading>
      {description == {} ? (
        <StoreDescription
          component="div"
          variant="typography43"
          dangerouslySetInnerHTML={{ __html: description }}
          color="common.black"
        />
      ) : (
        <Typography
          component="h1"
          variant="typography43"
          sx={(theme) => ({
            fontFamily: theme.fontFaces.helveticaNeueMedium,
            color: "common.black",
            fontWeight: 400,
          })}
        >
          {translate("Weareglobal")}
        </Typography>
      )}
    </Stack>
  );
};

FindYourStoreHeading.propTypes = {
  description: PropTypes.string,
};


export default FindYourStoreHeading;
