# Aether Design Admin Kit 覆盖范围

[English](./admin-kit.md)

这套项目现在可以作为一层实用的 Admin UI 封装运行在 Element Plus 之上。开发业务页面时，优先使用 Aether Design Admin 组件；只有在非常底层或临时场景下才直接使用原始 Element Plus 控件。

## 新增业务组件

| 组件 | 用途 | Element Plus 映射 |
| --- | --- | --- |
| `UserSelect` | 选择负责人、审核人、成员 | `ElSelect`, `ElOption`, `ElTag` |
| `DepartmentTreeSelect` | 选择部门、组织范围 | `ElTreeSelect` |
| `DictionarySelect` | 选择分组业务字典 | `ElSelect`, `ElOptionGroup` |
| `PermissionMatrix` | 编辑角色、模块、动作权限 | `ElCheckbox` |
| `StatusFlow` | 处理审批、发布、工单状态流转 | `ElButton` + Aether Design 状态 token |
| `EditableDataTable` | 行内编辑明细、SKU、配额 | `ElTable`, `ElInput`, `ElInputNumber`, `ElSelect` |
| `TreeDataTable` | 展示层级数据 | `ElTable` tree rows |
| `SortableDataTable` | 手动排序优先级 | `ElTable`, icon buttons |

## 推荐页面覆盖

- Dashboard：指标、动态、提醒、快捷操作。
- List Page：`QueryToolbar`, `DataTablePro`, `BatchActionBar`, `ColumnSettings`。
- Advanced List：保存视图、URL 同步、active filter tags、日期范围。
- Create/Edit Page：`FormSection`, 业务选择器, `StickyFormActions`。
- Detail Page：`DescriptionList`, `ActivityTimeline`, `AttachmentList`, `AuditLogList`。
- Permission Page：`PermissionMatrix`, `DepartmentTreeSelect`, `UserSelect`。
- Settings Page：`DictionarySelect`, switches, confirmation dialogs。
- Error / Empty States：`PageState`, `ResultState`, `ErrorState`, `EmptyState`。

## 开发规则

- 可见业务 UI 优先使用 Aether Design Admin 封装组件。
- Element Plus 负责交互能力，不作为最终视觉语言。
- 高信息密度后台页面使用弱边框、克制留白、清晰状态标签。
- Element Plus 已经覆盖键盘与可访问性的控件，不要轻易重写。
- 页面交付前检查亮色/暗色、侧边栏折叠、长文本、空数据、加载、错误状态。

## 验证页面

打开 `/admin-kit` 查看业务选择器、权限编辑、状态流转和复杂表格变体。
