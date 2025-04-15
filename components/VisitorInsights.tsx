// app/components/VisitorInsights.tsx
'use client'

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { trackVisitor, getVisitorData } from '../utils/visitorTracking';

interface SkillLink {
  name: string;
  url: string;
}

interface Skill {
  title: string;
  description: string;
  details?: string;
  image?: string;
  links?: SkillLink[];
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
  const [insights, setInsights] = useState<VisitData>({ visitCount: 0, lastVisit: '', visitHistory: [], totalClicks: 0, skillInteractions: {} });
  const [timeSpent, setTimeSpent] = useState(0); // Total time spent on page
  const [activeTab, setActiveTab] = useState<'all' | 'followers'>('all');
  const [tooltipData, setTooltipData] = useState<Array<{ x: number; y: number; date: string }>>([]); // Store tooltip positions and data
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const data = trackVisitor();
    console.log('Visitor Data:', data);
    setInsights(data);

    // Track total time spent on page
    const startTime = Date.now();
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const seconds = Math.floor((currentTime - startTime) / 1000);
      setTimeSpent(seconds);
    }, 1000);

    // Draw the chart and calculate tooltip positions
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const width = canvas.width;
        const height = canvas.height;
        const barWidth = width / 5 - 10; // Fixed to 5 bars
        const maxHeight = height - 10;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#c0c0c0';

        const visitTimes = Array.isArray(data.visitHistory) ? data.visitHistory : [];
        console.log('Visit History:', visitTimes);

        const newTooltipData: Array<{ x: number; y: number; date: string }> = [];
        for (let index = 0; index < 5; index++) {
          const visit = visitTimes[index];
          const barHeight = visit ? (maxHeight * (5 - index)) / 5 : 0;
          const x = index * (barWidth + 10) + 5;
          const y = height - barHeight;

          ctx.fillRect(x, y, barWidth, barHeight);

          if (visit) {
            const visitDate = new Date(visit).toLocaleString();
            newTooltipData.push({ x: x + barWidth / 2, y, date: visitDate });
          }
        }

        setTooltipData(newTooltipData);

        if (visitTimes.length === 0) {
          ctx.fillStyle = '#ffffff';
          ctx.font = '12px Arial';
          ctx.fillText('No visit history yet', 10, height / 2);
        }
      }
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="component-border m-4">
      <h3 className="text-lg font-semibold mb-2">Visitor Insights</h3>
      <div className="mb-4">
        <h4 className="text-sm font-medium">Interactions</h4>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <p className="text-sm">Total Visitors</p>
            <motion.span
              key={insights.visitCount}
              animate={{ opacity: 1, scale: 1 }}
              className="text-silver text-lg font-bold"
            >
              {insights.visitCount}
            </motion.span>
          </div>
          <div>
            <p className="text-sm">Time Spent</p>
            <motion.span
              key={timeSpent}
              animate={{ opacity: 1, scale: 1 }}
              className="text-silver text-lg font-bold"
            >
              {timeSpent}s
            </motion.span>
          </div>
          <div>
            <p className="text-sm">Likes</p>
            <span className="text-silver text-lg font-bold">0</span>
          </div>
          <div>
            <p className="text-sm">Reposts</p>
            <span className="text-silver text-lg font-bold">0</span>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-medium">Skill Interactions</h4>
        {skills.map((skill) => (
          <div key={skill.title} className="mt-2">
            <p className="text-sm">{skill.title}</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-silver">Clicks</p>
                <motion.span
                  key={insights.skillInteractions[skill.title]?.clicks || 0}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-silver text-sm font-bold"
                >
                  {insights.skillInteractions[skill.title]?.clicks || 0}
                </motion.span>
              </div>
              <div>
                <p className="text-xs text-silver">Time Spent</p>
                <motion.span
                  key={insights.skillInteractions[skill.title]?.timeSpent || 0}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-silver text-sm font-bold"
                >
                  {Math.floor(insights.skillInteractions[skill.title]?.timeSpent || 0)}s
                </motion.span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4 relative">
        <h4 className="text-sm font-medium">Recent Visit Trends</h4>
        <div className="relative">
          <canvas ref={canvasRef} width={200} height={50} className="mt-2" />
          {tooltipData.map((tooltip, index) => (
            <div
              key={index}
              className="absolute group"
              style={{
                left: `${tooltip.x - 50}px`, // Center the tooltip
                top: `${tooltip.y - 30}px`, // Position above the bar
              }}
            >
              <div className="hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 absolute z-10 -top-8 -left-1/2">
                {tooltip.date}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-silver mt-1">Bars represent the last 5 visits (height indicates recency)</p>
      </div>
    </div>
  );
};

export default VisitorInsights;
