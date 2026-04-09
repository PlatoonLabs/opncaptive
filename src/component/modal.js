import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import './modal.css';

const Modal = ({ isOpen, onClose, title, children, bgColor = '#3b3a3a', textColor = '#ffffff' }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                >
                    <motion.div
                        className={`modal text-black p-4 rounded-md shadow-md w-full max-w-sm`}
                        initial={{ scale: 0.8, opacity: 0}}
                        animate={{ scale: 1, opacity: 1}}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
                        style={{ 
                            backgroundColor: bgColor,
                            color: textColor,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header flex justify-between items-center">
                            <h2 className=''>{title}</h2>
                        </div>
                        <br />
                        <div className="modal-content">
                            {children}
                        </div>
                        <hr className="my-2" />
                        <motion.button
                            onClick={onClose}
                            className="bg-gray-900 text-white p-2 rounded-md shadow-md w-full"
                            whileHover={{ backgroundColor: '#1f2937' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Close
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;