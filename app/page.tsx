"use client"

import { useState } from "react"
import { jsPDF } from "jspdf"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function Home() {
  const [espaces, setEspaces] = useState([
    { type: "Théorique", surface: 50, heures: 2800 },
    { type: "Pratique", surface: 80, heures: 3200 },
  ])

  const totalHeures = espaces.reduce((sum, e) => sum + e.heures, 0)
  const capaciteTotale = espaces.reduce((sum, e) => sum + Math.floor(e.surface / 1.5), 0)

  const handleDownload = () => {
    const doc = new jsPDF()
    doc.text("Rapport de capacité d'accueil", 10, 10)
    espaces.forEach((e, i) => {
      doc.text(`${e.type}: ${e.surface} m², ${e.heures} heures`, 10, 20 + i * 10)
    })
    doc.text(`Capacité totale estimée: ${capaciteTotale}`, 10, 40)
    doc.text(`Total heures disponibles: ${totalHeures}`, 10, 50)
    doc.save("rapport_capacite.pdf")
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <img src="/logo-ministere.png" alt="Logo Ministère" className="mx-auto w-24 mb-4" />
        <h1 className="text-2xl font-bold">Application de capacité d'accueil</h1>
        <p className="text-gray-600">Analyse interactive de la capacité pour les structures de formation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {espaces.map((e, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-lg font-semibold">{e.type}</h2>
            <p>Surface : {e.surface} m²</p>
            <p>Heures disponibles : {e.heures}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Résumé</h2>
        <p className="text-green-700 font-bold">Capacité totale : {capaciteTotale} apprenants</p>
        <p className="text-blue-700 font-bold">Total heures : {totalHeures}</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 mb-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={espaces}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="heures" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center">
        <button
          onClick={handleDownload}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-2xl shadow"
        >
          Télécharger le rapport PDF
        </button>
      </div>
    </main>
  )
}
