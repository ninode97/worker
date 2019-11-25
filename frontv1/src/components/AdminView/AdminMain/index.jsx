import React from "react";
import Title from "../../shared/Title";
import "./styles.css";
import moment from "moment";
import axios from "axios";
import PhotoRecord from "./PhotoRecord";
import LoadingSpin from "react-loading-spin";
import { connect } from "react-redux";
import { setError } from "../../../actions/errorActions";

import { sortPhotosById, transformPhotoObjects } from "../../../utils/photo";

function renderPhotoRecords(records, errorSubmiter) {
  if (records.length > 0) {
    return records.map((record, index) => (
      <PhotoRecord
        key={`PhotoRecord-${index}`}
        record={record}
        actions={{ errorSubmiter }}
      />
    ));
  } else {
    return <div>There are currently no records!</div>;
  }
}

function renderOptions(users) {
  return users.map((user, index) => (
    <option key={`option-${user}`} value={user}>
      {user}
    </option>
  ));
}

function intervalComponent(type) {
  switch (type) {
    case "daily": {
      break;
    }
    case "monthly": {
      break;
    }
    case "yearly": {
      break;
    }
    default: {
      break;
    }
  }
}

const AdminMain = props => {
  const [hasError, setErrors] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [photos, setPhotos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format("YYYY-MM-DD")
  );

  React.useEffect(() => {
    axios
      .get(`https://workero.site/api/users`)
      .then(res => {
        if (res.status === 200) {
          setUsers(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const userPhotosEndpoint = `https://workero.site/api/photos/${selectedUser}/${selectedDate}`;

    if (selectedUser && selectedDate) {
      console.log(`GET => ${userPhotosEndpoint}`);
      setIsLoading(true);
      axios
        .get(userPhotosEndpoint)
        .then(res => {
          console.log(res);
          return Promise.all(transformPhotoObjects(res.data));
        })
        .then(photos => {
          console.log(photos);
          setIsLoading(false);
          const sortedPhotos = sortPhotosById(photos);

          setPhotos(sortedPhotos);
        })
        .catch(err => {
          setIsLoading(false);
        });
    }
  }, [selectedDate, selectedUser]);

  console.log(photos);
  const date = new Date();
  return (
    <div className="user-main__contents" style={styles.container}>
      <Title title="Photos" />
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "1rem",
          justifyContent: "space-evenly",
          background: "gainsboro"
        }}
      >
        <select
          onChange={e => setSelectedUser(e.target.value)}
          className="user-select-dropdown"
          defaultValue="0"
        >
          <option value="0" disabled defaultValue>
            Select worker
          </option>
          {renderOptions(users)}
        </select>
        <div>
          <input
            onChange={e => setSelectedDate(e.target.value)}
            type="date"
            defaultValue={selectedDate}
          />
        </div>
      </div>
      <div style={styles.photoContainer}>
        {isLoading ? (
          <React.Fragment>
            <div style={styles.loader} className="loader">
              <LoadingSpin style={styles.loader} size="100px" />
              <span style={{ paddingTop: "3rem" }}>Loading...</span>
            </div>
          </React.Fragment>
        ) : (
          renderPhotoRecords(photos, props.setError)
        )}
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  photoContainer: {
    height: "450px",
    overflowY: "scroll",
    background: "#FAFAFA"
  },
  loader: {
    paddingTop: "5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center"
  }
};

const mapStateToProps = state => ({
  error: state.errorReducer
});

export default connect(mapStateToProps, { setError })(AdminMain);
