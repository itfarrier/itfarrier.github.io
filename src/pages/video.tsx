import * as React from 'react';

import Layout from '../components/Layout';

const Video: React.FC = () => (
  <Layout>
    <article>
      <header>
        <h1>Видео</h1>
      </header>
      <ul>
        <li>
          Фильмы про супергероев&nbsp;— все хуйня и&nbsp;говно (это чтобы не&nbsp;писать про каждый из&nbsp;них, что
          хуйня и&nbsp;говно). Просто посмотрел тут (ну, как посмотрел, проскакал фильмы минут за&nbsp;10) «Batman
          v&nbsp;Superman: Dawn of&nbsp;Justice (2016)» и&nbsp;«Captain America: Civil War (2016)». Какая{' '}
          <nobr>всё-таки</nobr> жвачка.
        </li>
        <li>
          Горько! (2013) — В очередной раз посмотрел это кино. Клёво, чего тут. Это фильм-предостережение для
          брачующихся (sic!), какой не должна быть их свадьба.
        </li>
      </ul>
    </article>
  </Layout>
);

export default Video;
