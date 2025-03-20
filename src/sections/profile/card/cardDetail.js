import { CustomLink } from "@/components/link";
import { CardFAQS } from "@/styles/auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const CardDetail = () => {
  const { t: translate } = useTranslation();
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <CardFAQS>{translate("ThereisnoCredit")}</CardFAQS>
        <Typography
          component="p"
          mt={3}
          sx={(theme) => ({
            ...theme.typography.typography18,
            fontFamily: theme.fontFaces.helveticaNeue,
            color: theme.palette.grey.shrink,
          })}
          dangerouslySetInnerHTML={{
            __html: translate("convenienttopaywithsaved"),
          }}
        ></Typography>
        <Box mt={4} mb={4}>
          <CustomLink link="/dashboard/card/form/add">
            <Button
              variant="contained"
              color="warning"
              sx={(theme) => ({
                py: 1.8,
                borderRadius: "0px",
                width: {
                  lg: "30%",
                  md: "30%",
                  sm: "100%",
                  xs: "100%",
                  xxs: "100%",
                },
                ...theme.typography.typography16,
                fontFamily: theme.fontFaces.helveticaNeueBold,
              })}
            >
              {translate("AddCards")}
            </Button>
          </CustomLink>
        </Box>
      </Container>
    </>
  );
};


export default CardDetail;
