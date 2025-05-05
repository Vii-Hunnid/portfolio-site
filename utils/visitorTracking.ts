// utils/visitorTracking.ts

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

export const trackVisitor = (): VisitData => {
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
  
  localStorage.setItem('visitor-data', JSON.stringify(data));
  return data;
};

export const getVisitorData = (): VisitData => {
  const storedData = localStorage.getItem('visitor-data');
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return trackVisitor();
  }
};

export const trackClick = (skillName: string): void => {
  const data = getVisitorData();
  data.totalClicks += 1;
  
  if (!data.skillInteractions[skillName]) {
    data.skillInteractions[skillName] = {
      clicks: 0,
      timeSpent: 0
    };
  }
  
  data.skillInteractions[skillName].clicks += 1;
  localStorage.setItem('visitor-data', JSON.stringify(data));
};

export const trackTimeSpent = (skillName: string, seconds: number): void => {
  const data = getVisitorData();
  
  if (!data.skillInteractions[skillName]) {
    data.skillInteractions[skillName] = {
      clicks: 0,
      timeSpent: 0
    };
  }
  
  data.skillInteractions[skillName].timeSpent += seconds;
  localStorage.setItem('visitor-data', JSON.stringify(data));
};
