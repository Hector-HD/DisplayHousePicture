var AWS = require ("aws-sdk");

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "housePictures",
    Key: {
        "pictureId": 0
    }
};

var housePictureToDisplay = "picture not set";

exports.handler = (event, context, callback) => {
    // TODO implement
    docClient.get(params, function(err, data) {
        if (err) {
            return console.error("that didn't work");
        }
        var payload = JSON.stringify(data, null, 2);
        var obj = JSON.parse(payload);
        housePictureToDisplay = obj.Item.pictureToShow;
    
        callback(null, {"dogPicture":housePictureToDisplay});
    });
};