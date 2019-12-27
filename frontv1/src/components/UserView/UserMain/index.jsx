import React from "react";
import Title from "../../shared/Title";
import "./styles.css";
import moment from "moment";
import axios from "axios";
import PhotoRecord from "./PhotoRecord";
import LoadingSpin from "react-loading-spin";

function renderPhotoRecords(records) {
  if (records.length > 0) {
    return records.map((record, index) => (
      <PhotoRecord key={`PhotoRecord-${index}`} record={record} />
    ));
  } else {
    return <div>There are currently no records!</div>;
  }
}

const UserMain = () => {
  const [error, setError] = React.useState(false);
  const [photos, setPhotos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format("YYYY-MM-DD")
  );

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://workero.site/api/photos/${selectedDate}`)
      .then(res => {
        return Promise.all(
          res.data.map(async photo =>
            axios.get(photo.links.thumb).then(res => {
              photo.links.thumb = res.config.url;
              console.log(photo);
              return photo;
            })
          )
        );
      })
      .then(res => {
        const sorted = res.sort(function(a, b) {
          return b.id - a.id;
        });

        setPhotos(sorted);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setPhotos([]);
        setError("Failed to connect server..");
      });
  }, [selectedDate]);

  const date = new Date();
  return (
    <div className="user-main__contents" style={styles.container}>
      <Title title="UserMenu" />
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "1rem",
          justifyContent: "center",
          background: "gainsboro"
        }}
      >
        <div>
          <input
            onChange={e => setSelectedDate(e.target.value)}
            type="date"
            defaultValue={selectedDate}
          />
        </div>
      </div>
      <div className="photo-container-scroller" style={styles.photoContainer}>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : isLoading ? (
          <React.Fragment>
            <div style={styles.loader} className="loader">
              <LoadingSpin style={styles.loader} size="100px" />
              <span style={{ paddingTop: "3rem" }}>Loading...</span>
            </div>
          </React.Fragment>
        ) : (
          renderPhotoRecords(photos)
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

export default UserMain;
