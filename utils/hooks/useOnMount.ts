import type { EffectCallback } from "react";
import { useEffect } from "react";

export const useOnMount = (fn: EffectCallback) => useEffect(fn, []);
