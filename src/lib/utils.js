import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function filterString(str) {
  const words = str.trim().split(/\s+/);
  if (words.length <= 10) {
    return str;
  }
  return words.slice(0, 10).join(" ") + "...";
}

export function priceFormat(cost) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(cost);
}

export const calculateTotalEstimatedTime = (services, servicesData) => {
  let totalEstimatedTime = 0;
  services.forEach((serviceId) => {
    const service = servicesData.find((service) => service.id === serviceId);
    totalEstimatedTime += service.estimate;
  });
  return totalEstimatedTime;
};

export const calculateTotalPrice = (services, servicesData) => {
  let totalPrice = 0;
  services.forEach((serviceId) => {
    const service = servicesData.find((service) => service.id === serviceId);
    totalPrice += service.cost;
  });
  return totalPrice;
};

export const truncateMessage = (message, wordCount) => {
  const words = message.split(" ");
  return words.length > wordCount
    ? words.slice(0, wordCount).join(" ") + "..."
    : message;
};
