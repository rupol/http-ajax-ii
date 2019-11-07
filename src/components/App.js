import "./App.css"
import React from "react"
import { Link, Route, withRouter } from "react-router-dom"
import { getToken } from "../utils/api"
import ProtectedRoute from "./ProtectedRoute"
import Home from "./Home"
import Signin from "./Signin"
import Account from "./Account"
import Logout from "./Logout"
import Users from "./Users"
import UserUpdate from "./UserUpdate"

function App() {
	const signedIn = getToken()

	return (
		<div className="wrapper">
			<nav>
				<Link to="/">Home</Link>

				{/* We can conditionally show links if logged in or not */}
				{!signedIn && <Link to="/signin">Sign In</Link>}
				{signedIn && <Link to="/users">Users</Link>}
				{signedIn && <Link to="/account">My Account</Link>}
				{signedIn && <Link to="/logout">Logout</Link>}
			</nav>

			<Route exact path="/" component={Home} />
			<Route exact path="/signin" component={Signin} />
			{/* These routes will require an auth token to be set, due to our handy HOC */}
			<ProtectedRoute exact path="/users" component={Users} />
			<ProtectedRoute exact path="/users/:id" component={UserUpdate} />
			<ProtectedRoute exact path="/account" component={Account} />
			<ProtectedRoute exact path="/logout" component={Logout} />
		</div>
	)
}

export default withRouter(App)
