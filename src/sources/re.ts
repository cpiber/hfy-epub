
export const commentLinkMD = /\[([^\]]+)\]\s*\(((?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/([^\/]+)\/comments\/[^)]+)\)/igm;
export const commentLinkHTML = /href="((?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/([^\/]+)\/comments\/[^"]+)"[^>]*>\s*([^<]+)/igm;