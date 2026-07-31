/* ===========================================================
   FunctionMandi - js/firebase-config.js
   STEP 1: Create a free Firebase project at https://console.firebase.google.com
   STEP 2: In your project, go to Project Settings → General →
           "Your apps" → click the </> (Web) icon → register app
   STEP 3: Copy the firebaseConfig object Firebase gives you and
           paste it below, replacing the placeholder values.
   STEP 4: In the Firebase console, enable:
           - Authentication → Sign-in method → Email/Password
           - Firestore Database → Create database (start in test mode)
           - Storage → Get started (for review photos)
   =========================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyAUCpWmrA7OTA_BWlGrztBrKFzVo3z7ty8",
  authDomain: "functionmandi.firebaseapp.com",
  projectId: "functionmandi",
  storageBucket: "functionmandi.firebasestorage.app",
  messagingSenderId: "113320781187",
  appId: "1:113320781187:web:eb48d2610c39f6787302b6",
  measurementId: "G-DC9VMLHDZ8"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
// Note: Firebase Storage needs the Blaze (pay-as-you-go) plan, so it's
// not initialized here. Review photos are instead compressed and saved
// directly inside Firestore documents (see js/app.js) — fully free.
