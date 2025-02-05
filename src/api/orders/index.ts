import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { InsertTables, Tables, UpdateTables } from '@/types';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

//for admin to get all the orders
export const useAdminOrderList = ({ archived = false }) => {
  const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];

  return useQuery({
    queryKey: ['orders', { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .in('status', statuses)
        //.order('created_at', { ascending: true });
        .order('schedule_time', { ascending: true }); //for sheduling
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

//for users to get all orders
export const useMyOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ['orders', { userId: id }],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

//retrieves detailed information about a specific order from the Supabase database
export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*)),profiles(*)')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};



//for cart
export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn({ schedule_time, ...data }: { schedule_time?: string } & InsertTables<'orders'>) {
      // Ensure schedule_time is in ISO format, or set to current time if not provided
      const formattedScheduleTime = schedule_time || new Date().toISOString();
      
      const { error, data: newOrder } = await supabase
        .from('orders')
        .insert({ ...data, user_id: userId, schedule_time: formattedScheduleTime })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newOrder;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['orders']);
    },
  });
};


export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: number;
      updatedFields: UpdateTables<'orders'>;
    }) {
      const { error, data: updatedOrder } = await supabase
        .from('orders')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedOrder;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries(['orders']);
      await queryClient.invalidateQueries(['orders', id]);
    },
  });
};