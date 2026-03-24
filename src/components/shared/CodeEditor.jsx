'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export function CodeEditor({ initialCode }) {
  const [code, setCode] = useState(initialCode);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const next = code.substring(0, start) + '  ' + code.substring(end);
        setCode(next);
        requestAnimationFrame(() => {
          e.target.selectionStart = e.target.selectionEnd = start + 2;
        });
      }
    },
    [code],
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground">
          ⚔️ 수련 코드 에디터
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCode(initialCode)}
          title="초기 코드로 되돌리기"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          초기화
        </Button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoComplete="off"
        className="w-full min-h-[420px] resize-y rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
