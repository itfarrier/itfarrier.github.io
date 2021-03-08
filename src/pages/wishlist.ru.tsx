import React, { FC } from 'react';

import { Layout } from 'cmpts/Layout';

const Wishlist: FC = (props) => {
  return (
    <Layout location={props.location}>
      <article>
        <section>
          <header>
            <h1>Нужно:</h1>
          </header>
          <ul>
            <li>3 iPhon’а;</li>
            <li>NAS;</li>
            <li>«Более лучший» звук;</li>
            <li>«Крокодилы»;</li>
            <li>Дом с землёй;</li>
            <li>Исправить прикус;</li>
            <li>Клещи по рогу;</li>
            <li>Наушники;</li>
            <li>Нож копытный петлевой;</li>
            <li>Нож копытный;</li>
            <li>Подставка;</li>
            <li>Убрать сало;</li>
            <li>Фартук;</li>
            <li>Фонарь налобный.</li>
          </ul>
        </section>
        <section>
          <header>
            <h1>Выполнено:</h1>
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
            <li>Зарядка;</li>
            <li>УШМ;</li>
            <li>ПК.</li>
          </ul>
        </section>
      </article>
    </Layout>
  );
};

export default Wishlist;
