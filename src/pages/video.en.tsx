import React, { FC } from 'react';

import { Layout } from 'cmpts/Layout';

const Video: FC = (props) => {
  return (
    <Layout location={props.location}>
      <article>
        <header>
          <h1>{'Video'}</h1>
        </header>
        <ul>
          <li>
            {
              'Фильмы про супергероев — все хуйня и говно (это чтобы не писать про каждый из них, что хуйня и говно). Просто посмотрел тут (ну, как посмотрел, проскакал фильмы минут за 10) «Batman vs Superman: Dawn of Justice (2016)» и «Captain America: Civil War (2016)». Какая всё-таки жвачка.'
            }
          </li>
          <li>
            {
              'Горько!(2013) — В очередной раз посмотрел это кино. Клёво, чего тут. Это фильм-предостережение для брачующихся (sic!), какой не должна быть их свадьба.'
            }
          </li>
        </ul>
      </article>
    </Layout>
  );
};

export default Video;
