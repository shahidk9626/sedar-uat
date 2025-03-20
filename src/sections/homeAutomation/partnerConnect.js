import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const PartnerConnect = ({ data = {} }) => {
  const router = useRouter();
  return (
    <>
      <Container maxWidth="lg">
        <CardContent>
          <Grid
            spacing={4}
            container
            py={{ lg: 10, md: 10, sm: 10, xs: 5, xxs: 5 }}
            alignItems="center"
          >
            {data?.PARENT?.CHILD.map((item, index) => (
              <Grid
                item
                lg={3}
                md={3}
                sm={6}
                xs={12}
                xxs={12}
                key={`COMPANY-NAME-${index}`}
                onClick={() => router.push(`${item?.link_url}`)}
              >
                <Box width={150} sx={{ margin: "auto", cursor: "pointer" }}>
                  <NextLazyLoadImage
                    src={item?.image_path}
                    alt={item?.image_path}
                    width={150}
                    height={39}
                    sx={{
                      width: "100%!important",
                      height: "100%!important",
                      objectFit: "cover!important",
                    }}
                    sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
                    objectFit="contain"
                    upLgWidth={150}
                    downLgWidth={150}
                    downMdWidth={150}
                    downSmWidth={150}
                    downXsWidth={150}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Container>
    </>
  );
};

PartnerConnect.propTypes = {
  data: PropTypes.object,
};


export default PartnerConnect;
