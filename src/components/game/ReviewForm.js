import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
// import { ProfileContext } from "../auth/ProfileProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const ReviewForm = () => {
    const history = useHistory()
    const { createReview, createRating } = useContext(GameContext)
    // const { getProfile } = useContext(ProfileContext)

    const { gameId } = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [ currentReview, setCurrentReview] = useState({
        review: "",
        gameId: parseInt(gameId)
    })
    const [ currentRating, setCurrentRating ] = useState({
        gameId: parseInt(gameId),
        rating: 5
    })
    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    
    const changeReviewState = (event) => {
        const newReview = { ...currentReview }
        newReview[event.target.name] = event.target.value
        setCurrentReview(newReview)
    }

    const changeRatingState = (event) => {
        const newRatingState = { ...currentRating }
        newRatingState.rating = parseInt(event.target.value)
        setCurrentRating(newRatingState)
    }
    // const changeGameTypeState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.categories.push(parseInt(event.target.value))
    //     setCurrentGame(newGameState)
    // }
    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            { gameId ? <h2 className="gameForm__title">Review Game</h2> : <h2 className="gameForm__title">Register New Game</h2>}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Review: </label>
                    <input type="text" name="review" required autoFocus className="form-control"
                        value={currentReview.review}
                        onChange={changeReviewState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Rating: {currentRating.rating}/10 </label>
                    <div class="slidecontainer">
                            <input name="rating" type="range" min="1" max="10" value={currentRating.rating} class="slider"
                            id="myRange" onChange={changeRatingState}/>
                    </div>
                </div>    
            </fieldset>               
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const review = {
                        gameId: parseInt(gameId),
                        review: currentReview.review
                    }
                    const rating = {
                        gameId: parseInt(gameId),
                        rating: currentRating.rating
                    }

                    // Send POST request to your API
                    createReview(review)
                    .then(createRating(rating))
                        .then(() => history.push(`/games/details/${parseInt(gameId)}`))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
