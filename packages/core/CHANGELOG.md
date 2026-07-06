# Changelog

All notable changes to `@formura/core` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.2] - 2026-07-06

### Added

- Package README with install guide, quick start, `createForm` API reference, and action examples
- CHANGELOG.md

## [0.0.1] - 2026-06-07

### Added

- `createForm` factory returning `Form`, `Field`, and `useFormState`
- Zod schema-driven field rendering via optional UI adapters
- Client actions with `asClientAction` and typed parsed values
- Server actions with `asServerAction` via `@formura/core/server`
- `ActionResult` contract with `success` and `error` statuses, field errors, and global messages
- Form store for submission state, field values, and field-level errors
- Per-field overrides through `fields` config and `GlobalErrorElement`
- Field metadata utilities: `inferFieldMeta`, `getFieldSchema`, `unwrapFieldSchema`, `getSchemaFieldKeys`, `formatFieldLabel`
- Validation helpers: `flattenErrors`, `toFormData`
- Subpath export `@formura/core/server` for server-only action helpers
