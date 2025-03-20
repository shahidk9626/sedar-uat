import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { ContractOurWorkForce } from "@/styles/contracts";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import ScrollInto from "react-scroll-into-view";

const ProjectManagement = ({ data = [] }) => {
  return (
    <Box sx={{ py: 5 }}>
      <Container maxWidth="xl">
        <Grid container spacing={{ md: 10, sm: 4 }} justifyContent="center">
          <Grid item md={5} sm={6} xs={12} xxs={12}>
            <NextLazyLoadImage
              src={data?.PARENT?.image_path}
              alt={data?.PARENT?.image_path}
              width={462}
              height={580}
              sx={{
                width: "100%!important",
                height: "100%!important",
                objectFit: "cover!important",
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
              objectFit="contain"
              upLgWidth={462}
              downLgWidth={462}
              downMdWidth={462}
              downSmWidth={389}
              downXsWidth={546}
            />
          </Grid>
          <Grid item md={5} sm={6} xs={12} xxs={12}>
            <ContractOurWorkForce
              component="div"
              dangerouslySetInnerHTML={{
                __html: data?.PARENT?.description,
              }}
            />
            <ScrollInto selector="#StartProjectContract">
              <Box pl={4} py={2}>
                <Typography
                  component="span"
                  sx={(theme) => ({
                    pb: 1,
                    cursor: "pointer",
                    borderBottom: `2px solid ${theme.palette.primary.light}`,
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    color: "common.black",
                    fontSize: "15.4px",
                  })}
                >
                  {data?.PARENT?.link_title}
                </Typography>
              </Box>
            </ScrollInto>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

ProjectManagement.propTypes = {
  data: PropTypes.array,
};

export default ProjectManagement;
