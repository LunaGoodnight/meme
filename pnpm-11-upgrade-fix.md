# Fixing pnpm Install Errors After Upgrading to pnpm 11

## Symptom

Running `pnpm install browser-image-compression` (or a plain `pnpm install`) failed with:

```
[ERR_PNPM_UNEXPECTED_STORE] Unexpected store location

The dependencies at ".../meme/node_modules" are currently linked from the store at
"~/Library/pnpm/store/v10".

pnpm now wants to use the store at "~/Library/pnpm/store/v11" to link dependencies.
```

## Root Cause

1. **pnpm was upgraded from v10 to v11.** pnpm 11 uses a new content-addressable store
   (`store/v11`), but the existing `node_modules` was still linked to the old
   `store/v10`. pnpm refuses to modify `node_modules` when the store location doesn't
   match. This blocks every install, not just one package.
2. **pnpm 11 blocks dependency build scripts by default.** Packages with `postinstall` /
   `install` scripts must be explicitly approved. Unapproved scripts produce
   `ERR_PNPM_IGNORED_BUILDS`, which makes the command exit with an error even though
   most packages were installed.

Note: `pnpm install <pkg>` is equivalent to `pnpm add <pkg>`. The command itself was not
the problem.

## Fix

### Step 1: Rebuild `node_modules` against the new store

```bash
pnpm install --config.confirmModulesPurge=false
```

Switching stores requires deleting and rebuilding `node_modules`. Normally pnpm asks
`Proceed? (Y/n)` first. `confirmModulesPurge=false` skips that prompt so the rebuild
runs without interruption.

Result: all dependencies were relinked, and `browser-image-compression@2.0.2` was
installed. The command then failed with a second error:

```
[ERR_PNPM_IGNORED_BUILDS] Ignored build scripts: @tailwindcss/oxide@4.1.13, sharp@0.34.5, unrs-resolver@1.11.1
Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.
```

### Step 2: Approve the build scripts

pnpm generated a `pnpm-workspace.yaml` with placeholder values
(`set this to true or false`). All three packages are well-known and needed, so they
were set to `true`:

```yaml
allowBuilds:
  '@tailwindcss/oxide': true
  sharp: true
  unrs-resolver: true
```

| Package              | Why it needs a build script              |
| -------------------- | ---------------------------------------- |
| `@tailwindcss/oxide` | Tailwind CSS v4 native engine binary     |
| `sharp`              | Native image processing for `next/image` |
| `unrs-resolver`      | Native module resolver used by ESLint    |

Alternatively, run `pnpm approve-builds` to choose which packages to approve.

### Step 3: Reinstall

```bash
pnpm install
```

Output:

```
.../node_modules/@tailwindcss/oxide postinstall: Done
.../node_modules/unrs-resolver postinstall: Done
.../sharp@0.34.5/node_modules/sharp install: Done
Done in 2.8s using pnpm v11.1.2
```

Install completed without errors.

## Follow-ups

- **Commit `pnpm-workspace.yaml`.** Otherwise other machines and your deployment environment will hit
  `ERR_PNPM_IGNORED_BUILDS` again.
- **Pin the pnpm version (optional).** Add this to `package.json` so everyone uses the
  same pnpm major version:

  ```json
  "packageManager": "pnpm@11.1.2"
  ```

- **Other machines or projects:** the same store error can appear once per project
  after upgrading. Fix it with:

  ```bash
  pnpm install --config.confirmModulesPurge=false
  pnpm approve-builds
  ```
