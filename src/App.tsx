import React from 'react';
import { useState } from 'react';
import { StudentInfo } from './types';
import { StudentForm } from './components/StudentForm';
import { DocumentPreview } from './components/DocumentPreview';
import { generateAndDownloadFilledDoc  } from './utils/documentGenerator';
import { FileText, Sparkles } from 'lucide-react';

const initialStudentInfo: StudentInfo = {
  nom: '',
  prenom: '',
  cin: '',
  cne: '',
  dateNaissance: '',
  adresse: '',
  sexe: 'Homme',
  diplome: 'Diplôme de cycle préparatoire intégré',
  annee: '1ère année cycle préparatoire intégré',
  dateNow: '',
  apogee:''
};

function App() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(initialStudentInfo);
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = () => {
    const content = generateAndDownloadFilledDoc(studentInfo);
    // const filename = `attestation_${studentInfo.nom}_${studentInfo.prenom}`.toLowerCase().replace(/\s+/g, '_');
    // downloadAsWordDocument(content, filename);
  };

  const isFormValid = () => {
    const requiredFields: (keyof StudentInfo)[] = [
      'nom', 'prenom', 'cin', 'cne', 'dateNaissance', 'adresse', 'sexe', 'diplome', 'annee'
    ];
    
    return requiredFields.every(field => studentInfo[field].trim() !== '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Générateur des attestations de scolarité provisoires
              </h1>
              <p className="text-gray-600">
                Créez vos attestations de scolarité en quelques clics
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Form Section */}
          <div>
            <StudentForm
              studentInfo={studentInfo}
              onChange={setStudentInfo}
            />
          </div>
          
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowPreview(!showPreview)}
                disabled={!isFormValid()}
                className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                <Sparkles className="w-4 h-4" />
                <span>{showPreview ? 'Masquer l\'aperçu' : 'Aperçu du document'}</span>
              </button>
              
              <button
                onClick={handleDownload}
                disabled={!isFormValid()}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                <FileText className="w-4 h-4" />
                <span>Générer le document</span>
              </button>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="space-y-6">
              {isFormValid() ? (
                <DocumentPreview
                  studentInfo={studentInfo}
                  onDownload={handleDownload}
                />
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">
                      Aperçu du document
                    </h3>
                    <p className="text-gray-400">
                      Remplissez tous les champs pour voir l'aperçu
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 Générateur de Documents. Créé avec React et TypeScript.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;