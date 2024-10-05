"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface TopBarProps {
  currentPath: string;
  onPathChange: (path: string) => void;
}

export default function TopBar({ currentPath, onPathChange }: TopBarProps) {
  const pathParts = currentPath.split("/").filter(Boolean);

  const handleNavigate = (index: number) => {
    const newPath = "/" + pathParts.slice(0, index + 1).join("/");
    onPathChange(newPath);
  };

  return (
    <div className="flex items-center p-2 bg-gray-200 dark:bg-gray-700">
      <button
        className="p-1 mr-2 rounded-full bg-gray-300 dark:bg-gray-600"
        onClick={() =>
          onPathChange(currentPath.split("/").slice(0, -1).join("/") || "/")
        }
      >
        <ChevronLeft size={16} />
      </button>
      <button
        className="p-1 mr-2 rounded-full bg-gray-300 dark:bg-gray-600"
        onClick={() => {
          /* Implement forward navigation */
        }}
      >
        <ChevronRight size={16} />
      </button>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => onPathChange("/")}>
              Root
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathParts.map((part, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {index === pathParts.length - 1 ? (
                  <BreadcrumbPage>{part}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink onClick={() => handleNavigate(index)}>
                    {part}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < pathParts.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
