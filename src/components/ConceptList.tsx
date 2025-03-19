"use client";

import React from 'react';
import { Concept } from '@/types';
import ConceptCard from './ConceptCard';

interface ConceptListProps {
  concepts: Concept[];
}

const ConceptList: React.FC<ConceptListProps> = ({ concepts }: ConceptListProps) => {
  return (
    <div className="flex flex-col items-center gap-6 max-w-xl mx-auto">
      {concepts.length > 0 ? (
        concepts.map((concept: Concept) => (
          <div key={concept.id} className="w-full">
            <ConceptCard concept={concept} />
          </div>
        ))
      ) : (
        <div className="text-center py-10 w-full">
          <p className="text-gray-500">Inga begrepp matchade din sökning.</p>
        </div>
      )}
    </div>
  );
};

export default ConceptList; 