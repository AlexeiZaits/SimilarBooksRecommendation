import { ReactNode, useState } from "react";
import { CarouselProvider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import styled from "styled-components";
import CarouselSlider from "../ui/CaruselSlider";
import { ErrorType } from "shared/types";
import React from "react";

interface ICarusel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[] | null,
  loading: boolean,
  error: ErrorType,
  children: ReactNode
}

// Передавать конкретный компонент в children shared/entities для карусели
export const Carusel = ({data, children}: ICarusel) => {
    const [slideCount, setSlideCount] = useState(2);
    const [currentSlide, setCurrentSlide] = useState(0);
    const childCount = React.Children.count(children);

  return (
    <>
    {data && childCount && <CarouselWrapper className="carousel-container">
      <CarouselProvider
        visibleSlides={slideCount}
        totalSlides={data.length}
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
        >
        </CarouselSlider>
      </CarouselProvider>
    </CarouselWrapper>}
  </>
  );
}

const CarouselWrapper = styled.div`
  &.carousel-container {
    filter: drop-shadow(0px 12px 30px rgba(50, 50, 50, 0.2));
    width: 100%;
    position: relative
  }
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
