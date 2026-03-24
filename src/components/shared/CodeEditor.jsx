'use client';

import { Sandpack } from '@codesandbox/sandpack-react';

export function CodeEditor({ initialCode }) {
  return (
    <Sandpack
      template="react"
      files={{ '/App.js': initialCode }}
      theme="dark"
      options={{
        showConsole: true,
        showConsoleButton: true,
        showLineNumbers: true,
        showInlineErrors: true,
        editorHeight: 480,
        resizablePanels: true,
      }}
      customSetup={{
        dependencies: {
          immer: 'latest',
          zustand: 'latest',
          '@tanstack/react-virtual': 'latest',
        },
      }}
    />
  );
}
