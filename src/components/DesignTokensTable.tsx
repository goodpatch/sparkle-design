import React from 'react';
import fs from 'fs';
import path from 'path';

function loadTokens(filePath: string): Record<string, string> {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /--([A-Za-z0-9_-]+):\s*([^;]+);/g;
  const tokens: Record<string, string> = {};
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content))) {
    tokens[match[1]] = match[2].trim();
  }
  return tokens;
}

const variablesPath = path.join(process.cwd(), 'src', 'app', 'variables.css');
const globalsPath = path.join(process.cwd(), 'src', 'app', 'globals.css');

const tokens = {
  ...loadTokens(variablesPath),
  ...loadTokens(globalsPath),
};

const entries = Object.entries(tokens).sort(([a], [b]) => (a > b ? 1 : -1));

/**
 * DesignTokensTable コンポーネントは、globals.css と variables.css から取得したデザイントークンを表形式で表示します。
 */
export const DesignTokensTable: React.FC = () => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '4px' }}>Token</th>
        <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '4px' }}>Value</th>
      </tr>
    </thead>
    <tbody>
      {entries.map(([name, value]) => (
        <tr key={name}>
          <td style={{ fontFamily: 'monospace', padding: '4px', borderBottom: '1px solid #eee' }}>--{name}</td>
          <td style={{ padding: '4px', borderBottom: '1px solid #eee' }}>{value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DesignTokensTable;
