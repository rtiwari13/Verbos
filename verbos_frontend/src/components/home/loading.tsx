"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
     

      <motion.h2
        className="text-2xl font-semibold text-gray-800 dark:text-gray-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Loading Verbos...
      </motion.h2>

      <motion.p
        className="text-gray-500 dark:text-gray-400 mt-2 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Preparing your workspace ✨
      </motion.p>

      {/* Fancy pulse bar */}
      <div className="relative mt-6 w-52 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500"
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "100%", "0%"] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
