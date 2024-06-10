import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.abs(now.getTime() - date.getTime()) / 1000;
  
  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let interval in intervals) {
    const value = Math.floor(diff / intervals[interval]);
    if (value >= 1) {
      return value === 1 ? `${value} ${interval} ago` : `${value} ${interval}s ago`;
    }
  }

  return 'just now';
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};