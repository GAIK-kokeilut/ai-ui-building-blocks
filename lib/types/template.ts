import { ReactNode } from "react";

interface SubTemplate {
  title: string;
  description: string;
  route: string;
}

export interface Template {
  title: string;
  description: string;
  icon: ReactNode;
  route: string;
  tags: string[];
  subTemplates?: SubTemplate[];
  link?: boolean;
}
