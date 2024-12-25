import { components } from '@/types/eurosender-api-types';
import { create } from 'zustand';
import { axiosInstance } from '../../utils/axios';

// Type definition for OrderRequest
type OrderRequesthiType = components['schemas']['OrderRequest'];

type DashboardState = {
  dashboardData: any[]; // You might want to refine the type of this if you know the structure of the response data
  isLoading: boolean;
  error: string | null;
  orderData: any[];
  fetchDashboardData: (
    startDate: string,
    endDate: string,
    limit: number,
    skip: number,
    orderCode?: string, // Making `orderCode` optional
  ) => void;
};

const useDashboardStore = create<DashboardState>((set) => ({
  dashboardData: [],
  isLoading: false,
  error: null,
  orderData: [],
  fetchDashboardData: async (
    startDate: string,
    endDate: string,
    limit: number,
    skip: number,
    orderCode?: string, // `orderCode` is now optional
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance().get('/dashboard', {
        params: {
          orderCode, // This will be omitted if `orderCode` is undefined
          startDate,
          endDate,
          limit,
          skip,
        },
      });
      set({ dashboardData: response.data.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useDashboardStore;
