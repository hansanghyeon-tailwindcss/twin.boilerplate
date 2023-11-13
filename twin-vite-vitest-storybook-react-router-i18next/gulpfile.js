import gulp from 'gulp'
import { gulp as i18nextParser } from 'i18next-parser'
import fs from 'fs'
import path from 'path'
import i18nextConfig from './.i18n/i18next-parser.config.js'

gulp.task('i18next', (done) => {
  gulp
    .src('src/**')
    .pipe(
      // eslint-disable-next-line new-cap
      new i18nextParser(i18nextConfig)
    )
    .pipe(gulp.dest('./'))
  done()
})

gulp.task('i18next-cleanup', (done) => {
  try {
    fs.writeFileSync('locales/translation/dev.json', '{}', 'utf8')
    console.log('Clean locales/translation/dev.json file.')
    done()
  } catch (error) {
    console.error(
      'Error parsing or updating the `locales/translation/dev.json` file:',
      error
    )
    throw error
  }
})

gulp.task('update-json', (done) => {
  const file = path.join('./locales/translation/dev.json')
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

gulp.task('default', gulp.series('i18next-cleanup', 'i18next', 'update-json'))
