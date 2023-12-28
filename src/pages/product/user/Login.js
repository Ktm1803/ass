import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";


export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Hàm xử lý sự kiện khi checkbox thay đổi
  function handleShowPasswordChange() {
    setShowPass((prevState) => !prevState);
  }

  const navigatePrev = () => {
    navigate(`/`)
  }

  const handleReg = () => {
    navigate(`/register`)
  }

  function handleFormOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  async function onValidation(e) {
    e.preventDefault();
    if (formData.username === "" || formData.password === "") {
      setLoginMessage("Empty Username or Password");
    } else {
      try {
        const response = await fetch(
          "https://609f7428c512c20017dcd388.mockapi.io/quanliailap/login"
        );

        if (response.ok) {
          const data = await response.json();
          const matchedUser = data.find(
            (user) =>
              (user.phone === formData.username ||
                user.email === formData.username) &&
              user.password === formData.password
          );

          if (matchedUser) {
            // Đăng nhập thành công
            setLoginMessage("Login successful");
          } else {
            // Đăng nhập không thành công
            setLoginError(true);
            setLoginMessage("Invalid username or password");
          }
        } else {
          console.log("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <LoginUser>
      <div className="container my-5">
        <div className="row my-5 justify-content-center">
          <div className="col-lg-4">
            <form>
            <div className="prev"><GrFormPreviousLink className="iconPrev" onClick={navigatePrev}/><h4>Đăng nhập</h4></div>
              <div className="form-group">
                <label htmlFor="username">Tên đăng nhập:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  onChange={handleFormOnChange}
                  value={formData.username}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mật khẩu:</label>
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-control"
                  onChange={handleFormOnChange}
                  value={formData.password}
                />
              </div>
              <div className="showPass">
                <input type="checkbox"
                checked={showPass}
                onChange={handleShowPasswordChange}/>
                <p>Hiện mật khẩu</p>
              </div>
              <button
                type="submit"
                name="login"
                value="Login"
                className="btn btn-primary"
                onClick={onValidation}
              >
                Đăng nhập
              </button>
              {loginError && <p style={{ color: "red" }}>{loginMessage}</p>}
              {!loginError && loginMessage && (
                <p style={{ color: "green" }}>{loginMessage}</p>
              )}

              <div className="navigateReg">
                <p>Chưa có tài khoản?
                  <button onClick={handleReg} >Đăng Ký Ngay</button>
                </p>
              </div>
              </form>
          </div>
        </div>
      </div>
    </LoginUser>
  );
}

const LoginUser = styled.div`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .prev{
    display: flex;
    align-items: center;
    padding-bottom: 14px;
    font-size: 30px;
    margin-left: -14px;

    .iconPrev:hover{
      cursor: pointer;
      opacity: 0.6;
    }

    h4{
      margin-left: 15%;
    }
  }

  form {
    width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;

    .login{
      display: flex;
      justify-content: center;
      font-size: 30px;
      margin-bottom: 14px;
    }
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .btn-primary {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .showPass{
    display: flex;
    margin-bottom: 12px;

    p{
      margin-left: 8px;
    }
  }

  .navigateReg{
    display: flex;
    justify-content: center;
    
    
    button{
    border: none;
    background: none;
    margin-left: 6px;
    padding: 0;
    font: inherit;
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
    &:hover{
      color: red;
    }
  }
  }
`;