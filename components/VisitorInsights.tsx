// components/VisitorInsights.tsx
'use client'

import React, { useEffect, useState } from 'react';
import Analytics from '../components/Analytics';

interface Skill {
  title: string;
  description: string;
  details?: string;
  image?: string;
  links?: { name: string; url: string }[];
  icon: React.ReactNode;
  experience: string;
  category: 'frontend' | 'backend' | 'tool';
}

interface SkillInteraction {
  clicks: number;
  timeSpent: number;
}

interface VisitData {
  visitCount: number;
  lastVisit: string;
  visitHistory: string[];
  totalClicks: number;
  skillInteractions: { [skill: string]: SkillInteraction };
}

interface VisitorInsightsProps {
  skills: Skill[];
}

const VisitorInsights: React.FC<VisitorInsightsProps> = ({ skills }) => {
  const [insights, setInsights] = useState<VisitData>({ 
    visitCount: 0, 
    lastVisit: '', 
    visitHistory: [], 
    totalClicks: 0, 
    skillInteractions: {} 
  });

  useEffect(() => {
    const storedData = localStorage.getItem('visitor-data');
    let data: VisitData;
    
    if (storedData) {
      data = JSON.parse(storedData);
      data.visitCount += 1;
    } else {
      data = {
        visitCount: 1,
        lastVisit: new Date().toISOString(),
        visitHistory: [],
        totalClicks: 0,
        skillInteractions: {}
      };
    }
    
    data.visitHistory.unshift(new Date().toISOString());
    if (data.visitHistory.length > 5) {
      data.visitHistory = data.visitHistory.slice(0, 5);
    }
    
    data.lastVisit = new Date().toISOString();
    
    skills.forEach(skill => {
      if (!data.skillInteractions[skill.title]) {
        data.skillInteractions[skill.title] = {
          clicks: 0,
          timeSpent: 0
        };
      }
    });
    
    localStorage.setItem('visitor-data', JSON.stringify(data));
    setInsights(data);
  }, [skills]);

  return (
    <div className="card">
      <h3 className="text-lg font-medium text-white mb-2 hidden">Skill Interactions</h3>
      <div className="space-y-1 hidden">
        {skills.slice(0, 4).map((skill) => (
          <div key={skill.title} className="flex justify-between text-sm border-b border-zinc-800 py-2">
            <span className="text-zinc-300">{skill.title}</span>
            <div className="flex gap-4">
              <span className="text-zinc-400">
                {insights.skillInteractions[skill.title]?.clicks || 0}
              </span>
              <span className="text-zinc-500">
                Time Spent <span className="text-zinc-400">
                  {Math.floor(insights.skillInteractions[skill.title]?.timeSpent || 0)}s
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold my-4 text-white">Visitor Insights</h2>
      <Analytics />
    </div>
  );
};

export default VisitorInsights;
