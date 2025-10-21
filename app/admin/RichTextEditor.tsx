"use client";
"use client";
import { useState, useRef, useCallback, useEffect } from 'react';

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [isFocused, setIsFocused] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (editorRef.current && isClient) {
      // Only update if content is different to avoid cursor issues
      const currentContent = editorRef.current.innerHTML;
      if (currentContent !== value) {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        const startOffset = range?.startOffset || 0;
        
        editorRef.current.innerHTML = value;
        
        // Restore cursor position
        if (selection && range) {
          try {
            const newRange = document.createRange();
            newRange.setStart(editorRef.current.firstChild || editorRef.current, Math.min(startOffset, editorRef.current.textContent?.length || 0));
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          } catch (e) {
            // Ignore range errors
          }
        }
      }
    }
  }, [value, isClient]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  }, [onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        
        const br1 = document.createElement('br');
        const br2 = document.createElement('br');
        
        range.insertNode(br2);
        range.insertNode(br1);
        
        // Move cursor after the line breaks
        range.setStartAfter(br2);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        
        handleInput();
      }
    }
  }, [handleInput]);

  const applyFormat = useCallback((command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      handleInput();
    }
  }, [handleInput]);

  if (!isClient) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
        <div className="border-b border-gray-300 p-2 bg-gray-50">
          <div className="text-sm text-gray-500">Loading editor...</div>
        </div>
        <div className="min-h-32 p-4 bg-gray-50"></div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 bg-gray-50 flex flex-wrap gap-1">
        <button
          type="button"
          className="px-2 py-1 text-sm border rounded hover:bg-gray-200"
          onClick={() => applyFormat('bold')}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className="px-2 py-1 text-sm border rounded hover:bg-gray-200"
          onClick={() => applyFormat('italic')}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          className="px-2 py-1 text-sm border rounded hover:bg-gray-200"
          onClick={() => applyFormat('underline')}
        >
          <u>U</u>
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          className="px-2 py-1 text-sm border rounded hover:bg-gray-200"
          onClick={() => applyFormat('insertUnorderedList')}
        >
          • List
        </button>
        <button
          type="button"
          className="px-2 py-1 text-sm border rounded hover:bg-gray-200"
          onClick={() => applyFormat('insertOrderedList')}
        >
          1. List
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <select
          aria-label="Text formatting"
          onChange={(e) => {
            if (e.target.value) {
              applyFormat('formatBlock', e.target.value);
              e.target.value = '';
            }
          }}
          className="px-2 py-1 text-sm border rounded"
        >
          <option value="">Heading</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="p">Paragraph</option>
        </select>
      </div>

      {/* Editor Container */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          className="min-h-32 p-4 focus:outline-none text-left"
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          dir="ltr"
          suppressContentEditableWarning={true}
        />
        
        {/* Placeholder when empty */}
        {(!value || value.trim() === '') && !isFocused && (
          <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
            Write your blog content here...
          </div>
        )}
      </div>
    </div>
  );
}
