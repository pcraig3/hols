const html = require('../utils.js')
const Layout = require('../components/Layout.js')

const LoginPage = () =>
  html`
    <${Layout}>
      <h1>Log in to see your tax-filing information</h1>
      <form>
        <p>Please enter your Social Insurance Number and Date of Birth.</p>

        <div>
          <label for="sin">
            SIN (Social Insurance Number)
          </label>
          <input id="sin" name="sin" type="text" />
        </div>

        <div>
          <fieldset aria-describedby="dob-hint" role="group">
            <legend>
              <p>
                Date of Birth
              </p>
            </legend>
            <span id="dob-hint">
              For example, 30 12 1990
            </span>
            <div class="date-input" id="date-input">
              <div class="date-input__item">
                <label for="dob-day">
                  Day
                </label>
                <input
                  id="dob-day"
                  name="dob-day"
                  type="number"
                  pattern="[0-9]*"
                />
              </div>
              <div class="date-input__item">
                <label for="dob-month">
                  Month
                </label>
                <input
                  id="dob-month"
                  name="dob-month"
                  type="number"
                  pattern="[0-9]*"
                />
              </div>
              <div class="gdate-input__item">
                <label for="dob-year">
                  Year
                </label>
                <input
                  id="dob-year"
                  name="dob-year"
                  type="number"
                  pattern="[0-9]*"
                />
              </div>
            </div>
          </fieldset>
        </div>

        <button type="submit">Login</button>
      </form>
    <//>
  `

module.exports = LoginPage
