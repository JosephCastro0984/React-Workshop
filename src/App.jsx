import React, { useState, useEffect } from 'react';
import { 
  Plus, Check, Trash2, Sparkles, Flame, Zap, Target, 
  Tag, Volume2, VolumeX, GripVertical, Trophy, Search, RefreshCw
} from 'lucide-react';

export default function App() {
  const [todos, setTodos] = useState([
    { id: '1', title: 'Architect motion graphics engine', completed: false, category: 'Dev', priority: 'High' },
    { id: '2', title: 'Refactor Tailwind CSS v4 variables', completed: true, category: 'Code', priority: 'Medium' },
    { id: '3', title: 'Audit micro-animations & feedback', completed: false, category: 'Design', priority: 'High' },
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('Dev');
  const [filter, setFilter] = useState('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const categories = ['Dev', 'Design', 'Code', 'Personal'];

  // Synthesis Audio Feedback Generator (No external MP3 files required)
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'add') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'complete') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'delete') {
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch (e) {
      // Fallback if audio API is constrained
    }
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      title: inputValue.trim(),
      completed: false,
      category: category,
      priority: 'High'
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
    playSound('add');
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          if (!todo.completed) playSound('complete');
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    playSound('delete');
  };

  // Drag and Drop Logic
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const updatedTodos = [...todos];
    const item = updatedTodos.splice(draggedIndex, 1)[0];
    updatedTodos.splice(index, 0, item);
    
    setDraggedIndex(index);
    setTodos(updatedTodos);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Filtered and Searched items
  const filteredTodos = todos.filter((todo) => {
    const matchesFilter = 
      filter === 'active' ? !todo.completed :
      filter === 'completed' ? todo.completed : true;
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const progressPercent = todos.length ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-pink-500 selection:text-white">
      
      {/* Dynamic Background Ambient Blurs */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/25 via-purple-600/20 to-pink-500/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-xl space-y-5">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-slate-400">SYSTEM ACTIVE</span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition text-xs font-medium cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span>{soundEnabled ? 'Audio On' : 'Muted'}</span>
          </button>
        </div>

        {/* Hero Card Header */}
        <header className="glow-border rounded-3xl p-6 shadow-2xl backdrop-blur-2xl bg-slate-900/90">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5" /> Directives Engine
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                Task Command
              </h1>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
                <Flame className="w-5 h-5 text-rose-500 animate-streak" />
                <div>
                  <div className="text-xs font-black text-rose-400">{completedCount} Streak</div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Done Today</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar Display */}
          <div className="mt-5 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-400">Completion Velocity</span>
              <span className="text-indigo-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700/40">
              <div 
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </header>

        {/* Input Form & Category Selector */}
        <form onSubmit={handleAddTodo} className="space-y-3">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
            
            <div className="relative flex items-center bg-slate-900/90 rounded-2xl p-2 border border-slate-800 backdrop-blur-xl">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Initialize new directive..."
                className="w-full bg-transparent px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-indigo-500/25 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Create</span>
              </button>
            </div>
          </div>

          {/* Tags Selection & Search Bar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer shrink-0 ${
                    category === cat
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                      : 'text-slate-500 hover:text-slate-300 bg-slate-900/50 border border-slate-800/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative hidden sm:block w-36 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter..."
                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </form>

        {/* Status Filter Tab Group */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 px-1">
          <div className="flex gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800/80 text-xs font-medium">
            {['all', 'active', 'completed'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1.5 rounded-lg capitalize transition cursor-pointer ${
                  filter === type
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono font-semibold text-slate-500">
            {filteredTodos.length} OBJECTIVES
          </span>
        </div>

        {/* Task Cards List (Drag and Drop Supported) */}
        <div className="space-y-2.5">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/30 rounded-3xl border border-slate-800/50 backdrop-blur-sm">
              <Trophy className="w-8 h-8 text-indigo-400 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium text-slate-400">No active directives found.</p>
            </div>
          ) : (
            filteredTodos.map((todo, index) => (
              <div
                key={todo.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`group relative flex items-center justify-between p-3.5 bg-slate-900/60 hover:bg-slate-900/90 border rounded-2xl backdrop-blur-md transition-all duration-200 ${
                  draggedIndex === index ? 'opacity-30 border-indigo-500 scale-98' : ''
                } ${
                  todo.completed
                    ? 'border-slate-800/40 opacity-50'
                    : 'border-slate-800/80 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                  {/* Drag Handle */}
                  <div className="cursor-grab active:cursor-grabbing p-1 text-slate-600 hover:text-slate-400 transition">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  {/* Interactive Toggle Checkbox */}
                  <button
                    onClick={() => handleToggleTodo(todo.id)}
                    className={`flex items-center justify-center w-6 h-6 rounded-lg border transition-all duration-200 cursor-pointer shrink-0 ${
                      todo.completed
                        ? 'bg-gradient-to-tr from-indigo-500 to-pink-500 border-transparent text-white shadow-md shadow-pink-500/20'
                        : 'border-slate-700 bg-slate-800/60 hover:border-indigo-400'
                    }`}
                  >
                    {todo.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  {/* Title and Category */}
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-sm font-semibold transition ${
                        todo.completed
                          ? 'line-through text-slate-500'
                          : 'text-slate-100'
                      }`}
                    >
                      {todo.title}
                    </span>
                    
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700/50">
                        {todo.category || 'General'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delete Trigger */}
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer"
                  aria-label="Delete objective"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}