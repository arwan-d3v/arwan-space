'use client';

import { useState, useEffect } from 'react';
import { type ResumeData } from '@/types/resume';
import LoadingScreen from './LoadingScreen';
import BackgroundParallax from './BackgroundParallax';
import MiniNavLeft from './MiniNavLeft';
import BottomNavMerged from './BottomNavMerged';

// Sections
import HeaderSection from './sections/HeaderSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import HobbiesSection from './sections/HobbiesSection';
import SocialSection from './sections/SocialSection';
import { AnimatePresence } from 'framer-motion';

export default function ResumeClient({ resume }: { resume: ResumeData }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Gather all assets to preload
    const assetsToLoad: string[] = [];
    if (resume.profile_photo_url) assetsToLoad.push(resume.profile_photo_url);

    resume.real_projects?.forEach(p => { if(p.imageUrl) assetsToLoad.push(p.imageUrl) });
    resume.current_projects?.forEach(p => { if(p.imageUrl) assetsToLoad.push(p.imageUrl) });

    // Since user wants a minimum 2-second loading screen:
    const minLoadingTime = 2000;
    const startTime = Date.now();

    let loadedCount = 0;
    const totalAssets = assetsToLoad.length || 1; // prevent div by zero

    const updateProgress = () => {
      loadedCount++;
      const assetProgress = Math.floor((loadedCount / totalAssets) * 100);

      // We also consider time elapsed as part of the progress to ensure it hits 100% smoothly over 2s
      const timeElapsed = Date.now() - startTime;
      const timeProgress = Math.min((timeElapsed / minLoadingTime) * 100, 100);

      // Actual progress is whatever is lowest, but ensuring time takes precedence if assets load too fast
      const finalProgress = Math.min(Math.max(assetProgress, timeProgress), 100);
      setLoadingProgress(Math.min(100, Math.floor(finalProgress)));
    };

    // If no assets, just use timer
    if (assetsToLoad.length === 0) {
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min((elapsed / minLoadingTime) * 100, 100);
        setLoadingProgress(Math.floor(p));
        if (elapsed >= minLoadingTime) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // Small delay after hitting 100
        }
      }, 50);
      return () => clearInterval(interval);
    }

    // Load assets
    assetsToLoad.forEach(src => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress; // Continue even if error
      img.src = src;
    });

    // Ensure timer still forces finish if assets take too long or load instantly
    const timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min((elapsed / minLoadingTime) * 100, 100);

        setLoadingProgress(prev => Math.max(prev, Math.floor(p)));

        if (elapsed >= minLoadingTime && loadedCount >= totalAssets) {
            clearInterval(timerInterval);
            setTimeout(() => setIsLoading(false), 500);
        } else if (elapsed >= minLoadingTime + 3000) {
            // Failsafe: max 5 seconds total loading
            clearInterval(timerInterval);
            setLoadingProgress(100);
            setTimeout(() => setIsLoading(false), 500);
        }
    }, 100);

    return () => clearInterval(timerInterval);
  }, [resume]);

  const sections = [
    { id: 'header', label: 'Profile' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'social', label: 'Contact' },
  ].filter(section => {
    // Dynamically remove empty sections from nav
    if (section.id === 'experience' && (!resume.experience || resume.experience.length === 0)) return false;
    if (section.id === 'education' && (!resume.education || resume.education.length === 0)) return false;
    if (section.id === 'skills' && (!resume.skills || resume.skills.length === 0)) return false;
    if (section.id === 'projects' && (!resume.real_projects || resume.real_projects.length === 0)) return false;
    if (section.id === 'hobbies' && (!resume.hobbies || resume.hobbies.length === 0)) return false;
    if (section.id === 'social' && (!resume.social_links || Object.keys(resume.social_links).length <= 2)) return false;
    return true;
  });

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen progress={loadingProgress} />}
      </AnimatePresence>

      <BackgroundParallax />

      {!isLoading && (
        <>
          <MiniNavLeft sections={sections} />

          <main className="relative z-10 max-w-5xl mx-auto px-4 md:px-12 py-20 space-y-24">
            <HeaderSection data={resume} />
            <ExperienceSection experiences={resume.experience} />
            <EducationSection education={resume.education} />
            <SkillsSection skills={resume.skills} />
            <ProjectsSection id="projects" title="Featured Projects" projects={resume.real_projects} />
            {resume.current_projects && resume.current_projects.length > 0 && (
                <ProjectsSection id="current-projects" title="Current Pursuits" projects={resume.current_projects} />
            )}
            <HobbiesSection hobbies={resume.hobbies} />
            <SocialSection links={resume.social_links} />
          </main>

          <BottomNavMerged sections={sections} />
        </>
      )}
    </>
  );
}
