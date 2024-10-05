// types/index.ts
export interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  appName: string;
}

export interface Origin {
  x: number;
  y: number;
}
