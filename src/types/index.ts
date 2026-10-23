export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  stock: number
  thumbnail: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface CartItem {
  id: number
  title: string
  price: number
  thumbnail: string
  stock: number
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

export interface LoginFormValues {
  username: string
  password: string
}

export interface CheckoutFormValues {
  fullName: string
  email: string
  address: string
  city: string
}
