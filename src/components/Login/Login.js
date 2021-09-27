import React,{useState} from "react";
import "./login.css";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import person from "../images/person1.png";
import { useDispatch } from "react-redux";
import {signIn} from '../store/actions';
import { useHistory } from "react-router-dom";


const SignIn = () => {

  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  
  const handleChange1 = (e) => {
    setUser(e.target.value);
  }
  const handleChange2 = (e) => {
    setPassword(e.target.value);
  }
  const history = useHistory();

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(signIn({ username: user, password: password, history }));
  };
  

  return (
    <div className="login_back">
      <div className="middle_div">
        <div className="left_div">
          <img src={person} alt='left_logo.png' className="left_logo" />
        </div>
        <div className="right_div">
          <p className="admin_text">Admin Login (username: fortest, password: fortest1)</p>
          <div className="input_group">
            <PersonIcon className="person_icon" />
             <input type="text" name='username' placeholder='Username (fortest)'  onChange={handleChange1} />
          </div>
          <div className="input_group2">
            <LockIcon className="person_icon" />
             <input type="password" name='password' placeholder='Password (fortest1)'  onChange={handleChange2}/>
          </div>

            <button onClick={handleLogin} className="button1" type="submit">
              Login
            </button>
        </div>
      </div>
    </div>
    
  );
}

export default SignIn;
