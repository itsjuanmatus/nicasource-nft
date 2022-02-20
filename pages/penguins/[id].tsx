import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Penguin } from '../../types/penguin';
interface Props {
  penguin: Penguin;
}

const Penguin: NextPage<Props> = ({ penguin }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="w-full md:flex">
        <div
          className="hidden min-h-screen md:w-1/2 md:flex flex-col"
          style={{
            backgroundColor: penguin.background,
          }}
        >
          <div className="m-auto grid justify-items-center gap-y-10">
            <Image
              src={penguin.image}
              alt="NFT of penguin"
              width={400}
              height={400}
              className="border rounded-md"
            />
          </div>
        </div>
        <div className="md:w-1/2 min-h-screen bg-slate-100 flex flex-col">
          <div className="my-auto px-24 grid gap-y-10 justify-items-start">
            <Link href="/">
              <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                Back to products
              </p>
            </Link>
            <div className="grid gap-y-5">
              <div className="flex gap-x-5 items-center">
                <h1 className="text-3xl font-bold">{penguin.name}</h1>
                <p className="text-gray-500 text-lg">#{penguin.number}</p>
              </div>
              <p className="md:w-1/2 text-gray-500">{penguin.description}</p>
              <div className="grid md:flex items-center gap-5">
                <button className="flex py-2.5 px-5 border rounded-lg text-white bg-blue-500 hover:bg-blue-700 max-w-max">
                  Buy now
                </button>
                <div className="flex gap-x-2">
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
            </div>
          </div>
        </div>
      </main>
    </div>
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
