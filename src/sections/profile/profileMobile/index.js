import { useAuthContext } from "@/auth/useAuthContext";
import { NextFillImage } from "@/components/image";
import { OrderSignOut } from "@/styles/auth";
import { profileAccountNav } from "@/utils/constant";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const ProfileMobileSection = ({ user }) => {
  const { logout } = useAuthContext();
  const { t: translate } = useTranslation();
  const router = useRouter();
  return (
    <Container maxWidth="sm">
      <Box>
        <Box
          sx={{
            backgroundColor: "#f2f2f2",
            p: 1,
            position: "relative",
            height: "5em",
            mb: 10,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: "-50%",
              right: "50%",
              height: "100%",
              transform: "translate(50%,0%)",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 80, height: 80 }}
              src="/assets/profile/avatarprofile.avif"
            />
            <Box mt={1}>
              <Typography
                sx={{
                  textAlign: "center",
                  typography: "typography16",
                  textTransform: "capitalize",
                  fontFamily: (theme) => theme.fontFaces.helveticaNeueMedium,
                }}
              >
                {user?.cust_first_name} {user?.cust_last_name}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box px={2}>
          <List>
            {profileAccountNav.map((item, index) => {
              return (
                <Box key={`PANEL-DASHBOARD-${index}`}>
                  <Stack direction="row" alignItems="center">
                    <ListItem
                      disablePadding
                      sx={(theme) => ({
                        my: "25px",
                        ...theme.typography.typography16,
                        cursor: "pointer",
                      })}
                      onClick={() => router.push(`${item?.href}`)}
                    >
                      <ListItemIcon>
                        <NextFillImage
                          src={item?.src}
                          alt="Loading Logo"
                          sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                          objectFit="contain"
                          sx={{
                            width: "auto!important",
                            height: "auto!important",
                            objectFit: "contain",
                            backgroundSize: "contain",
                            "&.MuiCard-root": {
                              borderRadius: 0,
                              boxShadow: "none",
                              position: "relative!important",
                              width: "20px!important",
                              height: "100%!important",
                            },
                          }}
                        />
                      </ListItemIcon>
                      <Typography
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueBold
                        }
                      >
                        {translate(`${item.listName}`)}
                      </Typography>
                    </ListItem>
                    <ArrowForwardIosIcon
                      sx={(theme) => ({
                        ml: 10,
                        width: 20,
                        ...(theme.direction == "rtl" && {
                          transform: "rotate(180deg)",
                        }),
                      })}
                    />
                  </Stack>
                  <Divider />
                </Box>
              );
            })}
            <Box
              p={4}
              onClick={() => {
                logout();
              }}
            >
              <OrderSignOut
                variant="outlined"
                fullWidth
                startIcon={
                  <Logout
                    sx={(theme) => ({
                      ...(theme.direction == "rtl" && {
                        transform: "rotate(180deg)",
                      }),
                    })}
                  />
                }
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                {translate("SignOut")}
              </OrderSignOut>
            </Box>
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileMobileSection;
