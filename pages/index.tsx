import Head from "next/head";
import styles from "../styles/Home.module.css";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import Container from "../components/Container";
import Grid from "../components/Grid";
import { Pagination } from "../components/Pagination";
import { useFilter } from "../providers/FilterProvider";
import Filter from "../components/Filter";
import ColorFilter from "../components/ColorFilter";

export default function Home() {
  const { products } = useFilter();
  const { pagination, setPage } = useFilter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Miista</title>
      </Head>
      <Container>
        <PageTitle pageTitle={"Products"} />
        <Filter />
        <ColorFilter />
        <Grid>
          {products.map((item, index) => (
            <Product product={item} key={index} />
          ))}
        </Grid>
        <Pagination
          pages={pagination.totalPages}
          currentPage={pagination.currentPage}
          onClick={setPage}
        />
      </Container>
    </div>
  );
}
