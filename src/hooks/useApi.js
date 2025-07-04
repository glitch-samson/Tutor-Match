import { useState, useCallback } from 'react';
import { showAlert } from '../components/CustomAlert';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall, options = {}) => {
    const {
      showSuccessAlert = false,
      showErrorAlert = true,
      successMessage = 'Operation completed successfully',
      silent = false
    } = options;

    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();
      
      if (showSuccessAlert && !silent) {
        showAlert('success', response.message || successMessage);
      }
      
      return response;
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      
      if (showErrorAlert && !silent) {
        showAlert('error', errorMessage, {
          title: 'Error',
          duration: 5000
        });
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
};