import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { ContractOurWorkForce } from "@/styles/contracts";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import ScrollInto from "react-scroll-into-view";

const OurWorkForce = ({ data = [] }) => {
  const { t: translate } = useTranslation();

  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.info.main, py: 5 }}>
      <Container maxWidth="xl">
        <Grid container gap={4} justifyContent="center">
          <Grid item md={5} sm={12} xs={12} xxs={12}>
            <ContractOurWorkForce
              component="div"
              dangerouslySetInnerHTML={{
                __html: data?.PARENT?.description,
              }}
            />
            <ScrollInto selector="#StartProjectContract">
              <Box pl={4}>
                <Typography
                  component="span"
                  sx={(theme) => ({
                    pb: 1,
                    cursor: "pointer",
                    color: theme.palette.common.black,
                    borderBottom: `2px solid ${theme.palette.primary.light}`,
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontSize: "15.4px",
                  })}
                >
                  {translate(data?.PARENT?.link_title)}
                </Typography>
              </Box>
            </ScrollInto>
          </Grid>
          <Grid item md={5} sm={12} xs={12} xxs={12}>
            <NextLazyLoadImage
              src={data?.PARENT?.image_path}
              alt={data?.PARENT?.image_path}
              width={509}
              height={662}
              sx={{
                width: "100%!important",
                height: "100%!important",
                objectFit: "cover!important",
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
              objectFit="contain"
              upLgWidth={509}
              downLgWidth={509}
              downMdWidth={509}
              downSmWidth={786}
              downXsWidth={527}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

OurWorkForce.propTypes = {
  data: PropTypes.array,
};

export default OurWorkForce;
