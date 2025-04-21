//import Subprocess
import Foundation

@main
struct MergeRegistry {
    static func main() async throws {
        print(fetchRegistryItemsPath())
        do {
            let registry = try fetchRegistry()
            print(registry)
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
    
    /// アイテムのJSONを取得してくる
    private static func fetchRegistryItemsPath() -> Array<String> {
        let pipe = Pipe()
        let process = Process()
        process.launchPath = "/usr/bin/find"
        process.arguments = ["../../src/components", "-name", "*.json"]
        process.standardOutput = pipe
        process.launch()
        process.waitUntilExit()
        
        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        guard let output = String(data: data, encoding: .utf8) else { return [] }
        return output.split(separator: "\n").map { String($0) }
    }
}
