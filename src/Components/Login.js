import { useRef, useState } from "react";
import Header from "./Header";
import { auth } from "../utils/firebase";
import { isCheckValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignNowForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState();
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
            photoURL: USER_AVATAR,
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
          // console.log(photoURL);
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
          // navigate("/browse");
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
      <div className="fixed">
        <img className="" src={BG_URL} alt="bg-image" />
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
