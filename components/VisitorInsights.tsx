// components/VisitorInsights.tsx
'use client'

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

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
  const [timeSpent, setTimeSpent] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Simulate visitor tracking
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
    
    // Add current visit to history (limit to last 5)
    data.visitHistory.unshift(new Date().toISOString());
    if (data.visitHistory.length > 5) {
      data.visitHistory = data.visitHistory.slice(0, 5);
    }
    
    data.lastVisit = new Date().toISOString();
    
    // Initialize skill interactions if they don't exist
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
    
    // Track time spent
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    // Draw visit history chart
    const drawChart = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;
          const barWidth = width / 5 - 10;
          const maxHeight = height - 10;
          
          ctx.clearRect(0, 0, width, height);
          ctx.fillStyle = '#c0c0c0';
          
          data.visitHistory.forEach((visit, index) => {
            const barHeight = maxHeight * (5 - index) / 5;
            const x = index * (barWidth + 10) + 5;
            const y = height - barHeight;
            
            ctx.fillRect(x, y, barWidth, barHeight);
          });
          
          if (data.visitHistory.length === 0) {
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Arial';
            ctx.fillText('No visit history yet', 10, height / 2);
          }
        }
      }
    };
    
    drawChart();
    
    return () => clearInterval(interval);
  }, [skills]);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-white">Visitor Insights</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-zinc-400 text-sm">Total Visitors</p>
          <motion.span
            key={insights.visitCount}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white text-lg font-bold"
          >
            {insights.visitCount}
          </motion.span>
        </div>
        <div>
          <p className="text-zinc-400 text-sm">Time Spent</p>
          <motion.span
            key={timeSpent}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white text-lg font-bold"
          >
            {timeSpent}s
          </motion.span>
        </div>
        <div>
          <p className="text-zinc-400 text-sm">Likes</p>
          <span className="text-white text-lg font-bold">0</span>
        </div>
        <div>
          <p className="text-zinc-400 text-sm">Reposts</p>
          <span className="text-white text-lg font-bold">0</span>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-white mb-2">Skill Interactions</h3>
      <div className="space-y-1">
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

      <div className="space-y-1">
        <div id="sitetooling-analytics" data-token="pofs0dkge0bju6lbc40xz"></div>
        <script async defer src="https://sitetooling.space/analytics.js"></script> 
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium text-white mb-2">Recent Visit Trends</h3>
        <div className="relative">
          <canvas ref={canvasRef} width={200} height={50} className="mt-2" />
        </div>
        <p className="text-xs text-zinc-400 mt-1">Bars represent the last 5 visits (height indicates recency)</p>
      </div>
    </div>
  );
};

export default VisitorInsights;
