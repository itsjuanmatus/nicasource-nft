import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Penguin } from '../../types/penguin';
import Head from 'next/head';
interface Props {
  penguin: Penguin;
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

const Penguin: NextPage<Props> = ({ penguin }) => {
  return (
    <motion.div
      className="flex flex-col min-h-screen"
      exit={{
        opacity: 0,
      }}
      initial="initial"
      animate="animate"
    >
      <Head>
        <title>{penguin.name}</title>
        <meta name="description" content={penguin.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main className="w-full md:flex" variants={stagger}>
        <div
          className="hidden min-h-screen md:w-1/2 md:flex flex-col"
          style={{
            backgroundColor: penguin.background,
          }}
        >
          <motion.div
            className="m-auto grid justify-items-center gap-y-10"
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.4,
            }}
          >
            <Image
              src={penguin.image}
              alt="NFT of penguin"
              width={400}
              height={400}
              className="border rounded-md"
            />
          </motion.div>
        </div>
        <div className="md:w-1/2 min-h-screen bg-slate-100 flex flex-col">
          <div className="my-auto px-24 grid gap-y-10 justify-items-start">
            <motion.div variants={fadeInUp}>
              <Link href="/">
                <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                  Back to products
                </p>
              </Link>
            </motion.div>

            <div className="grid gap-y-5">
              <motion.div
                className="flex gap-x-5 items-center"
                variants={fadeInUp}
              >
                <h1 className="text-3xl font-bold">{penguin.name}</h1>
                <p className="text-gray-500 text-lg">#{penguin.number}</p>
              </motion.div>
              <motion.p className="md:w-1/2 text-gray-500" variants={fadeInUp}>
                {penguin.description}
              </motion.p>
              <motion.div
                className="grid md:flex items-center gap-5"
                variants={stagger}
              >
                <motion.button
                  variants={fadeInUp}
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="flex py-2.5 px-5 border rounded-lg text-white bg-blue-500 hover:bg-blue-700 max-w-max"
                >
                  Buy now
                </motion.button>
                <motion.div className="flex gap-x-2" variants={fadeInUp}>
                  <Image
                    src="/images/ns-logo.jpeg"
                    alt="QR code"
                    width={30}
                    height={29}
                    className="border rounded-md"
                    priority
                  />
                  <p className="text-xl font-semibold">{penguin.price}</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.main>
    </motion.div>
  );
};

Penguin.getInitialProps = async function (context) {
  const { id } = context.query;
  const res = await fetch(
    `https://my-json-server.typicode.com/itsjuanmatus/demo/penguins/?number=${id}`,
  );
  const penguin = await res.json();
  return { penguin: penguin[0] };
};

export default Penguin;
