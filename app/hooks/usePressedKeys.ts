import { useEffect, useState } from "react";

const usePressedKeys = (): Set<string> => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      setPressedKeys(prevKeys => {
        const updatedKeys = new Set(prevKeys);
        updatedKeys.add(event.key);
        return updatedKeys;
      });
    };

    const handleKeyUp = (event: KeyboardEvent): void => {
      setPressedKeys(prevKeys => {
        const updatedKeys = new Set(prevKeys);
        updatedKeys.delete(event.key);
        return updatedKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return (): void => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return pressedKeys;
};

export { usePressedKeys };