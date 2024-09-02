import { useContext, useEffect } from "react";
import {
  ButtonBack,
  ButtonNext,
  DotGroup,
  Slide,
  Slider
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { CarouselContext } from "pure-react-carousel";
import useWindowSize from "../hooks/useWindowSize";
import styled from "styled-components";
import { BooksResponse } from "shared/types";
import { useGetData } from "pages/BookPage/hook/useGetBook";
import { Book } from "entities/index";
import * as API from "../../../config"
import { BooksRequest } from "shared/types/request";
import { FaArrowRight } from "react-icons/fa";
import { Preloader } from "shared/ui";
import { useParams } from "react-router-dom";

interface ICarouselSlider {
  setSlideCount: (count: number) => void,
  setCurrentSlide: (count: number) => void
}

const CarouselSlider = ({ setSlideCount, setCurrentSlide }: ICarouselSlider) => {
  const screenWidth = useWindowSize();
  const {title} = useParams()
  const {currentSlide, totalSlides, visibleSlides} = useContext(CarouselContext).state;
  const {data, loading, error} = useGetData<BooksResponse, string ,BooksRequest>(API.searchBooks, title ? title: "", {
    "query": title ? title : "",
    "limit": 6,
    "offset": 0
  })

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

    if (screenWidth < 832) {
      updateCarouselSlide(1);
    } else if (screenWidth < 1088) {
      updateCarouselSlide(2);
    }
    //>= 1088
      else {
        updateCarouselSlide(3);
    }

  }, [screenWidth, setSlideCount, setCurrentSlide, currentSlide, totalSlides, visibleSlides]);

  return (
    <>

    {loading && <Preloader/>}
    {error && <span>Error</span>}
    {data && <Wrapper>
      <Slider style={{width: "115%"}}>
        {data?.data.map((item, index) => {
          return <Slide key={item.uid} index={index} className="slide">
            <Book key={item.uid} {...item}/>
          </Slide>
        })}
      </Slider>
      <div className="controls">
        <ButtonBack className="btn-arrow reverse-arrow">
          <FaArrowRight style={{color: "#2fbd59"}}/>
        </ButtonBack>
        <DotGroup className="dot-group" />
        <ButtonNext className="btn-arrow">
          <FaArrowRight style={{color: "#2fbd59"}}/>
        </ButtonNext>
      </div>
    </Wrapper>}
    </>
  );
};

const Wrapper = styled.div`
  .controls {
    display: flex;
    align-items: center;
    justify-content: center;

    .btn-arrow {
      border: none;
      background: none;
      padding: 11px 20px;
    }

    .reverse-arrow {
      transform: rotateY(180deg);
    }

    .dot-group {
      display: flex;
      align-items: center;
      justify-content: center;

      .carousel__dot {
        width: 8px;
        height: 8px;
        border: none;
        border-radius: 50%;
        margin: 0 4px;
        padding: 0;
        background-color: #c3c4ca;
      }

      /* This class is found in DotGroup from pure-react-carousel */
      /* We need to override it to add our styles */
      .carousel__dot--selected {
        width: 16px;
        height: 8px;
        border-radius: 10px;
        background-color: #2fbd59;
        transition: background 0.4s ease;
      }
    }
  }
`;

export default CarouselSlider;
