import React, { useState } from "react"


export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ game, setGame ] = useState({})
    const [ review, setReview ] = useState({})
    const [ rating, setRating ] = useState({})
    const [ gameCategories, setGameCategories ] = useState([])
    const [ reviews, setReviews ] = useState([])

    const createGame = (game) => {
        return fetch("http://localhost:8000/games", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(game)
         })
            .then(setGame(game))
            // .then()
    }

    const createReview = (review) => {
        return fetch("http://localhost:8000/reviews", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(review)
         })
            .then(setReview(review))
            // .then()
    }
    
    const createRating = (rating) => {
        return fetch("http://localhost:8000/ratings", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(rating)
         })
            .then(setRating(rating))
            // .then()
    }

    const updateGame = (game) => {
        return fetch(`http://localhost:8000/games/${game.id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(game)
         })
            .then(setGame(game))
            // .then()
    }
    
    const getGameById = (id) => {
        return fetch(`http://localhost:8000/games/${id}`, { 
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            // .then(setGame)
    }

    const getGames = () => {
        return fetch("http://localhost:8000/games", { 
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }
    
    const getGameCategories = () => {
        return fetch("http://localhost:8000/categories", { 
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGameCategories)
    }
    
    const getReviewsByGameId = (gameId) => {
        return fetch(`http://localhost:8000/reviews?game=${gameId}`, { 
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setReviews)
    }
 
    

    return (
        <GameContext.Provider value={{ games, game, gameCategories, review, rating, reviews,
                                       getGames, createGame, createReview, createRating, 
                                       getGameCategories, updateGame, getGameById, getReviewsByGameId }} >
            { props.children }
        </GameContext.Provider>

    )
}
