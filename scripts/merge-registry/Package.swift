// swift-tools-version: 6.1
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "merge-registry",
    platforms: [.macOS(.v15)],
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .executable(
            name: "merge-registry",
            targets: ["merge-registry"])
    ],
//    dependencies: [
//        .package(url: "https://github.com/swiftlang/swift-subprocess.git", branch: "main")
//    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        .executableTarget(
            name: "merge-registry",
//            dependencies: [
//                .product(
//                    name: "Subprocess", package: "swift-subprocess",
//                )
//            ]
        ),
        .testTarget(
            name: "merge-registryTests",
            dependencies: ["merge-registry"]
        ),
    ]
)
