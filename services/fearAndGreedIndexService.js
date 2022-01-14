import axios from "axios";

export const getFearAndGreedIndexes = async () => {
  const res = await axios.get(
    "https://api.alternative.me/fng/?limit=30&format=json&date_format=cn"
  );

  const FGIndexesResData = res.data;
  const FGIndexes = FGIndexesResData.data;

  return FGIndexes;
};
