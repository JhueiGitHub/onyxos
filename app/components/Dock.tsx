import { IconApps } from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";

interface DockProps {
  openApp: (appName: string) => void;
}

const Dock: React.FC<DockProps> = ({ openApp }) => {
  const items = [
    {
      title: "Placeholder App",
      icon: <IconApps />,
      href: "#",
      onClick: () => openApp("placeholder"),
    },
    // Add more app items here
  ];

  return (
    <FloatingDock
      items={items}
      desktopClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2"
    />
  );
};

export default Dock;
