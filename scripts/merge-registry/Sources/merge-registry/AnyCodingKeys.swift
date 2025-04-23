/// Anyをエンコード/デコードするための拡張
public struct AnyCodingKeys: CodingKey {
    public var stringValue: String
    public var intValue: Int? { nil }

    public init?(stringValue: String) {
        self.stringValue = stringValue
    }

    public init?(intValue: Int) {
        return nil
    }
}

extension KeyedDecodingContainer {
    public func decode(_ type: [Any].Type, forKey key: K) throws -> [Any] {
        var container = try nestedUnkeyedContainer(forKey: key)
        return try container.decode(type)
    }

    public func decodeIfPresent(_ type: [Any].Type, forKey key: K) throws -> [Any]? {
        guard contains(key) else { return .none }
        return try decode(type, forKey: key)
    }

    public func decode(_ type: [String: Any].Type, forKey key: K) throws -> [String: Any] {
        let container = try nestedContainer(keyedBy: AnyCodingKeys.self, forKey: key)
        return try container.decode(type)
    }

    public func decodeIfPresent(_ type: [String: Any].Type, forKey key: K) throws -> [String: Any]?
    {
        guard contains(key) else { return .none }
        return try decode(type, forKey: key)
    }

    public func decode(_ type: [String: Any].Type) throws -> [String: Any] {
        var dictionary = [String: Any]()

        allKeys.forEach { key in
            if let value = try? decode(Bool.self, forKey: key) {
                dictionary[key.stringValue] = value
            } else if let value = try? decode(String.self, forKey: key) {
                dictionary[key.stringValue] = value
            } else if let value = try? decode(Int64.self, forKey: key) {
                dictionary[key.stringValue] = value
            } else if let value = try? decode(Double.self, forKey: key) {
                dictionary[key.stringValue] = value
            } else if let value = try? decode([String: Any].self, forKey: key) {
                dictionary[key.stringValue] = value
            } else if let value = try? decode([Any].self, forKey: key) {
                dictionary[key.stringValue] = value
            }
        }

        return dictionary
    }
}

extension UnkeyedDecodingContainer {
    public mutating func decode(_ type: [Any].Type) throws -> [Any] {
        var array = [Any]()

        while isAtEnd == false {
            if let value = try? decode(Bool.self) {
                array.append(value)
            } else if let value = try? decode(String.self) {
                array.append(value)
            } else if let value = try? decode(Int64.self) {
                array.append(value)
            } else if let value = try? decode(Double.self) {
                array.append(value)
            } else if let value = try? decode([String: Any].self) {
                array.append(value)
            } else if let value = try? decode([Any].self) {
                array.append(value)
            }
        }

        return array
    }

    public mutating func decode(_ type: [String: Any].Type) throws -> [String: Any] {
        let nestedContainer = try self.nestedContainer(keyedBy: AnyCodingKeys.self)
        return try nestedContainer.decode(type)
    }
}

extension KeyedEncodingContainer where K == AnyCodingKeys {
    public mutating func encode(_ value: [String: Any], forKey key: K) throws {
        var container = self.nestedContainer(keyedBy: AnyCodingKeys.self, forKey: key)
        try container.encode(value)
    }

    public mutating func encode(_ value: [Any], forKey key: K) throws {
        var container = self.nestedUnkeyedContainer(forKey: key)
        try container.encode(value)
    }

    public mutating func encode(_ value: [String: Any]) throws {
        for (key, value) in value {
            let codingKey = AnyCodingKeys(stringValue: key)!
            if let boolValue = value as? Bool {
                try encode(boolValue, forKey: codingKey)
            } else if let stringValue = value as? String {
                try encode(stringValue, forKey: codingKey)
            } else if let intValue = value as? Int64 {
                try encode(intValue, forKey: codingKey)
            } else if let doubleValue = value as? Double {
                try encode(doubleValue, forKey: codingKey)
            } else if let dictValue = value as? [String: Any] {
                try encode(dictValue, forKey: codingKey)
            } else if let arrayValue = value as? [Any] {
                try encode(arrayValue, forKey: codingKey)
            }
        }
    }
}

extension UnkeyedEncodingContainer {
    public mutating func encode(_ value: [Any]) throws {
        for element in value {
            if let boolValue = element as? Bool {
                try encode(boolValue)
            } else if let stringValue = element as? String {
                try encode(stringValue)
            } else if let intValue = element as? Int64 {
                try encode(intValue)
            } else if let doubleValue = element as? Double {
                try encode(doubleValue)
            } else if let dictValue = element as? [String: Any] {
                try encode(dictValue)
            } else if let arrayValue = element as? [Any] {
                try encode(arrayValue)
            }
        }
    }

    public mutating func encode(_ value: [String: Any]) throws {
        var nestedContainer = self.nestedContainer(keyedBy: AnyCodingKeys.self)
        try nestedContainer.encode(value)
    }
}
