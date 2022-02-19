// export typescript type of penguins array
export type Penguin = {
  name: string;
  number: string;
  price: string;
  image: string;
  background: string;
  description: string;
};

export const penguins: Array<Penguin> = [
  {
    name: 'Asian Penguin',
    number: '2238',
    price: '3489',
    image: '/images/asian-penguin.png',
    background: '#AFE1F0',
    description:
      'The Asian penguin is a species of penguin found in the Southern Hemisphere. It is the smallest of the penguin species, with a length of only 1.2 m (3.5 ft) and a weight of only 0.5 kg (1 lb).',
  },
  {
    name: 'Doctor Penguin',
    number: '1239',
    price: '35589',
    image: '/images/doctor-penguin.png',
    background: '#E6CAAF',
    description:
      'The Doctor Penguin is a species of penguin found in the Southern Hemisphere.',
  },
];
