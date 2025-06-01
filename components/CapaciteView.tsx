'use client'

import React, { useState } from 'react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export function CapaciteView() {
  const [espaces, setEspaces] = useState([
    { type: 'Théorique', superficie: 50, heures: 4480 },
    { type: 'Pratique', superficie: 80, heures: 5600 },
  ])

  const [ajoutFoyers, setAjoutFoyers] = useState(0)

  const capaciteTotale = espaces.reduce((acc, e) => acc + Math.floor(e.superficie / 1.5), 0)
  const capaciteModifiee = capaciteTotale + ajoutFoyers * 25

  const resultat = capaciteModifiee > 100
    ? { texte: 'Possibilité d’augmentation', couleur: 'green' }
    : { texte: 'Capacité insuffisante', couleur: 'red' }

  const generatePDF = () => {
    const doc = new jsPDF()
    doc.text("Rapport de capacité d'accueil", 20, 20)
    autoTable(doc, {
      startY: 30,
      head: [['Type', 'Superficie (m²)', 'Heures']],
      body: espaces.map(e => [e.type, e.superficie.toString(), e.heures.toString()])
    })
    doc.text(`Ajout de foyers : ${ajoutFoyers}`, 20, doc.lastAutoTable.finalY + 10)
    doc.text(`Capacité modifiée : ${capaciteModifiee}`, 20, doc.lastAutoTable.finalY + 20)
    doc.text(`Résultat : ${resultat.texte}`, 20, doc.lastAutoTable.finalY + 30)
    doc.save("rapport_capacite.pdf")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {espaces.map((espace, index) => (
          <div key={index} className="p-4 border rounded bg-white shadow">
            <h2 className="font-semibold mb-2">{espace.type}</h2>
            <label>Superficie (m²)</label>
            <input
              type="number"
              value={espace.superficie}
              onChange={(e) => {
                const newEspaces = [...espaces]
                newEspaces[index].superficie = parseFloat(e.target.value)
                setEspaces(newEspaces)
              }}
              className="w-full p-2 border rounded"
            />
            <label className="mt-2 block">Heures disponibles</label>
            <input
              type="number"
              value={espace.heures}
              onChange={(e) => {
                const newEspaces = [...espaces]
                newEspaces[index].heures = parseFloat(e.target.value)
                setEspaces(newEspaces)
              }}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </div>

      <div className="p-4 border rounded bg-white shadow">
        <label>Ajouter des foyers (fictif)</label>
        <input
          type="number"
          value={ajoutFoyers}
          onChange={(e) => setAjoutFoyers(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className={`text-xl font-bold text-${resultat.couleur}-600`}>
        {resultat.texte} ({capaciteModifiee} places)
      </div>

      <button
        onClick={generatePDF}
        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
      >
        Télécharger le rapport PDF
      </button>
    </div>
  )
}
