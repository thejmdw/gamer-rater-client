import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
// import { ProfileContext } from "../auth/ProfileProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { game, createGame, getGameCategories, gameCategories, getGameById, updateGame } = useContext(GameContext)
    // const { getProfile } = useContext(ProfileContext)

    const { gameId } = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        description: "",
        numberOfPlayers: 0,
        title: "",
        designer: "",
        categories: [],
        ageRange: 0,
        releaseYear: 0,
        gameDuration: 0 
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameCategories()
        
        // if (gameId) {
        //     getGameById(gameId)
        //      .then(game => setCurrentGame({
        //          skillLevel: game.skill_level,
        //          numberOfPlayers: game.number_of_players,
        //          title: game.title,
        //          maker: game.maker,
        //          gameTypeId: game.game_type.id
 
        //      }))
        //  }
    }, [])
    
    // useEffect(() => {
    //    if (gameId) {   
    //        getGameById(parseInt(gameId))
    //         .then(game => setCurrentGame({
    //             skillLevel: game.skill_level,
    //             numberOfPlayers: game.number_of_players,
    //             title: game.title,
    //             maker: game.maker,
    //             gameTypeId: game.game_type.id

    //         }))
    //     }
    // }, [gameId])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    // const changeGameMakerState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.maker = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGamePlayersState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.numberOfPlayers = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGameSkillLevelState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.skillLevel = event.target.value
    //     setCurrentGame(newGameState)
    // }

    const changeGameTypeState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.categories.push(parseInt(event.target.value))
        setCurrentGame(newGameState)
    }
    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            { gameId ? <h2 className="gameForm__title">Edit Game</h2> : <h2 className="gameForm__title">Register New Game</h2>}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Game Duration in minutes: </label>
                    <input type="number" name="gameDuration" required autoFocus className="form-control"
                        value={currentGame.gameDuration}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Release Year: </label>
                    <input type="number" name="releaseYear" required autoFocus className="form-control"
                        value={currentGame.releaseYear}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Age Range: </label>
                    <input type="number" name="ageRange" required autoFocus className="form-control"
                        value={currentGame.ageRange}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Category: </label>
                    <select name="categories" required className="form-control"
                        value={currentGame.categories}
                        onChange={changeGameTypeState}
                    >
                        <option key="0" value="0">Select Game Type</option>
                        {gameCategories.map(gt => (
                            <option key={gt} value={gt.id}>{gt.label}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
                              
            {/* You create the rest of the input fields for each game property */}
            { gameId ? <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: parseInt(gameId),
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    updateGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Update</button> 
             : <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        designer: currentGame.designer,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        releaseYear: parseInt(currentGame.releaseYear),
                        ageRange: parseInt(currentGame.ageRange),
                        categories: currentGame.categories,
                        description: currentGame.description,
                        gameDuration: parseInt(currentGame.gameDuration)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>}
        </form>
    )
}
