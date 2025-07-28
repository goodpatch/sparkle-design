//import Subprocess
import Foundation

@main
struct MergeRegistry {
  static func main() async throws {
    let itemPaths = fetchRegistryItemsPath()
    do {
      let registry = try fetchRegistry()

      let items = itemPaths.compactMap { itemPath in
        do {
          return try fetchRegistryItem(path: itemPath)
        } catch {
          print("Failed to parse \(itemPath)")
          return nil
        }
      }

      // アイテムを名前でソートして順序を安定化
      let sortedItems = items.sorted { $0.name < $1.name }

      let newRegistry = registry.copyWithNewItems(sortedItems)
      try writeRegistry(newRegistry)
    } catch {
      print(error)
    }
  }

  /// 現在のレジストリを取得する
  private static func fetchRegistry() throws -> ShadcnRegistry {
    let pipe = Pipe()
    let process = Process()
    process.launchPath = "/bin/cat"
    process.arguments = ["../../registry.json"]
    process.standardOutput = pipe
    process.launch()
    process.waitUntilExit()

    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    return try JSONDecoder().decode(ShadcnRegistry.self, from: data)
  }

  /// レジストリを更新する
  private static func writeRegistry(_ registry: ShadcnRegistry) throws {
    let encoder = JSONEncoder()
    encoder.outputFormatting = [.prettyPrinted, .withoutEscapingSlashes, .sortedKeys]
    let data = try encoder.encode(registry)
    let text = String(data: data, encoding: .utf8)
    //        print(text ?? "Failed to parse")
    try data.write(to: URL(fileURLWithPath: "../../registry.json"))
  }

  /// レジストリアイテムを取得する
  private static func fetchRegistryItem(path: String) throws -> ShadcnRegistryItem {
    let pipe = Pipe()
    let process = Process()
    process.launchPath = "/bin/cat"
    process.arguments = [path]
    process.standardOutput = pipe
    process.launch()
    process.waitUntilExit()

    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    return try JSONDecoder().decode(ShadcnRegistryItem.self, from: data)
  }

  /// アイテムのJSONを取得してくる
  private static func fetchRegistryItemsPath() -> [String] {
    let pipe = Pipe()
    let process = Process()
    process.launchPath = "/usr/bin/find"
    process.arguments = ["../../src/components", "-name", "*.json"]
    process.standardOutput = pipe
    process.launch()
    process.waitUntilExit()

    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    guard let output = String(data: data, encoding: .utf8) else {
      print("Failed to parse output")
      return []
    }

    // ファイルパスをソートして処理順序を安定化
    return output.split(separator: "\n").map { String($0) }.sorted()
  }
}
