import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"

export const useProfileData = () => {
  return useQuery({
    queryKey:['profile-data'],
    queryFn: async () => {
      const {data, error} = await supabase.from('profiles').select('*');
      if(error){throw new Error(error.message);
      }
      return data;
    }
  })
}


export const useProfileDataByID = (id:String) => {
  return useQuery({
    queryKey:['profile-data', id],
    queryFn: async () => {
      const {data, error} = await supabase.from('profiles').select('*').eq('id',id).single();
      if(error){throw new Error(error.message);
      }
      return data;
    }
  })
}