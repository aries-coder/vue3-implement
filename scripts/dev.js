/**
 * 此文件用于打包 packages下的各个包
 */

// 用于解析获取命令行参数
import minimist from 'minimist'
import esbuild from 'esbuild'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

// 将命令行参数解析为对象
const args = minimist(process.argv.slice(2))
// 获取打包的目标模块
const target = args._[0] || 'reactivity'
// 打包格式
const format = args.f || 'iife'

// esm 使用 cjs 变量
/**
 * 在 esm 模块中，__dirname 和 __filename 是不可用的，需要使用别的方式来获取
 * import.meta.url：file:///E:/tools/vue3-implement/scripts/dev.js
 * __filename：E:\tools\vue3-implement\scripts\dev.js
 * __dirname：E:\tools\vue3-implement\scripts
 */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// 在 esm 模块中自定义 require
const require = createRequire(import.meta.url)

// 根据命令行参数 获取打包入口文件和pkg文件
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)
const pkg = require(`../packages/${target}/package.json`)

esbuild.context({
  entryPoints: [entry],  //入口
  outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`),  // 出口
  bundle: true,  // 是否打包到一起
  sourcemap: true,  // 开启 sourceMap
  platform: 'browser',  // 打包后运行平台
  format,  // cjs esm iife
  globalName: pkg.buildOptions?.name  // iife 全局变量
}).then((ctx) => {
  console.log('build success')

  return ctx.watch()  // 监听文件变化，实时打包
})
