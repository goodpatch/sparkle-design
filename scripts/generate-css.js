#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// プロジェクトルートディレクトリ
const PROJECT_ROOT = path.resolve(__dirname, '..');

// 設定ファイルとテンプレートのパス
const CONFIG_PATH = path.join(PROJECT_ROOT, 'sparkle.config.json');
const TEMPLATE_PATH = path.join(__dirname, 'templates', 'sparkle-design.template.css');
const GRAY_JSON_PATH = path.join(__dirname, 'templates', 'gray.json');
const RADIUS_CSV_PATH = path.join(__dirname, 'templates', 'radius.csv');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'src', 'app', 'sparkle-design.css');

/**
 * sparkle.config.jsonを読み込む
 */
function loadConfig() {
  try {
    const configContent = fs.readFileSync(CONFIG_PATH, 'utf8');
    const config = JSON.parse(configContent);
    console.log('✅ sparkle.config.json を読み込みました:', config);
    return config;
  } catch (error) {
    console.error('❌ sparkle.config.json の読み込みに失敗しました:', error.message);
    process.exit(1);
  }
}

/**
 * CSSテンプレートを読み込む
 */
function loadTemplate() {
  try {
    const templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    console.log('✅ CSSテンプレートを読み込みました');
    return templateContent;
  } catch (error) {
    console.error('❌ CSSテンプレートの読み込みに失敗しました:', error.message);
    console.error('テンプレートファイルが存在することを確認してください:', TEMPLATE_PATH);
    process.exit(1);
  }
}

/**
 * gray.jsonを読み込む
 */
function loadGrayMapping() {
  try {
    const grayContent = fs.readFileSync(GRAY_JSON_PATH, 'utf8');
    const grayMapping = JSON.parse(grayContent);
    console.log('✅ gray.json を読み込みました');
    return grayMapping;
  } catch (error) {
    console.error('❌ gray.json の読み込みに失敗しました:', error.message);
    process.exit(1);
  }
}

/**
 * radius.csvを読み込む
 */
function loadRadiusMapping() {
  try {
    const csvContent = fs.readFileSync(RADIUS_CSV_PATH, 'utf8');
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',');
    const radiusMapping = {};
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const name = values[0];
      radiusMapping[name] = {};
      
      for (let j = 1; j < headers.length; j++) {
        radiusMapping[name][headers[j]] = values[j];
      }
    }
    
    console.log('✅ radius.csv を読み込みました');
    return radiusMapping;
  } catch (error) {
    console.error('❌ radius.csv の読み込みに失敗しました:', error.message);
    process.exit(1);
  }
}

/**
 * テンプレート変数を設定値で置換する
 */
function processTemplate(template, config, grayMapping, radiusMapping) {
  let processedCSS = template;

  // 1. 基本的な設定値による置換
  Object.entries(config).forEach(([key, value]) => {
    // 通常のプレースホルダー（CSS用 - スペースはそのまま）
    const placeholder = `{{${key.toUpperCase().replace('-', '_')}}}`;
    processedCSS = processedCSS.replace(new RegExp(placeholder, 'g'), value);
    
    // フォントファミリーの場合はURL用のプレースホルダーも生成（スペースを+に置き換え）
    if (key.toLowerCase().includes('font')) {
      const urlPlaceholder = `{{${key.toUpperCase().replace('-', '_')}_URL}}`;
      const urlValue = value.replace(/\s+/g, '+');
      processedCSS = processedCSS.replace(new RegExp(urlPlaceholder, 'g'), urlValue);
    }
  });

  // 2. Grayカラーの置換
  if (config.primary && grayMapping[config.primary]) {
    const grayColors = grayMapping[config.primary];
    
    // gray-50からgray-900までの置換
    Object.entries(grayColors).forEach(([key, hexValue]) => {
      const grayLevel = key === '0' ? '50' : 
                       key === '1' ? '100' :
                       key === '2' ? '200' :
                       key === '3' ? '300' :
                       key === '4' ? '400' :
                       key === '5' ? '500' :
                       key === '6' ? '600' :
                       key === '7' ? '700' :
                       key === '8' ? '800' :
                       key === '9' ? '900' : key;
      
      // 16進数をrgba形式に変換
      const rgbaValue = hexToRgba(hexValue);
      const grayPattern = new RegExp(`--color-gray-${grayLevel}:\\s*rgba\\([^)]+\\)`, 'g');
      processedCSS = processedCSS.replace(grayPattern, `--color-gray-${grayLevel}: ${rgbaValue}`);
    });
    
    console.log(`✅ ${config.primary}カラーに対応するgrayカラーを適用しました`);
  }

  // 3. Radiusの一括置換
  if (config.radius && radiusMapping[config.radius]) {
    const radiusValues = radiusMapping[config.radius];
    
    Object.entries(radiusValues).forEach(([semanticName, radiusValue]) => {
      if (semanticName === 'round') return; // roundは特別扱い
      
      const semanticPattern = new RegExp(`--radius-${semanticName}:\\s*var\\(--radius-[^)]+\\)`, 'g');
      processedCSS = processedCSS.replace(semanticPattern, `--radius-${semanticName}: var(--radius-${radiusValue})`);
    });
    
    console.log(`✅ ${config.radius}に対応するradius設定を適用しました`);
  }

  console.log('✅ テンプレートを設定値で処理しました');
  return processedCSS;
}

/**
 * 16進数カラーをrgba形式に変換
 */
function hexToRgba(hex) {
  // #を削除
  hex = hex.replace('#', '');
  
  // 3桁の場合は6桁に拡張
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

/**
 * 生成されたCSSをファイルに書き出す
 */
function writeCSS(cssContent) {
  try {
    // 出力ディレクトリが存在しない場合は作成
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_PATH, cssContent, 'utf8');
    console.log('✅ sparkle-design.css を生成しました:', OUTPUT_PATH);
  } catch (error) {
    console.error('❌ CSSファイルの書き出しに失敗しました:', error.message);
    process.exit(1);
  }
}

/**
 * メイン処理
 */
function main() {
  console.log('🚀 Sparkle Design CSS Generator を開始します...\n');

  // 1. 設定ファイルを読み込み
  const config = loadConfig();

  // 2. テンプレートを読み込み
  const template = loadTemplate();

  // 3. gray.jsonとradius.csvを読み込み
  const grayMapping = loadGrayMapping();
  const radiusMapping = loadRadiusMapping();

  // 4. テンプレートを設定値で処理
  const processedCSS = processTemplate(template, config, grayMapping, radiusMapping);

  // 5. CSSファイルを書き出し
  writeCSS(processedCSS);

  console.log('\n🎉 CSS生成が完了しました！');
}

// スクリプトが直接実行された場合のみメイン処理を実行
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { loadConfig, loadTemplate, loadGrayMapping, loadRadiusMapping, processTemplate, writeCSS, hexToRgba };
