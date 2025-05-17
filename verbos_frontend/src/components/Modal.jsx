import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  primaryButton = null,
  secondaryButton = null,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[var(--card)] rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <h3 className="text-lg font-semibold text-[var(--foreground)]">{title}</h3>
          <button
            onClick={onClose}
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 text-[var(--foreground)]">
          {children}
        </div>

        {/* Footer */}
        {(primaryButton || secondaryButton) && (
          <div className="flex justify-end gap-3 px-4 py-3 border-t border-[var(--border)]">
            {secondaryButton && (
              <button
                onClick={secondaryButton.onClick}
                className="px-4 py-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                {secondaryButton.label}
              </button>
            )}
            {primaryButton && (
              <button
                onClick={primaryButton.onClick}
                className={`px-4 py-2 text-sm rounded-lg ${
                  primaryButton.variant === 'danger'
                    ? 'bg-[var(--destructive)] hover:bg-red-700 text-[var(--primary-foreground)]'
                    : 'bg-[var(--primary)] hover:bg-[var(--ring)] text-[var(--primary-foreground)]'
                } transition-colors`}
              >
                {primaryButton.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal; 