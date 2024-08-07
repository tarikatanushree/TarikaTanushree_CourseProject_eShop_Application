export const fetchAllCategories = (accessToken) => {
  let promiseResolveRef = null;
  let promiseRejectRef = null;
  let promise = new Promise((resolve, reject) => {
    promiseResolveRef = resolve;
    promiseRejectRef = reject;
  });
  fetch("http://localhost:8080/api/products/categories", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      response.json().then((json) => {
        //capitalise every category, show only unique list of categories
        let arr = [];
        for (let i = 0; i < json.length; i++) {
          let c = json[i].toUpperCase();
          if (!arr.includes(c)) {
            arr.push(c);
          }
        }
        arr.sort();
        arr = ["ALL", ...arr];
        if (response.ok) {
          promiseResolveRef({
            data: arr,
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
