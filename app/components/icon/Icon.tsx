import React from "react";
import { iconColletion } from "@/lib/iconCollection";

type IconProps = {
  iconName: keyof typeof iconColletion;
  width?: number;
  heigth?: number;
  className?: string;
};

const Icon = (props: IconProps) => {
  const IconComponent = iconColletion[props.iconName];

  const widthProps = props.width ?? 50;
  const heigthProps = props.heigth ?? 50;

  const additionalClasses = props.className ?? "";

  return (
    <IconComponent
      width={widthProps}
      height={heigthProps}
      className={additionalClasses}
    />
  );
};

export default Icon;
