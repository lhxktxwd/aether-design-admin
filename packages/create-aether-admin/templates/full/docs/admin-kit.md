# Aether Design Admin Kit Coverage

[简体中文](./admin-kit.zh-CN.md)

This project is usable as a practical Admin UI layer on top of Element Plus. Prefer Aether Design Admin components for product surfaces, and drop down to raw Element Plus only for rare low-level controls.

## Added Business Components

| Component | Purpose | Element Plus Mapping |
| --- | --- | --- |
| `UserSelect` | Assign owners, reviewers and members | `ElSelect`, `ElOption`, `ElTag` |
| `DepartmentTreeSelect` | Pick departments or organization scopes | `ElTreeSelect` |
| `DictionarySelect` | Select grouped business dictionaries | `ElSelect`, `ElOptionGroup` |
| `PermissionMatrix` | Edit role/module/action permissions | `ElCheckbox` |
| `StatusFlow` | Move records through workflow states | `ElButton` plus Aether Design status tokens |
| `EditableDataTable` | Inline item editing and totals | `ElTable`, `ElInput`, `ElInputNumber`, `ElSelect` |
| `TreeDataTable` | Hierarchical records | `ElTable` tree rows |
| `SortableDataTable` | Manual priority ordering | `ElTable`, icon buttons |

## Recommended Admin Page Coverage

- Dashboard: metrics, activity, alerts, quick actions.
- List page: `QueryToolbar`, `DataTablePro`, `BatchActionBar`, `ColumnSettings`.
- Advanced list: saved views, URL sync, active filter tags, date range.
- Create/edit page: `FormSection`, business selectors, `StickyFormActions`.
- Detail page: `DescriptionList`, `ActivityTimeline`, `AttachmentList`, `AuditLogList`.
- Permission page: `PermissionMatrix`, `DepartmentTreeSelect`, `UserSelect`.
- Settings page: `DictionarySelect`, switches, confirmation dialogs.
- Error and empty states: `PageState`, `ResultState`, `ErrorState`, `EmptyState`.

## Development Rules

- Prefer Aether Design Admin wrappers for visible business UI.
- Keep Element Plus as the interaction engine, not the final visual language.
- For dense admin areas, use weak borders, calm spacing and clear state tags.
- Avoid custom controls when Element Plus already covers keyboard and accessibility behavior.
- Test light/dark mode, sidebar collapsed mode, long text, empty data, loading and error states before shipping a page.

## Verification Page

Open `/admin-kit` to inspect business selectors, permission editing, workflow states and complex table variants.
