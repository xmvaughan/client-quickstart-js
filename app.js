const http = require('http');
const express = require('express');
const ClientCapability = require('twilio').jwt.ClientCapability;
const path = require('path');

const app = express();

app.post('/token', (req, res) => {
    // put your Twilio API credentials here
    const accountSid = require('../private/twilioSecrets/accountSid');
    const authToken = require('../private/twilioSecrets/authToken');

    // put your Twilio Application Sid here
    const appSid = require('../private/twilioSecrets/appSid');

    const capability = new ClientCapability({
	accountSid: accountSid,
	authToken: authToken,
    });
    
    capability.addScope(new ClientCapability.OutgoingClientScope({ applicationSid: appSid }));
    
    capability.addScope(new ClientCapability.IncomingClientScope( 'broswerPhone' ));
    
    
    const token = capability.toJwt();

    res.set('Content-Type', 'application/jwt');
    res.send(token);
});


http.createServer(app).listen(1337, '127.0.0.1');
console.log('Twilio Client app server running at http://127.0.0.1:1337/token');
