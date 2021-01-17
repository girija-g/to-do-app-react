import React, { useState } from "react"

import "./MainComponent.css"
import TodoList from "./TodoList"
import BucketsList from "./BucketsList"
import SideBar from "./SideBar"

const MainComponent = () => {
  const [buckets, setBuckets] = useState(undefined)
  return (
    <div className="mainComponent">
      <SideBar />
      <TodoList />
      <BucketsList setBuckets={setBuckets} />
    </div>
  )
}

export default MainComponent
