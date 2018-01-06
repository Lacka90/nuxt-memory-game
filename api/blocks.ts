export const getBlocks = (total = 10) =>
  (Array.apply(null, {length: total})
    .map(Number.call, Number))
    .map(index => ({
      index,
      guess: Math.floor(index / 2),
      image: `https://picsum.photos/200/300?image=${100 * Math.floor(index / 2)}`,
      flip: false,
    }));
