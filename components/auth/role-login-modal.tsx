"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, Eye, EyeOff, User, Phone, Briefcase } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import type { UserRole } from "@/lib/types"

interface RoleLoginModalProps {
  role: UserRole
  isOpen: boolean
  onClose: () => void
}

export function RoleLoginModal({ role, isOpen, onClose }: RoleLoginModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [department, setDepartment] = useState("")
  const [staffId, setStaffId] = useState("")

  const { login, signup } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        await login(email, password, role)
        router.push(`/dashboard/${role}`)
      } else {
        const signupData: any = {
          email,
          password,
          name,
          phone,
          role,
        }

        if (role === "doctor") {
          signupData.specialization = specialization
          signupData.licenseNumber = licenseNumber
        } else if (role === "staff") {
          signupData.department = department
          signupData.staffId = staffId
        }

        await signup(signupData)
        router.push(`/dashboard/${role}`)
      }
      onClose()
    } catch (error) {
      console.error("Authentication failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleColor = () => {
    switch (role) {
      case "patient":
        return "from-blue-600 to-blue-500"
      case "doctor":
        return "from-teal-600 to-teal-500"
      case "staff":
        return "from-purple-600 to-purple-500"
    }
  }

  const getRoleIcon = () => {
    switch (role) {
      case "patient":
        return "👤"
      case "doctor":
        return "🩺"
      case "staff":
        return "🏥"
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className={`bg-gradient-to-r ${getRoleColor()} text-white p-6 rounded-t-2xl`}>
                <div className="text-center">
                  <div className="text-5xl mb-3">{getRoleIcon()}</div>
                  <h2 className="text-2xl font-bold capitalize">
                    {role} {isLogin ? "Login" : "Sign Up"}
                  </h2>
                  <p className="text-white/90 mt-2">{isLogin ? "Welcome back!" : "Create your account"}</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Signup Name Field */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required={!isLogin}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Signup Additional Fields */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4"
                  >
                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Doctor-specific fields */}
                    {role === "doctor" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                          <input
                            type="text"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                            placeholder="Cardiologist, Pediatrician, etc."
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                          <input
                            type="text"
                            value={licenseNumber}
                            onChange={(e) => setLicenseNumber(e.target.value)}
                            placeholder="MED123456"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </>
                    )}

                    {/* Staff-specific fields */}
                    {role === "staff" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              value={department}
                              onChange={(e) => setDepartment(e.target.value)}
                              placeholder="Emergency, ICU, etc."
                              required
                              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Staff ID</label>
                          <input
                            type="text"
                            value={staffId}
                            onChange={(e) => setStaffId(e.target.value)}
                            placeholder="STAFF001"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${getRoleColor()} hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </div>
                  ) : (
                    <>{isLogin ? "Sign In" : "Create Account"}</>
                  )}
                </motion.button>

                {/* Toggle Login/Signup */}
                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {isLogin ? (
                      <>
                        Don't have an account?{" "}
                        <span
                          className={`font-semibold bg-gradient-to-r ${getRoleColor()} bg-clip-text text-transparent`}
                        >
                          Sign Up
                        </span>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <span
                          className={`font-semibold bg-gradient-to-r ${getRoleColor()} bg-clip-text text-transparent`}
                        >
                          Sign In
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Demo Credentials */}
                {isLogin && (
                  <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <p className="text-xs text-gray-600">
                      <strong>Demo:</strong> Use any email with password{" "}
                      <code className="bg-gray-200 px-1 rounded">demo123</code>
                    </p>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
