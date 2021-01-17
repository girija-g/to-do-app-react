import { useEffect, useState } from "react"
import db from "../firebase/Firebase"
import { connect } from "react-redux"
import { setSelectedBucket } from "../actions"

const AddToDo = (props) => {
  const [todo, setTodo] = useState("")
  const [bucketId, setBucketId] = useState(undefined)
  const [todoId, setTodoId] = useState(undefined)
  const [bucket, setBucket] = useState(undefined)

  useEffect(() => {
    db.collection("users")
      .doc(props.userName)
      .collection("buckets")
      .doc(bucketId)
      .collection("items")
      .orderBy("id", "desc")
      .onSnapshot((snapshot) => {
        setTodoId(snapshot.docs[0]?.data().id)
      })
  }, [])

  useEffect(() => {
    if (props && props.buckets !== undefined) {
      setBucketId(props?.buckets[0]?.bucketId)
      setBucket(props?.buckets[0]?.bucketName)
    }
  }, [props])

  const addTodo = () => {
    if (todo.trim() === "") {
      return window.alert("To-do item cannot be empty")
    }

    db.collection("users")
      .doc(props.userName)
      .collection("buckets")
      .doc(bucketId)
      .collection("items")
      .add({ item: todo, checked: false, id: todoId + 1 || 1 })
    props.setSelectedBucket({ name: bucket, id: bucketId })
    setTodo("")
  }

  const handleChange = (event) => {
    setBucketId(event.target.value.split("-")[0])
    setBucket(event.target.value.split("-")[1])
  }

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
              value={todo}
              onChange={(event) => setTodo(event.target.value)}
            />
          </div>
          <select
            style={{ width: "200px", marginTop: "10px" }}
            value={`${bucketId}-${bucket}`}
            onChange={(event) => handleChange(event)}
          >
            {props?.buckets?.map(({ bucketName, bucketId }) => (
              <option value={`${bucketId}-${bucketName}`}>{bucketName}</option>
            ))}
          </select>

          <div className="ui two buttons" style={{ marginTop: "20px" }}>
            <div
              className="ui button"
              style={{ backgroundColor: "#bae192", border: "1px solid black" }}
              onClick={() => setTodo("")}
            >
              Reset
            </div>
            <div
              className="ui button"
              style={{ backgroundColor: "#bae192", border: "1px solid black" }}
              onClick={() => addTodo()}
            >
              Add
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(null, { setSelectedBucket })(AddToDo)
