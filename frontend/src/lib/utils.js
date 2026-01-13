export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function getMessageDateLabel(date) {
  const messageDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Reset time to midnight for accurate comparison
  const resetTime = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  
  const messageDateOnly = resetTime(messageDate);
  const todayOnly = resetTime(today);
  const yesterdayOnly = resetTime(yesterday);

  // Check if it's today
  if (messageDateOnly.getTime() === todayOnly.getTime()) {
    return "Today";
  }

  // Check if it's yesterday
  if (messageDateOnly.getTime() === yesterdayOnly.getTime()) {
    return "Yesterday";
  }

  // Check if it's within the last 7 days
  const daysDiff = Math.floor((todayOnly - messageDateOnly) / (1000 * 60 * 60 * 24));
  if (daysDiff < 7 && daysDiff > 0) {
    return messageDate.toLocaleDateString("en-US", { weekday: "long" });
  }

  // Otherwise, return full date
  return messageDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
