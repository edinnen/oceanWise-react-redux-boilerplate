import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';
import Logo from './Logo';
import OWLogo from './logo.svg';
import Links from './Links';

function Footer() {
  return (
    <Wrapper>
      <section>
        <Links />
      </section>
      <section>
        <LocaleToggle />
      </section>
      <section>
        <Logo src={OWLogo} alt="Ocean Wise" />
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href="https://edinnen.github.io/">Ethan Dinnen</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
