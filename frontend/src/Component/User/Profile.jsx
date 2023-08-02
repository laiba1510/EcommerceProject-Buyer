import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import Data from "../layout/Data";
import Loader from '../layout/pageLoader/Loader';
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Data title={`${user?.name}'s Profile`} /> {/* Use optional chaining to access user properties */}
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              {user?.avatar && <img src={user.avatar.url} alt={user.name} />} {/* Use optional chaining to access user.avatar properties */}
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name}</p> {/* Use optional chaining to access user.name */}
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p> {/* Use optional chaining to access user.email */}
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p> {/* Use optional chaining to access user.createdAt */}
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
