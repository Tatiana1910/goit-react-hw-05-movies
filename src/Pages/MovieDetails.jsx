import { BackLink } from '../components/BackLink/BackLink';
import { useState, useEffect, Suspense } from 'react';
import Cast from 'components/Cast/Cast';
import Reviews from 'components/Reviews/Reviews';

import { Outlet, useLocation, useParams } from 'react-router-dom';

import getMovieById from 'Fetch/getMovieById';
import {
  DivMovie,
  MoviePicture,
  P,
  SubTitle,
  Title,
  Genres,
  AdditionalDiv,
  LinkStyle,
  DivLinkStyle,
  Container,
} from './MovieDetails.styled';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieId, setMovieId] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    getMovieById(id).then(setMovieId);
  }, [id]);

  if (!movieId) {
    return null;
  }

  const {
    poster_path,
    original_title,
    original_name,
    release_date,
    first_air_date,
    vote_average,
    genres,
    overview,
  } = movieId;

  return (
    <main>
      <Container>
        <BackLink to={backLinkHref}></BackLink>
        <DivMovie>
          <MoviePicture
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={original_title}
            width="300"
          />

          <div>
            <Title>
              {original_title || original_name} (
              <span>{parseInt(release_date || first_air_date)}</span>)
            </Title>
            <P>User Score: {`${Math.round(vote_average * 10)}%`}</P>
            <SubTitle>Overview</SubTitle>
            <P>{overview}</P>
            <SubTitle>Genres</SubTitle>
            <Genres>
              {genres.map((genre, index) => (
                <li key={index} style={{ marginRight: '10px' }}>
                  {genre.name}
                </li>
              ))}
            </Genres>
          </div>
        </DivMovie>

        <AdditionalDiv>
          <h3>Additional Information</h3>
          <DivLinkStyle>
            <LinkStyle to="cast" state={{ from: location.state.from }}>
              <Cast />
            </LinkStyle>

            <LinkStyle to="reviews" state={{ from: location.state.from }}>
              <Reviews />
            </LinkStyle>
          </DivLinkStyle>
        </AdditionalDiv>
        <Suspense fallback={<div>Loading subpage...</div>}>
          <Outlet />
        </Suspense>
      </Container>
    </main>
  );
};

export default MovieDetails;
