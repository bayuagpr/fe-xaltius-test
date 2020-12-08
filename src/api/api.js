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
});

export default class ApiUtils {
  static get(url, body = {}) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { ...body })
        .then(({ data }) => {
          if (data.errno === 0) {
            resolve(data.data);
          } else {
            resolve(data);
          }
        })
        .catch((err) => {
          reject({ err: JSON.stringify(err) });
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
          reject(err.response.data);
        });
    });
  }
}
