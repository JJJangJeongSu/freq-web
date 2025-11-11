/**
 * useCurrentUser Hook
 *
 * AuthContext에서 현재 사용자 정보를 가져오는 custom hook
 */

import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const useCurrentUser = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useCurrentUser must be used within an AuthProvider');
  }

  return context;
};
