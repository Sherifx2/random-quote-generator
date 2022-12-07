import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Data from "./api/data";

interface Quote {
  text: string;
  author: string;
}

export async function getServerSideProps() {
  const res = await fetch("https://type.fit/api/quotes");
  return {
    props: {
      quote: await res.json(),
    },
  };
}

export default function Home() {
  const [quote, setQuote] = useState(Data[0]);

  const getQuote = () => {
    let randomNum = Math.floor(Math.random() * Data.length);
    setQuote(Data[randomNum]);
  };
  return (
    <>
      <Head>
        <title>Random Quote Generator</title>
      </Head>
      <div id="quote-box" className={styles.container}>
        <h1 id="quote-box" className={styles.overflow}>
          "{quote.text}"
        </h1>
        <div className={styles.right}>
          <p id="author" className={styles.right}>
            -{quote.author}
          </p>
        </div>
        <div className="buttons">
          <a href={`https://twitter.com/intent/tweet?text="${quote.text}" -${quote.author}`}
          target="_blank" 
          rel="noopener noreferrer"
          id="tweet-quote">Tweet</a>
          <button onClick={getQuote} id="new-quote">
            New Quote
          </button>
        </div>
      </div>
    </>
  );
}
