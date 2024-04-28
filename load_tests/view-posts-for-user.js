import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 100,
  duration: "30s",
};

export function setup() {
  const payload = JSON.stringify({
    username: "username",
    email: "username@email.com",
  });

  const headers = { "Content-Type": "application/json" };
  const res = http.post("http://skipass.api/create-user", payload, { headers });

  const payloadPost = JSON.stringify({
    text: "blablabla",
    userid: res.body,
  });

  http.post("http://skipass.api/create-post", payloadPost, { headers });

  return res.body;
}

export default function (data) {
  console.log(data);
  http.get(`http://skipass.api/view/posts/${data}`);
  sleep(1);
}
