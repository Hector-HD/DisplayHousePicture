//This tells JavaScript to execute in strict mode
'use strict';

const AWS = require('aws-sdk');
const Alexa = require('alexa-sdk');

const APP_ID = undefined;

//table - housePictures

const handlers = {
    'LaunchRequest': function(){
        this.emit(':ask', 'Welcome, to house pictures! What image would you like to see?');
    },
    'DisplayPicture': function(){
        var docClient = new AWS.DynamoDB.DocumentClient();
        var housePictureNumber = this.event.request.intent.slots.number.value;
        
        var params = {
            TableName: "housePictures",
            Key:{
                "pictureId": 0,
            },
            UpdateExpression: "set pictureToShow = :newImageNumber",
            ExpressionAttributeValues: {
                ":newImageNumber" : housePictureNumber
            }
        };
        
        docClient.update(params, (() => {
           this.emit(':ask', 'you said image '+ housePictureNumber);
        }));
    },
    'DisplayAllPictures': function(){
        var docClient = new AWS.DynamoDB.DocumentClient();
        var housePictureNumber = 0;
        
        var params = {
            TableName: "housePictures",
            Key:{
                "pictureId": 0,
            },
            UpdateExpression: "set pictureToShow = :newImageNumber",
            ExpressionAttributeValues: {
                ":newImageNumber" : housePictureNumber
            }
        };
        
        docClient.update(params, (() => {
           this.emit(':ask', 'you said all images');
        }));
    },
    'AMAZON.HelpIntent': function(){
        this.emit(':tell', 'you can ask for a house picture by saying show me house number 1');
    },
    'AMAZON.CancelIntent': function(){
        this.emit(':tell', 'Have a nice day, bye!');
    },
    'AMAZON.StopIntent': function(){
        this.emit(':tell', 'Have a nice day, bye!');
    },
};

exports.handler = function (event, context){
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

