"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DistressDetectionBannerProps {
  isVisible: boolean
  onActivateEmergency: () => void
  onDismiss: () => void
}

export function DistressDetectionBanner({ isVisible, onActivateEmergency, onDismiss }: DistressDetectionBannerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-0 left-0 right-0 z-50 p-4"
        >
          <motion.div
            className="glass-card bg-red-50 border-2 border-red-500 rounded-2xl p-6 max-w-2xl mx-auto shadow-2xl"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(239, 68, 68, 0.4)",
                "0 0 0 20px rgba(239, 68, 68, 0)",
                "0 0 0 0 rgba(239, 68, 68, 0)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <div className="flex items-start gap-4">
              {/* Pulsing Alert Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </motion.div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-900 mb-2">Distress Detected in Voice</h3>
                <p className="text-red-700 mb-4">
                  Your voice pattern suggests you may need immediate medical help. Do you want to activate emergency
                  mode?
                </p>

                <div className="flex gap-3">
                  <Button
                    onClick={onActivateEmergency}
                    className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Yes, I Need Help
                  </Button>
                  <Button
                    onClick={onDismiss}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                  >
                    I'm Okay
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
