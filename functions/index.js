const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.addLocation = functions.https.onRequest((req, res) => {
  const name = req.query.name;
  if (name && req.query.lat && req.query.lon && req.query.icon) {
    const ref = admin.database().ref('locations');
    return ref.child(name).set({lat: parseFloat(req.query.lat), lon: parseFloat(req.query.lon), name: req.query.name, icon: req.query.icon}).then((snapshot) => {
      return res.redirect(303);
    });
  }

  return res.redirect(400);
});