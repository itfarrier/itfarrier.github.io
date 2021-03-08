import React, { FC } from 'react';

import { Layout } from 'cmpts/Layout';

const NotFoundPage: FC = (props) => {
  return <Layout location={props.location}>404</Layout>;
};

export default NotFoundPage;
