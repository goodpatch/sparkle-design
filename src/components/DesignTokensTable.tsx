import React from 'react';
import globalsCss from '../app/globals.css?raw';
import variablesCss from '../app/variables.css?raw';

function loadTokens(content: string): Record<string, string> {
  const regex = /--([A-Za-z0-9_-]+):\s*([^;]+);/g;
  const tokens: Record<string, string> = {};
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content))) {
    tokens[match[1]] = match[2].trim();
  }
  return tokens;
}

const tokens = {
  ...loadTokens(variablesCss),
  ...loadTokens(globalsCss),
};

const entries = Object.entries(tokens).sort(([a], [b]) => a.localeCompare(b));

/**
 * [Copilot Comment] DesignTokensTable コンポーネントは、globals.css と variables.css をビルド時に取り込み、定義されているカスタムプロパティを一覧表示します。
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
