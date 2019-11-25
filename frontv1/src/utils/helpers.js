export function onFileUploadButtonClick(
  event,
  fileElementId,
  state,
  axiosCallback
) {
  const { setError, setProgress } = state;
  setError(null);
  const data = new FormData();
  data.append('file', document.getElementById(fileElementId).files[0]);
  let config = {
    onUploadProgress: function(progressEvent) {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 79) / progressEvent.total
      );
      setProgress(percentCompleted);
    }
  };
  axiosCallback();
  // axios
  //   .put('https://workero.site/api/photos', data, config)
  //   .then(function(res) {
  //     setProgress(100);
  //   })
  //   .catch(function(err) {
  //     setProgress(25);
  //     setError(err.message);
  //   });
}
