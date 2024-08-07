export const fetchAllAddresses = (accessToken) => {
  let promiseResolveRef = null;
  let promiseRejectRef = null;
  let promise = new Promise((resolve, reject) => {
    promiseResolveRef = resolve;
    promiseRejectRef = reject;
  });
  fetch("http://localhost:8080/api/addresses", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      response
        .json()
        .then((json) => {
          if (response.ok) {
            promiseResolveRef({
              data: json,
              response: response,
            });
          } else {
            promiseRejectRef({
              reason: "Server error occurred, Please try again",
              response: response,
            });
          }
        })
        .catch(() => {
          promiseRejectRef({
            reason: "Some error occurred.",
            response: response,
          });
        });
    })
    .catch((err) => {
      promiseRejectRef({
        reason: "Some error occurred.",
        response: err,
      });
    });
  return promise;
};

export const createAddress = (requestJson, accessToken) => {
  let promiseResolveRef = null;
  let promiseRejectRef = null;
  let promise = new Promise((resolve, reject) => {
    promiseResolveRef = resolve;
    promiseRejectRef = reject;
  });
  fetch("http://localhost:8080/api/addresses", {
    method: "POST",
    body: JSON.stringify(requestJson),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      response
        .text()
        .then((json) => {
          if (response.ok) {
            promiseResolveRef({
              message: "Product " + requestJson.name + " added successfully.",
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
        .catch(() => {
          promiseRejectRef({
            reason: "Some error occurred.",
            response: response,
          });
        });
    })
    .catch((err) => {
      promiseRejectRef({
        reason: "Some error occurred, Please try again.",
        response: err,
      });
    });
  return promise;
};
