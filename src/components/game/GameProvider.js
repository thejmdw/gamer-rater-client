import React, { useState } from "react"


export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ game, setGame ] = useState({})
    const [ review, setReview ] = useState({})
    const [ rating, setRating ] = useState({})
    const [ image, setImage ] = useState({})
    const [ categories, setGameCategories ] = useState([])
    const [ reviews, setReviews ] = useState([])
    const [ images, setImages ] = useState([])

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
    
    const createImage = (image) => {
        return fetch("http://localhost:8000/images", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(image)
         })
            .then(setImage(image))
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
    
    const searchGames = (searchParams) => {
        return fetch(`http://localhost:8000/games?q=${searchParams}`, { 
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
    
    const getImagesByGameId = (gameId) => {
        return fetch(`http://localhost:8000/images?game=${gameId}`, { 
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setImages)
    }
 
    

    return (
        <GameContext.Provider value={{ games, game, categories, review, rating, reviews, image, images,
                                       getGames, createGame, createReview, createRating, createImage, searchGames,
                                       getGameCategories, updateGame, getGameById, getReviewsByGameId, getImagesByGameId }} >
            { props.children }
        </GameContext.Provider>

    )
}
