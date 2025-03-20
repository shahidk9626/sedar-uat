import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import ImageMagzine from "./imageMagzine";

const TabMagzine = ({ data = [] }) => {
  return (
    <>
      {data?.CHILD &&
        data?.CHILD?.length &&
        data?.CHILD.map((parentData, index) => (
          <Grid
            container
            columnSpacing={{ md: 4, sm: 0, xs: 0, xxs: 0 }}
            rowSpacing={{ md: 4, sm: 3, xs: 3, xxs: 3 }}
            key={`CATEGOORY-CARD_BLOG-${index}`}
          >
            {parentData?.SUB_CHILD &&
              parentData?.SUB_CHILD &&
              parentData?.SUB_CHILD?.length > 0 &&
              parentData?.SUB_CHILD.map((childElement, childIndex) => {
                return (
                  <Grid
                    item
                    md={parentData?.SUB_CHILD?.length <= 2 ? 6 : 4}
                    key={`PARENT_INDEX-CATEGORY-${index}-${childIndex}`}
                  >
                    <Box
                      sx={(theme) => ({
                        [theme.breakpoints.up("md")]: {
                          ...(parentData?.SUB_CHILD?.length <= 2 &&
                            childIndex == 1 && {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              padding: 6,
                            }),
                        },
                      })}
                    >
                      <ImageMagzine
                        data={childElement}
                        parentData={parentData}
                      />
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        ))}
      {/* {elem?.SUB_CHILD &&
                  elem?.SUB_CHILD &&
                  elem?.SUB_CHILD?.length > 0 &&
                  elem?.SUB_CHILD.map((childElement, childIndex) => {
                    return (
                      <Grid
                        item
                        md={4}
                        key={`CHILD_INDEX-CATEGORY-${index + 2}-${childIndex + 2
                          }`}
                      >
                        <ImageMagzine data={childElement} />
                      </Grid>
                    );
                  })} */}
    </>
  );
};

TabMagzine.propTypes = {
  data: PropTypes.array,
};

export default TabMagzine;
