#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

/**
 * レジストリアイテムを結合するNode.js実装
 * Vercel環境でSwiftが利用できない場合のフォールバック
 */
async function mergeRegistry() {
  try {
    // 既存のregistry.jsonを読み込み
    const registryPath = path.resolve('registry.json')
    let registry
    
    try {
      const registryContent = fs.readFileSync(registryPath, 'utf8')
      registry = JSON.parse(registryContent)
    } catch (error) {
      console.log('registry.json not found, creating new one')
      registry = {
        name: 'sparkle-design',
        items: []
      }
    }

    // src/components内のJSONファイルを検索
    const componentJsonFiles = await glob('src/components/**/*.json', {
      cwd: process.cwd(),
      absolute: true
    })

    console.log(`Found ${componentJsonFiles.length} component JSON files`)

    // 各JSONファイルを読み込んでレジストリアイテムとして追加
    const items = []
    for (const filePath of componentJsonFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf8')
        const item = JSON.parse(content)
        items.push(item)
        console.log(`✅ Processed: ${path.basename(filePath)}`)
      } catch (error) {
        console.error(`❌ Failed to parse ${filePath}:`, error.message)
      }
    }

    // 新しいレジストリを作成
    const newRegistry = {
      ...registry,
      items: items
    }

    // レジストリを書き込み
    fs.writeFileSync(registryPath, JSON.stringify(newRegistry, null, 2))
    console.log(`🎉 Successfully merged ${items.length} items into registry.json`)

  } catch (error) {
    console.error('❌ Error merging registry:', error)
    process.exit(1)
  }
}

// スクリプトとして実行された場合
if (import.meta.url === `file://${process.argv[1]}`) {
  mergeRegistry()
}

export default mergeRegistry
