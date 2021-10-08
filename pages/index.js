import Head from "next/head";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const {
    data: imagesData,
    size,
    setSize,
  } = useSWRInfinite(
    (pageIndex) =>
      `https://api.harvardartmuseums.org/image?apikey=${
        process.env.NEXT_PUBLIC_APIKEY
      }&page=${pageIndex + 1}`,
    fetcher
  );

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta
          name="Harvard Museums Gallery"
          content="Harvard Museums Gallery"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="text-center max-w-7xl m-auto">
          {imagesData &&
            imagesData.map((imageData) => {
              return imageData.records.map((image) => (
                <div
                  className="relative h-full overflow-hidden"
                  key={image.imageid}
                >
                  <Image
                    src={`${image.baseimageurl}?width=300`}
                    alt={image.alttext}
                    width={300}
                    height={480}
                    loading="lazy"
                  />
                </div>
              ));
            })}
        </div>
        <button onClick={() => setSize(size + 1)}>Load More</button>
      </main>
    </div>
  );
}
