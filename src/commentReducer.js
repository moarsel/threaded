// import { createSelector } from "reselect";
import { comments } from "./commentsFile";

export const INCREMENT_REQUESTED = "counter/INCREMENT_REQUESTED";

const initialState = {
  comments: comments
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      };

    default:
      return state;
  }
};

export const markVisibility = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    });
  };
};

const commentsSelector = state => state.comments;

// const currentCommentSelector = createSelector(
//   commentsSelector,
//   (comments, props) => {
//     const isCurrentComment = comments.filter(comment.id === props.id);
//     if (isCurrentComment.length > 0) {
//       return isCurrentComment;
//     } else {
//     }
//   }
// );
