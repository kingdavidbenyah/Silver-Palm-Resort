"use client";

import { useMenu } from "@/contexts/menu-context";
import { motion, AnimatePresence } from "framer-motion";

export default function Overlay() {
  const { isMenuOpened } = useMenu();

  return (
    <AnimatePresence>
      {isMenuOpened && (
        <motion.div
          className="fixed inset-0 bg-black/30  z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  );
}
