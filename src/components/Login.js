import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }
  function handleSetPassword(e) {
    setPassword(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin({
      email,
      password,
    });
  };

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form
        className="login__form"
        onSubmit={handleSubmit}
        name="sign-up"
        method="GET"
        noValidate
      >
        <input
          className="login__input"
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          onChange={handleSetEmail}
          value={email}
          required
        />
        <input
          className="login__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          onChange={handleSetPassword}
          value={password}
          required
        />
        <button className="login__submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
