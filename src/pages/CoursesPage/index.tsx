// ============================================================
// src/pages/CoursesPage/index.tsx
// Public entry point for the All Courses page.
// Renders inside MainLayout's <Outlet />, so there is no header,
// footer or app shell here. It only composes sections and
// connects them to useCourseFilters.
// ============================================================

import { ActiveFilters } from "./sections/ActiveFilters";
import { CourseFilters, MobileFilters, SortSelect } from "./sections/CourseFilters";
import { CourseListing } from "./sections/CourseListing";
import { CourseSearch } from "./sections/CourseSearch";
import { PageHeader } from "./sections/PageHeader";
import { useCourseFilters } from "./hooks/useCourseFilters";
import type { FilterControlsProps } from "./sections/CourseFilters";

export function CoursesPage() {
  const {
    isLoading,
    results,
    totalCount,
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
  } = useCourseFilters();

  // One props object shared by the desktop sidebar and the mobile drawer.
  const filterControls: FilterControlsProps = {
    filters,
    categoryOptions,
    modeOptions,
    priceBounds,
    onToggleCategory: toggleCategory,
    onClearCategories: clearCategories,
    onToggleMode: toggleMode,
    onPriceMinChange: setPriceMin,
    onPriceMaxChange: setPriceMax,
    onReset: resetFilters,
  };

  return (
    <div>
      <PageHeader totalCount={totalCount} />

      <div className="shell pb-20 pt-2 sm:pt-4">
        {/* Search */}
        <CourseSearch value={searchInput} onChange={setSearchInput} />

        <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* Desktop sidebar (hidden below lg) */}
          <CourseFilters {...filterControls} />

          {/* Results column */}
          <div className="min-w-0 space-y-5">
            <ActiveFilters
              filters={activeFilters}
              onRemove={removeFilter}
              onClearAll={resetFilters}
            />

            <CourseListing
              results={results}
              totalCount={totalCount}
              isLoading={isLoading}
              hasActiveFilters={activeFilters.length > 0}
              onReset={resetFilters}
              toolbar={
                <>
                  <MobileFilters {...filterControls} resultCount={results.length} />
                  <SortSelect value={filters.sort} onChange={setSort} />
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}