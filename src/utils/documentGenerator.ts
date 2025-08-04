import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { StudentInfo } from '../types';

export const generateAndDownloadFilledDoc = async (info: StudentInfo) => {
  // Load the template
  const response = await fetch('/templates/Attestation de scolarité provisoire.docx');
  const arrayBuffer = await response.arrayBuffer();

  // Create Docxtemplater instance
  const zip = new PizZip(arrayBuffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Fill placeholders
  doc.setData({
    Nom: info.nom,
    Prenom: info.prenom,
    CIN: info.cin,
    CNE: info.cne,
    'Date Naissance': info.dateNaissance,
    Adresse: info.adresse,
    Sexe: info.sexe === 'Femme' ? 'inscrite' : 'inscrit',
    Diplome: info.diplome,
    Annee: info.annee,
    DateNow: info.dateNow,
  });

  try {
    doc.render();
  } catch (error) {
    console.error("Template rendering error:", error);
    throw error;
  }

  // Export the filled .docx
  const out = doc.getZip().generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  // Safe filename
  const fileName = `attestation_${info.nom}_${info.cin}`.replace(/\s+/g, '_');
  saveAs(out, `${fileName}.docx`);
};



export const generateDocumentContent = (info: StudentInfo): string => {
  const inscriptionStatus = info.sexe === 'Femme' ? 'inscrite' : 'inscrit';

  return `
ROYAUME DU MAROC                            المملكة المغربية
Université Ibn Tofail                      جامعة ابن طفيل
École Nationale Supérieure de Chimie      المدرسة الوطنية العليا للكيمياء

Service des Affaires Estudiantines        مصلحة الشؤون الطلابية

                     ATTESTATION DE SCOLARITÉ


Le Directeur atteste que l'étudiant(e) : ${info.nom} ${info.prenom}
Numéro de la carte d'identité nationale : ${info.cin}
Code national de l'étudiant              : ${info.cne}

Né(e) le ${info.dateNaissance} à ${info.adresse}

est régulièrement ${inscriptionStatus} à l’École Nationale Supérieure de Chimie Kénitra 
pour l'année universitaire 2025/2026.

Diplôme : ${info.diplome}
Année   : ${info.annee}


Fait à Kénitra, ${info.dateNow}


Le Directeur

[Signature et cachet de l'établissement]

Le présent document n’est délivré qu’en un seul exemplaire.
Il appartient à l’étudiant d’en faire des photocopies certifiées conformes.
  `;
};

