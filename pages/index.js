import Head from "next/head";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const fetcher = (url) => fetch(url).then((res) => res.json());

const joinImagesData = (imagesData = []) => {
  return imagesData.reduce((acc, cur) => {
    return [...acc, ...cur.records];
  }, []);
};

export default function Home() {
  const [gallery, setGallery] = useState([]);
  const { ref: snitchRef, inView: snitchInView } = useInView({ threshold: 0 });
  const { ref: coverRed, inView: coverInView } = useInView({
    threshold: 0.5,
  });

  const { data: imagesData, setSize } = useSWRInfinite(
    (pageIndex) =>
      `https://api.harvardartmuseums.org/image?apikey=${
        process.env.NEXT_PUBLIC_APIKEY
      }&page=${pageIndex + 1}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateAll: false,
    }
  );

  const isReachingEnd = !imagesData?.slice(-1)[0].info.next;

  useEffect(() => {
    setGallery(joinImagesData(imagesData));
  }, [imagesData]);

  useEffect(() => {
    if (!isReachingEnd & snitchInView) {
      setSize((size) => size + 1);
    }
  }, [snitchInView, isReachingEnd, setSize]);

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
      <main
        className={clsx(
          "transition-colors duration-500",
          coverInView ? "bg-red-200" : "bg-gray-900"
        )}
      >
        <div
          ref={coverRed}
          className="h-screen w-screen grid place-items-center"
        >
          <Image
            layout="fixed"
            src="/harvard-logo.png"
            alt="harvard logo"
            width={353}
            height={75}
          />
        </div>
        <div className="text-center max-w-7xl m-auto">
          {gallery.length &&
            gallery.map((image, imageIndex) => (
              <div
                ref={gallery.length - 3 === imageIndex ? snitchRef : undefined}
                className={clsx("relative h-full overflow-hidden")}
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
      </main>
    </div>
  );
}
