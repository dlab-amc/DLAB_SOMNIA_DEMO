import { getStatusTextEng as getStatusTextEngFromMeta } from "../data/submitStatus";

export const getDateString = (date) => {
  if (!date) return null;
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();

  return `${year}${month.padStart(2, "0")}${day.padStart(2, "0")}`;
};

export const formatDateTime = (dateString) => {
  const d = new Date(dateString);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ` + 
         `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
};

// export const getSubmitDetailString = (detail) => {
//   return `진행중 ${detail.progress}, 완료 ${detail.done}, 에러 ${detail.error}`;
// };

export const getSubmitDetailString = (detail, eng) => {
  if (!detail) return "진행중 0, 완료 0, 에러 0"; // Fallback if detail is undefined or null

  const progress = detail.progress || 0; // Fallback to 0 if undefined
  const done = detail.done || 0;
  const error = detail.error || 0;

  return eng ? `In Progress ${progress}, Completed ${done}, Error ${error}` : `진행중 ${progress}, 완료 ${done}, 에러 ${error}`;
};


export const getMinimizedFileName = (fileName) => {
  if (fileName.split(".").length !== 2) return fileName;
  const [name, ext] = fileName.split(".");
  return `${name.slice(0, 10)}….${ext}`;
};

export const getStatusTextEng = (statusText) =>
  getStatusTextEngFromMeta(statusText);