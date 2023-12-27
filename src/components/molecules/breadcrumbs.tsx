"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";

import { cn, getValidChildren } from "@/lib/utils";

import Link from "next/link";

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  /* The visual separator between each breadcrumb item */
  separator?: React.ReactNode;
  /**
   * If `true`, adds a separator between each breadcrumb item.
   * @default true
   */
  addSeparator?: boolean;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      children,
      className,
      separator = <ChevronRight className="h-4 w-4" />,
      addSeparator = true,
      ...props
    },
    forwardedRef,
  ) => {
    const validChildren = getValidChildren(children);
    const clones = validChildren.map((child, index) => {
      return React.cloneElement(child, {
        addSeparator,
        separator: separator,
        lastChild: validChildren.length === index + 1,
      });
    });

    return (
      <nav
        className={cn("relative break-words", className)}
        aria-label="breadcrumb"
        {...props}
        ref={forwardedRef}
      >
        <ol className="flex items-center">{clones}</ol>
      </nav>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbItemProps extends BreadcrumbProps {
  /**
   * If `true`, indicates that the breadcrumb item is active, adds
   * `aria-current=page` and renders a `span`
   */
  isCurrentPage?: boolean;
  lastChild?: boolean;
}

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps
>(
  (
    {
      children,
      className,
      isCurrentPage,
      lastChild,
      separator,
      addSeparator,
      ...props
    },
    forwardedRef,
  ) => {
    const validChildren = getValidChildren(children);
    const clones = validChildren.map((child) => {
      if (child.type === BreadcrumbLink) {
        return React.cloneElement(child, { isCurrentPage });
      }

      if (child.type === BreadcrumbSeparator) {
        return React.cloneElement(child, {
          children: separator || child.props.children,
        });
      }

      return child;
    });

    return (
      <li
        className={cn(
          "inline-flex items-center overflow-x-hidden",
          !lastChild ? "flex-shrink-0" : "",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        {clones}
        {!lastChild && addSeparator && (
          <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
        )}
      </li>
    );
  },
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<"a">,
    Pick<BreadcrumbItemProps, "isCurrentPage"> {
  as?: React.ElementType;
}

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ className, as: asComp, isCurrentPage, href, ...props }, forwardedRef) => {
  const Comp = (isCurrentPage ? "span" : asComp || Link) as typeof Link;

  return (
    <Comp
      className={cn(
        "truncate text-sm font-medium text-muted-foreground underline-offset-4 transition-colors aria-[current]:text-primary aria-[current]:dark:text-foreground [&:not([aria-current])]:hover:underline",
        className,
      )}
      href={href ?? ""}
      aria-current={isCurrentPage ? "page" : undefined}
      {...props}
      ref={forwardedRef}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

export type BreadcrumbSeparatorProps = React.ComponentPropsWithoutRef<"span">;

export const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(({ className, ...props }, forwardedRef) => {
  return (
    <span
      className={cn("mx-2 opacity-50", className)}
      role="presentation"
      {...props}
      ref={forwardedRef}
    />
  );
});
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
