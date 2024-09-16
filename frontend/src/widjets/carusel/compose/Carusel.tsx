import { useState } from "react";
import { CarouselProvider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import styled from "styled-components";
import CarouselSlider from "../ui/CaruselSlider";

export const Carusel = () => {
    const [slideCount, setSlideCount] = useState(2);
    const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <CarouselWrapper className="carousel-container">
      <CarouselProvider
        visibleSlides={slideCount}
        totalSlides={12}
        step={1}
        currentSlide={currentSlide}
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        isIntrinsicHeight={true}
        infinite={true}
      >
        <CarouselSlider
          setSlideCount={setSlideCount}
          setCurrentSlide={setCurrentSlide}
        />
      </CarouselProvider>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.div`
  &.carousel-container {
    margin: 12px auto;
    max-width: 170px;
    filter: drop-shadow(0px 12px 30px rgba(50, 50, 50, 0.2));

    /* Total-width (including margin) + 1 additional margin */

    @media (min-width: 500px) {
      max-width: 450px;
    }

    @media (min-width: 832px) {
      max-width: 900px;
    }

    @media (min-width: 1024px) {
      max-width: 900px;
    }

    @media (min-width: 1080px) {
      max-width: 1152px;
    }

    @media (min-width: 1504px) {
      max-width: 1300px;
    }
  }

  /* This class is found in Slide from pure-react-carousel */
  /* We need to override it to add space between slides */
  .carousel__inner-slide {
    /* width: 100% - margin */
    width: calc(100% - 16px);
    /* margin-left: margin/2 */
    /* margin is required to adjust positioning as the width is diminished*/

    @media (min-width: 1272px) {
      width: calc(100% - 24px);
    }

    @media (min-width: 1272px) {
      width: calc(100% - 32px);
    }
  }
`;
