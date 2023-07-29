import React, { useState } from "react";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import Input from "../Input/Input";
import classes from "./SignUpIn.module.css";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SignUpIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState();
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  const signUpWithEmail = () => {
    setLoading(true);
    console.log("handler running", name);
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            //Signed in
            const user = userCredential.user;
            console.log(user);
            toast.success("user created");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setLoading(false);
            // create a doc with user id as the following id
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((e) => {
            toast.error(e.message);
            setLoading(false);
          });
      } else {
        toast.error("Passwords doesn't match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };

  const createDoc = async (user) => {
    //Make sure that the doc with the uid doesn't exist
    //create a doc
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const LoginWithEmail = () => {
    setLoading(true);
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("logged in Successfully!");
          console.log("user", user);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((e) => {
          setLoading(false);
          toast.error(e.message);
        });
    } else {
      setLoading(false);
      toast.error("All fields are mandatory");
    }
  };

  const googleAuth = () => {
    setLoading(true);
    try {
      signInWithPopup(auth, provider).then((result) => {
        // this gives you a google acces token, you can use it to access the google api
        const credential = GoogleAuthProvider.credentialFromResult(result);
        //the signed in user info
        const user = result.user;
        console.log("user", user);
        createDoc(user);
        navigate("/dashboard");
        toast.success("account created successfully");
        setLoading(false);
      });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };
  return (
    <>
      {loginForm ? (
        <div className={classes["login-wrapper"]}>
          <h2 className={classes.title}>
            Sign Up on <span style={{ color: "var(--theme)" }}>fi-nance</span>
          </h2>
          <form>
            <Input
              label={"Email"}
              type={"email"}
              state={email}
              setState={setEmail}
              placeholder={"John Doe@some.com"}
            />
            <Input
              label={"Password"}
              type={"password"}
              state={password}
              setState={setPassword}
              placeholder={"*******"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "log in"}
              onClick={LoginWithEmail}
              outlined={false}
            />
            <p className={classes["p-login"]}>or</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Google"}
              outlined={true}
            />
            <p
              className={classes["p-login"]}
              onClick={() => setLoginForm(!loginForm)}
            >
              Don't have an account. click here
            </p>
          </form>
        </div>
      ) : (
        <div className={classes["signup-wrapper"]}>
          <h2 className={classes.title}>
            Sign Up on <span style={{ color: "var(--theme)" }}>fi-nance</span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              type={"text"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              label={"Email"}
              type={"email"}
              state={email}
              setState={setEmail}
              placeholder={"John Doe@some.com"}
            />
            <Input
              label={"Password"}
              type={"password"}
              state={password}
              setState={setPassword}
              placeholder={"*******"}
            />
            <Input
              label={"Confirm Password"}
              type={"password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"*********"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "sign up"}
              onClick={signUpWithEmail}
              outlined={false}
            />
            <p className={classes["p-login"]}>or</p>
            <Button
              text={loading ? "Loading..." : "Google"}
              onClick={googleAuth}
              outlined={true}
            />
            <p
              className={classes["p-login"]}
              onClick={() => setLoginForm(!loginForm)}
            >
              Already have an account. click here
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpIn;
