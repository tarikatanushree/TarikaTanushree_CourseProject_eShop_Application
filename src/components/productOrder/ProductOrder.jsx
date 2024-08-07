//Page for showing product details at the time of placing order

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Card, CardContent, useTheme } from "@mui/material";

const ProductOrder = ({ productQuantity, selectedProduct }) => {
  const theme = useTheme();

  return (
    <Card style={{ width: "80%" }}>
      <CardContent>
        <Grid
          container
          xs={12}
          style={{ paddingTop: "5%", paddingBottom: "5%" }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid container>
              <Grid item xs={4}>
                <img
                  style={{
                    maxWidth: "300px",
                    width: "100%",
                    height: "400px",
                  }}
                  src={selectedProduct.imageUrl}
                  alt={"Image of " + selectedProduct.name}
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={7}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant={"h4"}>
                      {selectedProduct.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={{ paddingTop: "2%" }}>
                    <Typography
                      variant={"body1"}
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      Quantity: <b>{productQuantity}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={{ paddingTop: "2%" }}>
                    <Typography
                      variant={"body1"}
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      Category: <b>{selectedProduct.category}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={{ paddingTop: "2%" }}>
                    <Typography
                      variant={"body1"}
                      style={{
                        fontSize: "15px",
                        color: theme.palette.disabled.main,
                      }}
                    >
                      <em>{selectedProduct.description}</em>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={{ paddingTop: "2%" }}>
                    <Typography
                      variant={"body1"}
                      style={{
                        fontSize: "25px",
                        color: theme.palette.secondary.main,
                      }}
                    >
                      Total Price : &#8377;{" "}
                      {selectedProduct.price * productQuantity}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductOrder;
