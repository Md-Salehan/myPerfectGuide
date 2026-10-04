// ============================================================
// src/app/hooks.ts
// ============================================================

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "./store";

/**
 * Typed version of react-redux's `useDispatch`.
 *
 * Use this everywhere instead of the raw `useDispatch` so that
 * dispatching thunks (including RTK Query's generated hooks)
 * is type-checked against the store's middleware setup.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed version of react-redux's `useSelector`.
 *
 * The state argument is automatically typed as `RootState`,
 * so selectors get full autocomplete on the state tree without
 * any manual annotation.
 */
export const useAppSelector = useSelector.withTypes<RootState>();