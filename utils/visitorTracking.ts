
interface SkillInteraction {
    clicks: number;
    timeSpent: number; // In seconds
  }
  
  interface VisitData {
    visitCount: number;
    lastVisit: string;
    visitHistory: string[];
    totalClicks: number;
    skillInteractions: { [skill: string]: SkillInteraction };
  }
  
  export const trackVisitor = (): VisitData => {
    let data: VisitData = { visitCount: 0, lastVisit: '', visitHistory: [], totalClicks: 0, skillInteractions: {} };
  
    try {
      const visitData = localStorage.getItem('visitorData');
      if (visitData) {
        const parsedData = JSON.parse(visitData);
        data = {
          visitCount: typeof parsedData.visitCount === 'number' ? parsedData.visitCount : 0,
          lastVisit: typeof parsedData.lastVisit === 'string' ? parsedData.lastVisit : '',
          visitHistory: Array.isArray(parsedData.visitHistory) ? parsedData.visitHistory : [],
          totalClicks: typeof parsedData.totalClicks === 'number' ? parsedData.totalClicks : 0,
          skillInteractions: parsedData.skillInteractions || {},
        };
      }
    } catch (error) {
      console.error('Error parsing visitor data from localStorage:', error);
    }
  
    const now = new Date().toISOString();
    data.visitCount += 1;
    data.lastVisit = now;
    data.visitHistory = [now, ...data.visitHistory].slice(0, 5);
    localStorage.setItem('visitorData', JSON.stringify(data));
  
    return data;
  };
  
  export const getVisitorData = (): VisitData => {
    let data: VisitData = { visitCount: 0, lastVisit: '', visitHistory: [], totalClicks: 0, skillInteractions: {} };
  
    try {
      const visitData = localStorage.getItem('visitorData');
      if (visitData) {
        const parsedData = JSON.parse(visitData);
        data = {
          visitCount: typeof parsedData.visitCount === 'number' ? parsedData.visitCount : 0,
          lastVisit: typeof parsedData.lastVisit === 'string' ? parsedData.lastVisit : '',
          visitHistory: Array.isArray(parsedData.visitHistory) ? parsedData.visitHistory : [],
          totalClicks: typeof parsedData.totalClicks === 'number' ? parsedData.totalClicks : 0,
          skillInteractions: parsedData.skillInteractions || {},
        };
      }
    } catch (error) {
      console.error('Error parsing visitor data from localStorage:', error);
    }
  
    return data;
  };
  
  export const trackClick = (skill: string): VisitData => {
    const data = getVisitorData();
    data.totalClicks += 1;
    if (!data.skillInteractions[skill]) {
      data.skillInteractions[skill] = { clicks: 0, timeSpent: 0 };
    }
    data.skillInteractions[skill].clicks += 1;
    localStorage.setItem('visitorData', JSON.stringify(data));
    return data;
  };
  
  export const trackTimeSpent = (skill: string, time: number): VisitData => {
    const data = getVisitorData();
    if (!data.skillInteractions[skill]) {
      data.skillInteractions[skill] = { clicks: 0, timeSpent: 0 };
    }
    data.skillInteractions[skill].timeSpent += time;
    localStorage.setItem('visitorData', JSON.stringify(data));
    return data;
  };
