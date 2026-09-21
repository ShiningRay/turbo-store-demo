# Pin npm packages by running ./bin/importmap

pin "application"
pin "turbo_store"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin "alpinejs", to: "https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/module.esm.js"
pin_all_from "app/javascript/controllers", under: "controllers"
