import toast from "react-hot-toast";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyAz9-UDlb1KF0HVBbSQKJocGtg5LY12rPo",
    authDomain: "vinyl-imprint.firebaseapp.com",
    projectId: "vinyl-imprint",
    storageBucket: "vinyl-imprint.appspot.com",
    messagingSenderId: "498850998645",
    appId: "1:498850998645:web:ba32a0f763bccb85d10b3c",
    measurementId: "G-BMBHTX7ZML"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}


export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
const analytics = () => firebase.analytics();

export async function registerUser (email, password) {
    try{
        const { user: { uid } } = await auth.createUserWithEmailAndPassword(email, password);

        const data = {
            uid,
            email,
            wholesale: false,
            verified: false
        }
        const userRef = firestore.collection('users').doc();
        await userRef.set(data);

        toast.success('Successfuly Registered!');
    }
    catch(err){
        toast.error(err.message);
    }
}

export async function registerWholesaleUser(formData) {
    try{
        const { f_name, l_name, email, address, city, country, postal, company, password } = formData;
        const user = await auth.createUserWithEmailAndPassword(email, password);
        const { user: { uid } } = user;

        const data = {
            uid,
            f_name,
            l_name,
            email,
            address,
            city,
            country,
            postal,
            company,
            wholesale: true,
            verified: false
        }

        const userRef = firestore.collection('users').doc();
        await userRef.set(data);

        toast.success('Account Request Sent');
    }
    catch(err){
        toast.error(err.message);
    }
}

export async function getWithSlug (slug) {
    const productsRef = firestore.collection('products');
    const query = productsRef.where('slug', '==', slug).limit(1);
    const productDoc = (await query.get()).docs[0];
    return productDoc
}

export async function getStripeCheckout (lineItems) {
    const stripeCheckout = functions.httpsCallable('stripeCheckout');
    const session = await stripeCheckout({ line_items: lineItems });
    return session.data.id;
}