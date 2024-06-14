import { $, driver, expect } from '@wdio/globals'
import scrollScreen from '../../helpers/scrollScreen.js'

describe('coba test login android', function () {
    //1
    it('login dengan username yang benar tapi password salah',  async function () {
        const usernameInput = await $('~test-Username')
        const passwordInput = await $('~test-Password')
        const loginButton = await $('~test-LOGIN')
        const errorMessage = await $('//*[@content-desc="test-Error message"]/android.widget.TextView')

        await usernameInput.setValue('standard_user')
        await passwordInput.setValue('pass_random')
        await loginButton.click()

        await expect(errorMessage).toHaveText('Username and password do not match any user in this service.')
    })
    //2
    it('login dengan username locked_out_user dengan menekan tombolnya',  async function () {
        const usernameInput = await $('~test-Username')
        const lockUserButton = await $('//*[@content-desc="test-locked_out_user"]')

        await scrollScreen(1000, 100)
        await lockUserButton.click()
        await scrollScreen(100, 1000)
        await driver.pause(1000)

        expect(usernameInput).toHaveValue('locked_out_user')

    })
    //3
    it('login dengan username locked_out_user dengan menekan tombolnya, kemudian klik tombol login',  async function () {
        const usernameInput = await $('~test-Username')
        const lockUserButton = await $('//*[@content-desc="test-locked_out_user"]')
        const loginButton = await $('~test-LOGIN')
        const lockMessage = await $('//*[@content-desc="test-Error message"]/android.widget.TextView')


        await scrollScreen(1000, 100)
        await lockUserButton.click()
        await scrollScreen(100, 1000)
        await driver.pause(1000)
        await loginButton.click()


        await expect(lockMessage).toHaveText('Sorry, this user has been locked out.')
    })
    //4
    it.only('login dengan mengosongkan username dan password',  async function () {
        const loginButton = await $('~test-LOGIN')
        const usernameRequired = await $('//*[@content-desc="test-Error message"]/android.widget.TextView')

        await loginButton.click()

        await expect(usernameRequired).toHaveText('Username is required')
    })

    //5
    it('login dengan username valid dan mengosongkan password',  async function () {
        const usernameInput = await $('~test-Username')
        const loginButton = await $('~test-LOGIN')
        const passRequired = await $('//*[@content-desc="test-Error message"]/android.widget.TextView')

        await usernameInput.setValue('standard_user')
        await loginButton.click()

        await expect(passRequired).toHaveText('Password is required')
    })
})