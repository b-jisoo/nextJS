import { Query, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import Seo from "../../components/Seo";
import { QueryKey, restFetcher } from "../../queryClient";
import { MonvieDetails, Movie } from "../../type";

type MovieDetailParams = [string, number] | [];

const useGetMoviesDeteliData = (id: number | undefined) => {
  return useQuery<MonvieDetails>([QueryKey.MOVIES, id], () =>
    restFetcher({
      method: "GET",
      path: `/api/movies/${id}`,
    })
  );
};

export const Detail = ({
  params,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  const router = useRouter();
  const [title, id] = (params || []) as MovieDetailParams;
  const { data, isLoading } = useGetMoviesDeteliData(id);
  if (isLoading) return <h4>Loading...</h4>;
  if (!data) return <h4>No data found</h4>;

  console.log("디테일 data입니다", data);

  return (
    <div className="movie">
      <Seo title={title} />
      <img
        src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
        alt={title}
      />
      <h4>{title}</h4>
      <style jsx>{`
        /* .movie {
          display: flex;
          flex-direction: column;
        } */
        .movie img {
          max-width: 80%;
          border-radius: 12px;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.query.params;
  return {
    props: { params },
  };
};

export default Detail;

/*
adult: false
backdrop_path: "/aTovumsNlDjof7YVoU5nW2RHaYn.jpg"
belongs_to_collection: {id: 91361, name: 'Halloween Collection', poster_path: '/cq1lf9sUi10faSvqegx8dLDEeZV.jpg', backdrop_path: '/d6uWYZe7h7M3F7h4IBjO1jgIkMh.jpg'}
budget: 20000000
genres: (3) [{…}, {…}, {…}]
homepage: "https://www.halloweenmovie.com"
id: 616820
imdb_id: "tt10665342"
original_language: "en"
original_title: "Halloween Ends"
overview: "Four years after the events of Halloween in 2018, Laurie has decided to liberate herself from fear and rage and embrace life. But when a young man is accused of killing a boy he was babysitting, it ignites a cascade of violence and terror that will force Laurie to finally confront the evil she can’t control, once and for all."
popularity: 3887.012
poster_path: "/3uDwqxbr0j34rJVJMOW6o8Upw5W.jpg"
production_companies: (5) [{…}, {…}, {…}, {…}, {…}]
production_countries: [{…}]
release_date: "2022-10-12"
revenue: 63000000
runtime: 111
spoken_languages: [{…}]
status: "Released"
tagline: ""
title: "Halloween Ends"
video: false
vote_average: 6.9
vote_count: 414
*/