//import Subprocess
import Foundation

@main
struct MergeRegistry {
    static func main() async throws {
        let registryJsonFilePath = "../../registry.json"
        //    let itemFilesPath = try await run(
        //        .name("find"),
        //        arguments: [
        //            "../src/components", "-name", "*.json",
        //        ],
        //    )
        //
        //    print(itemFilesPath.standardOutput ?? "")
        let pipe = Pipe()
        let process = Process()
        process.launchPath = "/usr/bin/find"
        process.arguments = ["../../src/components", "-name", "*.json"]
        process.standardOutput = pipe
        process.launch()
        process.waitUntilExit()
        
        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        print(registryJsonFilePath)
        guard let output = String(data: data, encoding: .utf8) else { return }
        print(output.split(separator: "\n"))
    }
}
