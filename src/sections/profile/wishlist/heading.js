import { WishListMyFavorites, WishListMyFavoritesItem } from "@/styles/auth";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { useTranslation } from "next-i18next";

const Heading = () => {
  const { t: translate } = useTranslation();
  return (
    <>
      <Container maxWidth="xl" sx={{ pb: 4 }}>
        <Box
          m={2}
          sx={{
            display: {
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
              xxs: "none",
            },
          }}
        >
          <WishListMyFavorites>{translate("MyFavourites")}</WishListMyFavorites>
          <WishListMyFavoritesItem pl={2}>( 0 items )</WishListMyFavoritesItem>
        </Box>
        <Divider sx={{ mt: 3 }} />
      </Container>
    </>
  );
};

export default Heading;
