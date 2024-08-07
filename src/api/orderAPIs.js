export const createOrder = (requestJson, accessToken) => {
  let promiseResolveRef = null;
  let promiseRejectRef = null;
  let promise = new Promise((resolve, reject) => {
    promiseResolveRef = resolve;
    promiseRejectRef = reject;
  });
  fetch("http://localhost:8080/api/orders", {
    method: "POST",
    body: JSON.stringify(requestJson),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      response.text().then(() => {
        if (response.ok) {
          promiseResolveRef({
            response: response,
          });
        } else {
          promiseRejectRef({
            reason: "Some error occurred.",
            response: response,
          });
        }
      });
    })
    .catch((err) => {
      promiseRejectRef({
        reason: "Server error occurred, Please try again.",
        response: err,
      });
    });
  return promise;
};
