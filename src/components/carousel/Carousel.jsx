import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import PosterFallback from "../../assets/no-poster.png";
import Img from "../../components/lazyLoading/Img";
import CircleRating from "../circleRating/CircleRating";
import "./style.scss";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading, endpoint, title}) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state?.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
        dir === "left"
            ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
    });
  };

  const skeletonItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton">
          <div className="textBlock">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              let posterPath = item?.backdrop_path
                ? url?.poster + item?.backdrop_path
                : PosterFallback;
              return (
                <div className="carouselItem" key={item?.id}>
                  <div className="posterBlock" onClick={()=>{navigate(`/${item?.media_type || endpoint}/${item?.id}`)}}>
                    <Img src={posterPath} />
                    <CircleRating rating={item?.vote_average.toFixed(1)}/>
                    <Genres data={item?.genre_ids.slice(0,2)}/>
                  </div>
                  <div className="textBlock">
                    <span className="title">{item?.title || item?.name}</span>
                    <span className="date">
                      {dayjs(item?.release_Date).format("MMM, D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
