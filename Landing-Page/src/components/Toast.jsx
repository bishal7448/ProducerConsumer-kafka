import React from 'react';

function Toast({ toasts, onCloseToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' && '✅'}
            {toast.type === 'error' && '⚠️'}
            {toast.type === 'info' && '🚀'}
          </div>
          <div className="toast-content">
            <h5 className="toast-title">{toast.title}</h5>
            <p className="toast-message">{toast.message}</p>
          </div>
          <button className="toast-close" onClick={() => onCloseToast(toast.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}

export default Toast;
