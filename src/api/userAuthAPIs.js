import { jwtDecode } from "jwt-decode";

export const doLogin = (email, password) => {
  let promiseResolveRef = null;
  let promiseRejectRef = null;
  let promise = new Promise((resolve, reject) => {
    promiseResolveRef = resolve;
    promiseRejectRef = reject;
  });
  fetch("http://localhost:8080/api/auth/signin", {
    method: "POST",
    body: JSON.stringify({
      username: email,
      password: password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      response
        .json()
        .then((json) => {
          if (response.ok) {
            let decoded = jwtDecode(json.token);
            promiseResolveRef({
              username: email,
              accessToken: json.token,
              accessTokenTimeout: decoded.exp * 1000, //convert to epoch
              roles: json.roles,
              userId: json.userId,
              response: response,
            });
          } else {
            promiseRejectRef({
              reason:
                "Server error occurred, Unable to login. Please try again.",
              response: response,
            });
          }
        })
        .catch((error) => {
          promiseRejectRef({
            reason: "User name or password is wrong. Please try again.",
            response: error,
          });
        });
    })
    .catch((err) => {
      promiseRejectRef({
        reason:
          "Error occurred, unable to connect to the server. Please check your internet connection and try again.",
        response: err,
      });
    });
  return promise;
};

export const doSignup = (requestJson) => {
  let promiseResolveRef = null;
  let promiseRejectRef = null;
  let promise = new Promise((resolve, reject) => {
    promiseResolveRef = resolve;
    promiseRejectRef = reject;
  });
  fetch("http://localhost:8080/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(requestJson),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      response
        .json()
        .then((json) => {
          if (response.ok) {
            promiseResolveRef({
              message: json.message,
              response: response,
            });
          } else {
            let message = json.message;
            if (message === undefined || message === null) {
              message = "Server error occurred, Please try again.";
            }
            promiseRejectRef({
              reason: message,
              response: response,
            });
          }
        })
        .catch((err) => {
          promiseRejectRef({
            reason:
              "Error occurred, unable to connect to the server. Please check your internet connection and try again.",
            response: err,
          });
        });
    })
    .catch((err) => {
      promiseRejectRef({
        reason:
          "Error occurred, unable to connect to the server. Please check your internet connection and try again.",
        response: err,
      });
    });
  return promise;
};
