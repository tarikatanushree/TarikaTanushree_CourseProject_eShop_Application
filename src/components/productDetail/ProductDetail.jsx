//Page for showing product details

import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ProductCategory from "../productCategory/ProductCategory";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useServices from "../../assets/useServices";

const ProductDetail = () => {
  const [formData, setFormData] = useState({
    count: {
      value: "1",
      error: false,
      errorMessage: null,
    },
  });
  const theme = useTheme();
  const { ServicesCtx } = useServices();
  const { broadcastMessage } = useContext(ServicesCtx);
  const navigate = useNavigate();
  const location = useLocation();
  let metadata = location.state;
  if (metadata === null || metadata === undefined) {
    metadata = null;
  } else {
    metadata = JSON.parse(metadata).value;
    if (
      metadata === null ||
      metadata === undefined ||
      metadata["id"] === undefined ||
      metadata.id === null
    ) {
      metadata = null;
    }
  }
  let json = metadata || {
    id: null,
    name: null,
    category: null,
    manufacturer: null,
    availableItems: null,
    imageUrl: null,
    description: null,
  };

  const initPageData = useCallback(
    (data = metadata, redirect = navigate, showMessage = broadcastMessage) => {
      if (data === null) {
        showMessage("Invalid Access. Redirecting to home...", "warning");
        redirect("/home");
      }
    },
    [metadata, navigate, broadcastMessage]
  );
  useEffect(() => {
    initPageData();
  }, [initPageData]);

  let saveOnChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        value,
      },
    });
  };

  let matchRegex = (value, re) => {
    let regex = new RegExp(re);
    return regex.test(value);
  };

  let getValidity = (field, value) => {
    let valid = true;
    let message = null;
    if (value == null || value.length === 0) {
      valid = false;
      message = "This field is mandatory";
    } else {
      switch (field) {
        case "count": {
          valid = matchRegex(value, "^([1-9]{1}[0-9]{0,8})$");
          message = "Please enter a valid quantity";
          if (valid) {
            if (parseInt(value) > json.availableItems) {
              valid = false;
              message =
                "Order Quantity must be less than " + json.availableItems + ".";
            }
          }
          break;
        }
        default: {
          return;
        }
      }
    }
    return {
      valid,
      message,
    };
  };

  let validateAndSave = (field, value) => {
    let json = getValidity(field, value);
    let data = {
      ...formData,
    };
    data[field] = {
      value: data[field].value,
      error: !json.valid,
      errorMessage: json.message,
    };
    setFormData(data);
  };

  let placeOrder = () => {
    navigate("/product/order", {
      state: JSON.stringify({
        product: json,
        quantity: formData.count.value,
      }),
    });
  };

  let moveToHomePage = () => {
    navigate("/home");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ProductCategory />
            </div>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "5% 20% 0% 20%",
              }}
            >
              <Grid container>
                <Grid item xs={4}>
                  <img
                    style={{
                      maxWidth: "300px",
                      width: "100%",
                      height: "400px",
                    }}
                    src={json.imageUrl}
                    alt={"Image of " + json.name}
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={7}>
                  <Grid container>
                    <Grid item xs={12}>
                      <div style={{ display: "flex", justifyContent: "left" }}>
                        <Typography variant={"h4"}>{json.name}</Typography>
                        <div style={{ paddingLeft: "4%" }}>
                          <Typography
                            variant={"body1"}
                            style={{
                              color: "#FFFFFF",
                              backgroundColor: theme.palette.primary.main,
                              padding: "2px 10px 2px 10px",
                              marginTop: "5px",
                              borderRadius: 20,
                            }}
                          >
                            {"Available Quantity : " + json.availableItems}
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ display: "flex", justifyContent: "left" }}>
                        <Typography
                          variant={"body1"}
                          style={{
                            paddingTop: "2%",
                          }}
                        >
                          Category: <b>{json.category}</b>
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ display: "flex", justifyContent: "left" }}>
                        <Typography
                          variant={"body1"}
                          style={{
                            paddingTop: "4%",
                          }}
                        >
                          {json.description}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ display: "flex", justifyContent: "left" }}>
                        <Typography
                          variant={"h5"}
                          style={{
                            color: theme.palette.secondary.main,
                            paddingTop: "4%",
                          }}
                        >
                          &#8377; {json.price}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          paddingTop: "4%",
                          width: "50%",
                        }}
                      >
                        <TextField
                          id="count"
                          label="Enter Quantity *"
                          variant="outlined"
                          fullWidth
                          value={formData.count.value}
                          onChange={(event) =>
                            saveOnChange("count", event.target.value)
                          }
                          onBlur={(event) =>
                            validateAndSave("count", event.target.value)
                          }
                          error={formData.count.error}
                          helperText={
                            formData.count.error && formData.count.errorMessage
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          paddingTop: "4%",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => placeOrder()}
                        >
                          PLACE ORDER
                        </Button>
                        <Button
                          variant="text"
                          color="disabled"
                          onClick={() => moveToHomePage()}
                        >
                          BACK
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
