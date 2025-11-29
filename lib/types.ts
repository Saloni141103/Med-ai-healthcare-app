export type UserRole = "patient" | "doctor" | "staff"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  phone?: string
  gender?: string
  age?: number
  createdAt: string
}

export interface PatientUser extends User {
  role: "patient"
  bloodGroup?: string
  chronicConditions?: string[]
  emergencyContact?: string
}

export interface DoctorUser extends User {
  role: "doctor"
  specialization: string
  experience: number
  licenseNumber: string
  hospital?: string
  qualifications?: string[]
}

export interface StaffUser extends User {
  role: "staff"
  department: string
  staffId: string
  position: string
  shift?: "morning" | "evening" | "night"
}

export interface Symptom {
  id: string
  name: string
  severity: "low" | "moderate" | "high"
  duration: string
  bodyArea?: string
}

export interface SymptomAnalysis {
  id: string
  patientId: string
  symptoms: Symptom[]
  conditions: Condition[]
  urgency: "self-care" | "opd" | "emergency"
  recommendations: string[]
  severity: "low" | "moderate" | "high"
  createdAt: string
  notes?: string
}

export interface Condition {
  id: string
  name: string
  probability: number
  description: string
  icon?: string
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  dateTime: string
  reason: string
  status: "scheduled" | "completed" | "cancelled" | "no-show"
  notes?: string
  consultationType: "in-person" | "video" | "phone"
}

export interface MedicalRecord {
  id: string
  patientId: string
  type: "report" | "prescription" | "scan" | "lab" | "document"
  title: string
  description?: string
  fileUrl?: string
  uploadedAt: string
  doctorId?: string
}

export interface Prescription {
  id: string
  appointmentId: string
  patientId: string
  doctorId: string
  medicines: Medicine[]
  instructions: string
  createdAt: string
  issuedDate: string
  expiryDate?: string
}

export interface Medicine {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
}

export interface HospitalPatient {
  id: string
  patientId: string
  admissionDate: string
  dischargeDate?: string
  bedNumber: string
  department: string
  assignedDoctorId: string
  status: "admitted" | "discharged" | "icu" | "observation"
  notes?: string
}

export interface Task {
  id: string
  assignedToStaffId: string
  title: string
  description?: string
  dueDate: string
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "completed"
  createdAt: string
}

export interface InventoryItem {
  id: string
  name: string
  quantity: number
  unit: string
  minThreshold: number
  category: string
  lastRestockDate: string
}
