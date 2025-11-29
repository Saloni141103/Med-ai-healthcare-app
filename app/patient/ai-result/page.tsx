"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TriageMeter } from "@/components/triage-meter"
import { DoctorCarousel } from "@/components/doctor-carousel"
import { Progress } from "@/components/ui/progress"

interface Condition {
  name: string
  probability: number
  confidence: string
  symptoms: string[]
  reasons: string[]
}

export default function AIResultPage() {
  const router = useRouter()
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [expandedCondition, setExpandedCondition] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem("symptom-analysis")
      if (data) {
        setAnalysisData(JSON.parse(data))
      } else {
        // Mock data if no session data
        setAnalysisData({
          triageLevel: 2,
          conditions: mockConditions,
          recommendations: mockRecommendations,
        })
      }
    }
  }, [])

  const mockConditions: Condition[] = [
    {
      name: "Acute Bronchitis",
      probability: 78,
      confidence: "high",
      symptoms: ["Persistent cough", "Chest discomfort", "Fatigue"],
      reasons: ["Matches reported symptoms", "Common seasonal condition", "Age group correlation"],
    },
    {
      name: "Common Cold",
      probability: 65,
      confidence: "medium",
      symptoms: ["Cough", "Mild fever", "Fatigue"],
      reasons: ["Similar symptom pattern", "Viral infection indicators"],
    },
    {
      name: "Pneumonia",
      probability: 42,
      confidence: "low",
      symptoms: ["Severe cough", "High fever", "Breathing difficulty"],
      reasons: ["Some symptoms overlap", "Requires clinical confirmation"],
    },
  ]

  const mockRecommendations = {
    immediate: [
      "Rest and stay hydrated",
      "Monitor body temperature regularly",
      "Use steam inhalation for relief",
      "Avoid cold beverages and smoking",
    ],
    medications: [
      "OTC cough suppressants (consult pharmacist)",
      "Pain relievers like Paracetamol if needed",
      "Throat lozenges for comfort",
    ],
    whenToSeek: [
      "If symptoms worsen after 3 days",
      "If fever exceeds 102°F",
      "If breathing becomes difficult",
      "If chest pain intensifies",
    ],
  }

  const mockDoctors = [
    {
      id: "1",
      name: "Dr. Priya Sharma",
      specialization: "Pulmonologist",
      rating: 4.8,
      experience: 12,
      fee: 800,
      distance: "2.3 km",
      avatar: "/female-doctor-avatar.png",
      available: true,
    },
    {
      id: "2",
      name: "Dr. Rajesh Kumar",
      specialization: "General Physician",
      rating: 4.6,
      experience: 8,
      fee: 500,
      distance: "1.8 km",
      avatar: "/male-patient-avatar.png",
      available: true,
    },
    {
      id: "3",
      name: "Dr. Anjali Mehta",
      specialization: "Internal Medicine",
      rating: 4.9,
      experience: 15,
      fee: 1000,
      distance: "3.5 km",
      avatar: "/female-doctor-avatar.png",
      available: false,
    },
  ]

  const handleSaveToHistory = async () => {
    alert("Analysis saved to your medical history!")
  }

  const handleDownloadReport = () => {
    alert("Report download started (mock PDF generation)")
  }

  const handleShareWithDoctor = () => {
    router.push("/appointments?action=book")
  }

  const handleBookDoctor = (doctor: any) => {
    router.push(`/appointments?doctor=${doctor.id}`)
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AI Analysis Results</h1>
            <p className="text-muted-foreground">Based on your symptom input</p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            ← Back
          </Button>
        </div>

        {/* Triage Meter - Top Section */}
        <Card className="p-8 bg-gradient-to-br from-card to-muted/20">
          <TriageMeter level={2} label="Seek medical attention within 24 hours" />
        </Card>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Conditions */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Possible Conditions</h2>
            {mockConditions.map((condition) => (
              <Card
                key={condition.name}
                className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                  expandedCondition === condition.name ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setExpandedCondition(expandedCondition === condition.name ? null : condition.name)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{condition.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      condition.confidence === "high"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : condition.confidence === "medium"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                          : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                    }`}
                  >
                    {condition.confidence}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Match Probability</span>
                    <span className="font-semibold">{condition.probability}%</span>
                  </div>
                  <Progress value={condition.probability} className="h-2" />
                </div>

                {expandedCondition === condition.name && (
                  <div className="mt-4 pt-4 border-t space-y-3 animate-slide-up">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Common Symptoms:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {condition.symptoms.map((symptom, idx) => (
                          <li key={idx}>• {symptom}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Why AI predicted this:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {condition.reasons.map((reason, idx) => (
                          <li key={idx}>• {reason}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Middle Column: Recommendations */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recommendations</h2>

            <Card className="p-4">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">✓ Immediate Do's</h3>
              <ul className="space-y-2 text-sm">
                {mockRecommendations.immediate.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">💊 OTC Suggestions</h3>
              <ul className="space-y-2 text-sm">
                {mockRecommendations.medications.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-3 italic">
                Note: These are non-prescriptive suggestions. Consult a pharmacist.
              </p>
            </Card>

            <Card className="p-4 border-orange-200 dark:border-orange-800">
              <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">⚠️ When to Seek Help</h3>
              <ul className="space-y-2 text-sm">
                {mockRecommendations.whenToSeek.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button onClick={handleSaveToHistory} className="w-full">
                💾 Save to History
              </Button>
              <Button onClick={handleDownloadReport} variant="outline" className="w-full bg-transparent">
                📥 Download Report
              </Button>
              <Button onClick={handleShareWithDoctor} variant="secondary" className="w-full">
                👨‍⚕️ Share with Doctor
              </Button>
            </div>
          </div>

          {/* Right Column: Doctor Suggestions */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recommended Doctors</h2>
            <DoctorCarousel doctors={mockDoctors} onBook={handleBookDoctor} />

            {/* Escalation Logic Timeline */}
            <Card className="p-4 mt-6">
              <h3 className="font-semibold mb-4">Care Escalation Path</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div className="w-0.5 h-12 bg-green-200 dark:bg-green-800" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">AI Self-Care</h4>
                    <p className="text-xs text-muted-foreground">Follow recommendations</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div className="w-0.5 h-12 bg-orange-200 dark:bg-orange-800" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Consult Doctor</h4>
                    <p className="text-xs text-muted-foreground">If symptoms persist</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Emergency Care</h4>
                    <p className="text-xs text-muted-foreground">Immediate medical attention</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
