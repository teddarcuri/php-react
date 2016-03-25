// React 
import React from 'react';
import ReactDOM from 'react-dom';

// 3rd party
import axios from 'axios';
import gravatar from 'gravatar';
import Radium from 'radium';
import {TransitionMotion, Motion, spring} from 'react-motion';

/*
	Users State Container
*/

// Collect User State from PHP then render out corresponding interface
class UserContainer extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			type: this.props.type,
			users: [],
			currentUser: {}
		}
	}

	componentDidMount() {
		// gets the users from the global variable
		this.getUsers();
	}

	getUsers() {

 	// Set the response data as React state
 	this.setState({users: usersArr});
 	console.log(this.state.users);
			 
	}

	setCurrentUser(key) {
		var user = this.state.users[key];
		this.setState({currentUser: user});
	}

	switchType() {
		if (this.state.type == "BUBBLES") {
			this.setState({type: "STACK"});
		} else {
			this.setState({type: "BUBBLES"})
		}
	}

	render() {
		var typeSwitchTxt = this.state.type == "STACK" ? "Bubbles" : "Stacks";
		return (
			<div style={this.getStyles()}>
				<h1 style={this.getHeaderStyles()}>
					{this.props.appTitle}
					<TypeSwitch
						switch={this.switchType.bind(this)}>
						{typeSwitchTxt}
					</TypeSwitch>
				</h1>
				{this.renderUsers()}
				{this.renderCurrentUserDescription()}
				<a style={this.getViewAPILinkStyles()} href="/users.php">API</a>
			</div>
		)
	}

	getStyles() {
		return {
			flex: "2 1 100%",
			maxWidth: 700,
			display: "block",
			position: "relative",
			boxShadow: "0px 0px 9px rgba(0,0,0,0.17)"
		}
	}

	getHeaderStyles() {
		return {
			textAlign: "center",
			color: "#ccc",
			width: "100%",
			display: "block",
			background: "#222",
			margin: 0,
			padding: 40,
			textTransform: "uppercase",
			letterSpacing: 5,
			fontSize: "0.8em",
			position: "relative"
		}
	}

	getViewAPILinkStyles() {
		return {
			textAlign: "center",
			color: "#888",
			position: "absolute",
			bottom: -50, right: 0,
			border: "solid 2px #333",
			padding: "5px 12px",
			fontSize: "0.6em",
			textDecoration: "none"
		}
	}

	renderUsers() {
		switch (this.state.type) {
		  case "BUBBLES":
		  	return this.renderBubbles();
		    break;
		  case "STACK":
		  	return this.renderStack();
		    break;
		  default:
		  	return this.renderStack();
		    break;
		}
	}

	renderBubbles() {
		return <UserBubbles users={this.state.users} setCurrentUser={this.setCurrentUser.bind(this)}></UserBubbles>
	}

	renderStack() {
		return <UserStacks users={this.state.users} setCurrentUser={this.setCurrentUser.bind(this)}></UserStacks>		
	}

	renderCurrentUserDescription() {
		if (this.state.currentUser && this.state.type == "BUBBLES") {
			return (
				<div style={{
						background: "whitesmoke",
						padding: "20px",
						margin: 0,
						textAlign: "center",
						color: "#333"
					}}>
				{
					this.state.users.map((u, i) => {
						if (u.name == this.state.currentUser.name ) {
							return (
								<UserDescription user={u}>
								</UserDescription>
							)
						}
					})
				}
				</div>
			)
		}
	}
}

// Type Switch
let TypeSwitch = (props) => (
	<p style={{
			background: "#444",
			padding: 10,
			position: "absolute",
			top: 10, right: 20,
			fontSize: "7px",
			cursor: "pointer",
			":hover" : {
				background: "#000"
			}
		}}
		onClick={props.switch.bind(this)}>
		{props.children}
	</p>
)

/*
	Users interfaces
*/

// Bubbles
class UserBubbles extends React.Component{
	render() {
		var users = this.props.users;
		return (
			<ul style={this.getStyles()}>
				{users.map((u, i)=> {
					return (
						<Motion 
							defaultStyle={{
								y: 30, 
								o: 0
							}} 
							style={{
								y: spring(0, {stiffness: 150, damping: 7}), 
								o: spring(1, {stiffness: 20, damping: 10})
							}}>
							{value => <UserBubble user={u} id={i} motion={value} key={i} setCurrentUser={this.props.setCurrentUser}></UserBubble>}
						</Motion>
					) 
			  })}	
			</ul>

		)
	}
	getStyles() {
		return {
			background: "linear-gradient(#fff 66%, #eee 100%)",
			padding: 0,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-around",
			width: "100%"
		}
	}
}

