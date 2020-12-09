import axios from "axios";
const instance = axios.create({
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  },
  redirect: "follow",
  referrer: "no-referrer",
  baseURL: "https://xaltius-be-test.herokuapp.com",
  // baseURL: "http://192.168.8.142:8091",
  timeout: 30 * 1000,
});

export default class ApiUtils {
  static get(url, body = {}) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { ...body })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          const error = err.message.toLowerCase().includes("status")
            ? err.response.data
            : { message: err.message };
          reject(error);
        });
    });
  }
  static post(url, body = {}) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, { ...body })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          const error = err.message.toLowerCase().includes("status")
            ? err.response.data
            : { message: err.message };
          reject(error);
        });
    });
  }
}
