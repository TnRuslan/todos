import classNames from 'classnames';
import React from 'react';
import { titleStyles } from './title.styles';

type Props = React.ComponentPropsWithoutRef<'h3'> & {
  text: string;
  color?: string;
  size?: number;
  extraTitleStyle?: string;
};

export const Title = ({
  color,
  size,
  text,
  extraTitleStyle,
  ...props
}: Props): React.ReactNode => {
  return (
    <h3
      className={classNames(titleStyles(color, size), extraTitleStyle)}
      {...props}
    >
      {text}
    </h3>
  );
};
