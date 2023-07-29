import React, { useEffect } from "react";
import { auth } from "../../firebase";
import classes from "./Header.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import userImg from "../../assets/userImg.svg";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [loading, user]);

  const logoutFnc = () => {
    try {
      signOut(auth)
        .then(() => {
          //sign out successful
          toast.success("logged out successfully!");
          navigate("/");
        })
        .catch((error) => {
          //an error happened
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className={classes.navbar}>
      <p className={classes.logo}>Fi-nance</p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            style={{ borderRadius: "50%", height: "1.5rem", width: "1.5rem" }}
          />
          <p className={`${classes.logo} ${classes.link}`} onClick={logoutFnc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
