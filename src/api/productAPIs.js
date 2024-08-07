export const fetchAllProducts = (accessToken) => {
  let promiseResolveRef = null;
  let promiseRejectRef = null;
  let promise = new Promise((resolve, reject) => {
    promiseResolveRef = resolve;
    promiseRejectRef = reject;
  });
  fetch("http://localhost:8080/api/products", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      response.json().then((json) => {
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

export const createProduct = (requestJson, accessToken) => {
  let promiseResolveRef = null;
  let promiseRejectRef = null;
  let promise = new Promise((resolve, reject) => {
    promiseResolveRef = resolve;
    promiseRejectRef = reject;
  });
  fetch("http://localhost:8080/api/products", {
    method: "POST",
    body: JSON.stringify(requestJson),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      response.text().then((json) => {
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
      });
    })
    .catch((err) => {
      promiseRejectRef({
        reason: "Some error occurred. Please try again.",
        response: err,
      });
    });
  return promise;
};

export const modifyProduct = (requestJson, accessToken) => {
  let promiseResolveRef = null;
  let promiseRejectRef = null;
  let promise = new Promise((resolve, reject) => {
    promiseResolveRef = resolve;
    promiseRejectRef = reject;
  });
  fetch("http://localhost:8080/api/products/" + requestJson.id, {
    method: "PUT",
    body: JSON.stringify(requestJson),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      response.text().then((json) => {
        if (response.ok) {
          promiseResolveRef({
            message: "Product " + requestJson.name + " modified successfully.",
            response: response,
          });
        } else {
          let message = json.message;
          if (message === undefined || message === null) {
            message = "Server error occurred, Please try again";
          }
          promiseRejectRef({
            reason: message,
            response: response,
          });
        }
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

export const deleteProduct = (id, accessToken) => {
  let promiseResolveRef = null;
  let promiseRejectRef = null;
  let promise = new Promise((resolve, reject) => {
    promiseResolveRef = resolve;
    promiseRejectRef = reject;
  });
  fetch("http://localhost:8080/api/products/" + id, {
    method: "DELETE",
    headers: {
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
            reason: "Server error occurred, Please try again",
            response: response,
          });
        }
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

export const viewProduct = (id, accessToken) => {
  let promiseResolveRef = null;
  let promiseRejectRef = null;
  let promise = new Promise((resolve, reject) => {
    promiseResolveRef = resolve;
    promiseRejectRef = reject;
  });
  fetch("http://localhost:8080/api/products/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          promiseResolveRef({
            value: json,
            response: response,
          });
        } else {
          promiseRejectRef({
            reason: "Server error occurred, Please try again",
            response: response,
          });
        }
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
