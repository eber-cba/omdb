import { Grid } from "@nextui-org/react";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { Card } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { Col } from "@nextui-org/react";

export default function Home({ data }) {
 
  const IMAGE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <Layout className={styles.container}>
      <div>
        <h1>pelis populares</h1>
        {data.results.map(({ id, title, poster_path}) => (
          <div key={id}>
            <Grid xs={8} sm={5}>
              <Card cover>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                  <Col>
                    <Text
                      size={15}
                      weight="bold"
                      transform="uppercase"
                      color="#ffffffAA"
                    >
                      {title}
                    </Text>
                  </Col>
                </Card.Header>
                <Card.Image
                  src={IMAGE_URL + poster_path}
                  height="100%"
                  width="100%"
                  alt="Card image background"
                />
              </Card>
            </Grid>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const API_KEY = "api_key=20d06bd9b3cb98e9acba015da2d31925";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL =
    BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
  try {
    const res = await fetch(`${API_URL}`);
    const data = await res.json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
