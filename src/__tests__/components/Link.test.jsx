import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Link from '../../components/Link';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link href='http://www.facebook.com'>Facebook</Link>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  act(() => { return tree.props.onMouseEnter(); });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  act(() => { return tree.props.onMouseLeave(); });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
