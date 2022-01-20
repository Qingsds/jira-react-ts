import { Rate } from "antd";
import React from "react";

interface PinProps extends React.ComponentProps<typeof Rate> {
  pin: boolean;
  onCheckedChange?: (num: boolean) => void;
}

export default function Pin(props: PinProps) {
  const { pin, onCheckedChange } = props;
  return (
    <Rate
      count={1}
      value={pin ? 1 : 0}
      onChange={(num) => onCheckedChange?.(Boolean(num))}
    />
  );
}
