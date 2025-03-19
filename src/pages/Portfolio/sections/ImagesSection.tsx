import React, {FC, useEffect, useState} from 'react';
import cl from '../Portfolio.module.css';
import {IImage, IPortfolio} from "../../../types";
import Masonry from 'react-layout-masonry';
import {useWindowWidth} from "../../../hooks/useWindowWidth";
import {ReactComponent as BlockWithArrow} from '../../../assets/images/blockWithArrow.svg'
import Skeleton from "../../../components/ui/Skeleton/Skeleton";
import ModalImageWithSwiper from "../../../components/containers/ModalImageWithSwiper/ModalImageWithSwiper";
import Preloader from "../../../components/ui/Preloader/Preloader";
import GroupButtons from "../components/GroupButtons";

export enum OptionsForSelect {
    all_images = 'all_images',
    shower_images = 'shower_images',
    door_images = 'door_images',
    partitionAndRailing_images = 'partitionAndRailing_images',
    photoPrinting_images = 'photoPrinting_images',
    mirror_images = 'mirror_images',
    shelf_images = 'shelf_images'
}

interface ImagesSectionProps {
    images: IPortfolio | null;
    isLoading: boolean;
}

const ImagesSection: FC<ImagesSectionProps> = ({images, isLoading}) => {
    const [initialStateImages, setInitialStateImages] = useState<IPortfolio>({
        shower_images: [],
        door_images: [],
        partition_images: [],
        railing_images: [],
        photoPrinting_images: [],
        mirror_images: [],
        shelf_images: []
    });
    const [isLocalLoading, setIsLocalLoading] = useState<boolean>(false);

    useEffect(() => {
        if (images) {
            setInitialStateImages(images);
        }
    }, [images]);

    const windowWidth = useWindowWidth();

    const [selectedCategory, setSelectedCategory] = useState<OptionsForSelect>(OptionsForSelect.all_images);
    const [selectedImages, setSelectedImages] = useState<IImage[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(8);

    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    useEffect(() => {
        const {
            shower_images,
            door_images,
            partition_images,
            railing_images,
            photoPrinting_images,
            mirror_images,
            shelf_images
        } = initialStateImages;

        const categoryImages = {
            [OptionsForSelect.all_images]: [
                ...shower_images,
                ...door_images,
                ...partition_images,
                ...railing_images,
                ...photoPrinting_images,
                ...mirror_images,
                ...shelf_images,
            ],
            [OptionsForSelect.shower_images]: shower_images,
            [OptionsForSelect.door_images]: door_images,
            [OptionsForSelect.partitionAndRailing_images]: [
                ...partition_images,
                ...railing_images,
            ],
            [OptionsForSelect.photoPrinting_images]: photoPrinting_images,
            [OptionsForSelect.mirror_images]: mirror_images,
            [OptionsForSelect.shelf_images]: shelf_images,
        };

        setVisibleCount(8);
        setSelectedImages(categoryImages[selectedCategory] || []);

        setIsLocalLoading(true);
        const timeout = setTimeout(() => {
            setIsLocalLoading(false);
        }, 300);

        return () => {
            clearTimeout(timeout);
        }
    }, [selectedCategory, initialStateImages]);

    const handleSelectImages = (option: OptionsForSelect) => {
        setSelectedCategory(option);
    };

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 9);
    };

    return (
        <section className={cl.imagesSection}>
            <GroupButtons
                selectedCategory={selectedCategory}
                handleSelectImages={handleSelectImages}
            />
            {isLoading || isLocalLoading ? (
                <div className={cl.prelaoder}><Preloader/></div>
            ) : (
                <div className={cl.masonry}>
                    <Masonry columns={(windowWidth > 999 && 4) || (windowWidth > 599 && 3) || 2} gap={windowWidth > 999 ? 20 : 10}>
                        {selectedImages.slice(0, visibleCount).map((item, index) => (
                            <div key={item.id} className={cl.containerImg}>
                                <Skeleton
                                    src={item.url}
                                    alt={item.alternativeText || 'portfolio image ' + item.id}
                                    classNameImage={cl.image}
                                    classNameSkeleton={cl.skeleton}
                                    onClick={() => handleImageClick(index)}
                                />
                            </div>
                        ))}
                        {selectedImages.length > visibleCount && (
                            <div className={cl.tile} onClick={handleLoadMore}>
                                <p>Показати ще</p>
                                <div className={cl.blockWithArrow}>
                                    <BlockWithArrow/>
                                </div>
                            </div>
                        )}
                    </Masonry>
                </div>
            )}
            {selectedImageIndex !== null && (
                <ModalImageWithSwiper
                    onClose={() => setSelectedImageIndex(null)}
                    selectedImageIndex={selectedImageIndex}
                    images={selectedImages.slice(0, visibleCount).map((item) => item.url)}
                />
            )}
        </section>
    );
};

export default ImagesSection;