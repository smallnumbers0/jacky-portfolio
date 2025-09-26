# Theme System Guide

## How It Works

The portfolio now **automatically detects and respects your macOS system dark/light mode preference**! This works seamlessly with Tailwind CSS's built-in system preference detection.

## Behavior

### First Visit (Automatic Detection)
- **macOS Dark Mode**: Portfolio automatically loads in dark mode
- **macOS Light Mode**: Portfolio automatically loads in light mode
- **No flash** - correct theme loads immediately
- **Works on all platforms** - respects Windows, Linux, mobile system preferences too

### Manual Override (Optional)
- Click the theme toggle button to manually override system preference
- Your manual choice is saved and takes priority over system settings
- Manual preference persists across browser sessions
- Theme toggle icons update to show current mode

### Dynamic System Updates
- If you haven't manually set a preference, the site **automatically follows system changes**
- Change your macOS system preference → site updates instantly
- If you have manually set a preference, it stays until you reset it

## Testing the System

### To test automatic system detection:

1. **On macOS**: System Preferences → General → Appearance → Switch between Light/Dark
2. **On Windows**: Settings → Personalization → Colors → Choose Light/Dark
3. **In Browser DevTools**: Console → Rendering → Emulate `prefers-color-scheme`

**Watch the magic happen**: The portfolio should instantly follow your system changes!

### To reset to system preference:

If you've manually set a theme and want to go back to automatic system detection:

```javascript
// Method 1: Reset function
window.resetToSystemTheme()

// Method 2: Clear manually
localStorage.removeItem('theme')
location.reload()
```

## Technical Details

### Theme Detection Order:
1. **Saved Preference** (localStorage) - highest priority
2. **System Preference** (prefers-color-scheme) - fallback

### Flash Prevention:
- Inline script in `<head>` sets theme class immediately
- Runs before CSS loads to prevent flash of wrong theme

### Console Logging:
Check browser console to see which theme source is being used:
- `🎨 Theme: Using saved preference (dark)`
- `🎨 Theme: Using system preference (light)`

## Benefits

✅ **Respectful UX** - Honors user's system preference by default
✅ **No Flash** - Correct theme loads immediately
✅ **Choice Preserved** - Manual selections are remembered
✅ **Dynamic** - Updates with system changes when appropriate
✅ **Modern Standard** - Follows current web best practices

The theme system now behaves exactly like users expect from modern websites!