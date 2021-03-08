import React, { FC } from 'react';

import { Layout } from 'cmpts/Layout';

const Wishlist: FC = (props) => {
  return (
    <Layout location={props.location}>
      <article>
        <header>
          <h1>{'Wishlist'}</h1>
        </header>
        <section>
          <header>
            <h2>{'Needs:'}</h2>
          </header>
          <ul>
            <li>{'3 iPhones;'}</li>
            <li>{'NAS;'}</li>
            <li>{'Better stereo;'}</li>
            <li>{'Curved clincher;'}</li>
            <li>{'House with a land;'}</li>
            <li>{'Bite correction;'}</li>
            <li>{'Nippers;'}</li>
            <li>{'Headphones;'}</li>
            <li>{'Hoof knife loop;'}</li>
            <li>{'Hoof knife;'}</li>
            <li>{'Hoof stand;'}</li>
            <li>{'Lose weight;'}</li>
            <li>{'Apron;'}</li>
            <li>{'Headlight.'}</li>
          </ul>
        </section>
        <section>
          <header>
            <h2>{'Done:'}</h2>
          </header>
          <ul>
            <li>{'Decent salary at my favourite (at my beloved, not necessary) work;'}</li>
            <li>{'Backpack;'}</li>
            <li>{'Sleeping bag;'}</li>
            <li>{'Mat;'}</li>
            <li>{'Tent;'}</li>
            <li>{'Power bank;'}</li>
            <li>{'Charger;'}</li>
            <li>{'Grinder tool;'}</li>
            <li>{'PC.'}</li>
          </ul>
        </section>
      </article>
    </Layout>
  );
};

export default Wishlist;
