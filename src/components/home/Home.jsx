//Home page for user after login

import Grid from "@mui/material/Grid";
import useAuthentication from "../../assets/useAuthentication";
import { useContext } from "react";
import Box from "@mui/material/Box";
import ProductCategory from "../productCategory/ProductCategory";
import SortProducts from "../sortProducts/SortProducts";
import ListProducts from "../listProducts/ListProducts";

const Home = () => {
  const { AuthCtx } = useAuthentication();
  const { hasRole } = useContext(AuthCtx);
  let mode = hasRole(["ADMIN"]) ? "EDIT" : "VIEW";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ProductCategory />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                paddingLeft: "1%",
              }}
            >
              <SortProducts />
            </div>
          </Grid>
          <ListProducts mode={mode} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
