import AnnouncementModule from "@/modules/announcement";
import AllOffers from "./allOffers";
import Banner from "./banner";
import SwiperCard from "./swiperCard";

const OffersPageSection = ({ data, offerData }) => {
  console.log('ss', 'enquiry_type4');

  return (
    <>
      {data &&
        data?.result?.COMPONENT &&
        data?.result?.COMPONENT?.length > 0 &&
        data?.result?.COMPONENT.map((item, index) => {
          switch (item?.PARENT?.component_url) {
            case "Component/Banner/Banner":
              return (
                <>
                  <Banner data={item?.PARENT} />
                </>
              );
              break;
            case "Component/OfferProductList/Index":
              return (
                <>
                  <SwiperCard data={item?.PARENT} offerData={offerData} />
                </>
              );
              break;
            case "Component/Offer/Offer":
              return (
                <>
                  <AllOffers data={item?.PARENT} offerData={offerData} />
                </>
              );
              break;
            case "Component/FooterAnnouncement/FooterAnnouncement":
              return <AnnouncementModule data={item} enq_type="C" />;
              break;
          }
        })}
    </>
  );
};

export default OffersPageSection;
