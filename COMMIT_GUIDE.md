# ✅ Commit Message Guide for ThreadEngine

We use **Conventional Commits** to power versioning, changelogs, and auto-releases.

---

## 🎯 Format

```
<type>(scope): short summary

[optional body]

[optional footer]
```

---

## 📚 Common Types

| Type     | Description                      |
|----------|----------------------------------|
| `feat`   | New feature                      |
| `fix`    | Bug fix                          |
| `docs`   | Documentation only               |
| `style`  | Code formatting (no logic)       |
| `refactor` | Refactoring (no features/fixes)|
| `test`   | Adding or updating tests         |
| `chore`  | Build or tooling updates         |

---

## 🛠 Examples

```
feat(canvas): add drag-to-position support

fix(splash): prevent flicker on load

docs(readme): update install instructions

chore(deps): upgrade to Vite 5.0.1

refactor(state): simplify workspace reducer logic
```

---

## 💡 Tips

- Use present tense ("add" not "added")
- Keep the summary under 72 characters
- Skip period (`.`) at the end of the subject line
