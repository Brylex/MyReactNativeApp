const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4');

const gcConfig = {
    projectId: "myreactnativeapp-1548941530901",
    keyFilename: "myreactnativeapp.json"
};
const {Storage} = require('@google-cloud/storage');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const body = JSON.parse(request.body);
        fs.writeFileSync("/tmp/uploadedImage.jpg", body.image, "base64", err => {
            console.log(err);
            return response.status(500).json({error: err});
        });
        const storage = new Storage({
            projectId: "myreactnativeapp-1548941530901",
          });
        const bucket = storage.bucket("myreactnativeapp-1548941530901.appspot.com");
        const uuid = UUID();

        bucket.upload("/tmp/uploadedImage.jpg", {
            uploadType: "media",
            destination: "/places/" + uuid + ".jpg",
            metadata: {
                metadata: {
                    contentType: "image/jpeg",
                    firebaseStorageDownloadTokens: uuid
                } 
            }
        }, (err, file) => {
            if (!err) {
                response.status(201).json({
                    imageUrl: "https://firebasestorage.googleapis.com/v0/b/" 
                        + bucket.name 
                        + "/o/" 
                        + encodeURIComponent(file.name) 
                        + "?alt=media&token=" 
                        + uuid
                });
            } else {
                console.log(err);
                response.status(500).json({error: err})
            }
        });
    })
});
