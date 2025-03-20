import React, { useState, useEffect, useRef } from 'react';
import NextLazyFillImage from "@/components/image/nextLazyFillLoadImage";
import { Modal, Box, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useResponsive from "@/hooks/useResponsive";


const MetModal = ({ isOpen, closeModal }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRight, setSelectedRight] = useState(null);
    const [mainImage, setMainImage] = useState('https://placehold.co/600x500');
    const [mainImageLoader, setMainImageLoader] = useState(false);
    const [productData, setProductData] = useState([]);
    const [selectedLeft, setSelectedLeft] = useState([]);
    const [defautSelectedLeft, setDefaultSelectedLeft] = useState([]);
    const [showLeft, setShowLeft] = useState(false);
    const [gallaryData, setGallaryData] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedDesc, setselectedDesc] = useState(null);
    const [webImagesTotalCount, setWebImagesTotalCount] = useState(0);
    const [webCurrentIndex, setWebCurrentIndex] = useState(0);
    const [artDesc, setArtDesc] = useState('');
    const [artCode, setArtCode] = useState('');
    const isDownSm = useResponsive("down", "sm");
    const imagesPerPage = isDownSm ? 300 : 15;
    const webTotalPages = Math.max(1, Math.ceil(webImagesTotalCount / imagesPerPage));
    const webCurrentPage = Math.floor(webCurrentIndex / imagesPerPage);
    const galleryRef = useRef(null);
    const [openContact, setOpenContact] = useState(false);
    const { t: translate } = useTranslation();
    const { locale } = useRouter();
    let lang = locale.split("-")?.[1];
    console.log('lang', lang, locale)

    useEffect(() => {
        fetchArt(0);
    }, []);

    useEffect(() => {
        if (selectedRight) {
            fetchProduct(selectedRight);
        }
    }, [selectedRight]);

    const fetchArt = async (pageIndex) => {
        setLoading(true);
        try {
            const res = await axios.get(`https://api.sedarglobal.com/themet/collection?page=${pageIndex + 1}&limit=${imagesPerPage}`);
            if (res.data.result) {
                setItems(res.data.result);
                setSelectedRight(res.data.result[0].SII_CODE);
                setWebImagesTotalCount(res?.data?.count);
                setArtDesc(res.data.result[0].SII_DESC);
                setArtCode(res.data.result[0].SII_ITEM_ID);


            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProduct = async (selectedRight) => {
        setMainImageLoader(true);
        try {
            const res = await axios.get(`https://api.sedarglobal.com/themet/product/${selectedRight}?lang=${lang}`);
            if (res.data.result) {
                const data = res.data.result[0];
                setProductData(res.data.result);
                setSelectedLeft(data.SC_PR_ITEM_CODE);
                setDefaultSelectedLeft(data.SC_PR_ITEM_CODE);
                console.log(res, 'response data');
                // setMainImage(data.IMAGE_PATH + data.SC_PR_ITEM_CODE);
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
        } finally {
            setMainImageLoader(false);
        }
    };
    useEffect(() => {
        fetchData();

    }, [selectedLeft, selectedRight]);

    const fetchData = async () => {
        console.log(selectedLeft, selectedRight, 'check selected left and selected right');
        if (selectedLeft && selectedRight) {
            try {
                setMainImageLoader(true);

                const res = await axios.get(`https://api.sedarglobal.com/themet/gallary/${selectedRight}?pro_item_code=${selectedLeft}`, '');

                if (res.data.result) {
                    setLoading(true);

                    setGallaryData(res.data);

                    const middleImage = res.data?.result[0]?.IMAGE_PATH + '/' + res.data?.result[0]?.SLI_IMAGE_PATH;
                    setMainImage(middleImage);
                    setMainImageLoader(false);
                    console.log('Fetched Data new:', res.data.result);
                    setLoading(false);

                }


            } catch (error) {
                console.error('Error fetching section data:', error);
            }
        }
    };
    const handleRightClick = (sectionId, artCode, artDesc, mainImage) => {
        setSelectedRight(sectionId);
        setArtDesc(artDesc);
        setArtCode(artCode);
        // setMainImage(mainImage);
    };
    const handleLeftClick = (itemCode, event) => {
        event.preventDefault();
        const itemCodes = itemCode.split(',').map(code => code.trim());

        setSelectedLeft((prevSelected) => {
            // Set `prevSelected` to an empty string if it's null or undefined
            const selectedArray = Array.from(new Set((prevSelected || '').split(',').map(code => code.trim())));
            console.log('itemCode', itemCodes, 'prevSelected', prevSelected, 'selectedArray', selectedArray);

            itemCodes.forEach((code) => {
                if (selectedArray.includes(code)) {
                    const index = selectedArray.indexOf(code);
                    if (index > -1) {
                        selectedArray.splice(index, 1);
                    }
                } else {
                    selectedArray.push(code);
                }
            });

            if (selectedArray.length === 0) {
                return defautSelectedLeft;
            }
            return selectedArray.join(',');
        });
    };

    const scrollGallery = (direction) => {
        if (galleryRef.current) {
            const scrollAmount = 100;
            galleryRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const toggleLeftSection = () => {
        setShowLeft(prev => !prev);
        setShowDetails(false);
    };

    const GallerySection = () => (
        <Box sx={{ display: { md: 'flex', sm: 'none', xs: 'none', xxs: 'none' }, overflowX: 'auto', scrollBehavior: 'smooth', width: '100%', gap: '8px' }} ref={galleryRef} >
            {gallaryData?.result?.map((item, index) => (
                <Box key={index} sx={{ minWidth: '60px', height: '60px', display: { md: 'flex', sm: 'none', xs: 'none' } }} onClick={() => showGallaryImage(item.IMAGE_PATH ? item.IMAGE_PATH + '/' + item.SLI_IMAGE_PATH : '')}>
                    <img
                        src={item?.IMAGE_PATH ? item?.IMAGE_PATH + '/' + item?.SLI_IMAGE_PATH : ''}
                        alt={item?.SII_ITEM_ID}
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                </Box>
            ))}?
        </Box>
    );
    const toggleDetails = () => {
        setShowDetails((prev) => !prev);
        setShowLeft(false);
    };
    const showGallaryImage = (imagePath) => {
        setMainImageLoader(true);
        setMainImage(imagePath);
        setMainImageLoader(false);
    };
    const LeftSection = () => (
        <Box
            sx={{
                width: { xs: '100%', md: '22%' },
                display: { xxs: showLeft ? 'grid' : 'none', md: 'flex' },
                bgcolor: 'white',
                gridTemplateColumns: { xxs: 'repeat(2, 1fr)', xs: 'repeat(2, 1fr)', sm: 'unset' },
                alignContent: { md: 'center' },
                flexWrap: { md: 'wrap' },
                flexDirection: { md: 'column' },
                cursor: 'pointer',

            }}
        >
            {productData.map((item, index) => (
                <Box
                    onClick={(event) => handleLeftClick(item.SC_PR_ITEM_CODE, event)}
                    key={index}
                    sx={{
                        bgcolor: selectedLeft.includes(item.SC_PR_ITEM_CODE) ? '#f6bf5a' : 'white',
                        p: '30px',
                        width: '100%',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        height: '70px',
                        marginTop: '1px',
                        color: selectedLeft.includes(item.SC_PR_ITEM_CODE) ? 'white' : 'black',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            bgcolor: '#f6bf5a',
                            color: 'white',
                            '& img': {
                                filter: 'brightness(0) invert(1) !important',
                            },

                        },


                    }}>
                    <img
                        src={
                            selectedLeft.includes(item.SC_PR_ITEM_CODE)
                                ? item.IMAGE_PATH + 'icon/' + item.SC_ICON_PATH_01
                                : item.IMAGE_PATH + 'icon/' + item.SC_ICON_PATH_02
                        }
                        alt={item.SC_DESC}
                        style={{
                            filter: selectedLeft.includes(item.SC_PR_ITEM_CODE) ? 'contrast(600%)' : 'none',
                        }}
                    />
                    <h3 style={{ marginLeft: '30px' }}>{item.SC_DESC}</h3>
                </Box>
            ))}
        </Box>
    );

    const MainImageSection = () => (
        <Box sx={{ width: { md: '58%' }, height: '563px', bgcolor: 'black', p: 2, display: { xxs: 'none', xs: 'none', sm: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', padding: '0' }}>
            {mainImageLoader ? (
                <p>Loading...</p>
            ) : (
                <img
                    src={mainImage}
                    alt={mainImage || 'Art Piece'}
                    style={{ width: 'auto', height: '100%', objectFit: 'cover', marginLeft: '7px' }}
                    className="RightSection"
                />
            )}
        </Box>

    );
    const OrderYours = () => {
        return (
            <Box
                className="order-yours"
                sx={{
                    width: { md: '98%' },
                    margin: 'auto',
                    cursor: 'pointer',
                    textAlign: 'center',
                    padding: 2,
                    backgroundColor: '#f6bf5a',
                    color: 'white'

                }}
                onClick={() => {
                    const selectedItems = productData?.filter(item => selectedLeft.includes(item.SC_PR_ITEM_CODE));
                    const selectedDescriptions = selectedItems.map(item => item.SC_DESC).join(', ');

                    setselectedDesc(selectedDescriptions || '');
                    handleOpenCloseContact();
                }}

            >
                {translate("orderYours")}
            </Box>
        )
    }
    const RightSection = () => (

        <Box sx={{ display: { xxs: 'none', xs: 'none', md: 'flex', sm: 'none' }, width: { md: '20%' }, bgcolor: 'black', flexWrap: 'wrap', ml: 2, height: '69px', mt: 1 }}>

            {items.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        width: '33%',
                        height: '70px',
                        p: '2px',
                        textAlign: 'center',
                        border: selectedRight === item.SII_CODE ? '2px solid red' : 'none',
                        cursor: 'pointer',
                        display: { xs: 'none', sm: 'none', md: 'flex' }
                    }}
                    onClick={() => handleRightClick(item.SII_CODE, item.SII_ITEM_ID, item.SII_DESC, `${item.IMAGE_PATH}/${item.SII_THUMBNAIL_IMAGES}`)}
                >
                    <img src={`${item.IMAGE_PATH}/${item.SII_THUMBNAIL_IMAGES}`} alt={item.SII_ITEM_ID} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                </Box>
            ))}
            <Box className="row" sx={{ width: "97%", marginTop: '10px' }}>
                <Box className="carousel-pagination" sx={{ width: '100%', mt: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        className="pagination-arrow"
                        onClick={() => handleEvent('right')}
                        disabled={webCurrentPage === 1}
                        sx={{ minWidth: 'auto', color: 'white', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' } }}
                    >
                        ‹
                    </Button>

                    {/* Pagination numbers */}
                    {Array.from({ length: webTotalPages }).map((_, pageIndex) => {
                        const isVisible = pageIndex === webCurrentPage ||
                            pageIndex === webCurrentPage - 1 ||
                            pageIndex === webCurrentPage + 1 ||
                            pageIndex === 1 ||
                            pageIndex === webTotalPages - 1;

                        if (isVisible) {
                            return (
                                <Button
                                    key={pageIndex}
                                    className={`pagination-number ${pageIndex === webCurrentPage ? "active" : ""}`}
                                    onClick={() => handlePageClick(pageIndex)}
                                    sx={{
                                        minWidth: 'auto',
                                        mx: 0.5,
                                        color: 'white',
                                        padding: '3px 11px',
                                        borderRadius: '17px',
                                        backgroundColor: pageIndex === webCurrentPage ? '#f6bf5a' : 'transparent',
                                        '&:hover': { backgroundColor: pageIndex === webCurrentPage ? '#f6bf5a' : 'transparent' }
                                    }}
                                >
                                    {pageIndex + 1}
                                </Button>
                            );
                        } else if (pageIndex === webCurrentPage - 2 || pageIndex === webCurrentPage + 2) {
                            return (
                                <Box key={pageIndex} className="pagination-dots" sx={{ color: 'white', mx: 0.5 }}>
                                    ...
                                </Box>
                            );
                        }

                        return null;
                    })}

                    <Button
                        className="pagination-arrow"
                        onClick={() => handleEvent('left')}
                        disabled={webCurrentPage === webTotalPages - 1}
                        sx={{ minWidth: 'auto', color: 'white', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' } }}
                    >
                        ›
                    </Button>
                </Box>

                <OrderYours />
            </Box>

        </Box>



    );

    const CenterSection = (props) => {
        return (
            <>
                <Box
                    sx={{
                        width: { md: '58%', sm: '100%' },
                        height: { md: '600px' },
                        display: { md: 'none', sm: 'block' },

                    }}
                    className="CenterSection"
                >
                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'white',
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Swiper
                            modules={[Pagination, Navigation]}
                            spaceBetween={10}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            style={{ width: '100%', height: '100%', backgroundColor: 'white', color: 'white' }}
                        >
                            {props && props?.result?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <ImageList
                                        sx={{
                                            width: '100%',
                                            height: '80%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        <ImageListItem sx={{ width: '100%', height: '100%' }}>
                                            <img
                                                src={item.IMAGE_PATH ? `${item.IMAGE_PATH}/${item.SLI_IMAGE_PATH}` : ''}
                                                alt={item.SII_DESC || 'Sedar'}
                                                loading="lazy"
                                                style={{
                                                    width: '100%',
                                                    maxHeight: '550px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </ImageListItem>
                                    </ImageList>
                                </SwiperSlide>
                            ))}

                        </Swiper>
                    )}
                    <OrderYours />

                </Box>

            </>
        )
    };

    const handlePageClick = (webCurrentIndex) => {
        console.log(webCurrentIndex, 'asdas');
        setWebCurrentIndex(webCurrentIndex * imagesPerPage);
        fetchArt(webCurrentIndex);
    };

    const handleEvent = (type = '') => {
        if (type == 'left') {
            if (webCurrentPage < webTotalPages - 1) {
                handlePageClick(webCurrentPage + 1);
            }
        } else {
            if (webCurrentPage > 1) {
                handlePageClick(webCurrentPage - 1);
            }
        }

    };
    const ContactDialog = dynamic(() => import("@/modules/dialog/contactDialog"), {
        loading: () => <></>,
        ssr: false,
    });
    const handleOpenCloseContact = () => {
        setOpenContact(!openContact);
    };

    const ModalCloseButton = () => (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    display: { md: 'none', xxs: 'flex' }
                    // bgcolor: "gray",
                    // p: 2,
                }}
            >
                <Box
                    sx={{
                        width: "30px",
                        height: "25px",
                        bgcolor: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        cursor: "pointer",
                        marginLeft: "auto", 
                    }}
                    onClick={closeModal}
                >
                    x
                </Box>
            </Box>


        </>
    );
    return (
        <>
            {openContact && (
                <ContactDialog
                    open={openContact}
                    handleOpenClose={handleOpenCloseContact}
                    selectedDesc={selectedDesc}
                    artCode={artCode}
                    enquiry_type="A"
                />
            )}
            <Modal open={isOpen} onClose={closeModal} aria-labelledby="modal-title" aria-describedby="modal-description" sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Box
                    sx={{
                        width: { xs: '90vw', md: 1150 },
                        maxWidth: { xs: '90vw', md: '100%' },
                        height: { xs: '80vh', md: 750 },
                        maxHeight: { xs: '90vh', md: '100%' },
                        bgcolor: {xxs:'transparent',md:'black'},
                        boxShadow: 24,
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                    }}
                >
                    <ModalCloseButton />
                    <Box sx={{ width: '100%', height: '80px', bgcolor: 'black', display: 'flex' }}>
                        <Box sx={{ flex: 1, bgcolor: 'black', p: 2, color: 'white', display: { md: 'none', xxs: 'flex' } }} onClick={toggleLeftSection}>
                            <Box sx={{
                                margin: '14px'
                            }}>
                                &#9776;
                            </Box>
                            <Box>
                                {translate("productType")}
                            </Box>

                        </Box>
                        <Box sx={{ width: { md: '21.7%' }, bgcolor: 'black', margin: { xxs: '18px -13px 0px 13px' } }}>
                            <Box
                                component="img"
                                src="/assets/themat/met-logo.png"
                                alt="Logo"
                                sx={{
                                    width: { xs: '53%', md: '80%', xxs: '75%' },
                                    objectFit: 'cover',
                                    display: { xs: 'block', sm: 'block', md: 'block' },
                                    marginLeft: { md: '10px' }
                                }}
                            />
                        </Box>
                        <Box sx={{ flex: 1, color: 'white', bgcolor: 'rgb(54, 53, 49)', p: 4, display: { md: 'flex', xxs: 'none' } }}>
                            {artDesc}
                        </Box>
                        <Box sx={{ flex: 1, color: 'white', bgcolor: 'rgb(54, 53, 49)', p: 4, display: { md: 'flex', xxs: 'none' } }}>
                            <span style={{ fontWeight: 'bold' }}>{translate('artCode')}:</span>
                            <span style={{ color: 'red', marginLeft: '8px' }}>
                                {artCode}
                            </span>
                        </Box>
                        <Box onClick={closeModal} sx={{ flex: 1, color: 'white', bgcolor: 'rgb(54, 53, 49)', p: 4, display: { md: 'flex', xxs: 'none' }, justifyContent: { md: 'center' }, cursor: 'pointer', fontWeight: '400' }}>
                            x
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            color: 'white',
                            height: '70px',
                            backgroundColor: '#65635f',
                            display: { xxs: 'flex', md: 'none' },
                            position: 'relative',
                            padding: '10px',
                        }}
                    >
                        <Box sx={{ mt: 2, ml: 2 }}>
                            {artDesc}
                        </Box>
                        <Box sx={{ ml: 4, mt: 2 }}>
                            <span style={{ fontWeight: 'bold' }}>{translate('artCode')}:</span>
                            <span style={{ color: 'red', marginLeft: '8px' }}>
                                {artCode}
                            </span>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            height: showDetails ? '300px' : '0',
                            transition: 'height 0.3s ease',
                            backgroundColor: '#555',
                            display: { xxs: 'block', md: 'none' },
                            position: 'relative'

                        }}
                    >
                        <Button
                            onClick={toggleDetails}
                            sx={{
                                color: 'white',
                                backgroundColor: '#65635f',
                                width: '1px',
                                alignItems: 'right',
                                display: { sm: 'block', md: 'none' },
                                mt: 0,
                                borderRadius: '0px',
                                zIndex: '9999',
                                position: 'absolute',
                                top: showDetails ? '273px' : '0',
                                right: '0px',
                                transition: 'top 0.3s ease',

                            }}
                        >

                            {showDetails ? (
                                // Up arrow SVG
                                <svg height="14" width="33" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M224 144c-8.5 0-16.6 3.4-22.6 9.4l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 237.3l137.4 137.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160c-6-6-14.1-9.4-22.6-9.4z"></path>
                                </svg>
                            ) : (
                                // Down arrow SVG
                                <svg height="14" width="33" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                                </svg>
                            )}
                        </Button>
                        {/* Content of the details section */}
                        <Box p={2} sx={{ display: { xxs: showDetails ? 'block' : 'none', md: 'none' }, }}>
                            <Swiper
                                slidesPerView={3}
                                grid={{
                                    rows: 2,
                                    fill: 'grid',
                                }}
                                spaceBetween={1}
                                pagination={{
                                    clickable: true,
                                    el: '.swiper-pagination',
                                }}
                                modules={[Pagination, Navigation, Grid]}
                            >
                                {items && items?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <Box
                                            sx={{
                                                width: '110px',
                                                marginBottom: '8px',
                                                border: selectedRight === item.SII_CODE ? '2px solid red' : 'none',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                            data-id={item.SII_CODE}
                                            onClick={() =>
                                                handleRightClick(
                                                    item.SII_CODE,
                                                    item.SII_ITEM_ID,
                                                    item.SII_DESC,
                                                    item.IMAGE_PATH + '/' + item.SII_THUMBNAIL_IMAGES
                                                )
                                            }
                                        >
                                            <img
                                                src={item.IMAGE_PATH + '/' + item.SII_THUMBNAIL_IMAGES}
                                                alt={item.SII_CODE}
                                                style={{ width: '100%', height: '110px', objectFit: 'cover' }} // Maintain aspect ratio
                                            />
                                        </Box>
                                    </SwiperSlide>
                                ))}
                                {/* <div className="swiper-pagination"></div> */}
                            </Swiper>
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1, display: { xs: 'column', sm: 'flex' }, flexDirection: { xs: 'column', md: 'row' }, height: '60%' }} className="mid-section">
                        <LeftSection />
                        <CenterSection {...gallaryData} />
                        <MainImageSection />
                        <RightSection />
                    </Box>

                    <Box sx={{ display: { xxs: 'none', sm: 'none', md: 'flex' }, width: '100%', height: '90px', bgcolor: 'black', p: 2, mt: 2, alignItems: 'center', cursor: 'pointer' }}>
                        {/* <button onClick={() => scrollGallery('left')} style={{ cursor: 'pointer', marginRight: '8px' }}>{"<"}</button> */}
                        <Box
                            component="button"
                            onClick={() => scrollGallery('left')}
                            sx={{
                                width: '35px',
                                height: '60px',
                                backgroundColor: 'gray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                border: 'none',
                                color: 'white',
                                // marginRight: '8px',
                                '&:hover': {
                                    backgroundColor: 'darkgray',
                                },
                            }}
                        >
                            {"<"}
                        </Box>

                        <GallerySection />
                        <Box
                            component="button"
                            onClick={() => scrollGallery('right')}
                            sx={{
                                width: '35px',
                                height: '60px',
                                backgroundColor: 'gray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                border: 'none',
                                color: 'white',
                                // marginRight: '8px',
                                '&:hover': {
                                    backgroundColor: 'darkgray',
                                },
                            }}
                        >
                            {">"}
                        </Box>
                        {/* <button onClick={() => scrollGallery('right')} style={{ cursor: 'pointer' }}>&gt;</button> */}
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default MetModal;
