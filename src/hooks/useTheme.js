'use client';

import { useEffect, useState } from 'react';

const THEME_KEY = 'codedobo-theme';

export function useTheme() {
  const [theme, setTheme] = useState('light');
  const [isMounted, setIsMounted] = useState(false);

  // 초기화: localStorage 또는 시스템 설정에서 테마 읽기
  useEffect(() => {
    setIsMounted(true);

    // localStorage에서 저장된 테마 읽기
    const saved = localStorage.getItem(THEME_KEY);

    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    } else {
      // 시스템 설정 확인
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      setTheme(systemTheme);
      applyTheme(systemTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, newTheme);
      applyTheme(newTheme);
      return newTheme;
    });
  };

  return { theme, toggleTheme, isMounted };
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
}
