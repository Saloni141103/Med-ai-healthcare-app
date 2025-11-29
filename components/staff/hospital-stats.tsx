"use client"

import { Users, Activity, Check, AlertTriangle } from "lucide-react"

export function HospitalStats() {
  const stats = [
    { label: "Total Patients", value: "156", icon: Users, color: "primary" },
    { label: "Currently Admitted", value: "42", icon: Activity, color: "secondary" },
    { label: "Discharged Today", value: "8", icon: Check, color: "success" },
    { label: "Critical Cases", value: "3", icon: AlertTriangle, color: "warning" },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        const colorMap = {
          primary: "bg-primary/20 text-primary",
          secondary: "bg-secondary/20 text-secondary",
          warning: "bg-warning/20 text-warning",
          success: "bg-success/20 text-success",
        }

        return (
          <div key={idx} className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[stat.color as keyof typeof colorMap]}`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
