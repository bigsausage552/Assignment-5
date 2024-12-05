import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import './SignInView.css';

function SignInView() {
  const navigate = useNavigate();
  const [pass, setPass] = useState('');
  const password = "iloveyou";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (pass === password) {
      navigate('/');
    } else {
      alert('Wrong Password');
      console.log(pass);
    }
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in">
        <h2>SIGN IN</h2>
        <form onSubmit={handleSubmit}>
          <div className="info">
            <input type="email" name="email" required />
            <label>Email</label>
          </div>
          <div className="info">
            <input type="password" name="password" onChange={(event) => { setPass(event.target.value) }} required />
            <label>Password</label>
          </div>
          <button className="sign-in-btn" type="submit">Sign In</button>
          <div className="help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="#">Need help?</Link>
          </div>
        </form>
        <p>New to NetDix? <Link to="/signup">Sign up now</Link></p>
      </div>
    </div>
  );
}

export default SignInView;
