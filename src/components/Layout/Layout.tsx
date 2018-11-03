import * as React from 'react';
import Helmet from 'react-helmet';

import Header from '../header';

import './Layout.module.css';

import { IPage } from '../../interfaces';

class Layout extends React.Component<IPage> {
  constructor(props) {
    super(props);

    this.state = {
      isDark: false,
    };
  }

  public render() {
    const {
      children,
      data: {
        site: {
          siteMetadata: { title },
        },
      },
    } = this.props;
    const { isDark } = this.state;

    const themeChanger: string = isDark ? 'dark' : 'light';

    return (
      <>
        <Helmet
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
          title={title}
        >
          <html lang="en" theme={themeChanger} />
        </Helmet>
        <input type="checkbox" value={isDark} onChange={this.toggleTheme} />
        <Header siteTitle={title} />
        <main>{children}</main>
      </>
    );
  }

  public toggleTheme = () => {
    const { isDark } = this.state;

    this.setState({ isDark: !isDark });
  };
}

export default Layout;
