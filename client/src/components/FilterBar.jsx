function FilterBar({ filter, onFilterChange }) {
  function handleStatus(e) {
    onFilterChange({ ...filter, status: e.target.value });
  }

  function handlePriority(e) {
    onFilterChange({ ...filter, priority: e.target.value });
  }

  function clearFilters() {
    onFilterChange({ status: "", priority: "" });
  }

  return (
    <div className="filter-bar">
      <select value={filter.status} onChange={handleStatus}>
        <option value="">All Statuses</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select value={filter.priority} onChange={handlePriority}>
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button className="btn btn--secondary" onClick={clearFilters}>
        Clear filters
      </button>
    </div>
  );
}

export default FilterBar;
