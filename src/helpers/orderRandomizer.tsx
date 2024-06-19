export default function orderRandomizer(list: any[]) {
  let newList = [...list];
  for (let i = 0; i < newList.length; i++) {
    const randomIndex = Math.floor(Math.random() * newList.length);
    const temp = newList[i];
    newList[i] = newList[randomIndex];
    newList[randomIndex] = temp;
  }
  return newList;
};
