import { WxtViteConfig, defineConfig } from "wxt";
import tailwindcss from '@tailwindcss/vite';
import toUtf8 from "./scripts/vite-plugin-to-utf8";

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: (env) => {
    // const contentJsPath = `.output/${env.browser}-mv${env.manifestVersion}/content-scripts`;
    return {
      plugins: [toUtf8(),tailwindcss()],
      legacy: {
        skipWebSocketTokenCheck: true,
      },
    } as WxtViteConfig;
  },
  // 配置Chrome扩展的manifest.json（WXT会自动将此配置生成最终的manifest文件）
  manifest: {
    // 扩展申请的权限列表（MV3中需显式声明才能使用对应API）
    permissions: [
      'nativeMessaging', // 原生消息通信权限（用于与本地应用/服务通信，如mcp-chrome-bridge）
      'tabs', // 标签页操作权限（获取/修改标签页信息）
      'activeTab', // 活动标签页权限（临时获取当前激活标签页的权限）
      'scripting', // 脚本注入权限（向目标页面注入JS/CSS）
      'downloads', // 下载管理权限（控制浏览器下载行为）
      'webRequest', // 网络请求拦截权限（监听/修改网络请求）
      'debugger', // 调试器权限（使用Chrome调试器API）
      'history', // 历史记录权限（访问浏览器历史记录）
      'bookmarks', // 书签权限（访问/修改浏览器书签）
      'offscreen', // 离屏文档权限（用于执行耗时操作，避免主线程阻塞）
      'storage', // 存储权限（使用Chrome的local/session/storage API）
    ],
    // 主机权限：允许扩展访问所有网址（<all_urls>表示匹配所有http/https页面）
    host_permissions: ['<all_urls>'],

    // 声明可被目标网页访问的扩展资源（MV3中需显式声明，否则目标页无法访问扩展内的资源）
    web_accessible_resources: [
      {
        resources: [
          '/models/*', // 允许目标页访问扩展public/models/下的所有文件（如AI模型、配置文件）
          '/workers/*', // 允许目标页访问扩展workers/下的所有文件（如Web Worker脚本）
        ],
        matches: ['<all_urls>'], // 允许所有网页访问上述资源
      },
    ],

    // 跨源嵌入器策略：require-corp表示仅允许跨源资源与CORP头匹配的资源嵌入
    // cross_origin_embedder_policy: {
    //   value: 'require-corp',
    // },
    // 跨源打开器策略：same-origin表示仅允许同源页面共享浏览上下文
    // cross_origin_opener_policy: {
    //   value: 'same-origin',
    // },
    // 内容安全策略（CSP）：MV3的核心安全机制，限制扩展内的资源加载和脚本执行
    content_security_policy: {
      // 扩展页面的CSP规则：
      // script-src 'self'：仅允许加载扩展自身的脚本
      // 'wasm-unsafe-eval'：允许WebAssembly的非安全求值（用于运行WASM模块，如AI模型）
      // 'unsafe-eval'：允许使用eval()和new Function()（某些库需要，如streamdown）
      // object-src 'self'：仅允许加载扩展自身的对象资源（如<object>标签）
      extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';",
    },
  },
});
