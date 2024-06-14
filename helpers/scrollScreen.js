import {driver} from '@wdio/globals'

async function scrollScreen (fromY, toY){
    await driver.pause(1000)

    await driver
    .action('pointer')
    .move({ x: 250, y:fromY })
    .down()
    .pause(100)
    .move({ duration: 200, x: 250, y: toY })
    .up()
    .perform();
}

export default scrollScreen