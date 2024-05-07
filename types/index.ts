import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Users {
  id: string;
  name: string;
  gender: "female" | "male" | "other";
  banned: boolean;
}

export type Animals = {
  id: string;
  name: string;
  type: "cat" | "dog" | "other";
  age: number;
};
