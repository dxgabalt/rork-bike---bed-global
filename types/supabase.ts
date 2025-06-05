export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accommodation_images: {
        Row: {
          id: string
          accommodation_id: string
          image_url: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          accommodation_id: string
          image_url: string
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          accommodation_id?: string
          image_url?: string
          is_primary?: boolean
          created_at?: string
        }
      }
      accommodation_reviews: {
        Row: {
          id: string
          booking_id: string
          user_id: string
          accommodation_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          user_id: string
          accommodation_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          user_id?: string
          accommodation_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      accommodations: {
        Row: {
          id: string
          host_id: string
          name: string
          description: string
          location: string
          address: string
          latitude: number | null
          longitude: number | null
          price_per_night: number
          capacity: number
          bedrooms: number
          bathrooms: number
          has_bike_storage: boolean
          has_bike_rental: boolean
          has_bike_tools: boolean
          has_laundry: boolean
          has_wifi: boolean
          has_kitchen: boolean
          has_parking: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id: string
          name: string
          description: string
          location: string
          address: string
          latitude?: number | null
          longitude?: number | null
          price_per_night: number
          capacity: number
          bedrooms: number
          bathrooms: number
          has_bike_storage?: boolean
          has_bike_rental?: boolean
          has_bike_tools?: boolean
          has_laundry?: boolean
          has_wifi?: boolean
          has_kitchen?: boolean
          has_parking?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string
          name?: string
          description?: string
          location?: string
          address?: string
          latitude?: number | null
          longitude?: number | null
          price_per_night?: number
          capacity?: number
          bedrooms?: number
          bathrooms?: number
          has_bike_storage?: boolean
          has_bike_rental?: boolean
          has_bike_tools?: boolean
          has_laundry?: boolean
          has_wifi?: boolean
          has_kitchen?: boolean
          has_parking?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          phone: string | null
          role: 'user' | 'host' | 'admin'
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'user' | 'host' | 'admin'
          language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'user' | 'host' | 'admin'
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      // Add other table types as needed...
    }
  }
}