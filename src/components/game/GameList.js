import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
// import { EventContext } from "./EventProvider.js"
import { useHistory, Link } from "react-router-dom"

export const GameList = () => {
    const history = useHistory()
    const { games, getGames } = useContext(GameContext)
    // const { events, getEvents } = useContext(EventContext)

    

    useEffect(() => {
        getGames()
        // getEvents()
    }, [])

    return (
        <>
        <article className="games">
        <header className="events__header">
                <h1>Gamer Rater Games</h1>
            </header>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <Link className="game__title" to={`/games/details/${game.id}`}>{game.title}</Link>
                        {/* <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <h4>Upcoming Events</h4>
                        {
                            events.filter(e => e.game.id === game.id)
                                .map(e => {
                                    return <div key={`gameEvent--${e.id}`}>
                                        {e.date} @ {e.time}
                                    </div>
                                })
                        }
                        <div className="game__edit">
                        <button className="btn btn-3"
                                    onClick={() => history.push(`games/edit/${game.id}`)}
                                    >Edit Game</button>
                        </div> */}
                    </section>
                })
            }
        </article>

        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
            history.push("/games/new")
        }}
        >Register New Game</button>
</>
    )
}

