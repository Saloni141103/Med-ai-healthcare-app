"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Stethoscope, Building2, Shield, Clock, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmergencyListener } from "@/components/emergency-listener"
import { LanguageSwitcher } from "@/components/language-switcher"
import { AnimatedBackground } from "@/components/animated-background"
import { RoleCard } from "@/components/role-card"
import { RoleLoginModal } from "@/components/auth/role-login-modal"
import { useTranslation } from "@/lib/translations"
import type { UserRole } from "@/lib/types"

export default function HomePage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <AnimatedBackground />

      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex items-center justify-between p-8 max-w-7xl mx-auto"
      >
        <motion.div
          className="flex items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-blue-500/30">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 bg-clip-text text-transparent">
              Med.AI
            </span>
            <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">Healthcare Intelligence</span>
          </div>
        </motion.div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-280px)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 space-y-6 max-w-5xl"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Brain className="w-4 h-4" />
            <span>AI-Powered Healthcare Platform</span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-balance leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Med.AI
            </span>
            <br />
            <span className="text-gray-800 text-5xl md:text-6xl lg:text-7xl">Intelligent Healthcare</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            AI-powered symptom analysis, real-time triage, and automated emergency response
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-8 mt-8 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-medium">24/7 Monitoring</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Brain className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">AI-Powered Triage</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-16">
          <RoleCard
            icon={User}
            title="Patient Login"
            subtitle="Symptom checker, AI chat, history, emergencies"
            onClick={() => handleRoleSelect("patient")}
            gradient="bg-gradient-to-br from-blue-50 to-blue-100"
            delay={0.7}
          />

          <RoleCard
            icon={Stethoscope}
            title="Doctor Login"
            subtitle="Manage cases, triage alerts, respond to patients"
            onClick={() => handleRoleSelect("doctor")}
            gradient="bg-gradient-to-br from-teal-50 to-teal-100"
            delay={0.9}
          />

          <RoleCard
            icon={Building2}
            title="Staff Login"
            subtitle="Emergency alerts, bed management, patient flow"
            onClick={() => handleRoleSelect("staff")}
            gradient="bg-gradient-to-br from-purple-50 to-purple-100"
            delay={1.1}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
          className="mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className="text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 hover:border-red-400 shadow-lg shadow-red-500/10 font-semibold bg-transparent"
            onClick={() => router.push("/patient/emergency")}
          >
            <span className="text-2xl mr-2">🚨</span>
            Need urgent help? Click here
          </Button>
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center py-8 text-sm text-gray-500 border-t border-gray-200 bg-white/50 backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-4 flex-wrap max-w-4xl mx-auto">
          <button className="hover:text-gray-700 transition-colors font-medium">Privacy Policy</button>
          <span className="text-gray-300">•</span>
          <button className="hover:text-gray-700 transition-colors font-medium">Terms of Service</button>
          <span className="text-gray-300">•</span>
          <button className="hover:text-gray-700 transition-colors font-medium">Contact Us</button>
        </div>
        <p className="mt-4 text-xs text-gray-400">© 2025 Med.AI Healthcare Platform. All rights reserved.</p>
      </motion.footer>

      {/* Emergency Listener */}
      <EmergencyListener />

      {selectedRole && (
        <RoleLoginModal role={selectedRole} isOpen={!!selectedRole} onClose={() => setSelectedRole(null)} />
      )}
    </main>
  )
}
