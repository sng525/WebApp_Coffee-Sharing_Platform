import { z } from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Too short" }),
  username: z.string().min(2, { message: "Too short" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be 8 characters." }),
});

export const PostValidation = z.object({
  brand_id: z.string().min(2).max(100),
  type: z.string().min(2).max(100),
  caption: z.string().min(5).max(2200),
  file:  z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
  rating: z.number(),
  name: z.string().min(2).max(100),
  equipment: z.string().min(2).max(2000)
});

export const ProfileValidation = z.object({
  name: z.string().min(2, { message: "Too short"}),
  username:  z.string().min(2, { message: "Too short"}),
  email:z.string().email(),
  bio: z.string(),
  file: z.custom<File[]>()
});

export const BrandValidation = z.object({
  name: z.string().min(2).max(100),
  file: z.custom<File[]>()
});

export const EquipmentValidation = z.object({
  name: z.string().min(2).max(100),
  type: z.string().min(2).max(100),
  file: z.custom<File[]>(),
  description: z.string().min(2).max(2200)
});
