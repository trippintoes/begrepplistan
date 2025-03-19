"use client";

import React from 'react';
import { Concept } from '@/types';

interface ConceptCardProps {
  concept: Concept;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept }: { concept: Concept }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col w-full transform hover:-translate-y-2">
      <div className="flex justify-between items-start mb-3 border-b pb-2">
        <h2 className="text-xl font-bold text-primary">{concept.term}</h2>
        {concept.shortname && (
          <span className="text-sm font-semibold bg-gray-100 px-2 py-1 rounded-md">
            {concept.shortname}
          </span>
        )}
      </div>
      <p className="text-gray-700 mb-4">{concept.description}</p>
      <div className="text-sm text-gray-500 italic mt-auto pt-2 border-t">
        [KÄLLA: <span className="font-semibold">{concept.source}</span>]
      </div>
    </div>
  );
};

export default ConceptCard; 