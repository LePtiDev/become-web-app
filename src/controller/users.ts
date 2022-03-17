import { supabase } from "../supabase";

export const getAllUsers = async () => {
    const { data } = await supabase.from('users').select();
    return data
}