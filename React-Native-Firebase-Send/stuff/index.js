//https://firebase.google.com/docs/cloud-messaging/send-message?hl=pt-br#node.js

var admin = require("firebase-admin");
var serviceAccount = require("./firebase-keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const registrationToken =
  "dAJXZ0mMQeKBPj5qfeDVKK:APA91bHKOlbdRElSmyLk4kvmFVkr-0ssiU2R3U1wXD08nh8KHy_yTgAKM3uiSTmyZXEsd_LXQNX2InK5X0yufVHOMMKa7RJ2enmqVc0RbCmcCho3_3G7ws6c8RebxM4sNkP8blg2CAjr";

const registrationTokens = [
  "dAJXZ0mMQeKBPj5qfeDVKK:APA91bHKOlbdRElSmyLk4kvmFVkr-0ssiU2R3U1wXD08nh8KHy_yTgAKM3uiSTmyZXEsd_LXQNX2InK5X0yufVHOMMKa7RJ2enmqVc0RbCmcCho3_3G7ws6c8RebxM4sNkP8blg2CAjr"
];

const message = {
  notification: {
    title: "$FooCorp up 1.43% on the day",
    body: "$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day."
  },
  //topic: "Finanças APP",
  android: {
    notification: {
      icon: "stock_ticker_update",
      color: "#7e55c3"
    }
  },
  tokens: registrationTokens
  // token: registrationToken
};

admin
  .messaging()
  .sendMulticast(message)
  .then(response => {
    if (response.failureCount > 0) {
      const failedTokens = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(registrationTokens[idx]);
        }
      });
      console.log("List of tokens that caused failures: " + failedTokens);
    }
  })
  .catch(error => {
    console.log("Error sending message:", error);
  });

/*
  getMessaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });*/
