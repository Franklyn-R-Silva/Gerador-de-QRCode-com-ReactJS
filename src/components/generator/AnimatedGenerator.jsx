// src/components/generator/AnimatedGenerator.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedGenerator.css";

const AnimatedGenerator = ({ children, type, isVisible = true }) => {
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={type}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="animated-generator-container"
        >
          <motion.div variants={itemVariants}>{children}</motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const AnimatedCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      }}
      className="animated-card"
    >
      {children}
    </motion.div>
  );
};

export const AnimatedButton = ({
  children,
  onClick,
  variant = "primary",
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={`animated-button animated-button-${variant}`}
      {...props}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export const AnimatedInput = ({
  label,
  value,
  onChange,
  type = "text",
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="animated-input-wrapper"
    >
      {label && (
        <motion.label
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="animated-input-label"
        >
          {label}
        </motion.label>
      )}
      <motion.input
        type={type}
        value={value}
        onChange={onChange}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="animated-input"
        {...props}
      />
    </motion.div>
  );
};

export const AnimatedPreview = ({ children, isLoading = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: isLoading ? 360 : 0,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="animated-preview"
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="preview-loading"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="loading-spinner"
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const AnimatedToast = ({ message, type = "info", onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`animated-toast animated-toast-${type}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="toast-icon"
      >
        {type === "success" && "✓"}
        {type === "error" && "✕"}
        {type === "info" && "ℹ"}
      </motion.div>
      <span>{message}</span>
      {onClose && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="toast-close"
        >
          ✕
        </motion.button>
      )}
    </motion.div>
  );
};

export const AnimatedList = ({ items, renderItem }) => {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.07,
          },
        },
      }}
      className="animated-list"
    >
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.li
            key={item.id || index}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            exit={{
              opacity: 0,
              x: 20,
              transition: { duration: 0.2 },
            }}
            layout
            className="animated-list-item"
          >
            {renderItem(item, index)}
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export const AnimatedModal = ({ isOpen, onClose, children, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="animated-modal-overlay"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="animated-modal"
          >
            {title && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="modal-header"
              >
                <h2>{title}</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="modal-close"
                >
                  ✕
                </motion.button>
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="modal-content"
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnimatedGenerator;
