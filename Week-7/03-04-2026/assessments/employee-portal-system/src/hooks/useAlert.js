import { useState, useCallback, useRef } from 'react';

export function useAlert(autoDismissMs = 3500) {
  const [alert, setAlert] = useState(null);
  const timerRef = useRef(null);

  const showAlert = useCallback(
    (type, message) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setAlert({ type, message });
      timerRef.current = setTimeout(() => setAlert(null), autoDismissMs);
    },
    [autoDismissMs]
  );

  const clearAlert = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setAlert(null);
  }, []);

  return { alert, showAlert, clearAlert };
}
