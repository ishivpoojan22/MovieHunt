import { useRef, useState } from "react";
import Header from "./Header";
import { auth } from "../utils/firebase";
import { isCheckValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignNowForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    // valid the form data
    // isCheckValidData

    // console.log(email.current.value);

    const message = isCheckValidData(
      email?.current?.value,
      password?.current?.value,
      name?.current?.value,
      !isSignInForm
    );

    // console.log(message);

    seterrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // sign up logic
      createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name?.current?.value,
            photoURL:
              "https://media.licdn.com/dms/image/v2/D4E35AQEBF1Qob-RNdw/profile-framedphoto-shrink_400_400/B4EZbtAmr1GQAc-/0/1747733081113?e=1760461200&v=beta&t=aJiqOnPvCT1WeWdxqy_skgLjjnwPIqbZHVPjLzKSTYw",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // user is signed in this is execute
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              seterrorMessage(error.message);
            });
          seterrorMessage("Account created successfully! Please sign in.");
          setIsSignNowForm(true);
          console.log(user);
          // navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          let message = "";

          switch (errorCode) {
            case "auth/email-already-in-use":
              message =
                "This email is already registered. Please sign in instead.";
              break;
            case "auth/invalid-email":
              message = "Please enter a valid email address.";
              break;
            case "auth/weak-password":
              message = "Password should be at least 6 characters.";
              break;
            default:
              message = "Something went wrong. Please try again.";
          }

          seterrorMessage(message);
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          seterrorMessage(
            "No account found with this email. Please sign up first."
          );
        });
    }
  };

  // const handleCloseForm = (e) => {
  //   e.preventDefault();

  //   setCloseForm(false);
  // };

  const handleSignInForm = () => {
    setIsSignNowForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className=""
          src="https://assets.nflxext.com/ffe/siteui/vlv3/bebd95d0-65f9-41a9-9d12-4794db63653e/web/IN-en-20250922-TRIFECTA-perspective_5e75cfb4-3797-4f17-866b-181ff91a51dd_large.jpg"
          alt="bg-image"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black p-12 w-3/12 my-40 mx-auto left-0 right-0 text-white bg-opacity-80 rounded-md"
      >
        <div className="flex justify-between">
          <h1 className="text-4xl my-4 font-bold">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {/* <button type="button" onClick={handleCloseForm}>
              ❌
            </button> */}
        </div>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-2 my-2 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full bg-gray-700"
        />
        <p className="text-red-700 font-semibold py-1">{errorMessage}</p>
        <button
          className="py-2 my-6 w-full bg-red-700 text-lg rounded-lg "
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-6" onClick={handleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In now.."}
        </p>
      </form>
    </div>
  );
};

export default Login;
