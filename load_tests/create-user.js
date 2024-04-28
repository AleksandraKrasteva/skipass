import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 100,
  duration: "30s",
};

export default function () {
  const payload = JSON.stringify({
    username: "username",
    email: "username@email.com",
  });

  const headers = { "Content-Type": "application/json" };
  http.post("http://skipass.api/create-user", payload, { headers });
  sleep(1);
}
