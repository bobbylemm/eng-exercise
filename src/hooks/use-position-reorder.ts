import { useState, useRef } from "react";
import { clamp, distance } from "popmotion";
import move from "array-move";

export function usePositionReorder(initialState: any): [string[], (i: number, offset: number) => number, (i: number, dragOffset: number) => void, React.Dispatch<any>] {
  const [order, setOrder] = useState(initialState);

  const positions = useRef<any[]>([]).current;
  const updatePosition = (i: number, offset: number) => (positions[i] = offset);

  const updateOrder = (i: number, dragOffset: number) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) setOrder(move(order, i, targetIndex));
  };

  return [order, updatePosition, updateOrder, setOrder];
}

const buffer = 30;

export const findIndex = (i: number, yOffset: number, positions: any[]) => {
  let target = i;
  const { top, height } = positions[i];
  const bottom = top + height;

  // If moving down
  if (yOffset > 0) {
    const nextItem = positions[i + 1];
    if (nextItem === undefined) return i;

    const swapOffset =
      distance(bottom, nextItem.top + nextItem.height / 2) + buffer;
    if (yOffset > swapOffset) target = i + 1;

    // If moving up
  } else if (yOffset < 0) {
    const prevItem = positions[i - 1];
    if (prevItem === undefined) return i;

    const prevBottom = prevItem.top + prevItem.height;
    const swapOffset = distance(top, prevBottom - prevItem.height / 2) + buffer;
    if (yOffset < -swapOffset) target = i - 1;
  }

  return clamp(0, positions.length, target);
};
