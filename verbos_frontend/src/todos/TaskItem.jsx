import { FiStar, FiEdit2, FiTrash2 } from "react-icons/fi";

const TaskItem = ({
    task,
    isEditing,
    editText,
    setEditText,
    onEditSubmit,
    editInputRef,
    onToggleComplete,
    onToggleImportant,
    onDelete,
    onEdit,
    theme
  }) => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onEditSubmit(task.id);
      }
      if (e.key === 'Escape') {
        setEditText(task.text);
        onEditSubmit(task.id);
      }
    };
  
    return (
      <div
        className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
          ${task.completed ? 'bg-[var(--muted)] opacity-70' : 'bg-[var(--card)] hover:bg-[var(--sidebar-accent)]/40'}`}
      >
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="w-5 h-5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-offset-0 transition-colors duration-200 bg-[var(--card)]"
        />
  
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={editInputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => onEditSubmit(task.id)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none focus:outline-none text-[var(--foreground)]"
            />
          ) : (
            <span className={`text-sm ${task.completed ? 'line-through text-[var(--muted-foreground)]' : 'text-[var(--foreground)]'}`}>
              {task.text}
            </span>
          )}
        </div>
  
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onToggleImportant(task.id)}
            className={`p-1 rounded hover:bg-[var(--muted-foreground)]/20 transition-colors duration-200
              ${task.important ? 'text-[var(--chart-5)]' : 'text-[var(--muted-foreground)] hover:text-[var(--chart-5)]'}`}
          >
            <FiStar size={16} />
          </button>
          
          <button
            onClick={() => onEdit(task)}
            className="p-1 rounded text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted-foreground)]/20 transition-colors duration-200"
          >
            <FiEdit2 size={16} />
          </button>
  
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 rounded text-[var(--muted-foreground)] hover:text-[var(--destructive)] hover:bg-[var(--muted-foreground)]/20 transition-colors duration-200"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    );
  };

  export default TaskItem;