import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const EmptyCardPage = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  return (
    <>
      <Container maxWidth="xl" sx={{ my: 20 }}>
        <Stack direction="column" alignItems="center" spacing={3}>
          <NextLazyLoadImage
            src="/assets/cartPage/cartempty.avif"
            alt="cdsaas"
            width="180"
            height="136"
            placeholder="blur"
            loading="eager"
            sx={{
              objectFit: "cover!important",
              width: "180px!important",
              height: "100%!important",
            }}
            upLgWidth={180}
            downLgWidth={180}
            downMdWidth={180}
            downSmWidth={180}
            downXsWidth={180}
            sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
          />
          <Box>
            <Typography
              fontSize={28}
              fontWeight={600}
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
            >
              {translate("YourCartisEmpty")}
            </Typography>
          </Box>
          <Box>
            <Typography
              fontSize={18}
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
            >
              {translate("YourCartisEmptyAddItemstoyourcart")}
            </Typography>
          </Box>
          <Box>
            <Button
              color="warning"
              variant="contained"
              fullWidth
              onClick={() => router.push("/")}
              sx={{
                minWidth: "400px",
                maxWidth: "500px",
                borderRadius: "0px",
                py: 1.6,
                fontSize: 16,
              }}
            >
              {translate("Back")}
            </Button>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default EmptyCardPage;
