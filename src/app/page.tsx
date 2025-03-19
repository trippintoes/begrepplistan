"use client";

import React, { useState } from 'react';
import ConceptList from '@/components/ConceptList';
import { concepts } from '@/data/concepts';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredConcepts = concepts.filter(concept => 
    concept.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    concept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    concept.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto px-4 py-8 flex flex-col h-screen">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-center">Begrepplista</h1>
      </div>
      <div className="flex justify-center w-full mb-8">
        <div className="w-full max-w-xl relative">
          <input
            type="text"
            placeholder="Sök begrepp..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pb-8 smooth-scroll">
        <ConceptList concepts={filteredConcepts} />
      </div>
    </main>
  );
} 