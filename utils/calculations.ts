export function calculerCapaciteSalle(surface: number, surfaceParStagiaire: number): number {
    if (surfaceParStagiaire === 0) return 0;
    return Math.floor(surface / surfaceParStagiaire);
  }
  
  export function calculerTotalHeures(nombreSalles: number, heuresParSalle: number): number {
    return nombreSalles * heuresParSalle;
  }
  
  export function calculerDelta(heuresDisponibles: number, heuresExigences: number): number {
    return heuresDisponibles - heuresExigences;
  }
  
  export function verifierPossibiliteAjout(delta: number): string {
    if (delta > 0) return "✔️ Possibilité d'ajouter";
    if (delta === 0) return "⚠️ Capacité maximale atteinte";
    return "❌ Pas de possibilité d'ajouter";
  }
  