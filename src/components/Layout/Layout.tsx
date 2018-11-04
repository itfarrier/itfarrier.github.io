import * as React from 'react';
import Helmet from 'react-helmet';

import Header from '../header';

import './Layout.module.css';

import { ILayout, IPage } from '../../interfaces';

class Layout extends React.Component<ILayout, { isDark: boolean }> {
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
          htmlAttributes={{ lang: 'en', theme: themeChanger }}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
          title={title}
        />
        <Header themeIsDark={isDark} toggleTheme={this.toggleTheme} />
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
