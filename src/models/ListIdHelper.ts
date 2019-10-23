interface IHaveId {
  id: number | string;
}
export function getNextId(unOrderedList: IHaveId[]): number {
  const list = unOrderedList.sort((a: IHaveId, b: IHaveId) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  });
  const withPrevious = list.map((item: IHaveId, index: number) => {
    const previous = list[index - 1];
    let previousId = null;
    if (previous) {
      previousId = previous.id;
    }
    return {
      ...item,
      previousId
    };
  });

  const firstGap = withPrevious.filter((item: IHaveId, index: number) => {
    const whatItShould = index;
    if (item.id !== whatItShould) {
      return true;
    }
    return false;
  });
  if (firstGap.length === 0) {
    return list.length;
  }
  const prevId = firstGap[0].previousId as number;
  return prevId !== null ? prevId + 1 : (firstGap[0].id as number) - 1;
}
