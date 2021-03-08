import React, { FC } from 'react';

import { Layout } from 'cmpts/Layout';

const Wishlist: FC = (props) => {
  return (
    <Layout location={props.location}>
      <article>
        <header>
          <h1>{'Мечты'}</h1>
        </header>
        <section>
          <header>
            <h2>{'Нужно:'}</h2>
          </header>
          <ul>
            <li>{'3 iPhon’а;'}</li>
            <li>{'NAS;'}</li>
            <li>{'«Более лучший» звук;'}</li>
            <li>{'«Крокодилы»;'}</li>
            <li>{'Дом с землёй;'}</li>
            <li>{'Исправить прикус;'}</li>
            <li>{'Клещи по рогу;'}</li>
            <li>{'Наушники;'}</li>
            <li>{'Нож копытный петлевой;'}</li>
            <li>{'Нож копытный;'}</li>
            <li>{'Подставка;'}</li>
            <li>{'Убрать сало;'}</li>
            <li>{'Фартук;'}</li>
            <li>{'Фонарь налобный.'}</li>
          </ul>
        </section>
        <section>
          <header>
            <h2>{'Выполнено:'}</h2>
          </header>
          <ul>
            <li>
              {
                'Достойный заработок на любимой (на любимой, а не той, что из необходимости) работе;'
              }
            </li>
            <li>{'Рюкзак;'}</li>
            <li>{'Спальник;'}</li>
            <li>{'Коврик;'}</li>
            <li>{'Палатка;'}</li>
            <li>{'Повербанк;'}</li>
            <li>{'Зарядка;'}</li>
            <li>{'УШМ;'}</li>
            <li>{'ПК.'}</li>
          </ul>
        </section>
      </article>
    </Layout>
  );
};

export default Wishlist;
