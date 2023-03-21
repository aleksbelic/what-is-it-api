import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Home from '@/components/Home';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Start() {
  return (
    <>
      <Head>
        <title>What is IT - API</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.wrapper}>
        <Header />
        <main className={styles.main}>
          <Home />
        </main>
        <Footer />
      </div>
    </>
  );
}
