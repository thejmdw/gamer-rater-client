import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameForm } from "./game/GameForm.js"
import { GameProvider } from "./game/GameProvider.js"
import { GameDetails } from "./game/GameDetails.js"
// import { EventList } from "./game/EventList.js"
import { ReviewForm } from "./game/ReviewForm.js"
// import { EventProvider } from "./game/EventProvider.js"
import { ProfileProvider } from "./auth/ProfileProvider"
import { Profile } from "./auth/Profile"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}> 
            <ProfileProvider>
            {/* <EventProvider> */}
            <GameProvider>
                <Route exact path="/games">
                    <GameList />
                </Route>
                <Route exact path="/games/details/:gameId(\d+)">
                    <GameDetails />
                </Route> 
                <Route exact path="/games/new">
                    <GameForm />
                </Route>
                
                <Route exact path="/games/review/:gameId(\d+)">
                    <ReviewForm />
                </Route>


                {/* <Route exact path="/events">
                    <EventList />
                </Route>
                <Route exact path="/events/new">
                    <EventForm />
                </Route> */}


                <Route exact path="/profile">
                    <Profile />
                </Route>

            </GameProvider>
            {/* </EventProvider> */}
            </ProfileProvider>
        </main>
    </>
}
