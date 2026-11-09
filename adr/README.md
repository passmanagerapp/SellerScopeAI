# Architecture Decision Records

Short documents capturing a significant technical decision: the context that forced it, what was
decided, and the consequences we accept. Immutable once `Accepted` — to change a decision, write a
new ADR that supersedes the old one.

## Index

| # | Title | Status |
|---|-------|--------|
| [0001](0001-record-architecture-decisions.md) | Record architecture decisions | Accepted |
| [0002](0002-max-source-file-length.md) | Cap source files at 1500 lines | Accepted |
| [0003](0003-shipentegra-creationdate-offset.md) | Correct ShipEntegra's creationDate at every read site | Accepted |
| [0004](0004-kobweb-export-must-force-release-build-target.md) | `kobweb export` must force a RELEASE build target (FULLSTACK layout) | Accepted |
| [0005](0005-multi-tenant-server-and-shipentegra-only.md) | Multi-tenant Kobweb server on Railway; ShipEntegra is the only integration | Accepted |

## Adding one

1. Copy the structure of an existing ADR (Context / Decision / Consequences).
2. Use the next free 4-digit number; file name `NNNN-kebab-case-title.md`.
3. Start at `Proposed`, move to `Accepted` once agreed. If it replaces an earlier ADR, mark the old
   one `Superseded by NNNN`.
4. Add a row to the index above.
