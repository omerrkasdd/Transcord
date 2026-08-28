# Transcord

Transcord is a custom plugin for Vencord with support for 43 languages.

## Requirements

- Vencord source installation
- Git
- Node.js
- pnpm
- Groq API key

> The commands below assume your Vencord source folder is located at `%USERPROFILE%\Vencord`.

## Installation

Open PowerShell and remove the old temporary Transcord folder if it exists:

```powershell
Remove-Item "$env:TEMP\VencordPlugins" -Recurse -Force -ErrorAction SilentlyContinue
```

Clone the repository:

```powershell
git clone https://github.com/omerrkasdd/VencordPlugins.git "$env:TEMP\VencordPlugins"
```

Create the Transcord plugin folder:

```powershell
New-Item -ItemType Directory -Force "$HOME\Vencord\src\userplugins\transcord"
```

Copy the plugin files from `src` into Vencord:

```powershell
Copy-Item "$env:TEMP\VencordPlugins\src\*" "$HOME\Vencord\src\userplugins\transcord\" -Recurse -Force
```

Go to your Vencord folder:

```powershell
cd "$HOME\Vencord"
```

If PowerShell blocks script execution allow it for the current PowerShell session:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

If dependencies are not installed yet:

```powershell
pnpm install --frozen-lockfile
```

Build Vencord:

```powershell
pnpm build
```

Inject Vencord:

```powershell
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

If you get a dependency error:

```powershell
pnpm install --frozen-lockfile
```

Then run:

```powershell
pnpm build
```

and:

```powershell
pnpm inject
```

## Note

Transcord is not an official Discord or Vencord plugin.
