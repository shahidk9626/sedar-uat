import { WishListMyFavorites } from "@/styles/auth";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { useTranslation } from "next-i18next";

const MoodHeadingSection = () => {
  const { t: translate } = useTranslation();
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          pb: 2,
          display: {
            lg: "block",
            md: "block",
            sm: "none",
            xs: "none",
            xxs: "none",
          },
        }}
      >
        <Box m={2}>
          <WishListMyFavorites>{translate("MyFavourites")}</WishListMyFavorites>
        </Box>
      </Container>
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Divider variant="middle" />
      </Container>
    </>
  );
};

export default MoodHeadingSection;
