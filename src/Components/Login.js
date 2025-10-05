import { useRef, useState } from "react";
import Header from "./Header";
import { isCheckValidData } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignNowForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    // valid the form data
    // isCheckValidData

    // console.log(email.current.value);
    

    const message = isCheckValidData(email?.current?.value, password?.current?.value, name?.current?.value, !isSignInForm );

    console.log(message);

    seterrorMessage(message);

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
