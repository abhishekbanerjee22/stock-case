import formatDistanceToNow from "date-fns/formatDistanceToNow";

export const getTimeAgo = (d) => {
  const date = new Date(d);
  return formatDistanceToNow(date, {
    includeSeconds: true,
    includeSuffix: true
  });
};
