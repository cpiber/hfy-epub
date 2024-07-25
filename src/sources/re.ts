
export const commentLink = /(?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/([^\/]+)\/comments\/.+/i;
export const commentLinkMD = /\[([^\]]+)\]\s*\(((?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/([^\/]+)\/comments\/[^)]+)\)/igm;
export const commentLinkHTML = /href="((?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/([^\/]+)\/comments\/[^"]+)"[^>]*>\s*([^<]+)/igm;
export const anyLinkHTML = /href="([^"]+)"[^>]*>\s*(.+)<\/a>/igm;