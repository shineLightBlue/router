const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { gzipSync } = require('zlib')
const { compress } = require('brotli')

function checkFileSize(filePath) {
  if (!fs.existsSync(filePath)) {
    return
  }
  console.log(123)
  const file = fs.readFileSync(filePath)
  const minSize = (file.length / 1024).toFixed(2) + 'kb'
  const gzipped = gzipSync(file)
  const gzippedSize = (gzipped.length / 1024).toFixed(2) + 'kb'
  const compressed = compress(file)
  const compressedSize = (compressed.length / 1024).toFixed(2) + 'kb'
  console.log(
    `${chalk.gray(
      chalk.bold(path.basename(filePath))
    )} min:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`
  )
}

checkFileSize(
  path.resolve(__dirname, '../packages/router/size-checks/dist/webRouter.js')
)
checkFileSize(
  path.resolve(__dirname, '../packages/router/dist/vue-router.global.prod.js')
)
