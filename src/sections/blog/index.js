import React from "react";
import TipsAndThreads from "./TipsAndThreads";


const BlogSection = ({ data }) => {
  return (
    <React.Fragment>
      <TipsAndThreads data={data} />
    </React.Fragment>
  );
};

export default BlogSection;
