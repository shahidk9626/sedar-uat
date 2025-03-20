import React from "react";
import SkeletonMoodBoardDetails from "@/components/skeleton/layout/profile/moodboards/moodboardFavorites/moodBoardDetails";
import MoodBoardBreadCrumbSkeleton from "@/components/skeleton/layout/profile/moodboards/moodBoardBreadCrumbSkeleton";
import MoodBoardHeadingSkeleton from "@/components/skeleton/layout/profile/moodboards/moodBoardHeadingSkeleton";
import dynamic from "next/dynamic";

const CustomBreadCrumb = dynamic(
  () => import("@/components/breadCrumb"),
  {
    loading: () => <MoodBoardBreadCrumbSkeleton />,
    ssr: true,
  }
);
const MoodHeadingSection = dynamic(
  () => import("../moodboards/moodHeading"),
  {
    loading: () => <MoodBoardHeadingSkeleton />,
    ssr: true,
  }
);
const MoodFavDetail = dynamic(
  () => import("./moodFavDetail"),
  {
    loading: () => <SkeletonMoodBoardDetails />,
    ssr: true,
  }
);
const MoodboardsFavoritesSection = () => {
  const wishlistBreadCrumb = [
    {
      title: "Wishlist",
      isLink: false,
    },
  ];
  return (
    <>
      <CustomBreadCrumb data={wishlistBreadCrumb} key="MoodboardsFavoritesSection" />
      <MoodHeadingSection />
      <MoodFavDetail />
    </>
  );
};

export default MoodboardsFavoritesSection;
