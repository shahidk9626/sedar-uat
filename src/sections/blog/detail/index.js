import React from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

const BlogDetailBanner = dynamic(() => import("./banner"), {
  ssr: true,
  loading: () => <></>,
});

const RelatedStories = dynamic(() => import("./relatedStories"), {
  ssr: true,
  loading: () => <></>,
});

const Content = dynamic(() => import("./content"), {
  ssr: true,
  loading: () => <></>,
});

const AppliedProducts = dynamic(() => import("./appliedProducts"), {
  ssr: true,
  loading: () => <></>,
});

const BlogDetail = ({ data, breadCrumbData, blogData }) => {
  return (
    <>
      <BlogDetailBanner
        data={data}
        breadCrumbData={breadCrumbData}
        blogData={blogData}
      />
      <Container maxWidth="lg">
        <Box component="div">
          <Grid container columnSpacing={{ md: 6, sm: 0, xs: 0, xxs: 0 }}>
            <Grid item md={12} sm={12} xs={12} xxs={12}>
              <Content
                data={data}
                social={data?.social || []}
                blogData={blogData}
              />
              <Divider sx={{ my: { md: 6, sm: 3, xs: 3, xxs: 3 } }} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default BlogDetail;
