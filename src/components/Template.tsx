import styled from '@emotion/styled';
import { BaseProps } from '../types/BaseProps';

type TemplateProps = BaseProps & {
  sampleText?: string;
};

const Template: React.FC<TemplateProps> = ({ sampleText, ...props }) => {
  return <div className={props.className}>{sampleText}</div>;
};

export default styled(Template)``;
