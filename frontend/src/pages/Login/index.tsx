import { useState } from "react";
import { Button, Input } from "@/components/Form";
import { parseCssModule } from "@/utils/css";

import Notifications from "@/Notifications";
import api from "@/api";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

function Login() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const notificationId = Notifications.loading("Logging in...");
    setLoading(true);
    try {
      if(await api.login(password)) {
        window.location.assign("/");
      } else {
        Notifications.error("Password is incorrect");
      }
    } catch(e) {
      console.error(e);
      Notifications.error("Server Error: couldn't send data correctly");
    }
    Notifications.remove(notificationId);
    setLoading(false);
  };

  return (
    <div className={getClassName("login")}>
      <div className={getClassName("form")}>
        <form onSubmit={onSubmit}>
          <h1 className={getClassName("title")}>Login</h1>

          <Input
            type="password"
            onChange={(v) => setPassword(v)}
            value={password}
            placeholder="Enter THE password"
            className={getClassName("input")}
            required
          />

          <Button
            type="submit"
            className={getClassName("submit-btn")}
            disabled={loading}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
