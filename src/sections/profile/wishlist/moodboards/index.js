// import CustomBreadCrumb from "../breadCrumb";
import CustomBreadCrumb from "@/components/breadCrumb";
import MoodHeadingSection from "./moodHeading";
import NewList from "./newList";


const MoodBoardsSection = () => {
  const wishlistBreadCrumb = [
    {
      title: "Wishlist",
      isLink: false,
    },
  ];
  return (
    <>
      <CustomBreadCrumb data={wishlistBreadCrumb} key="WishListSection" />
      <MoodHeadingSection />
      <NewList />
    </>
  );
};

export default MoodBoardsSection;
