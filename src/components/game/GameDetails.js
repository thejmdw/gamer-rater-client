import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameProvider.js"
// import { EventContext } from "./EventProvider.js"
import { useHistory, Link, useParams } from "react-router-dom"

export const GameDetails = () => {
    const history = useHistory()
    const { reviews, getGameById, getReviewsByGameId } = useContext(GameContext)
    // const { events, getEvents } = useContext(EventContext)

    const [ game, setGame ] = useState({})
    const [ categories, setCategories ] = useState([])
    // const [ reviews, setReviews ] = useState([])
    const { gameId } = useParams()
    const [ rating, setRating ] = useState({
        gameId: parseInt(gameId),
        rating: 5
    })

    useEffect(() => {
        getGameById(parseInt(gameId))
         .then(game => setGame(game))
        //  getReviewsByGameId(parseInt(gameId)))
        //  .then(reviews => setReviews(reviews))
    }, [])

    useEffect(() => {
        setCategories(game.categories)
        getReviewsByGameId(parseInt(gameId))
        //  .then(reviews => setReviews(reviews))
    }, [game])

    const changeRatingState = (event) => {
        const newRatingState = { ...rating }
        newRatingState.rating = parseInt(event.target.value)
        setRating(newRatingState)
    }

    return (
        <>
        <article className="games">
        <header className="events__header">
                <h1>{game.title}</h1>
            </header>
                
                    <section key={`game--${game.id}`} className="game">
                        
                        <div className="game__players">Description: {game.description}</div>
                        <div className="game__designer">Maker: {game.designer}</div>
                        <div className="game__numberOfPlayers">Number of Players: {game.number_of_player}</div>
                        <div className="game__releaseYear">Release Year: {game.release_year}</div>
                        <div className="game__gameDuration">Game Duration (minutes): {game.game_duration}</div>
                        <div className="game__ageRange">Age Range: {game.age_range}</div>
                        <div className="game__categories">Categories: {categories?.map(c => <li>{c.label}</li>)}</div>
                        <div className="game__reviews"><h3>Reviews:</h3> 
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                history.push(`/games/review/${game.id}`)
                            }}
                            >Create Review</button>
                        {reviews?.map(r => <div><li>{r.review}</li>
                                                                                        -{r.user.first_name}</div>)}</div>
                        
                        {/* <div class="slidecontainer">
                            <input type="range" min="1" max="10" value={rating.rating} class="slider" id="myRange" onChange={changeRatingState}/>
                        </div>     */}

                        {/* <div className="game__edit">
                        <button className="btn btn-3"
                                    onClick={() => history.push(`games/edit/${game.id}`)}
                                    >Edit Game</button>
                        </div> */}
                        

                    </section>
        </article>
</>
    )
}

