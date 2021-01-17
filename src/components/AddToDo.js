import React, { useEffect, useState } from "react"
import db from "../firebase/Firebase"
import { connect } from "react-redux"
import { setSelectedBucket } from "../actions"

class AddToDo extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      todo: "",
      bucketId: undefined,
      todoId: undefined,
      bucket: undefined
    }

    this.addTodo = this.addTodo.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    db.collection("users")
      .doc(this.props.userName)
      .collection("buckets")
      .doc(this.state.bucketId)
      .collection("items")
      .orderBy("id", "desc")
      .onSnapshot((snapshot) => {
        this.setState({ todo: snapshot.docs[0]?.data().id })
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.buckets !== prevProps.buckets) {
      console.log("updated")
      this.setState({
        bucketId: this.props?.buckets[0]?.bucketId,
        bucket: this.props?.buckets[0]?.bucketName
      })
    }
  }

  addTodo() {
    if (this.state.todo.trim() === "") {
      return window.alert("To-do item cannot be empty")
    }

    db.collection("users")
      .doc(this.props.userName)
      .collection("buckets")
      .doc(this.state.bucketId)
      .collection("items")
      .add({
        item: this.state.todo,
        checked: false,
        id: this.state.todoId + 1 || 1
      })
    this.props.setSelectedBucket({
      name: this.state.bucket,
      id: this.state.bucketId
    })
    this.setState({ todo: "" })
  }

  handleChange(event) {
    this.setState({
      bucketId: event.target.value.split("-")[0],
      bucket: event.target.value.split("-")[1]
    })
  }
  render() {
    return (
      <div className="ui cards">
        <div
          className="card"
          style={{
            backgroundColor: "#699C36",
            height: "150px",
            marginTop: "50px",
            marginLeft: "20px"
          }}
        >
          <div className="content">
            <div className="ui large input">
              <input
                type="text"
                placeholder="Add a To-Do"
                value={this.state.todo}
                onChange={(event) =>
                  this.setState({ todo: event.target.value })
                }
              />
            </div>
            <select
              style={{ width: "200px", marginTop: "10px" }}
              value={`${this.state.bucketId}-${this.state.bucket}`}
              onChange={(event) => this.handleChange(event)}
            >
              {this.props?.buckets?.map(({ bucketName, bucketId }) => (
                <option value={`${bucketId}-${bucketName}`}>
                  {bucketName}
                </option>
              ))}
            </select>

            <div className="ui two buttons" style={{ marginTop: "20px" }}>
              <div
                className="ui button"
                style={{
                  backgroundColor: "#bae192",
                  border: "1px solid black"
                }}
                onClick={() => this.setState({ todo: "" })}
              >
                Reset
              </div>
              <div
                className="ui button"
                style={{
                  backgroundColor: "#bae192",
                  border: "1px solid black"
                }}
                onClick={() => this.addTodo()}
              >
                Add
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { setSelectedBucket })(AddToDo)
