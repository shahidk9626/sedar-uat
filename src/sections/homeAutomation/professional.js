import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const Professional = ({ data = {} }) => {
  console.log('professional data', data);
  const { t: translate } = useTranslation();
  const router = useRouter();
  return (
    <>
      <Container maxWidth="xl">
        <Box mt={5}>
          <Typography
            sx={(theme) => ({
              textAlign: "center",
              whiteSpace: "pre-line", // Ensures line breaks are respected
              "& h2": {
                fontSize: "24px",
                fontWeight: theme.typography.fontWeightMedium,
                marginBottom: "8px",
              },
              "& p": {
                fontSize: "16px",
                fontFamily: theme.fontFaces.helveticaNeueLight,
                fontWeight: 400,
                letterSpacing: 0.5,
                lineHeight: 1.5,
                marginBlockStart: "8px!important",
                marginBlockEnd: "8px!important",
              },
            })}
          >
            <Box
              sx={{
                display: 'inline-block',
                width: '50%'
              }}
              dangerouslySetInnerHTML={{ __html: data?.PARENT?.CHILD?.[0]?.description }}
            />
          </Typography>


          <Grid container mb={4} spacing={4}>
            {data?.PARENT?.CHILD?.[1]?.SUB_CHILD?.map((item, index) => (
              <Grid
                item
                lg={4}
                md={4}
                sm={6}
                xs={12}
                xxs={12}
                key={`PROFISSIONAL-IMAGE-${index}`}
              >
                <Box position="relative" width={"100%"} mt={8}>
                  <NextLazyLoadImage
                    src={item.image_path}
                    alt={"Error"}
                    width={386}
                    height={382}
                    sx={{
                      width: "100%!important",
                      height: "100%!important",
                      objectFit: "cover!important",
                    }}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                    objectFit="contain"
                    upLgWidth={386}
                    downLgWidth={386}
                    downMdWidth={386}
                    downSmWidth={399}
                    downXsWidth={513}
                  />
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    p={2}
                    width="100%"
                    bgcolor={index === 0 ? (theme) => theme.palette.grey[3400] : index === 1 ? (theme) => theme.palette.grey[7600] : (theme) => theme.palette.grey[7700]}
                  >
                    <Typography
                      sx={(theme) => ({
                        ...theme.typography.typography17,
                        fontFamily: theme.fontFaces.helveticaNeue,
                        color: theme.palette.common.white,
                        letterSpacing: 0.5,
                        textAlign: "center",
                        marginBlockStart: "8px!important",
                        marginBlockEnd: "8px!important",
                      })}
                    >
                      <Box
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

        </Box>
      </Container>
    </>
  );
};

Professional.propTypes = {
  data: PropTypes.object,
};


export default Professional;
