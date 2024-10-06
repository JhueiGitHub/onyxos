// components/Dock.tsx
import { FloatingDock } from "./ui/floating-dock";
import { IconHome, IconSettings } from "@tabler/icons-react";

interface DockProps {
  onOpenApp: (appName: string, event: React.MouseEvent) => void;
}

export default function Dock({ onOpenApp }: DockProps) {
  const dockItems = [
    { title: "Home", icon: <IconHome />, href: "#", appName: "placeholder" },
    {
      title: "Settings",
      icon: <IconSettings />,
      href: "#",
      appName: "placeholder",
    },
  ];

  return (
    <FloatingDock
      items={dockItems}
      onItemClick={(item, event) => onOpenApp(item.appName, event)}
      desktopClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2"
      mobileClassName="fixed bottom-4 right-4"
    />
  );
}
