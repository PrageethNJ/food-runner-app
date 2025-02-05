import { supabase } from '@/lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

//custom hook
export const useProductList = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};


export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products') //from products table
        .select('*')  //select all
        .eq('id', id) //from id column, equal to value of id
        .single();  //take first item and return it as an object

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};


export const useInsertProduct = () => {
  const queryClient = useQueryClient(); //get acsess to query client

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from('products')
        .insert({
          name: data.name,
          image: data.image,
          price: data.price,
          price_s: data.price_s,
          price_l: data.price_l,
          price_xl: data.price_xl,
          description: data.description,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    //call this when function is sucsessfully executes
    async onSuccess() {
      await queryClient.invalidateQueries(['products']);
    },
  });
};


export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: updatedProduct } = await supabase
        .from('products')
        .update({
          name: data.name,
          image: data.image,
          price: data.price,
          price_s: data.price_s,
          price_l: data.price_l,
          price_xl: data.price_xl,
          description: data.description,
        })
        .eq('id', data.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries(['products']);
      await queryClient.invalidateQueries(['products', id]);
    },
  });
};


export const useDeleteProduct = () => {
  
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      //console.log(id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['products']);
    },
  });
};
