import AddNewCardSkeleton from "@/components/skeleton/layout/profile/addNewCardSkeleton";
import Container from "@mui/material/Container";
import dynamic from "next/dynamic";

const AddNewCardHeading = dynamic(
  () => import("./addNewCardHeading"),
  {
    loading: () => <AddNewCardSkeleton />,
    ssr: false,
  }
);
const AddNewCardSection = () => {
  return (
    <Container maxWidth="lg">
      <AddNewCardHeading />
    </Container>
  );
};

export default AddNewCardSection;
