export function getDaysAgoText(date: string) {
  const today = new Date()
  const createdOn = new Date(date)
  
  const msInDay = 24 * 60 * 60 * 1000

  today.setHours(0, 0, 0, 0)
  createdOn.setHours(0, 0, 0, 0)

  const daysAgo = Math.floor((Number(today) - Number(createdOn)) / msInDay)

  if (daysAgo === 0) {
    return 'Today'
  } else if (daysAgo === 1) {
    return '1 day ago'
  } else {
    return `${daysAgo} days ago`
  }
}
