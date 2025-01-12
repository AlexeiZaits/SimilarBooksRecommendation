import { useContext, useEffect } from "react";
import { ICarouselSlider } from "../ui/CaruselSlider";
import { CarouselContext } from "pure-react-carousel";

export interface IUseCarusel extends ICarouselSlider {
    screenWidth: number
}

export const useCarusel = ({ setSlideCount, setCurrentSlide, screenWidth }: IUseCarusel) => {
    const {currentSlide, totalSlides, visibleSlides} = useContext(CarouselContext).state;

    useEffect(() => {
        const updateCarouselSlide = (slideToBeVisible: number) => {
          setSlideCount(slideToBeVisible);

          if (
            currentSlide >= totalSlides - visibleSlides ||
            currentSlide >= totalSlides - slideToBeVisible
          ) {
            setCurrentSlide(totalSlides - slideToBeVisible);
          }
        };

        if (screenWidth < 500) {
          updateCarouselSlide(2);
        } else if (screenWidth < 700) {
          updateCarouselSlide(3);
        } else if (screenWidth < 1350){
          updateCarouselSlide(5);
        }
        //>= 1350
          else {
            updateCarouselSlide(4);
        }

      }, [screenWidth, setSlideCount, setCurrentSlide, currentSlide, totalSlides, visibleSlides]);
}
