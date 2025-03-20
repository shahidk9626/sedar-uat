import Iconify from "@/components/iconify";
import NextLazyFillImage from "@/components/image/nextLazyFillLoadImage";
import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
const ToolGuideDilaog = ({
  open = false,
  handleClose = () => { },
  data = [],
}) => {
  return (
    <>
      <Dialog
        open={open}
        keepMounted
        scroll="body"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogContent sx={{ px: 0 }}>
          <Grid container>
            <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
              <NextLazyFillImage
                src={data?.image_path}
                alt="Error"
                width={1800}
                height={1800}
                sx={{
                  width: "100%!important",
                  height: "100%!important",
                  objectFit: "cover!important",
                }}
                sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                objectFit="cover"
                upLgWidth={1800}
                downLgWidth={1800}
                downMdWidth={1800}
                downSmWidth={1080}
                downXsWidth={1080}
                aspectRatio="unset"
                bxSx={{
                  height: "100%",
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box py={5} px={4}>
                <Typography
                  component="h4"
                  variant="h4"
                  mb={1}
                  sx={(theme) => ({
                    letterSpacing: 0.5,
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    color: theme.palette.common.black,
                  })}
                >
                  {data?.title}
                </Typography>
                {data?.GRAND_CHILD &&
                  data?.GRAND_CHILD?.length > 0 &&
                  data?.GRAND_CHILD?.[0]?.GRAND_CHILD_2 &&
                  data?.GRAND_CHILD?.[0]?.GRAND_CHILD_2?.length > 0 &&
                  data?.GRAND_CHILD?.[0]?.GRAND_CHILD_2.map((elem, index) => {
                    return (
                      <Box key={`DIALOG_INSTRUCTION-${index}`}>
                        <Typography
                          component="p"
                          sx={(theme) => ({
                            letterSpacing: 0.5,
                            fontSize: "20px",
                            color: theme.palette.primary[100],
                            fontFamily: theme.fontFaces.helveticaNeueLight,
                          })}
                        >
                          {elem?.title}
                        </Typography>

                        <Stack
                          direction={"row"}
                          spacing={3}
                          key={`PDF_INSTRUCT-${index}`}
                        >
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            key={`ICON-${index}`}
                          >
                            <Box py={2} component="div">
                              <Typography
                                component="div"
                                variant="typography37"
                                sx={(theme) => ({
                                  fontFamily: theme.fontFaces.helveticaNeue,
                                  letterSpacing: 0.5,
                                })}
                              >
                                {elem?.GRAND_CHILD_3?.[0]?.title}
                              </Typography>
                            </Box>

                            <Box ml={4}>
                              <IconButton
                                href={elem?.GRAND_CHILD_3?.[0]?.image_path}
                                target="_blank"
                                sx={{
                                  textDecoration: "none",
                                  color: "inherit",
                                  "&:hover": {
                                    textDecoration: "none",
                                    backgroundColor: "white",
                                  },
                                }}
                              >
                                {elem?.GRAND_CHILD_3?.[0]?.title && (
                                  <Iconify
                                    icon={
                                      elem?.GRAND_CHILD_3?.[0]?.title?.split(
                                        " "
                                      )?.[0] == "PDF"
                                        ? "icomoon-free:file-pdf"
                                        : "octicon:play-24"
                                    }
                                    width="25px"
                                  />
                                )}
                              </IconButton>
                            </Box>
                          </Stack>
                        </Stack>
                        <Stack
                          direction={"row"}
                          spacing={3}
                          key={`PDF_INSTRUCT-${index}`}
                        >
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            key={`ICON-${index}`}
                          >
                            <Box py={2} component="div">
                              <Typography
                                component="div"
                                variant="typography37"
                                sx={(theme) => ({
                                  fontFamily: theme.fontFaces.helveticaNeue,
                                  letterSpacing: 0.5,
                                })}
                              >
                                {elem?.GRAND_CHILD_3?.[1]?.title}
                              </Typography>
                            </Box>

                            <Box ml={3}>
                              <IconButton
                                href={elem?.GRAND_CHILD_3?.[1]?.image_path}
                                target="_blank"
                                sx={{
                                  textDecoration: "none",
                                  color: "inherit",
                                  "&:hover": {
                                    textDecoration: "none",
                                    backgroundColor: "white",
                                  },
                                }}
                              >
                                {elem?.GRAND_CHILD_3?.[1]?.title && (
                                  <Iconify
                                    icon={
                                      elem?.GRAND_CHILD_3?.[1]?.title?.split(
                                        " "
                                      )?.[0] == "PDF"
                                        ? "icomoon-free:file-pdf"
                                        : "octicon:play-24"
                                    }
                                    width="25px"
                                  />
                                )}
                              </IconButton>
                            </Box>
                          </Stack>
                        </Stack>
                      </Box>
                    );
                  })}
              </Box>
            </Grid>
            <Box>
              <Close
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "5px",
                  fontSize: (theme) => theme.typography.typography31,
                  cursor: "pointer",
                }}
              />
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

ToolGuideDilaog.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.array,
  handleClose: PropTypes.func,
};

export default ToolGuideDilaog;
