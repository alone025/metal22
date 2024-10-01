import * as React from 'react';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function CheckMarkAnimation({ start }: { start: boolean }) {
  const controls = useAnimation();

  const variants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 },
  };

  const transition = {
    duration: 0.4,
    ease: 'easeInOut',
  };

  useEffect(() => {
    if (start) {
      controls.start('visible');
    }
  }, [controls, start]);

  return (
    <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-green-400  bg-white p-16 shadow-2xl">
        <svg viewBox="0 0 24 24" className="h-20 w-20">
          <motion.path
            width={'100'}
            height={'100'}
            d="M20 6L9 17L4 12"
            fill="transparent"
            stroke="green"
            strokeWidth="2"
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={transition}
          />
        </svg>
        {start && <p className="mt-4 text-green-400">Отправлено</p>}
      </div>
    </motion.div>
  );
}
