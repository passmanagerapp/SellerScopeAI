import com.varabyte.kobweb.gradle.application.util.configAsKobwebApplication

plugins {
    alias(libs.plugins.kotlin.multiplatform)
    alias(libs.plugins.compose.compiler)
    alias(libs.plugins.kobweb.application)
    kotlin("plugin.serialization") version "2.1.10"
}

group = "com.orderpanel"
version = "1.0-SNAPSHOT"

kobweb {
    app {
        index {
            description.set("SellerScope — The powerful order management dashboard for growing businesses")
        }
    }
}

kotlin {
    configAsKobwebApplication("orderpanel", includeServer = true)
    sourceSets {
        commonMain.dependencies {
            implementation(libs.compose.runtime)
        }

        jsMain.dependencies {
            implementation(libs.compose.runtime)
            implementation(libs.compose.html.core)
            implementation(libs.kobweb.core)
            implementation(libs.kobweb.silk)
            implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.5.1")
            implementation("dev.gitlive:firebase-firestore:2.1.0")
            implementation(npm("firebase", "10.12.2"))
        }

        // Kobweb server endpoints (`jvmMain/.../api/`). The API is provided by the Kobweb server
        // jar at runtime, so it is compileOnly — no transitive deps reach the server.
        jvmMain.dependencies {
            compileOnly(libs.kobweb.api)
        }
    }
}
