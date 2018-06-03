// Manipulate the links array (sort, filter...)

const sortLinks = (links = [], sortBy) =>
  links.slice().sort((l1, l2) => {
    if (sortBy === 'creation-date') {
      return l2.createdAt - l1.createdAt;
    } else if (sortBy === 'last-visit') {
      if (l1.lastVisit && l2.lastVisit) {
        return l2.lastVisit - l1.lastVisit;
      } else if (l1.lastVisit) {
        return -1;
      } else if (l2.lastVisit) {
        return 1;
      }

      return 0;
    } else if (sortBy === 'visits') {
      return l2.visitCount - l1.visitCount;
    }
    return 0;
  });

export default sortLinks;
