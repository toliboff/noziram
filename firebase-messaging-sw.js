importScripts("https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.19.1/firebase-messaging.js");

const messaging = firebase.messaging();
messaging.requestPermission().then(function() {
    console.log('Have permission');
    return messaging.getToken();
}).then(function(token) {
    console.log(token);
}).catch(function(err) {
    console.log('Error Occured.')
})

meassaging.onMessage(function(payload) {
    console.log('onMessage:' + payload)
})