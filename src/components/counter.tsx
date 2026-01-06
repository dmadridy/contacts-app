import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleDecrement() {
    setCount(count - 1);
  }

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handleDecrement}>Decrement</Button>
      <Badge className="size-10" variant="outline">
        {count}
      </Badge>
      <Button onClick={handleIncrement}>Increment</Button>
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
}
