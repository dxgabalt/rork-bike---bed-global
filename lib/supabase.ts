import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = 'https://eseezsiwiuogxovjfvrl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZWV6c2l3aXVvZ3hvdmpmdnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTI5ODQsImV4cCI6MjA2MzUyODk4NH0.qG6DhavxqnE0YqgqcFTlr95YpcBj4i7hSGar6AZ03Rg';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper to get the current user's profile
export const getCurrentProfile = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return profile;
  } catch (error) {
    console.error('Error getting current profile:', error);
    return null;
  }
};

// Helper to get accommodations with their images
export const getAccommodations = async () => {
  try {
    const { data: accommodations, error } = await supabase
      .from('accommodations')
      .select(`
        *,
        accommodation_images (
          id,
          image_url,
          is_primary
        ),
        accommodation_reviews (
          rating
        )
      `)
      .eq('is_active', true);

    if (error) throw error;

    return accommodations;
  } catch (error) {
    console.error('Error getting accommodations:', error);
    return [];
  }
};

// Helper to get routes with their images
export const getRoutes = async () => {
  try {
    const { data: routes, error } = await supabase
      .from('routes')
      .select(`
        *,
        route_images (
          id,
          image_url,
          is_primary
        ),
        route_reviews (
          rating,
          difficulty_rating
        )
      `)
      .eq('is_active', true);

    if (error) throw error;

    return routes;
  } catch (error) {
    console.error('Error getting routes:', error);
    return [];
  }
};

// Helper to get user's bookings
export const getUserBookings = async (userId: string) => {
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        *,
        accommodation:accommodations (
          *,
          accommodation_images (
            image_url,
            is_primary
          )
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return bookings;
  } catch (error) {
    console.error('Error getting user bookings:', error);
    return [];
  }
};

// Helper to get user's favorites
export const getUserFavorites = async (userId: string) => {
  try {
    const { data: favorites, error } = await supabase
      .from('favorite_accommodations')
      .select(`
        accommodation_id,
        accommodation:accommodations (
          *,
          accommodation_images (
            image_url,
            is_primary
          ),
          accommodation_reviews (
            rating
          )
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;

    return favorites;
  } catch (error) {
    console.error('Error getting user favorites:', error);
    return [];
  }
};