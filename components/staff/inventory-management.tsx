"use client"

import { AlertTriangle, Package } from "lucide-react"
import { dummyInventory } from "@/lib/dummy-data"

export function InventoryManagement() {
  return (
    <div className="glass-card space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Inventory Status</h2>
        <button className="text-sm text-primary hover:underline">Request Restock</button>
      </div>

      <div className="space-y-3">
        {dummyInventory.map((item) => {
          const isLow = item.quantity < item.minThreshold

          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg border transition-smooth ${
                isLow ? "border-warning bg-warning/5" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isLow ? "bg-warning/20 text-warning" : "bg-primary/20 text-primary"
                    }`}
                  >
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                </div>
                {isLow && <AlertTriangle className="w-5 h-5 text-warning" />}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Stock Level</span>
                  <span className="font-semibold text-foreground">
                    {item.quantity} {item.unit}
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isLow ? "bg-warning" : "bg-gradient-to-r from-primary to-secondary"
                    }`}
                    style={{ width: `${Math.min((item.quantity / item.minThreshold) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Minimum: {item.minThreshold} {item.unit}
                  {isLow && " - Low stock alert!"}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
