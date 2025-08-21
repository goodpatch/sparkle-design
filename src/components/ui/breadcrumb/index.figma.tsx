import React from "react";
import figma from "@figma/code-connect";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./index";

/**
 * Breadcrumb component Code Connect for Figma
 * ブレッドクラムコンポーネントのFigma Code Connect設定
 * en: Code Connect configuration for Breadcrumb component
 */

/**
 * 基本的なBreadcrumbナビゲーション
 * en: Basic breadcrumb navigation
 */
figma.connect(
  "breadcrumb",
  "https://www.figma.com/design/UMKFYVERnT3YM5Ht8bLJkf/-all-playground?node-id=2755-25149&t=nSzq9SKlxNkN6D14-4",
  {
    props: {},
    example: props => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Current Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
  }
);
