import React, { useState } from "react"
import db from "../firebase/Firebase"

const AddBucket = ({ userName }) => {
  const [category, setCategory] = useState("")
  const [details, setDetails] = useState("")

  const createCategory = () => {
    if (category.trim() === "") {
      return window.alert("Category name cannot be empty")
    }

    db.collection("users")
      .doc(userName)
      .collection("buckets")
      .doc(category.toLowerCase().replace(" ", "_"))
      .set({
        bucketId: category.toLowerCase().replace(" ", "_"),
        bucketName: category,
        details: details
      })

    window.alert("Category added")
    setCategory("")
    setDetails("")
  }
  return (
    <div
      className="card"
      style={{
        backgroundColor: "#699C36",
        height: "230px",
        marginTop: "50px",
        marginLeft: "20px"
      }}
    >
      <div className="content">
        <div
          className="ui large"
          style={{
            marginLeft: "20px",
            marginBottom: "10px"
          }}
        >
          <h4 style={{ paddingTop: "10px" }}>Create Category</h4>
        </div>
        <div className="ui input" style={{ marginLeft: "20px" }}>
          <input
            type="text"
            value={category}
            placeholder="Type Category Name"
            onChange={(event) => setCategory(event.target.value)}
          />
        </div>
        <div style={{ marginLeft: "20px", marginTop: "10px" }}>
          <label>Category Details:(optional)</label>
          <textarea
            type="text"
            rows="3"
            columns="200"
            style={{ resize: "none", marginLeft: "10px" }}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
          />
        </div>

        <div className="ui two buttons" style={{ marginTop: "10px" }}>
          <div
            className="ui button"
            onClick={() => createCategory()}
            style={{
              backgroundColor: "#bae192",
              border: "1px solid black",
              marginRight: "20px",
              marginLeft: "20px"
            }}
          >
            Add
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBucket
