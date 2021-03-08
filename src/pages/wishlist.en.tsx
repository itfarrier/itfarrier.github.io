import React, { FC } from 'react';

import { Layout } from 'cmpts/Layout';

const Wishlist: FC = (props) => {
  return (
    <Layout location={props.location}>
      <article>
        <section>
          <header>
            <h1>Needs:</h1>
          </header>
          <ul>
            <li>3 iPhones;</li>
            <li>NAS;</li>
            <li>Better stereo;</li>
            <li>Curved clincher;</li>
            <li>House with a&nbsp;land;</li>
            <li>Bite correction;</li>
            <li>Nippers;</li>
            <li>Headphones;</li>
            <li>Hoof knife loop;</li>
            <li>Hoof knife;</li>
            <li>Hoof stand;</li>
            <li>Lose weight;</li>
            <li>Apron;</li>
            <li>Headlight.</li>
          </ul>
        </section>
        <section>
          <header>
            <h1>Done:</h1>
          </header>
          <ul>
            <li>
              Decent salary at&nbsp;my&nbsp;favourite (at&nbsp;my&nbsp;beloved, not necessary) work;
            </li>
            <li>Backpack;</li>
            <li>Sleeping bag;</li>
            <li>Mat;</li>
            <li>Tent;</li>
            <li>Power bank;</li>
            <li>Charger;</li>
            <li>Grinder tool;</li>
            <li>PC.</li>
          </ul>
        </section>
      </article>
    </Layout>
  );
};

export default Wishlist;
