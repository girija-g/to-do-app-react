import { SET_USER_DETAILS, SET_SELECTED_BUCKET, SET_BUCKETS } from "../actions"

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return { ...state, userDetails: action.payload }

    case SET_SELECTED_BUCKET:
      return { ...state, selectedBucket: action.payload }

    case SET_BUCKETS:
      return { ...state, buckets: action.payload }

    default:
      return state
  }
}

export default rootReducer
