const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidHJlYmlsY29kZSIsImEiOiJja3NxajBrMWUwY3h2MzByd3RkdWZ0bXNoIn0.NBZHlXRlEN5TdGzlInoslw&limit=1`;

  request({ url, json: true }, (err, res, {features, message}) => {
    if (err) {
      callback("Unable to connect to location services!");
    } else if (message || !features.length) {
      callback("Unable to find location. Try another search.");
    } else {
      callback(null, {
        location: features[0].place_name,
        longitude: features[0].center[0],
        latitude: features[0].center[1],
      });
    }
  });
};

module.exports = geocode;
