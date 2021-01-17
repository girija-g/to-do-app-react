import { useEffect, useState } from "react"
import "./App.css"
//import Sidebar from "./components/SideBar"
import MainComponent from "./components/MainComponent"
import Login from "./components/Login"
import { connect } from "react-redux"

const App = (props) => {
  return (
    <div>
      {(props.userDetails && props.userDetails.userName) !== undefined ? (
        <MainComponent />
      ) : (
        <Login />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { userDetails: state.userDetails }
}

export default connect(mapStateToProps)(App)
