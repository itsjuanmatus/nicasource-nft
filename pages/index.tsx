import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Penguin } from '../types/penguin';
import { motion } from 'framer-motion';

interface Props {
  penguins: Array<Penguin>;
}

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Home: NextPage<Props> = ({ penguins }) => {
  return (
    <motion.div
      className="flex flex-col min-h-screen w-full bg-slate-100"
      exit={{
        opacity: 0,
      }}
      initial="initial"
      animate="animate"
    >
      <Head>
        <title>Nicasource NFTs</title>
        <meta name="description" content="Conference for Nicasource" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-auto grid gap-y-10">
        <h1 className="text-2xl font-bold pt-10 md:pt-0">Select an NFT</h1>
        <motion.div className="grid md:grid-cols-2 gap-10" variants={stagger}>
          {penguins?.map((penguin: Penguin, idx: number) => (
            <Link
              href="/penguins/[id]"
              as={`/penguins/${penguin.number}`}
              key={idx}
            >
              <motion.div
                className="p-5 bg-white border rounded-lg drop-shadow-md cursor-pointer"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  transition: {
                    duration: 0.2,
                  }
                }}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    x: 60,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                >
                  <Image
                    src={penguin.image}
                    alt="NFT of penguin"
                    width={250}
                    height={250}
                    className="border rounded-md"
                  />
                </motion.div>
                <div className="pt-2">
                  <h2 className="text-xl font-bold">{penguin.name}</h2>
                  <p className="text-gray-500">#{penguin.number}</p>
                  <div className="flex items-center gap-2 pt-3">
                    <Image
                      src="/images/ns-logo.jpeg"
                      alt="QR code"
                      width={30}
                      height={29}
                      className="border rounded-md"
                      priority
                    />

                    <p className="text-xl font-semibold">{penguin.price}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </main>

      <footer className="py-5 w-full flex justify-center text-center">
        <p className="italic text-sm">
          These NFTs are not property of Nicasource and are merely used for
          educational purposes. If you are interested in these NFTs you can find
          them{' '}
          <a
            className="cursor-pointer text-blue-600"
            href="https://ranknft.io/collection/pudgypenguins"
          >
            here.
          </a>
        </p>
      </footer>
    </motion.div>
  );
};

Home.getInitialProps = async function () {
  const res = await fetch(
    'https://my-json-server.typicode.com/itsjuanmatus/demo/penguins',
  );
  const data = await res.json();
  return {
    penguins: data,
  };
};

export default Home;
