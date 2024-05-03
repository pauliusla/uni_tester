"use client";

import { useState } from "react";
import module from "./Expander.module.scss";

interface Expander {
  end?: boolean;
  title: string;
  expandedLinks: ExpandedLinks[];
}

interface ExpandedLinks {
  title: string;
  link: string;
}

export const Expander = ({
  end = false,
  title,
  expandedLinks,
}: Expander): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onExpand = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${module.container} ${end ? module.end : ""}`}
      onClick={() => onExpand()}
    >
      <a>{title}</a>

      <div
        className={`${module.expandedContainer} ${
          end ? module.expandedContainerEnd : ""
        } ${!isExpanded ? module.hidden : ""}`}
      >
        {expandedLinks.map((link) => {
          return <a href={link.link}>{link.title}</a>;
        })}
      </div>
    </div>
  );
};
