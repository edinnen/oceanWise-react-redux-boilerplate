import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../index';
import Links from '../Links';

describe('<Footer />', () => {
  it('should render the Links', () => {
    const renderedComponent = shallow(
      <Footer />
    );
    expect(renderedComponent.contains(
      <section>
        <Links />
      </section>
    )).toBe(true);
  });
});
