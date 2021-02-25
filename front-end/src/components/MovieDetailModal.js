import React, { useEffect } from "react";
import { Modal, Image, Header, Statistic, Placeholder } from "semantic-ui-react";
import { useModal } from "../store/Modal/selectors";
import { useDispatch } from "react-redux";
import { closeMovieDetailModal } from "../store/Modal/actions";
import { useMovie } from "../store/Movies/selectors";
import { getMovieDetails } from "../store/Movies/actions";

const MovieDetailModal = () => {
    const { isMovieDetailsModalOpen, movieId } = useModal();
    const dispatch = useDispatch();
    const movie = useMovie(movieId)
    useEffect(() => {
        if (movieId !== 0) {
            dispatch(getMovieDetails(movieId))
        }
    }, [movieId])
    const items = [
        { key: "vote_average", label: "Average", value: movie?.vote_average },
        { key: "vote_count", label: "vote", value: movie?.vote_count },
    ];
    return (
        <Modal open={isMovieDetailsModalOpen} onClose={() => dispatch(closeMovieDetailModal())}>
            <Modal.Header><Header>{movie?.title}</Header></Modal.Header>
            <Modal.Content image>
                <Image wrapped size='huge' src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : "/image.png"} />
                <Modal.Description>
                    {movie?.tagline ? <Header as="h2" textAlign="center">{movie?.tagline}</Header> : <Placeholder><Placeholder.Line length="full" /></Placeholder>}
                    <Header as="h4">Genres</Header>
                    {movie?.genres !== undefined ? movie?.genres?.map(({ name }) => name).join(", ") : <Placeholder><Placeholder.Line length="medium" /></Placeholder>}
                    <Header as="h4">Release date</Header>
                    {movie?.release_date}
                    <Header as="h4">Runtime</Header>
                    {movie?.runtime ? `${movie?.runtime} minutes` : <Placeholder><Placeholder.Line length="medium" /></Placeholder>}
                    <Header as="h4">Overview</Header>
                    <p>
                        {movie?.overview}
                    </p>
                    <Statistic.Group style={{ justifyContent: 'space-around' }} items={items} />
                </Modal.Description>
            </Modal.Content>
        </Modal >
    )
}

export default MovieDetailModal;