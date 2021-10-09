import Head from "next/head";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";
import clsx from "clsx";
import { useEffect, useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

const joinImagesData = (imagesData = []) => {
  console.log(imagesData);
  return imagesData.reduce((acc, cur) => {
    return [...acc, ...cur.records];
  }, []);
};

export default function Home() {
  const [gallery, setGallery] = useState([]);
  const {
    data: imagesData,
    size,
    setSize,
  } = useSWRInfinite(
    (pageIndex) =>
      `https://api.harvardartmuseums.org/image?apikey=${
        process.env.NEXT_PUBLIC_APIKEY
      }&page=${pageIndex + 1}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    setGallery(joinImagesData(imagesData));
  }, [imagesData]);

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
          {gallery.length &&
            gallery.map((image, imageIndex) => (
              <div
                className={clsx(
                  "relative h-full overflow-hidden",
                  gallery.length - 3 === imageIndex && "border border-red-400"
                )}
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
            ))}
        </div>
        <button onClick={() => setSize(size + 1)}>Load More</button>
      </main>
    </div>
  );
}
