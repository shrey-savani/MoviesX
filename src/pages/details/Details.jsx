import React from "react";
import "./style.scss";
import useFetch from "../../hook/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailBanner";
import VideosSection from "./videosSection/VideosSection";
import Similar from "../../components/carousels/Similar";
import Recommendation from "../../components/carousels/Recomendations";
import Cast from "../../components/cast/Cast";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
