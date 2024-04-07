import React from "react";
import { iconColletion } from "@/lib/iconCollection";

type IconProps = {
  iconName: keyof typeof iconColletion;
  width?: number;
  height?: number;
  className?: string;
};

const Icon = (props: IconProps) => {
  const { iconName, width = 25, height = 25, className = "" } = props;

  const IconComponent = iconColletion[iconName];

  return <IconComponent width={width} height={height} className={className} />;
};

export default Icon;
