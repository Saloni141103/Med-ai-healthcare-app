"use client"

import { useState } from "react"
import { Plus, User, Bed, Users } from "lucide-react"

interface AdmittedPatient {
  id: string
  name: string
  age: number
  bedNumber: string
  department: string
  doctor: string
  status: string
}

const admittedPatients: AdmittedPatient[] = [
  {
    id: "1",
    name: "Robert Wilson",
    age: 65,
    bedNumber: "ICU-101",
    department: "Cardiology",
    doctor: "Dr. Sarah Smith",
    status: "Critical",
  },
  {
    id: "2",
    name: "Maria Garcia",
    age: 42,
    bedNumber: "3-201",
    department: "Neurology",
    doctor: "Dr. James Brown",
    status: "Stable",
  },
]

export function PatientAdmission() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="glass-card space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Admitted Patients</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg gradient-primary text-white text-sm hover:shadow-lg transition-smooth"
        >
          <Plus className="w-4 h-4" />
          Admit Patient
        </button>
      </div>

      {showForm && (
        <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-3 animate-slide-in">
          <input
            type="text"
            placeholder="Patient Name"
            className="w-full px-4 py-2 rounded-lg bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <select className="w-full px-4 py-2 rounded-lg bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option>Select Department</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Emergency</option>
          </select>
          <input
            type="text"
            placeholder="Bed Number"
            className="w-full px-4 py-2 rounded-lg bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded-lg gradient-primary text-white font-semibold hover:shadow-lg">
              Admit
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 py-2 rounded-lg border border-border text-foreground hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Patient List */}
      <div className="space-y-2">
        {admittedPatients.map((patient) => (
          <div
            key={patient.id}
            className="p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground">{patient.name}</p>
                <p className="text-sm text-muted-foreground">{patient.age} years</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  patient.status === "Critical" ? "bg-destructive/20 text-destructive" : "bg-success/20 text-success"
                }`}
              >
                {patient.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Bed className="w-4 h-4" />
                {patient.bedNumber}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4" />
                {patient.department}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <User className="w-4 h-4" />
                {patient.doctor}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
