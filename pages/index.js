import Head from "next/head";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ChevronDoubleDown from "@/public/chevron-double-down.svg";
import { fetcher } from "utilities/api";

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
          coverInView ? "bg-red-200" : "white"
        )}
      >
        <div
          ref={coverRed}
          className="h-screen w-screen grid place-items-center relative"
        >
          <Image
            layout="fixed"
            src="/harvard-logo.png"
            alt="harvard logo"
            width={353}
            height={75}
          />
          <ChevronDoubleDown
            className={clsx(
              "w-6 absolute m-auto transition-opacity duration-500 mx-auto left-0 right-0",
              coverInView ? "opacity-100" : "opacity-0"
            )}
            style={{
              bottom: "12%",
              animation:
                "shake-vertical 2s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both;",
            }}
          />
        </div>
        <div className="text-center max-w-7xl m-auto divide-y divide-gray-300">
          {gallery.length &&
            gallery.map((image, imageIndex) => (
              <div
                ref={gallery.length - 3 === imageIndex ? snitchRef : undefined}
                className={"relative h-full overflow-hidden"}
                key={image.imageid}
              >
                <div className="m-20 p-10 grid place-items-center ">
                  <div className="relative">
                    <Image
                      className="bg-gray-100"
                      src={`${image.baseimageurl}?width=450`}
                      alt={image.alttext}
                      width={450}
                      height={720}
                      loading="lazy"
                    />
                    <div className="absolute left-full ml-8 top-8 font-serif text-left w-60">
                      <ul className="text-sm space-y-2">
                        <li>
                          <span className="text-gray-500 mr-3">Idsid: </span>{" "}
                          {image.idsid ? (
                            image.idsid
                          ) : (
                            <span className="text-gray-500">N/D</span>
                          )}
                        </li>

                        <li>
                          <span className="text-gray-500 mr-3">Date: </span>
                          <span className="italic">
                            {image.date ? (
                              image.date
                            ) : (
                              <span className="text-gray-500">N/D</span>
                            )}
                          </span>
                        </li>
                        <li>
                          <span className="text-gray-500 mr-3">
                            Technique:{" "}
                          </span>
                          <span className="italic">
                            {image.technique ? (
                              image.technique
                            ) : (
                              <span className="text-gray-500">N/D</span>
                            )}
                          </span>
                        </li>
                      </ul>
                      {image.description && (
                        <p className="italic mt-6">{image.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
