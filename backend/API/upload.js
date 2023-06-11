const admin = require('firebase-admin');
const serviceAccount = require('./ksa.json');
const data = require('./prueba.json');
const collectionKey = 'api-okycoach';
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
if(data && (typeof data === 'object')) {
    Object.keys(data).forEach(docKey => {
        firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) =>{
            console.log("Document" + docKey + "succesfully written!");
        }).catch((error) => {
            console.error(error);
        });
    });
}