import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 100,
  duration: "30s",
};

export default function () {
  http.get("http://skipass.api/get-users");
  sleep(1);
}
