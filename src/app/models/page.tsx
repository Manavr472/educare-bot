"use client"
import React, { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';
import { ModelViewerElement, ModelViewerProgressEvent } from '../../../modelar';
import path from 'path';

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
    description: "A detailed 3D model of the human heart, showcasing its anatomy and structure. This model is ideal for understanding the chambers, valves, and blood flow pathways. It provides a realistic representation for educational and medical purposes.",
  },
  {
    name: "Syringe",    
    path: "3d-models/Syringe.glb",
    description: "A 3D model of a medical syringe, showcasing its components such as the barrel, plunger, and needle. This model is helpful for understanding its usage in medical procedures and training purposes.",
  },
  {
    name: "Skeleton System",
    path: "3d-models/skeleton.glb",
    description: "A comprehensive 3D model of the human skeletal system, illustrating all major bones. This model is perfect for studying human anatomy, bone structure, and their interconnections in detail.",
  },
  {
    name: "Nervous System",
    path: "3d-models/nervous.glb",
    description: "A 3D model of the human nervous system, highlighting the brain, spinal cord, and peripheral nerves. It provides an in-depth view of the body's communication network, essential for understanding neurological functions.",
  },
  {
    name: "Human Brain",
    path: "3d-models/human_brain_cerebrum__brainstem.glb",
    description: "A detailed 3D model of the human brain, including the cerebrum, brainstem, and other key regions. This model is ideal for studying brain anatomy and understanding its complex functions.",
  },
  {
    name: "Human Skull",
    path: "3d-models/human_skull_free.glb",
    description: "A realistic 3D model of the human skull, showcasing its structure and features. This model is useful for studying cranial anatomy and understanding the protective framework for the brain.",
  },
  {
    name: "Muscle System",
    path: "3d-models/male_full_body_ecorche.glb",
    description: "A 3D model of the human muscular system, illustrating the arrangement of muscles throughout the body. This model is excellent for studying muscle anatomy and understanding their roles in movement and posture.",
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
          className="md:mt-[-6%] mt-[-40%] z-10" // Using Tailwind classes for responsive margin
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
