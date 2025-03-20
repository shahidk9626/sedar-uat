import { TextBox } from "@/components/form";
import { AddressText, MoodBoardNewList } from "@/styles/auth";
import { useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Close from "@mui/icons-material/Close";
import Delete from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import React from "react";

const NewList = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { t: translate } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <Box>
          <Typography
            my={2}
            pl={2}
            sx={(theme) => ({
              fontSize: theme.typography.typography16,
              fontWeight: theme.typography.fontWeightBold,
            })}
          >
            {translate("mood_board")}
          </Typography>
        </Box>
        <Grid container spacing={4} mt={1}>
          <Grid item lg={3} md={3} sm={6} xs={6} xxs={6}>
            <Card
              variant="outlined"
              sx={(theme) => ({
                backgroundColor: theme.palette.grey[3700],
                borderRadius: 0,
                height: "100%",
              })}
            >
              <CardContent sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <Typography
                    sx={(theme) => ({
                      fontSize: theme.typography.typography20,
                      textDecoration: "underline",
                      cursor: "pointer",
                    })}
                    onClick={handleClickOpen}
                  >
                   {translate("CreateNewList")}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          {[...Array(3)].map((item, index) => (
            <Grid
              key={index}
              item
              lg={3}
              md={3}
              sm={6}
              xs={6}
              xxs={6}
              onClick={() =>
                router.push("/dashboard/moodboards-favorites")
              }
              sx={{ cursor: "pointer" }}
            >
              <Card
                variant="outlined"
                sx={(theme) => ({
                  backgroundColor: theme.palette.primary.light,
                  borderRadius: 0,
                  height: "100%",
                })}
              >
                <CardContent>
                  <Stack p={2}>
                    <MoodBoardNewList
                     
                    >
                     {translate("ForMyRoom")}
                    </MoodBoardNewList>
                    <AddressText
                    
                    >
                      (3 items)
                    </AddressText>
                  </Stack>
                </CardContent>
              </Card>
              <Box
                sx={{
                  p: 2,
                  textAlign: "end",
                  position: "relative",
                  bottom: 60,
                }}
              >
                <Delete />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create New Mood Board"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent
          sx={{
            py: "35px",
            width: {
              lg: "500px",
              md: "500px",
              sm: "100%",
              xs: "100%",
              xxs: "100%",
            },
          }}
        >
          <Stack direction={"row"} spacing={3} alignItems={"center"}>
            <TextBox
              fullWidth
              label={translate("CreateNew")}
              type="text"
              variant="standard"
              name="new"
            />
            <Box>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                sx={{ py: 1.5, borderRadius: "0px" }}
              >
                {translate("Add")}
              </Button>
            </Box>
          </Stack>
          <Box mt={5}>
            <Typography
              sx={(theme) => ({
                fontSize: theme.typography.body2,
                fontFamily: theme.fontFaces.helveticaNeueBold,
                textAlign: {
                  lg: "start",
                  md: "start",
                  sm: "center",
                  xs: "center",
                  xxs: "center",
                },
              })}
            >
              {translate("AlreadyyouHaveList")}
              <Typography
                pl={1}
                component="span"
                sx={(theme) => ({
                  fontSize: theme.typography.body2,
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                  color: theme.palette.primary.main,
                })}
              >
                {translate("login")}
              </Typography>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewList;
