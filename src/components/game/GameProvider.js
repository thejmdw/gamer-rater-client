import React, { useState } from "react"


export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ game, setGame ] = useState({})
    const [ gameCategories, setGameCategories ] = useState([])

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
 
    

    return (
        <GameContext.Provider value={{ games, game, gameCategories, getGames, createGame, getGameCategories, updateGame, getGameById }} >
            { props.children }
        </GameContext.Provider>

    )
}
