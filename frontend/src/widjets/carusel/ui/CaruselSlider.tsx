import {
  ButtonBack,
  ButtonNext,
  DotGroup,
  Slide,
  Slider
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import useWindowSize from "../hooks/useWindowSize";
import styled from "styled-components";
import { BooksResponse } from "shared/types";
import { useGetData } from "pages/BookPage/hook/useGetData";
import { Book, BooKProps } from "entities/index";
import * as API from "../../../config"
import { FaArrowRight } from "react-icons/fa";
import { Preloader } from "shared/ui";
import { useParams } from "react-router-dom";
import { useCarusel } from "../hooks/useCarusel";
import { decodeLink } from "features/recommendList/hooks/use-category-books";

export interface ICarouselSlider {
  setSlideCount: (count: number) => void,
  setCurrentSlide: (count: number) => void,
}

const components = {
  Book: (props: BooKProps) => <Book {...props}/>,

}

const CarouselSlider = ({ setSlideCount, setCurrentSlide }: ICarouselSlider) => {
  const screenWidth = useWindowSize();
  const {title} = useParams()
  useCarusel({ setSlideCount, setCurrentSlide, screenWidth })
  const {data, loading, error} = useGetData<BooksResponse, string>(API.searchBooks(title? decodeLink(title): "", 12, 0), title ? title: "")

  const Component = components["Book"]

  return (
    <>
    {loading && <Preloader/>}
    {error && <span>Error</span>}
    {data && <Wrapper>
      <Slider>
        {data?.data.map((item, index) => {
          return <Slide key={item.uid} index={index} className="slide">
            <Component key={item.uid} {...item}/>
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
