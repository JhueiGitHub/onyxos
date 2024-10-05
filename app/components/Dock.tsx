import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import useGenieEffect from "../../hooks/useGenieEffect";

interface DockItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface DockProps {
  openApp: (appId: string) => void;
}

const dockItems: DockItem[] = [
  {
    id: "placeholder",
    title: "Placeholder",
    icon: <IconLayoutNavbarCollapse />,
  },
  // Add more app icons here
];

const Dock: React.FC<DockProps> = ({ openApp }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-4 left-1/2 transform -translate-x-1/2",
        "flex h-16 items-end rounded-2xl px-4 pb-3",
        "bg-[#000000] bg-opacity-30 border border-[#292929]"
      )}
    >
      {dockItems.map((item) => (
        <DockIcon key={item.id} mouseX={mouseX} {...item} openApp={openApp} />
      ))}
    </motion.div>
  );
};

interface DockIconProps extends DockItem {
  mouseX: MotionValue<number>;
  openApp: (appId: string) => void;
}

const DockIcon: React.FC<DockIconProps> = ({
  id,
  title,
  icon,
  mouseX,
  openApp,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { animateIcon } = useGenieEffect();

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    animateIcon(ref, () => openApp(id));
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="flex items-center justify-center h-full rounded-full bg-[#292929]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {icon}
      </motion.div>
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 2 }}
          className="absolute left-1/2 -top-8 transform -translate-x-1/2 px-2 py-1 rounded-md bg-[#000000] bg-opacity-30 text-[#CCCCCC] text-xs whitespace-nowrap"
        >
          {title}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dock;
