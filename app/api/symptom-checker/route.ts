import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { patientId, symptoms, age, gender } = await request.json()

    // Simulate AI analysis (in production, call actual AI service)
    const analysis = {
      conditions: [
        { name: "Common Cold", probability: 75, severity: "low" },
        { name: "Seasonal Allergies", probability: 60, severity: "low" },
        { name: "Flu", probability: 40, severity: "moderate" },
      ],
      urgency: symptoms.toLowerCase().includes("severe") ? "high" : "moderate",
      recommendations: [
        "Stay hydrated and get plenty of rest",
        "Monitor symptoms for the next 24-48 hours",
        "Consider over-the-counter medications for symptom relief",
      ],
    }

    const supabase = await createClient()

    // Save to patient_history
    const { data: history, error: historyError } = await supabase
      .from("patient_history")
      .insert({
        patient_id: patientId,
        symptoms,
        analysis,
        severity: analysis.urgency,
      })
      .select()
      .single()

    if (historyError) {
      console.error("[v0] History save error:", historyError)
    }

    // Save recommendations
    for (const rec of analysis.recommendations) {
      await supabase.from("patient_recommendations").insert({
        patient_id: patientId,
        recommendation_text: rec,
        urgency_level: analysis.urgency,
      })
    }

    return NextResponse.json({
      success: true,
      analysis,
      historyId: history?.id,
    })
  } catch (error) {
    console.error("[v0] Symptom checker error:", error)
    return NextResponse.json({ error: "Failed to analyze symptoms" }, { status: 500 })
  }
}
