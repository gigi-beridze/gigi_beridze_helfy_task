export const buildSlides = (tasks) => {
  if (tasks.length <= 1) return tasks;
  return [tasks[tasks.length - 1], ...tasks, tasks[0]];
}

export const getActiveIndex = (position, count) => {
  if (count === 0) return 0;
  return ((position - 1) % count + count) % count;
}
