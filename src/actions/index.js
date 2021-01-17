export const SET_USER_DETAILS = "SET_USER_DETAILS"
export const SET_SELECTED_BUCKET = "SET_SELECTED_BUCKET"
export const SET_BUCKETS = "SET_BUCKETS"

export const setUserDetails = (userName, firstName, lastName) => {
  return {
    type: SET_USER_DETAILS,
    payload: {
      userName,
      firstName,
      lastName
    }
  }
}

export const setSelectedBucket = (selectedBucket) => {
  return {
    type: SET_SELECTED_BUCKET,
    payload: {
      name: selectedBucket.name,
      id: selectedBucket.id
    }
  }
}

export const setBucketsList = (buckets) => {
  return {
    type: SET_BUCKETS,
    payload: buckets
  }
}