let UserBubble = (props) => (
	<li style={{
			textAlign: "center", 
			padding: "30px 20px",
			cursor: "pointer",
			transform: "translateY(" + props.motion.y + "px)",
			":hover" : {
				background: "rgba(0,0,0,0.05)"
			}
		}}
	    onClick={props.setCurrentUser.bind(this, props.id)}>
		<img src={gravatar.url(props.user.email, {s: '90', r: 'x', d: 'retro'})} 
			 style={{
				borderRadius: "50%"
			 }}
			 alt=""/>
		<span 
			style={{
				display: "block",
				margin: "10px 0px",
				textTransform: "uppercase",
				fontSize: "0.9em",
				letterSpacing: 2,
				color: "#666"
			}}>
			{props.user.name}
		</span>
	</li>
)

// Stacks
class UserStacks extends React.Component{
	render() {
		var users = this.props.users;
		return (
			<ul style={this.getStyles()}>
			  {users.map((u, i)=> {
					return (
						<Motion 
							defaultStyle={{
								y: 30, 
								o: 0
							}} 
							style={{
								y: spring(0, {stiffness: 100, damping: 50}), 
								o: spring(1, {stiffness: 20, damping: 10})
							}}>
							{value => <UserStack user={u} id={i} motion={value} key={i} setCurrentUser={this.props.setCurrentUser}></UserStack>}
						</Motion>
					) 
			  })}	
			</ul>
		)
	}
	getStyles() {
		return {
			background: "linear-gradient(#fff 66%, #eee 100%)",
			padding: 20,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexFlow: "row wrap"
		}
	}
}

const UserStack = (props) => (
	<li onClick={props.setCurrentUser.bind(this, props.id)}
		style={{
			width: "100%",
			flex: "2 0 100%",
			padding: "0px",
			borderBottom: "solid 1px #eee",
			marginBottom: 10,
			padding: 4,
			opacity: props.motion.o,
			transform: "translateX(" + props.motion.y + "px)"
		}}>
		<div style={{display: "flex"}}>
			<img src={gravatar.url(props.user.email, {s: '100', r: 'x', d: 'retro'})} 
				alt=""
				style={{
					verticalAlign: "middle",
					flex: "1 0 auto",
					width: 40, 
					height: 40,
					borderRadius: "50%"
				}}/>
			<h2 style={{
					padding: "0px 20px", 
					color: "#555",
					//textTransform: "uppercase",
					fontSize: "0.66em",
					letterSpacing: 5
				}}>
				{props.user.name}
			</h2>

			<span style={{
					color: "steelblue", 
					flex: "1 1 100%", 
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "0.7em"
				}}>
				{props.user.email}
			</span>

			<p style={{
					color: "#999", 
					flex: "1 1 100%", 
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "0.8em"
				}}>
				{props.user.description}
			</p>
		</div>
	</li>
)

// Description
const UserDescription = (props) => (
	<Motion 
		defaultStyle={{
			x: 30,
			o: 0 
		}} 
		style={{
			x: spring(0, {stiffness: 44, damping: 15}),
			o: spring(1, {stiffness: 44, damping: 15})
		}}
		willLeave={{
			x: 100
		}}>
		{value => 
			<div style={{transform: "translateY(" +  value.x + "px)", opacity: value.o, zIndex: -1}}>
				<h2 style={{
						padding: "20px 0px 10px 0px",
						margin: 0,
						textAlign: "center",
						fontSize: "2.5em",
						color: "#333"
					}}>
					{props.user.name}
				</h2>
				<h4 style={{
						padding: 0,
						margin: 0,
						textAlign: "center",
						fontSize: "0.8em",
						color: "steelblue"
					}}>
					{props.user.email}
				</h4>
				<p style={{
						padding: 40,
						margin: 0,
						textAlign: "center",
						fontSize: "2em",
						color: "#666"
					}}>
					{props.user.description}
				</p>
			</div>
		}
	</Motion>
)


// Pass through Radium for :hover and stuff
TypeSwitch = Radium(TypeSwitch);
UserBubble = Radium(UserBubble);

/*
	Render the app
*/

// Render the User Containers
class App extends React.Component{
	render() {
		return (
			<div id="app"
				 style={{
				 	position: "absolute",
				 	width: "100%",
				 	height: "100%",
				 	display: "flex",
				 	paddingTop: 100,
					alignItems: "flex-start",
					justifyContent: "center",
					flexFlow: "row wrap"
				 }}>
				<UserContainer
					appTitle={appTitle}
					type="STACK">
				</UserContainer>
			</div>
		)
	}
}

ReactDOM.render(
	<App></App>,
	document.getElementById('app')
);
