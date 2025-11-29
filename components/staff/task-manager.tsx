"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Trash2, Plus } from "lucide-react"
import { dummyTasks } from "@/lib/dummy-data"

export function TaskManager() {
  const [tasks, setTasks] = useState(dummyTasks)
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all")

  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task,
      ),
    )
  }

  const filtered = tasks.filter((task) => filter === "all" || task.status === filter)

  return (
    <div className="glass-card space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Today's Tasks</h2>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg gradient-primary text-white text-sm hover:shadow-lg transition-smooth">
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto">
        {(["all", "pending", "in-progress", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-smooth capitalize ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {filtered.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-lg border transition-smooth ${
              task.status === "completed"
                ? "border-border bg-muted/30 opacity-60"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-1 text-muted-foreground hover:text-primary transition-smooth flex-shrink-0"
              >
                {task.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div className="flex-1">
                <p
                  className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}
                >
                  {task.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Due: {new Date(task.dueDate).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                    task.priority === "high"
                      ? "bg-destructive/20 text-destructive"
                      : task.priority === "medium"
                        ? "bg-warning/20 text-warning"
                        : "bg-success/20 text-success"
                  }`}
                >
                  {task.priority}
                </span>
                <button className="p-2 hover:bg-muted rounded-lg transition-smooth text-muted-foreground hover:text-foreground">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
