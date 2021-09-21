import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameProvider.js"
import { ProfileContext } from "../auth/ProfileProvider.js"
// import { EventContext } from "./EventProvider.js"
import { useHistory, Link, useParams } from "react-router-dom"

export const GameDetails = () => {
    const history = useHistory()
    const { reviews, getGameById, getReviewsByGameId, createImage, images, getImagesByGameId, updateGame } = useContext(GameContext)
    const { profile, getProfile } = useContext(ProfileContext)
    // const { events, getEvents } = useContext(EventContext)

    const [ game, setGame ] = useState({})
    const [ gameImage, setGameImage ] = useState({})
    const [ categories, setCategories ] = useState([])
    // const [ reviews, setReviews ] = useState([])
    const { gameId } = useParams()
    const [ rating, setRating ] = useState({
        gameId: parseInt(gameId),
        rating: 5
    })

    useEffect(() => {
        getProfile()
        getGameById(parseInt(gameId))
         .then(game => setGame(game))
        //  getReviewsByGameId(parseInt(gameId)))
        //  .then(reviews => setReviews(reviews))
    }, [])

    useEffect(() => {
        setCategories(game.categories)
        getReviewsByGameId(parseInt(gameId))
        getImagesByGameId(parseInt(gameId))
        //  .then(reviews => setReviews(reviews))
    }, [game])

    const changeRatingState = (event) => {
        const newRatingState = { ...rating }
        newRatingState.rating = parseInt(event.target.value)
        setRating(newRatingState)
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setGameImage(base64ImageString)
            // Update a component state variable to the value of base64ImageString
        });
    }
    
    return (
        <>
        <article className="games">
        <header className="events__header">
                <h1>{game.title}</h1>
            </header>
                        {profile.user?.id === game.user?.id ? <button className="btn btn-3"
                                    onClick={() => history.push(`/games/edit/${game.id}`)}
                                    >Edit Game</button> : ""}
                
                    <section key={`game--${game.id}`} className="game">
                        
                        <div className="game__players">Description: {game.description}</div>
                        <div className="game__designer">Maker: {game.designer}</div>
                        <div className="game__numberOfPlayers">Number of Players: {game.number_of_player}</div>
                        <div className="game__releaseYear">Release Year: {game.release_year}</div>
                        <div className="game__gameDuration">Game Duration (minutes): {game.game_duration}</div>
                        <div className="game__ageRange">Age Range: {game.age_range}</div>
                        <div className="game__ageRange">Average Rating: {game.average_rating}</div>
                        <div className="game__categories">Categories: {categories?.map(c => <li>{c.label}</li>)}</div>
                        
                        <div> <h3>Upload an image:</h3>
                            <input type="file" id="game_image" onChange={createGameImageString} />
                            <input type="hidden" name="game_id" value={game.id} />
                            <button onClick={(evt) => {
                                // Upload the stringified image that is stored in state
                                evt.preventDefault()

                                const image = {
                                    gameId: gameId,
                                    image: gameImage
                                }

                                createImage(image)
                            }}>Upload</button>
                        </div>

                        <div className="game__reviews"><h3>Reviews:</h3> 
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                history.push(`/games/review/${game.id}`)
                            }}
                            >Create Review</button>
                        {reviews?.map(r => <div className="game__review"><li>{r.review}</li>
                                     -{r.user.first_name}</div>)}</div>
                                     <div className="game__edit">
                        </div>
                        <div className="game__images"><h3>Images:</h3> 
                    
                        {images?.map(i => <div className="game__image"><img src={i.image} alt="game in action"/>
                                     -{i.user.first_name}</div>)}
                                     
                        </div>
                                    
                        

                    </section>
        </article>
</>
    )
}

