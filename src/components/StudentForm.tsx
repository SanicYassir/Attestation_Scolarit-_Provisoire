import React, { useEffect } from 'react';
import { StudentInfo } from '../types';
import { FormField } from './FormField';
import { FileText } from 'lucide-react';

interface StudentFormProps {
  studentInfo: StudentInfo;
  onChange: (info: StudentInfo) => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  studentInfo,
  onChange
}) => {
  // Auto-generate current date in French format
  useEffect(() => {
    const now = new Date();
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    const dateNow = `le ${dayName} ${day} ${month} ${year}`;
    
    if (studentInfo.dateNow !== dateNow) {
      onChange({
        ...studentInfo,
        dateNow,
        annee: studentInfo.annee || '1ère année cycle préparatoire intégré' // Auto-select option1
      });
    }
  }, []);

  const handleFieldChange = (name: string, value: string) => {
    onChange({
      ...studentInfo,
      [name]: value
    });
  };

  const sexeOptions = [
    { value: 'Homme', label: 'Homme' },
    { value: 'Femme', label: 'Femme' }
  ];

  const diplomeOptions = [
    { value: 'Diplôme de cycle préparatoire intégré', label: 'Diplôme de cycle préparatoire intégré' },
    { value: 'Diplôme d\'ingénieur d\'etat en chimie', label: 'Diplôme d\'ingénieur d\'état en chimie' }
  ];

  const anneeOptions = [
    { value: '1ère année cycle préparatoire intégré', label: '1ère année cycle préparatoire intégré' },
    { value: '2ème année cycle préparatoire intégré', label: '2ème année cycle préparatoire intégré' },
    { value: '1ère année cycle ingénieur', label: '1ère année cycle ingénieur' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-blue-600 p-2 rounded-lg">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Informations Étudiant
          </h2>
          <p className="text-gray-600">
            Remplissez tous les champs pour générer votre document
          </p>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Nom"
            name="nom"
            value={studentInfo.nom}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="Prénom"
            name="prenom"
            value={studentInfo.prenom}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="CIN"
            name="cin"
            value={studentInfo.cin}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="CNE"
            name="cne"
            value={studentInfo.cne}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="Date de naissance"
            name="dateNaissance"
            value={studentInfo.dateNaissance}
            onChange={handleFieldChange}
            required
          />
          <FormField
            label="Sexe"
            name="sexe"
            value={studentInfo.sexe}
            onChange={handleFieldChange}
            options={sexeOptions}
            required
          />
        </div>
        
        <FormField
          label="Adresse"
          name="adresse"
          value={studentInfo.adresse}
          onChange={handleFieldChange}
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Diplôme"
            name="diplome"
            value={studentInfo.diplome}
            onChange={handleFieldChange}
            options={diplomeOptions}
            required
          />
          <FormField
            label="Année"
            name="annee"
            value={studentInfo.annee}
            onChange={handleFieldChange}
            options={anneeOptions}
            required
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Date du document:</strong> {studentInfo.dateNow}
          </p>
        </div>
      </form>
    </div>
  );
};