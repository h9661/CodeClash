import { engToKor, korToEng } from "korsearch";
import { GameItemType } from "./gameItemType";

export const gameItemHandler = (
  setCode: React.Dispatch<React.SetStateAction<string>>,
  dispatch: React.Dispatch<{
    type: GameItemType;
    act: "on" | "off";
  }>,
) => {
  return (type: GameItemType) => {
    switch (type) {
      case GameItemType.SWAP:
        swapRandomLine(setCode);
        break;
      case GameItemType.SCREENBLOCK:
        screenBlock(dispatch);
        break;
      case GameItemType.TYPERANDOM:
        typeRandom(dispatch);
        break;
      case GameItemType.TINYCODE:
        tinyCode(dispatch);
        break;
      case GameItemType.CRAZYMUSIC:
        crazyMusic();
        break;
      case GameItemType.REVERSELANGUAGE:
        reverseLanguage(setCode, dispatch);
        break;
      case GameItemType.STOLEEYE:
        stealEye(dispatch);
        break;
      default:
        break;
    }
  };
};

const swapRandomLine = (setCode: React.Dispatch<React.SetStateAction<string>>) => {
  setCode(code => {
    const codeLine = code.split("\n");
    const wholeLineCount = codeLine.length;
    const [firstLine, secondLine] = Array(wholeLineCount)
      .fill(0)
      .reduce((acc, _, idx) => {
        if (codeLine[idx].trim() === "") return acc;
        return acc.concat(idx);
      }, [])
      .sort(() => Math.random() - 0.5);
    [codeLine[firstLine], codeLine[secondLine]] = [codeLine[secondLine], codeLine[firstLine]];
    return codeLine.join("\n");
  });
};

const reverseLanguage = (
  setCode: React.Dispatch<React.SetStateAction<string>>,
  dispatch: React.Dispatch<{
    type: GameItemType;
    act: "on" | "off";
  }>,
) => {
  setCode(code => engToKor(code));
  dispatch({ type: GameItemType.REVERSELANGUAGE, act: "on" });
  setTimeout(() => {
    setCode(code => korToEng(code));
    dispatch({ type: GameItemType.REVERSELANGUAGE, act: "off" });
  }, 1000 * 12);
};

const tinyCode = (
  dispatch: React.Dispatch<{
    type: GameItemType;
    act: "on" | "off";
  }>,
) => {
  dispatch({ type: GameItemType.TINYCODE, act: "on" });
  setTimeout(() => {
    dispatch({ type: GameItemType.TINYCODE, act: "off" });
  }, 1000 * 10);
};

const screenBlock = (
  dispatch: React.Dispatch<{
    type: GameItemType;
    act: "on" | "off";
  }>,
) => {
  dispatch({ type: GameItemType.SCREENBLOCK, act: "on" });
  setTimeout(() => {
    dispatch({ type: GameItemType.SCREENBLOCK, act: "off" });
  }, 1000 * 8);
};

const typeRandom = (
  dispatch: React.Dispatch<{
    type: GameItemType;
    act: "on" | "off";
  }>,
) => {
  dispatch({ type: GameItemType.TYPERANDOM, act: "on" });
  setTimeout(() => {
    dispatch({ type: GameItemType.TYPERANDOM, act: "off" });
  }, 1000 * 5);
};

const crazyMusic = () => {
  const audioNameList = ["/music/RDD.mp3", "/music/URMan.mp3"];
  const audioIdx = Math.floor(Math.random() * audioNameList.length);
  const audio = new Audio(audioNameList[audioIdx]);
  audio.volume = 0.2;
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, 1000 * 20);
};

const stealEye = (
  dispatch: React.Dispatch<{
    type: GameItemType;
    act: "on" | "off";
  }>,
) => {
  dispatch({ type: GameItemType.STOLEEYE, act: "on" });
  setTimeout(() => {
    dispatch({ type: GameItemType.STOLEEYE, act: "off" });
  }, 1000 * 15);
};
