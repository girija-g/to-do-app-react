import React from "react"
import "./SideBar.css"
import AddBucket from "./AddBucket"
import AddToDo from "./AddToDo"
import { connect } from "react-redux"

const SideBar = (props) => {
  return (
    <div className="sidebar">
      <AddToDo buckets={props.buckets} userName={props.userName} />
      <AddBucket userName={props.userName} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { buckets: state.buckets, userName: state.userDetails.userName }
}

export default connect(mapStateToProps)(SideBar)
