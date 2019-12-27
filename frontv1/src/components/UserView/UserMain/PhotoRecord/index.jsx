import React from "react";
import FlexColumn from "../../../shared/FlexColumn";
import "./styles.css";
import axios from "axios";
import { formatMessage } from "../../../../utils/utils";
import moment from 'moment';

function renderComments(comments) {
  return comments.map((comment, index) => (
    <div key={`comment-${index}`} className="comment">
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          padding: ".5rem 2rem .5rem 2rem"
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <div
            style={{
              fontWeight: 800,
              fontSize: "1.5rem"
            }}
          >
            @{comment.user.username}
          </div>

          <span style={{ fontSize: "1.6rem", marginLeft: "1.1rem" }}>
            {comment.message}
          </span>
        </div>
        <div style={{ fontSize: ".9rem", textAlign: "right" }}>
          {moment(new Date(comment.addedAt)).format('YYYY/MM/DD HH:mm:ss')}
        </div>
      </div>
    </div>
  ));
}

function handleSubmit(e, props) {
  e.preventDefault();
  const { id, username, commentContent, setCommentContent, setMessage } = props;
  if (id && username && commentContent) {
    axios
      .post("https://workero.site/api/photo-comments", {
        username,
        comment: commentContent,
        photoId: id
      })
      .then(res => {
        alert("Successfully Added!");
        // setMessage({ type: 'success', message: 'Successfully Added!' });
        console.log(res);
        window.location.reload();
      })
      .catch(err => {

        // setMessage({ type: 'error', message: err })
        alert(`Error occurred, ${JSON.stringify(err)}`);
        window.location.reload();
      });
  } else {
    alert("error!");

  }
}

const PhotoRecord = props => {
  const [commentContent, setCommentContent] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const {
    id,
    username,
    addedAt,
    links,
    country,
    city,
    photoComments
  } = props.record;

  console.log(props.record);
  return (
    <div style={styles.mainContainer} className="photo-record">
      <FlexColumn>
        <FlexColumn style={{ padding: "1.5rem" }}>
          <div style={styles.flexRow}>
            <div style={styles.username}>@{username}</div>
            <span style={styles.date}>{addedAt}</span>
          </div>
          <div style={styles.location}>
            {/* {country} , {city} */ `Norway , Oslo`}
          </div>
        </FlexColumn>

        <hr />
        <div style={styles.imageContainer}>
          <img style={styles.image} src={links.thumb} />
        </div>
        <div className="photo-comments">{renderComments(photoComments)}</div>
        <div
          style={{
            padding: "1.5rem"
          }}
          className="add-comment"
        ></div>
        {formatMessage(message)}
        <form
          className="form-submit"
          onSubmit={e =>
            handleSubmit(e, {
              id,
              username,
              commentContent,
              setCommentContent,
              setMessage
            })
          }
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              justifyItems: "center",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <textarea
              onChange={e => setCommentContent(e.target.value)}
              className="comment-box"
              placeholder="Add a comment..."
              style={{
                width: "90%",
                resize: "none",
                height: 50,
                border: "1px solid gainsboro",
                borderRadius: "1rem"
              }}
            ></textarea>
          </div>

          <button
            style={{
              margin: "1rem",
              padding: "1.5rem",

              border: "1px solid gainsboro",
              borderRadius: "1rem 1rem"
            }}
            type="submit"
          >
            Add Comment
          </button>

          <a
            style={{
              cursor: "pointer",
              margin: "1rem",
              padding: "1.5rem",
              backgroundColor: "dodgerblue",
              color: "white",
              border: "1px solid gainsboro",
              borderRadius: "1rem 1rem"
            }}
            href={props.record.links.image}
            download
          // onClick={() => downloadFile(props.record)}
          >
            Download
          </a>
        </form>
      </FlexColumn>
    </div>
  );
};

const styles = {
  mainContainer: {
    marginBottom: "1.5rem",
    border: "1px solid gainsboro"
  },
  username: {
    fontWeight: 550,
    fontSize: "1.4rem"
  },
  date: {
    fontSize: "1.1rem"
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  imageContainer: {
    width: "auto",
    height: "auto"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  location: {
    fontSize: "1.3rem",
    alignSelf: "flex-start",
    paddingLeft: "1rem"
  }
};
export default PhotoRecord;
