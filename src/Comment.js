import React, { Component } from "react";
import Observer from "@researchgate/react-intersection-observer";
import { connect } from "react-redux";

const styles = {
  commentContainer: {
    margin: 20,
    padding: 1,
    fontSize: 20,
    background: "white",
    borderRadius: 8,
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)"
  },
  comment: {
    background: "white",
    position: "sticky"
  },
  folded: {
    transform: "perspective(130px) rotateX(-17deg)",
    transformOrigin: "0 0",
    height: "290px"
  }
};

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    };
  }
  handleIntersection = event => {
    console.log(event.isIntersecting, this.props);
    // TODO: only make parent visible if it is first visible thing...?
  };
  bringIntoView = () => {
    // make stuff visible
  };
  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height });
  }
  render() {
    const { comment, commentId, isVisible, level } = this.props;
    const nestedComments = (comment.children || []).map(commentId => (
      <ConnectedComment
        key={commentId}
        commentId={commentId}
        level={(level || 0) + 1}
      />
    ));
    // need to diminish the height as the current deepest level gets reached
    // its like height * level 2 - currentLevel
    // can it conceivably be solved without current level?
    const topPosition = `${this.state.height * level}`;
    const zIndex = 100 - level;
    return (
      <div key={commentId} style={styles.commentContainer}>
        {isVisible}
        <Observer onChange={this.handleIntersection}>
          <div
            style={{
              ...styles.comment,
              zIndex: zIndex,
              top: `${topPosition}`
            }}
            dangerouslySetInnerHTML={{
              __html:
                comment.text +
                `top: ${topPosition}, zIndex: ${zIndex}, height: ${
                  this.state.height
                }`
            }}
            ref={divElement => (this.divElement = divElement)}
          />
        </Observer>
        {nestedComments}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    comment: state.comments[ownProps.commentId]
  };
};
const ConnectedComment = connect(mapStateToProps)(Comment);
export default ConnectedComment;
