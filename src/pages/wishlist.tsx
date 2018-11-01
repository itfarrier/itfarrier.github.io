import * as React from 'react';

import Layout from '../components/Layout';

const Wishlist: React.SFC = () => (
  <Layout>
    <article>
      <header>
        <h1>
          Чтобы не&nbsp;забывать, следить за&nbsp;приоритетами и&nbsp;знать, что хочу на&nbsp;самом
          деле, а&nbsp;что сиюминутно.
        </h1>
      </header>
      <section>
        <header>
          <h1>Нужно:</h1>
        </header>
        <ul>
          <li>
            Достойный заработок на&nbsp;любимой (на&nbsp;любимой, а&nbsp;не&nbsp;той, что
            из&nbsp;необходимости) работе;
          </li>
          <li>Рюкзак;</li>
          <li>Спальник;</li>
          <li>Коврик;</li>
          <li>Палатка;</li>
          <li>Повербанк;</li>
          <li>Зарядка.</li>
        </ul>
      </section>
      <section>
        <header>
          <h1>Пока не нужно:</h1>
        </header>
        <ul>
          <li>ВАЗ 2101;</li>
          <li>«Более лучший» звук;</li>
          <li>
            Парилка (
            <a
              href="https://www.fasttech.com/products/0/10018663/3861801-authentic-wismec-reuleaux-rx200-200w-tc-vw-apv"
              target="_blank"
              rel="external"
            >
              мод
            </a>
            ,{' '}
            <a
              href="https://www.fasttech.com/products/0/10007916/1696702-stillare-storm-styled-rebuildable-dripping"
              target="_blank"
              rel="external"
            >
              дрипка
            </a>
            ,{' '}
            <a
              href="https://www.fasttech.com/products/0/10007916/1696702-stillare-storm-styled-rebuildable-dripping"
              target="_blank"
              rel="external"
            >
              <nobr>дрип-тип</nobr>
            </a>
            );
          </li>
          <li>Граммофон;</li>
          <li>
            <del>УШМ</del>;
          </li>
          <li>Ремонт;</li>
          <li>
            <del>ПК</del>;
          </li>
          <li>Проектор;</li>
          <li>Посудомоечная машина;</li>
          <li>ГАЗ 21;</li>
          <li>ГАЗ 24.</li>
        </ul>
      </section>
      <section>
        <header>
          <h1>Выполнено:</h1>
        </header>
        <ul>
          <li>УШМ;</li>
          <li>ПК.</li>
        </ul>
      </section>
    </article>
  </Layout>
);

export default Wishlist;
