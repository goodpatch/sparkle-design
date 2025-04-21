import Foundation

struct ShadcnRegistry: Codable {
    let schema: String
    let name: String
    let homepage: String
    let items: [ShadcnRegistryItem]
}

struct ShadcnRegistryItem: Codable {
    let schema: String
    let name: String
    let title: String
    let description: String
    let type: ShadcnRegistryType
    let author: String?
    let dependencies: [String]
    let registryDependencies: [String]
    let files: [ShadcnFile]
    let cssVars: CssObject
    let css: CssObject
    let docs: String?
    let categories: [String]
    let meta: [String: String]
    
    struct ShadcnFile: Codable {
        let path: String
        let type: ShadcnRegistryType
        let target: String?
    }
    
    struct CssObject: Codable {
        let items: [String: Any]
        
        public init(from decoder: any Decoder) throws {
            let container = try decoder.container(keyedBy: AnyCodingKeys.self)
            items = try container.decode([String: Any].self)
        }
        
        public func encode(to encoder: any Encoder) throws {
            var container = encoder.container(keyedBy: AnyCodingKeys.self)
            try container.encode(items)
        }
    }
}

enum ShadcnRegistryType: String, Codable {
    case block
    case component
    case lib
    case hook
    case ui
    case page
    case file
    case style
    case theme
    
    func encode(to encoder: any Encoder) throws {
        var container = encoder.singleValueContainer()
        try container.encode("registry:\(rawValue)")
    }
    
    init(from decoder: any Decoder) throws {
        let container = try decoder.singleValueContainer()
        let value = try container.decode(String.self)
        guard
            let type = ShadcnRegistryType(rawValue: value.replacingOccurrences(of: "registry:", with: ""))
        else {
            throw DecodingError.dataCorruptedError(
                in: container, debugDescription: "Invalid registry type")
        }
        self = type
    }
}
