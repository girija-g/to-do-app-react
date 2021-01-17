import React, { useEffect, useState } from "react"
import db from "../firebase/Firebase"
import "./BucketList.css"
import { setSelectedBucket, setBucketsList } from "../actions"
import { connect } from "react-redux"

const BucketsList = (props) => {
  const [buckets, setBuckets] = useState([])
  const [selectedBucket, setSelectedBucket] = useState(undefined)

  useEffect(() => {
    if (selectedBucket !== undefined) {
      props.setSelectedBucket(selectedBucket)
    }
  }, [selectedBucket])

  useEffect(() => {
    db.collection("users")
      .doc(props.userDetails.userName)
      .collection("buckets")
      .orderBy("bucketId", "asc")
      .onSnapshot((snapshot) => {
        setBuckets(snapshot.docs.map((doc) => doc.data()))
      })
  }, [])

  useEffect(() => {
    if (buckets.length === 0) {
      db.collection("users")
        .doc(props.userDetails.userName)
        .collection("buckets")
        .doc("unlisted")
        .set({
          bucketName: "Unlisted",
          bucketId: "unlisted",
          details: "Unlisted Category"
        })
      return props.setBucketsList([
        { bucketName: "Unlisted", bucketId: "unlisted" }
      ])
    }

    props.setBucketsList(buckets)
    setSelectedBucket({ name: buckets[0].bucketName, id: buckets[0].bucketId })
  }, [buckets])

  return (
    <div className="ui link cards bucketslist" style={{ marginLeft: "15px" }}>
      {buckets.map(({ bucketName, details, bucketId }) => (
        <Bucket
          bucketName={bucketName}
          details={details}
          bucketId={bucketId}
          setSelectedBucket={setSelectedBucket}
        />
      ))}
    </div>
  )
}

const Bucket = ({ bucketName, details, bucketId, setSelectedBucket }) => {
  return (
    <div
      className="card"
      style={{ height: "280px" }}
      onClick={() => setSelectedBucket({ name: bucketName, id: bucketId })}
    >
      <div className="image" style={{ height: "200px" }}>
        <img src="/images/avatar2/large/molly.png" />
      </div>
      <div className="content">
        <div className="header">{bucketName}</div>
        <div className="description">
          Details: {details ? details : "No details available"}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails
  }
}

export default connect(mapStateToProps, { setSelectedBucket, setBucketsList })(
  BucketsList
)
