import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Harvard Museums</title>
        <meta name="Harvard Museums Galery" content="Harvard Museums Galery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-indigo-500">Harvard Museums</h1>
      </main>
    </div>
  );
}
