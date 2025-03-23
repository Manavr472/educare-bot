"use client"
import React, { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';
import { ModelViewerElement, ModelViewerProgressEvent } from '../../../modelar';

const ARModelViewerWithScript: React.FC = () => {
  const modelViewerRef = useRef<ModelViewerElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const updateBarRef = useRef<HTMLDivElement>(null);
  const [selectedModelIndex, setSelectedModelIndex] = useState<number>(0);
  
  // Define available models with descriptions
const models = [
    {
        name: "Heart",
        path: "3d-models/adult_heart.glb",
        description: "The Gluck ivory hinged knee (1891), a pioneering effort by Theophilus Gluck, represents one of the earliest attempts at knee replacement.\nConstructed from ivory, it faced significant challenges with fixation and wear.\nIts historical significance lies in its innovative concept, paving the way for future TKA development.",
    },
    {
        name: "CPR Procedure",
        path: "3d-models/CPR.glb",
        description: "The Insall-Burstein knee (1978), developed by John Insall and Albert Burstein, introduced the posterior stabilized design.\nThis innovative design utilizes a cam and post mechanism to substitute for the posterior cruciate ligament.\nAimed to address issues of stability, particularly in flexion, that plagued earlier TKA designs.",


    },
    {
        name: "Syringe",    
        path: "3d-models/Syringe.glb",
        description: "The Smith & Nephew LEGION Total Knee System (2000s) represents a modern TKA design.\nIt focuses on enhancing kinematics and offering improved fixation options.\nThese advancements aim to provide greater stability and a wider range of motion for patients.",
    }
];

  // Handle model selection
  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value);
    setSelectedModelIndex(index);
  };

  useEffect(() => {
    // Handle progress bar
    const modelViewer = modelViewerRef.current;
    const progressBar = progressBarRef.current;
    const updateBar = updateBarRef.current;

    if (modelViewer && progressBar && updateBar) {
      const handleProgress = (event: ModelViewerProgressEvent) => {
        const progress = event.detail.totalProgress;
        updateBar.style.width = `${progress * 100}%`;
        
        if (progress === 1) {
          progressBar.classList.add('opacity-0');
          setTimeout(() => {
            progressBar.classList.add('hidden');
          }, 300);
        } else {
          progressBar.classList.remove('hidden');
          progressBar.classList.remove('opacity-0');
        }
      };
      
      modelViewer.addEventListener('progress', handleProgress as EventListener);
      
      return () => {
        modelViewer.removeEventListener('progress', handleProgress as EventListener);
      };
    }
  }, []);

  return (
    <div className="relative h-screen w-full md:h-[calc(100vh+10rem)]">
        {/* Model Selection and Description Panel */}
        <div className="container mx-auto px-4 py-6 z-10 justify-center items-center flex flex-col">
          <div className="mb-2">
            <label htmlFor="model-select" className="minigap text-center block text-xl text-gray-700 dark:text-gray-300 mb-1">
              Select Model
            </label>
            <select 
              id="model-select"
              className="w-full px-3 py-2 max-w-xs text-xl rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none"
              value={selectedModelIndex} 
              onChange={handleModelChange}
            >
              {models.map((model, index) => (
              <option key={index} value={index}>
                {model.name}
              </option>
              ))}
            </select>
          </div>
          
          {/* Model Description */}
          <div className="max-w-3xl mt-2 mb-2 text-center">
            <p className="minigap mt-1 text-m mt-2 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Description:</span>{models[selectedModelIndex].description}
            </p>
          </div>
        </div>
        
        <model-viewer 
          ref={modelViewerRef}
          src={models[selectedModelIndex].path}
          alt="3D model display"
          ar 
          ar-modes="webxr scene-viewer quick-look" 
          camera-controls 
          tone-mapping="neutral"
          shadow-intensity="1" 
          style={{ width: '100%', height: '70%' }}
          className="md:mt-[-10%] mt-[-40%] z-10" // Using Tailwind classes for responsive margin
        >
            <div className="progress-bar hide" slot="progress-bar" ref={progressBarRef}>
            <div className="update-bar" ref={updateBarRef}></div>
            </div>
            <button className="slot ar-button" id="slot ar-button"></button>
        </model-viewer>
    </div>
  );
};

export default ARModelViewerWithScript;
