# Transcord

Transcord is a custom plugin for Vencord with support for 43 languages.

## Requirements

- Vencord source installation
- Git
- Node.js
- pnpm
- Groq API key

## Installation

Clone the repository:

```bash
git clone https://github.com/omerrkasdd/VencordPlugins.git
```

Move the files inside the `src` folder to:

```text
Vencord/src/userplugins/transcord
```

Open PowerShell inside your Vencord folder.

If PowerShell blocks script execution use this command for the current PowerShell session:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

If dependencies are not installed yet run:

```powershell
pnpm install --frozen-lockfile
```

Build the plugin and inject Vencord:

```powershell
pnpm build
pnpm inject
```

Fully close Discord and open it again.

Go to Vencord settings and enable **Transcord**.

## API Key

Transcord uses the Groq API for translations.

Create a Groq API key and add it in the Transcord settings.

## Troubleshooting

If `pnpm` is blocked by PowerShell:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

If you get a dependency error while building:

```powershell
pnpm install --frozen-lockfile
pnpm build
pnpm inject
```

## Note

Transcord is not an official Discord or Vencord plugin.
