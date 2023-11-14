import gulp from 'gulp'
import { gulp as i18nextParser } from 'i18next-parser'
import fs from 'fs'
import path from 'path'
import namespaceI18nextConfig from './.i18n/namespace/i18next-parser.config.js'

// ================================================ADMIN START
const genI18nextConfigToTaskRun = (namespace, i18nextConfig) => {
  gulp.task(`${namespace}:i18next`, (done) => {
    gulp
      .src('src/**')
      .pipe(
        new i18nextParser(i18nextConfig)
      )
      .pipe(gulp.dest('./'))
    done()
  })
  
  gulp.task(`${namespace}:i18next-cleanup`, (done) => {
    try {
      fs.writeFileSync(`locales/${namespace}/dev.json`, '{}', 'utf8')
      console.log(`Clean locales/${namespace}/dev.json file.`)
      done()
    } catch (error) {
      console.error(
        `Error parsing or updating the 'locales/${namespace}/dev.json' file:`,
        error
      )
      throw error
    }
  })
  
  gulp.task(`${namespace}:update-json`, (done) => {
    const file = path.join(`./locales/${namespace}/dev.json`)
    // Read the JSON file
    const data = fs.readFileSync(file, 'utf8')
  
    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data)
  
      // 객체의 키값을 value에 동일하게 넣기
      Object.keys(jsonData).forEach((key) => {
        jsonData[key] = key
      })
  
      // 덮어씌워야한다
      fs.writeFileSync(
        file,
        JSON.stringify(jsonData),
        { encoding: 'utf8', flag: 'w' },
        (err) => {
          if (err) {
            throw err
          }
        }
      )
  
      console.log('File successfully updated.')
      done() // Signal task completion
    } catch (error) {
      console.error('Error parsing or updating the JSON file:', error)
      done(error) // Signal error and task completion
    }
  })

  return [`${namespace}:i18next-cleanup`, `${namespace}:i18next`, `${namespace}:update-json`]
}


// namepsace lexer 만들어서 가져오기
const translationSeries = genI18nextConfigToTaskRun('translation', namespaceI18nextConfig)
// const glossarySeries = genI18nextConfigToTaskRun('glossary', glossaryI18nextConfig)
gulp.task('default', gulp.series([
  ...translationSeries,
  // ...glossarySeries
]))
