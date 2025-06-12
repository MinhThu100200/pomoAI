import React from 'react'
import { SvgProps } from 'react-native-svg';

interface Props extends SvgProps {
    icon: React.FC<SvgProps>;
    size?: number;
    color?: string;
}

const Icon = ({icon: Icon, fill, size = 24, color, ...props}: Props) => {
  return <Icon color={color} fill={fill} width={size} height={size} {...props} />;
};

export default Icon