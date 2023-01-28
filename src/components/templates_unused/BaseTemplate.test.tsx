import { render, screen } from '@testing-library/react';
import BaseTemplate from './BaseTemplate';
import { mockBaseTemplateProps } from './BaseTemplate.mocks';

test('Some test', () => {
  render(<BaseTemplate {...mockBaseTemplateProps.base} />);
  expect(screen.getByText('Hello world!')).toBeInTheDocument();
});
