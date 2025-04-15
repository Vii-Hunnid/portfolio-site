// app/components/Modal.tsx

'use client'

import React from 'react';

const GitJournal: React.FC = () => {
  const projects = [
    { date: '25 Jul', title: 'Berulla-streaming-API-services-for-python', url: 'https://github.com/vihunnid/berulla-streaming' },
    { date: '25 Jun', title: 'ChatHub-Chat-application-vuejs-mongodb', url: 'https://github.com/vihunnid/chathub' },
    { date: '10 May', title: 'Dineeasy-coffee-tea-reservation-system', url: 'https://github.com/vihunnid/dineeasy' },
    { date: '5 May', title: 'Financebuddy-personal-finance-tracker', url: 'https://github.com/vihunnid/financebuddy' },
    { date: '5 May', title: 'Tunestream-music-streaming-API', url: 'https://github.com/vihunnid/tunestream' },
    { date: '5 May', title: 'Dineeasy-coffee-tea-reservation-system', url: 'https://github.com/vihunnid/dineeasy' },
    { date: '5 Apr', title: 'ChatHub-Chat-application-vuejs-mongodb', url: 'https://github.com/vihunnid/chathub' },
    { date: '5 Apr', title: 'Berulla-streaming-API-services-for-python', url: 'https://github.com/vihunnid/berulla-streaming' },
  ];

  return (
    <div className="component-border m-4 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Git Journaling</h3>
      <ul className="space-y-2">
        {projects.map((project, index) => (
          <li key={index} className="flex items-start">
            <span className="text-silver text-sm mr-2">{project.date}:</span>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition truncate"
            >
              {project.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GitJournal;
