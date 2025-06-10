import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageModal = ({ show, toggleModal, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") toggleModal();
    };
    if (show) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, toggleModal]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Fond sombre - couvre tout l'écran */}
          <motion.div
            className="absolute inset-0 bg-black/80"
            onClick={toggleModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Contenu modal - centré avec une largeur maximale */}
          <motion.div
            className="relative z-50 max-w-[95vw] max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Conteneur de l'image seulement */}
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && child.type === "img") {
                return React.cloneElement(child, {
                  className:
                    (child.props.className || "") +
                    " max-w-full max-h-[90vh] object-contain",
                });
              }
              return child;
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
