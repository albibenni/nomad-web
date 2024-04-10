import React from "react";
import { IconName, iconCollection } from "@/lib/iconCollection";

type IconProps = {
  iconName: IconName;
  width?: number;
  height?: number;
  className?: string;
};

const Icon = (props: IconProps) => {
  const { iconName, width = 25, height = 25, className = "" } = props;

  const IconComponent = iconCollection[iconName];

  return <IconComponent width={width} height={height} className={className} />;
};

export default Icon;
