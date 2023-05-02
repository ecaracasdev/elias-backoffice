import React from "react";
import { Button, Container } from "@mui/material";
import { HeaderComponent } from "../../components";
// import { character } from "../../api/characters";
import { products } from "../../api/products.api";

export const HomePage: React.FC<{}> = () => {
  React.useEffect(() => {
    products
      .getAll()
      .then((r) => {
        console.log(r.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <Container maxWidth="xl">
      <HeaderComponent
        title="hola mundo"
        description="hola mundo elias"
        element={
          <Button fullWidth variant="contained">
            hola mundo
          </Button>
        }
      />
    </Container>
  );
};
