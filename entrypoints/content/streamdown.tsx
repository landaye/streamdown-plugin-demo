import { useState, useEffect } from 'react'
import { Streamdown } from 'streamdown-plugin'

function App() {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const demoMarkdown = `# Welcome to Streamdown Demo

This is a **streaming** Markdown renderer built with:
- Vite + React 18
- Tailwind CSS 4
- Streamdown

## Features

- ✅ Real-time streaming markdown rendering
- ✅ Support for **bold**, *italic*, and ~~strikethrough~~ text
- ✅ Code blocks with syntax highlighting
- ✅ Lists and headings
- ✅ Links and images

## Example Code

\`\`\`javascript
function hello() {
  console.log("Hello from Streamdown!");
}
\`\`\`

## Installation

\`\`\`bash
npm install streamdown
\`\`\`

## Usage

\`\`\`javascript
import Streamdown from 'streamdown';

function App() {
  return (
    <Streamdown>
      # Hello Streamdown
      This is **markdown** content.
    </Streamdown>
  );
}
\`\`\`

Enjoy using Streamdown! 🎉`

    let index = 0;
    const interval = setInterval(() => {
      if (index < demoMarkdown.length) {
        setMarkdown(prev => prev + demoMarkdown[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bg-[#fff] border border-[#585858] box-shadow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999999] w-[500px] h-[600px] from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 overflow-y-auto">
      <div className="max-w-full">
        <header className="text-center mb-6 pt-2">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
            Streamdown 演示
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-full">
            基于 Vite + React 18 + Tailwind CSS 4 构建的实时流式 Markdown 渲染器
          </p>
        </header>

        <div className="bg-white  dark:bg-gray-800 rounded-xl shadow-lg p-4 overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
              实时流式渲染演示
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-xs">
              观看 Markdown 内容实时流式渲染效果：
            </p>
          </div>

          <div className="prose prose-blue prose-sm dark:prose-invert dark:prose-blue max-w-none transition-all duration-300">
            <Streamdown

              shikiTheme={['github-light', 'github-dark']}
              className="markdown-content transition-all duration-300"
            >
              {markdown}
            </Streamdown>
          </div>
        </div>

        <footer className="mt-6 text-center text-gray-500 dark:text-gray-400 text-xs">
          <p className="flex items-center justify-center gap-1">
            使用 Vite + React 18 + Tailwind CSS 4 + Streamdown 构建
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
