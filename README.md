# Random Password Generator

A sleek, dark-themed password generator application built with React and Vite. Allows users to create highly secure passwords with custom lengths and character type options, accompanied by a dynamic visual strength meter.

## Features

- **Custom Length Control**: Adjust length from 4 to 32 characters using a smooth slider.
- **Character Toggles**: Include/exclude uppercase letters, lowercase letters, numbers, and special symbols.
- **Visual Strength Indicator**: Evaluates password strength dynamically with color-coded rating bars (Weak / Medium / Strong).
- **One-Click Copy**: Copy password to clipboard with temporary visual feedback.
- **Cryptographically Secure**: Built using `window.crypto.getRandomValues`.
- **Dark UI Theme**: Sleek slate and neon aesthetic.

## Tech Stack

- **React** (Vite)
- **CSS3** (Flexbox, custom form controls, dark mode aesthetic)

## Usage

1. Integrate `App.jsx` and `App.css` into your Vite React setup.
2. Run `npm run dev`.
