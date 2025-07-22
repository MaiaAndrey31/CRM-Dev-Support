import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #3e5c9e;
    --primary-dark: #000C24;
    --primary-light: #4d6cab;
    --primary-lighter: #5c7cb8;
    --accent-color: #56B459;
    --accent-light: #6bc46e;
    --white: #ffffff;
    --success-color: #56B459;
    --danger-color: #ff6b6b;
    --warning-color: #ffd93d;
    --light-color: #f8f9fa;
    --dark-color: #2c3e50;
    --border-color: rgba(255, 255, 255, 0.1);
    --text-color: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.8);
    --font-sans: 'Segoe UI', system-ui, -apple-system, sans-serif;
    --border-radius: 8px;
    --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    --transition: all 0.3s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: var(--font-sans);
    line-height: 1.6;
    color: var(--text-color);
    background: linear-gradient(135deg, #000c24 0%, #3e5c9e 100%);
    overflow-x: hidden;
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    html {
      font-size: 15px;
    }
    body {
      font-size: 0.95rem;
      padding: 0 0.5rem;
    }
  }

  @media (max-width: 400px) {
    html {
      font-size: 14px;
    }
    body {
      font-size: 0.9rem;
    }
  }

  a {
    text-decoration: none;
    color: var(--primary-color);
    transition: var(--transition);
  }
  a:hover {
    color: var(--primary-dark);
  }
`;

export default GlobalStyle;
