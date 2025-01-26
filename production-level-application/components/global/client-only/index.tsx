"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

function ClientOnly({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

export default ClientOnly;
