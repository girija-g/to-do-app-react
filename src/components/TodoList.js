import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import db from "../firebase/Firebase"

import "./TodoList.css"

const TodoList = (props) => {
  const [list, setList] = useState([])
  const [showContent, setShowContent] = useState(undefined)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState("")

  const renderContent = (list, userName) => {
    return list.map((item) => (
      <ListItem
        item={item}
        bucketId={props.selectedBucket.id}
        id={item.id}
        userName={userName}
        key={item.id}
      />
    ))
  }

  const deleteBucket = () => {
    const confirmation = window.confirm(
      "All the to-dos in this category will be deleted. Are you sure you want to delete this category?"
    )

    if (confirmation === true) {
      db.collection("users")
        .doc(props.userDetails.userName)
        .collection("buckets")
        .doc(props.selectedBucket.id)
        .delete()
    }
  }

  useEffect(() => {
    if (!props.selectedBucket) {
      return
    }
    db.collection("users")
      .doc(props.userDetails.userName)
      .collection("buckets")
      .doc(props.selectedBucket.id)
      .collection("items")
      .onSnapshot((snapshot) => {
        setList(
          snapshot.docs.map((doc) => {
            return {
              item: doc.data().item,
              id: doc.id,
              checked: doc.data().checked
            }
          })
        )
      })
  }, [props.selectedBucket])

  const updateBucket = () => {
    db.collection("users")
      .doc(props.userDetails.userName)
      .collection("buckets")
      .doc(props.selectedBucket.id)
      .update({
        bucketName: title
      })

    setEditing(false)
  }

  useEffect(() => {
    setTitle(props?.selectedBucket?.name)
  }, [props?.selectedBucket?.name])

  return (
    <div className="todolist">
      {editing ? (
        <div>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <i class="check icon big" onClick={() => updateBucket()}></i>
        </div>
      ) : (
        <h2>{title}</h2>
      )}

      <hr />
      <div className="todolist__header">
        <button onClick={() => setEditing(true)}>Edit Bucket Details</button>
        <button onClick={() => deleteBucket()}>Delete Bucket</button>
      </div>
      <AddTodo
        id={props?.selectedBucket?.id}
        userName={props?.userDetails.userName}
      />
      {list.length > 0 ? (
        renderContent(list, props.userDetails.userName)
      ) : (
        <div>No todo item added.</div>
      )}
    </div>
  )
}

const ListItem = ({ item, bucketId, id, userName }) => {
  const [checked, setChecked] = useState(item.checked)
  const handleChange = () => {
    db.collection("users")
      .doc(userName)
      .collection("buckets")
      .doc(bucketId)
      .collection("items")
      .doc(id.toString())
      .set({
        item: item.item,
        checked: !checked,
        id: id
      })
      .then((res) => {
        setChecked(!checked)
      })
  }

  return (
    <div style={{ margin: "10px", fontSize: "20px", fontStyle: "italic" }}>
      <span>
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => handleChange(event)}
        />
      </span>
      <span
        style={
          checked
            ? { textDecoration: " line-through", marginLeft: "10px" }
            : { marginLeft: "10px" }
        }
      >
        {item.item}
      </span>
    </div>
  )
}

const AddTodo = ({ id, userName }) => {
  const [todo, setTodo] = useState("")
  const [todoId, setTodoId] = useState(undefined)

  useEffect(() => {
    db.collection("users")
      .doc(userName)
      .collection("buckets")
      .doc(id)
      .collection("items")
      .orderBy("id", "desc")
      .onSnapshot((snapshot) => {
        setTodoId(snapshot.docs[0]?.data().id)
      })
  }, [])

  const addTodo = () => {
    if (todo.trim() === "") {
      return window.alert("To-do item cannot be empty")
    }

    db.collection("users")
      .doc(userName)
      .collection("buckets")
      .doc(id)
      .collection("items")
      .add({ item: todo, checked: false, id: todoId + 1 || 1 })
    setTodo("")
  }

  const keyDownCallback = (event) => {
    if (event.key === "Enter") {
      addTodo()
    }
  }
  return (
    <div className="shareContent">
      <span>
        <input
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
          id="todoinput"
          onKeyDown={(event) => keyDownCallback(event)}
        />
      </span>
      <span>
        <button onClick={() => addTodo()}>Add to-do</button>
      </span>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedBucket: state.selectedBucket,
    userDetails: state.userDetails
  }
}

export default connect(mapStateToProps)(TodoList)
