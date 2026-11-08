// ============================================================
// src/pages/CoursesPage/hooks/useCourseFilters.ts
// Page-level state: search input, filters, sort, loading flag.
// Reads the catalogue from src/data/courses.ts (single source
// of truth) and derives everything else from it.
// ============================================================

import { useCallback, useEffect, useMemo, useState } from "react";

import { getAllCourses } from "../../../data/courses";
import {
  INITIAL_LOAD_MS,
  SEARCH_DEBOUNCE_MS,
  createDefaultFilters,
} from "../data/constants";
import type {
  ActiveFilter,
  CatalogEntry,
  CourseFilterState,
  FacetOption,
  PriceRange,
  SortOption,
} from "../types";
import {
  applyFilters,
  buildActiveFilters,
  buildCatalog,
  getFacetOptions,
  getPriceBounds,
} from "../utils/courseFilters";

export interface UseCourseFiltersResult {
  /** True only during the brief initial skeleton phase. */
  isLoading: boolean;

  /* ---- Data ---- */
  /** Filtered + sorted entries, ready to render. */
  results: CatalogEntry[];
  /** Number of courses in the whole catalogue. */
  totalCount: number;

  /* ---- Controlled values ---- */
  /** Raw text in the search box (updates on every keystroke). */
  searchInput: string;
  /** Filters actually applied (query is debounced). */
  filters: CourseFilterState;

  /* ---- Options derived from the catalogue ---- */
  categoryOptions: FacetOption[];
  modeOptions: FacetOption[];
  priceBounds: PriceRange;

  /* ---- Active chips ---- */
  activeFilters: ActiveFilter[];

  /* ---- Actions ---- */
  setSearchInput: (value: string) => void;
  toggleCategory: (category: string) => void;
  clearCategories: () => void;
  toggleMode: (mode: string) => void;
  setPriceMin: (value: number) => void;
  setPriceMax: (value: number) => void;
  setSort: (sort: SortOption) => void;
  removeFilter: (filter: ActiveFilter) => void;
  resetFilters: () => void;
}

const clamp = (value: number, low: number, high: number) =>
  Math.min(Math.max(value, low), high);

/** Adds the value if absent, removes it if present. */
const toggleInList = (list: string[], value: string): string[] =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export function useCourseFilters(): UseCourseFiltersResult {
  /* ---------- Catalogue (built once) ---------- */

  const catalog = useMemo(() => buildCatalog(getAllCourses()), []);
  const priceBounds = useMemo(() => getPriceBounds(catalog), [catalog]);
  const categoryOptions = useMemo(
    () => getFacetOptions(catalog, (course) => course.category),
    [catalog],
  );
  const modeOptions = useMemo(
    () => getFacetOptions(catalog, (course) => course.mode),
    [catalog],
  );

  /* ---------- State ---------- */

  const [filters, setFilters] = useState<CourseFilterState>(() =>
    createDefaultFilters(priceBounds),
  );
  const [searchInput, setSearchInputState] = useState("");
  const [isLoading, setIsLoading] = useState(INITIAL_LOAD_MS > 0);

  /* ---------- Initial skeleton ---------- */

  useEffect(() => {
    if (INITIAL_LOAD_MS <= 0) return;
    const timer = window.setTimeout(() => setIsLoading(false), INITIAL_LOAD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  /* ---------- Debounce typed query into filters.query ---------- */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFilters((current) =>
        current.query === searchInput ? current : { ...current, query: searchInput },
      );
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  /* ---------- Derived ---------- */

  const results = useMemo(() => applyFilters(catalog, filters), [catalog, filters]);
  const activeFilters = useMemo(
    () => buildActiveFilters(filters, priceBounds),
    [filters, priceBounds],
  );

  /* ---------- Actions ---------- */

  const setSearchInput = useCallback((value: string) => {
    setSearchInputState(value);
  }, []);

  /** Clears the query immediately, without waiting for the debounce. */
  const clearQuery = useCallback(() => {
    setSearchInputState("");
    setFilters((current) => ({ ...current, query: "" }));
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setFilters((current) => ({
      ...current,
      categories: toggleInList(current.categories, category),
    }));
  }, []);

  const clearCategories = useCallback(() => {
    setFilters((current) => ({ ...current, categories: [] }));
  }, []);

  const toggleMode = useCallback((mode: string) => {
    setFilters((current) => ({
      ...current,
      modes: toggleInList(current.modes, mode),
    }));
  }, []);

  /**
   * The two handles can never cross: min is capped at the current
   * max and max is floored at the current min. Non-numeric input
   * (e.g. an emptied number field) is ignored.
   */
  const setPriceMin = useCallback(
    (value: number) => {
      if (Number.isNaN(value)) return;
      setFilters((current) => ({
        ...current,
        price: {
          ...current.price,
          min: clamp(value, priceBounds.min, current.price.max),
        },
      }));
    },
    [priceBounds],
  );

  const setPriceMax = useCallback(
    (value: number) => {
      if (Number.isNaN(value)) return;
      setFilters((current) => ({
        ...current,
        price: {
          ...current.price,
          max: clamp(value, current.price.min, priceBounds.max),
        },
      }));
    },
    [priceBounds],
  );

  const setSort = useCallback((sort: SortOption) => {
    setFilters((current) => ({ ...current, sort }));
  }, []);

  const resetPrice = useCallback(() => {
    setFilters((current) => ({
      ...current,
      price: { min: priceBounds.min, max: priceBounds.max },
    }));
  }, [priceBounds]);

  /** Removes one chip's worth of filtering. */
  const removeFilter = useCallback(
    (filter: ActiveFilter) => {
      switch (filter.kind) {
        case "query":
          clearQuery();
          break;
        case "category":
          if (filter.value) toggleCategory(filter.value);
          break;
        case "mode":
          if (filter.value) toggleMode(filter.value);
          break;
        case "price":
          resetPrice();
          break;
      }
    },
    [clearQuery, toggleCategory, toggleMode, resetPrice],
  );

  /** Clears search, categories, modes and price. Keeps the chosen sort. */
  const resetFilters = useCallback(() => {
    setSearchInputState("");
    setFilters((current) => ({
      ...createDefaultFilters(priceBounds),
      sort: current.sort,
    }));
  }, [priceBounds]);

  return {
    isLoading,
    results,
    totalCount: catalog.length,
    searchInput,
    filters,
    categoryOptions,
    modeOptions,
    priceBounds,
    activeFilters,
    setSearchInput,
    toggleCategory,
    clearCategories,
    toggleMode,
    setPriceMin,
    setPriceMax,
    setSort,
    removeFilter,
    resetFilters,
  };
}