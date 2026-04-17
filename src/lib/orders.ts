import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { Order } from "./types";

const ORDERS_FILE = join(process.cwd(), "src/data/orders.json");

function readOrders(): Order[] {
  try {
    return JSON.parse(readFileSync(ORDERS_FILE, "utf-8")) as Order[];
  } catch {
    return [];
  }
}

function writeOrders(orders: Order[]): void {
  writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

export function getAllOrders(): Order[] {
  return readOrders();
}

export function getOrderById(id: string): Order | undefined {
  return readOrders().find((o) => o.id === id);
}

export function getOrderBySessionId(sessionId: string): Order | undefined {
  return readOrders().find((o) => o.stripeSessionId === sessionId);
}

export function getOrderByPaymentIntentId(piId: string): Order | undefined {
  return readOrders().find((o) => o.stripePaymentIntentId === piId);
}

export function createOrder(order: Order): Order {
  const orders = readOrders();
  orders.push(order);
  writeOrders(orders);
  return order;
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const orders = readOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], ...updates };
  writeOrders(orders);
  return orders[idx];
}
