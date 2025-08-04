import React from 'react';
import { StudentInfo } from '../types';
import { generateDocumentContent } from '../utils/documentGenerator';
import { FileText, Download } from 'lucide-react';

interface DocumentPreviewProps {
  studentInfo: StudentInfo;
  onDownload: () => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  studentInfo,
  onDownload
}) => {
  const content = generateDocumentContent(studentInfo);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Aperçu du Document</h2>
        </div>
        <button
          onClick={onDownload}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          <span>Télécharger</span>
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-sm min-h-[600px] font-serif">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
};