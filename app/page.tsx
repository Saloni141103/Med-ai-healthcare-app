"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Stethoscope, Building2 } from "lucide-react"
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
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      {/* Top Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between p-6"
      >
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            M
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Med.AI
          </span>
        </motion.div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-4 space-y-4"
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
              Med.AI
            </span>
            <br />
            <span className="text-gray-800">Intelligent Healthcare Assistant</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            AI-powered triage, symptom analysis & emergency automation
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-12">
          <RoleCard
            icon={User}
            title="Patient Login"
            subtitle="Symptom checker, AI chat, history, emergencies"
            onClick={() => handleRoleSelect("patient")}
            gradient="bg-gradient-to-br from-blue-50 to-blue-100"
            delay={0.6}
          />

          <RoleCard
            icon={Stethoscope}
            title="Doctor Login"
            subtitle="Manage cases, triage alerts, respond to patients"
            onClick={() => handleRoleSelect("doctor")}
            gradient="bg-gradient-to-br from-teal-50 to-teal-100"
            delay={0.8}
          />

          <RoleCard
            icon={Building2}
            title="Staff Login"
            subtitle="Emergency alerts, bed management, patient flow"
            onClick={() => handleRoleSelect("staff")}
            gradient="bg-gradient-to-br from-purple-50 to-purple-100"
            delay={1.0}
          />
        </div>

        {/* Emergency Link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-12">
          <Button
            variant="link"
            className="text-red-600 hover:text-red-700"
            onClick={() => router.push("/patient/emergency")}
          >
            Need urgent help? Click here
          </Button>
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative z-10 text-center py-6 text-sm text-gray-500"
      >
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <LanguageSwitcher />
          <span className="hidden md:inline">•</span>
          <button className="hover:text-gray-700 transition-colors">Privacy Policy</button>
          <span>•</span>
          <button className="hover:text-gray-700 transition-colors">Terms of Service</button>
          <span>•</span>
          <button className="hover:text-gray-700 transition-colors">Contact Us</button>
        </div>
      </motion.footer>

      {/* Emergency Listener */}
      <EmergencyListener />

      {selectedRole && (
        <RoleLoginModal role={selectedRole} isOpen={!!selectedRole} onClose={() => setSelectedRole(null)} />
      )}
    </main>
  )
}
