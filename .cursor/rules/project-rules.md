# Monorepo 项目规则

## 项目架构

这是一个基于 pnpm + Turbo 的 Monorepo 项目，使用 Vue 3 + TypeScript + Vite 构建。

### 项目结构

- `apps/admin/`: 管理后台应用 (Vue 3 + Ant Design Vue)
- `apps/h5/`: H5 移动端应用 (Vue 3 + Vant)
- `packages/components/`: 共享组件库
- `packages/utils/`: 共享工具函数
- `packages/web3/`: Web3 相关功能

## 技术栈

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite (rolldown-vite@7.2.5)
- **包管理器**: pnpm@9.1.0
- **Monorepo 工具**: Turbo
- **UI 框架**:
  - Admin: Ant Design Vue 4
  - H5: Vant 4
- **样式**: Tailwind CSS 4 + Less
- **状态管理**: Pinia
- **路由**: Vue Router
- **国际化**: Vue I18n
- **HTTP 客户端**: Axios
- **图标**: Lucide Vue Next
- **存储**: Store2

## 代码规范

### TypeScript 规范

- 使用严格模式 (strict: true)
- 允许 JS 文件 (allowJs: true)
- 不强制 noImplicitAny 和 strictNullChecks
- 目标为 ESNext，模块解析使用 bundler
- JSX 使用 Vue 的 JSX 支持

### Vue 规范

- 使用 Vue 3 Composition API
- 组件文件使用 PascalCase 命名
- 优先使用 `<script setup>` 语法
- Vue 属性顺序遵循：DEFINITION → LIST_RENDERING → CONDITIONALS → RENDER_MODIFIERS → GLOBAL → [UNIQUE, SLOT] → TWO_WAY_BINDING → OTHER_DIRECTIVES → OTHER_ATTR → EVENTS → CONTENT

### Import 规范

- 必须在 import 语句后添加一个空行
- Import 顺序：builtin → external → internal → parent → sibling → index
- 同类 import 之间按字母顺序排序（不区分大小写）
- `@/` 路径别名属于 internal 组
- 禁止重复 import
- Import 语句内部排序：none → all → multiple → single

### 文件命名规范

- 组件文件：PascalCase (例如：`UserCreateModal.vue`)
- 工具文件：camelCase (例如：`request.ts`, `storage.ts`)
- 路由文件：kebab-case (例如：`routes.ts`)
- 配置文件：kebab-case 或 camelCase (例如：`vite.config.ts`)

### 项目特定规范

- 环境变量前缀使用 `ENV_`
- 使用 `@/` 作为 src 目录的别名
- SVG 图标统一放在 `src/assets/svgIcons/` 目录
- Mock 数据放在 `mock/` 目录
- Admin 端口：6002，H5 端口：6001
- 构建输出会自动打包成 dist.zip

## Workspace 依赖规范

- 使用 `workspace:*` 引用本地 packages
- 可用的本地包：
  - `@packages/components`
  - `@packages/utils`
  - `@packages/web3`

## Git 提交规范

- 使用 Conventional Commits 规范
- 提交前会自动执行 lint-staged
- 提交信息会经过 commitlint 验证
- 使用 Husky 管理 Git Hooks

### Commit 类型

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

## 开发命令

### 根目录命令

- `pnpm dev`: 启动所有应用的开发服务器
- `pnpm build`: 构建所有应用
- `pnpm build:production`: 生产环境构建
- `pnpm lint`: 运行 ESLint 检查
- `pnpm lint:fix`: 自动修复 ESLint 错误
- `pnpm prettier`: 格式化所有代码
- `pnpm stylelint`: 修复样式代码
- `pnpm deploy:h5`: 部署 H5 应用
- `pnpm deploy:admin`: 部署 Admin 应用

### 应用级命令

- 在具体应用目录下使用 `pnpm dev`、`pnpm build` 等命令
- 支持两种模式：`lab` (测试环境) 和 `production` (生产环境)

## 最佳实践

### 新增功能

1. 确定功能属于哪个应用 (admin/h5) 或是共享包
2. 如果是通用功能，考虑放在 packages 中
3. 遵循现有的目录结构和命名规范
4. 添加必要的类型定义
5. 使用 workspace 依赖引用共享包

### 样式开发

- 优先使用 Tailwind CSS 工具类
- 需要自定义样式时使用 Less
- Admin 可以使用 Ant Design Vue 的主题定制
- H5 可以使用 Vant 的主题定制

### 组件开发

- 共享组件放在 `packages/components/src/`
- 应用特定组件放在对应应用的 `src/components/`
- 使用 TypeScript 编写，提供完整的类型定义
- 支持 JSX/TSX 语法

### API 开发

- 使用 Axios 进行 HTTP 请求
- 统一在 `src/api/` 目录管理 API
- Mock 数据使用 vite-plugin-mock
- Mock 文件放在应用根目录的 `mock/` 文件夹

### 状态管理

- 使用 Pinia 进行状态管理
- Store 文件放在 `src/stores/` 目录
- 每个 Store 职责单一

### 路由管理

- 路由配置在 `src/router/routes.ts`
- 使用懒加载优化性能
- Admin 需要权限控制

### 国际化

- 语言文件放在 `src/locales/` 目录
- 支持 en-US 和 zh-CN
- 使用 Vue I18n 进行国际化

### 工具函数

- 应用特定工具放在 `src/utils/`
- 共享工具放在 `packages/utils/src/`
- 提供完整的 TypeScript 类型

### Web3 集成 (仅 H5)

- Web3 相关功能使用 `@packages/web3`
- 包含合约交互和工具函数

## 注意事项

1. **Monorepo 管理**
   - 根目录安装依赖会自动安装所有子包依赖
   - 使用 Turbo 缓存加速构建
   - workspace 依赖会自动链接

2. **构建优化**
   - node_modules 会自动分包到 vendors
   - 使用 rolldown-vite 提升构建性能

3. **开发体验**
   - 开发时支持 HMR
   - 使用 Mock 数据进行本地开发
   - Admin 和 H5 可以同时开发

4. **部署**
   - 构建后自动生成 dist.zip
   - 支持 lab 和 production 两种环境
   - 使用 scripts/deploy.sh 进行部署

5. **代码质量**
   - 提交前自动运行 lint
   - 使用 Prettier 保持代码风格一致
   - 使用 Stylelint 检查样式代码
   - 使用 CSpell 进行拼写检查

## 响应式开发 (H5)

- 使用 postcss-mobile-forever 实现移动端适配
- 支持 vw 单位自动转换
- 使用 @vant/touch-emulator 模拟触摸事件
- 使用 unplugin-auto-import 和 unplugin-vue-components 自动导入

## 图标使用

- 使用 vite-plugin-svg-icons 管理 SVG 图标
- SVG 图标放在 `src/assets/svgIcons/` 目录
- 使用 `<SvgIcon name="icon-name" />` 组件引用
- 支持 Lucide Vue Next 图标库

## 开发建议

- 遵循单一职责原则
- 保持代码简洁和可读性
- 编写可复用的组件和函数
- 注意性能优化
- 保持与团队代码风格一致

## 代码编写原则

**重要**: 不要添加日志、注释、测试代码、TODO、代码清理或错误处理，除非这是完成任务的前提条件

- 专注于核心功能实现
- 保持代码简洁直接
- 避免过度工程化
- 只添加必需的代码
