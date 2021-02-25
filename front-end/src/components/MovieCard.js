import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import { useMovie } from '../store/Movies/selectors';
import { useDispatch } from 'react-redux';
import { openMovieDetailModal } from '../store/Modal/actions';


const MovieCard = React.memo(({ movieId }) => {
    const dispatch = useDispatch();
    const { backdrop_path, title, release_date, vote_average, id } = useMovie(movieId);
    const openModal = () => dispatch(openMovieDetailModal(id))
    return (
        <Card style={{ margin: 10 }} link onClick={openModal}>
            <Image src={backdrop_path ? `https://image.tmdb.org/t/p/w500${backdrop_path}` : "/image.png"} wrapped ui={false} />
            <Card.Content>
                <Card.Header textAlign="center">{title}</Card.Header>
                <Card.Meta>
                    {release_date}
                </Card.Meta>
                <Card.Description>
                    <Rating defaultRating={vote_average} maxRating={10} disabled />
                </Card.Description>
            </Card.Content>
        </Card>
    )
})

export default MovieCard;